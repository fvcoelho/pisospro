import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const projectId = parseInt(id)
    
    if (isNaN(projectId)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      )
    }

    // Verify project exists
    const project = await prisma.project.findUnique({
      where: { id: projectId }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Fetch project media ordered by displayOrder
    const media = await prisma.projectMedia.findMany({
      where: {
        projectId,
        isActive: true
      },
      orderBy: {
        displayOrder: 'asc'
      }
    })

    return NextResponse.json({
      success: true,
      media,
      count: media.length
    })
  } catch (error) {
    console.error('Error fetching project media:', error)
    return NextResponse.json(
      { error: 'Failed to fetch project media' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const projectId = parseInt(id)
    const { searchParams } = new URL(request.url)
    const mediaId = searchParams.get('mediaId')

    if (isNaN(projectId) || !mediaId) {
      return NextResponse.json(
        { error: 'Invalid project ID or media ID' },
        { status: 400 }
      )
    }

    // Verify media belongs to project
    const media = await prisma.projectMedia.findFirst({
      where: {
        id: parseInt(mediaId),
        projectId
      }
    })

    if (!media) {
      return NextResponse.json(
        { error: 'Media not found in this project' },
        { status: 404 }
      )
    }

    // Soft delete - mark as inactive
    await prisma.projectMedia.update({
      where: { id: parseInt(mediaId) },
      data: { isActive: false }
    })

    // Reorder remaining media to fill gaps
    const remainingMedia = await prisma.projectMedia.findMany({
      where: {
        projectId,
        isActive: true
      },
      orderBy: {
        displayOrder: 'asc'
      }
    })

    // Use a transaction to safely reorder by first setting negative values
    await prisma.$transaction(async (tx) => {
      // Step 1: Set all to negative values to avoid constraint conflicts
      for (let i = 0; i < remainingMedia.length; i++) {
        await tx.projectMedia.update({
          where: { id: remainingMedia[i].id },
          data: { displayOrder: -(i + 1) }
        })
      }
      
      // Step 2: Set correct positive values
      for (let i = 0; i < remainingMedia.length; i++) {
        await tx.projectMedia.update({
          where: { id: remainingMedia[i].id },
          data: { displayOrder: i }
        })
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting project media:', error)
    return NextResponse.json(
      { error: 'Failed to delete media' },
      { status: 500 }
    )
  }
}