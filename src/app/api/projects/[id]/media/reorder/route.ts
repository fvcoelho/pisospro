import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface MediaOrderItem {
  id: number
  displayOrder: number
}

export async function PUT(
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

    const body = await request.json()
    const { mediaOrder }: { mediaOrder: MediaOrderItem[] } = body

    if (!mediaOrder || !Array.isArray(mediaOrder)) {
      return NextResponse.json(
        { error: 'Invalid media order data' },
        { status: 400 }
      )
    }

    // Verify all media items belong to this project
    const projectMedia = await prisma.projectMedia.findMany({
      where: {
        projectId,
        isActive: true
      }
    })

    const projectMediaIds = new Set(projectMedia.map(m => m.id))
    const reorderMediaIds = new Set(mediaOrder.map(m => m.id))

    // Check if all provided media IDs exist in the project
    for (const item of mediaOrder) {
      if (!projectMediaIds.has(item.id)) {
        return NextResponse.json(
          { error: `Media item ${item.id} not found in project ${projectId}` },
          { status: 400 }
        )
      }
    }

    // Update display order for all provided items
    const updates = mediaOrder.map(item => 
      prisma.projectMedia.update({
        where: { id: item.id },
        data: { displayOrder: item.displayOrder }
      })
    )

    // Execute all updates in a transaction
    await prisma.$transaction(updates)

    // Fetch updated media order
    const updatedMedia = await prisma.projectMedia.findMany({
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
      media: updatedMedia,
      message: 'Media order updated successfully'
    })
  } catch (error) {
    console.error('Error reordering project media:', error)
    return NextResponse.json(
      { error: 'Failed to reorder media' },
      { status: 500 }
    )
  }
}