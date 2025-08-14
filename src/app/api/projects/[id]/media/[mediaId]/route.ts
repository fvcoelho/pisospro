import { NextRequest, NextResponse } from 'next/server'
import { del } from '@vercel/blob'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; mediaId: string }> }
) {
  try {
    const { id, mediaId: mediaIdStr } = await params
    const projectId = parseInt(id)
    const mediaId = parseInt(mediaIdStr)
    
    if (isNaN(projectId) || isNaN(mediaId)) {
      return NextResponse.json(
        { error: 'Invalid project ID or media ID' },
        { status: 400 }
      )
    }

    // Verify media belongs to project
    const media = await prisma.projectMedia.findFirst({
      where: {
        id: mediaId,
        projectId
      }
    })

    if (!media) {
      return NextResponse.json(
        { error: 'Media not found in this project' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { title, description, isCover } = body

    // If only updating cover status
    if (isCover !== undefined && !title && !description) {
      // If setting as cover, remove cover from other media in this project
      if (isCover) {
        await prisma.projectMedia.updateMany({
          where: {
            projectId,
            isCover: true,
            isActive: true,
            id: { not: mediaId }
          },
          data: { isCover: false }
        })
      }

      // Update this media's cover status
      const updatedMedia = await prisma.projectMedia.update({
        where: { id: mediaId },
        data: { isCover }
      })

      return NextResponse.json({
        success: true,
        media: updatedMedia
      })
    }

    // Regular metadata update
    if (!title) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    // Update media metadata
    const updatedMedia = await prisma.projectMedia.update({
      where: { id: mediaId },
      data: {
        title,
        description: description || null,
        ...(isCover !== undefined && { isCover }),
        updatedAt: new Date()
      }
    })

    // If setting as cover, remove cover from other media in this project
    if (isCover) {
      await prisma.projectMedia.updateMany({
        where: {
          projectId,
          isCover: true,
          isActive: true,
          id: { not: mediaId }
        },
        data: { isCover: false }
      })
    }

    return NextResponse.json({
      success: true,
      media: updatedMedia
    })
  } catch (error) {
    console.error('Error updating project media:', error)
    return NextResponse.json(
      { error: 'Failed to update media' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; mediaId: string }> }
) {
  try {
    const { id, mediaId: mediaIdStr } = await params
    const projectId = parseInt(id)
    const mediaId = parseInt(mediaIdStr)
    
    if (isNaN(projectId) || isNaN(mediaId)) {
      return NextResponse.json(
        { error: 'Invalid project ID or media ID' },
        { status: 400 }
      )
    }

    // Verify media belongs to project
    const media = await prisma.projectMedia.findFirst({
      where: {
        id: mediaId,
        projectId
      }
    })

    if (!media) {
      return NextResponse.json(
        { error: 'Media not found in this project' },
        { status: 404 }
      )
    }

    // Delete from Vercel Blob if it's a blob URL
    if (media.mediaUrl && media.mediaUrl.includes('blob.vercel-storage.com')) {
      try {
        await del(media.mediaUrl, {
          token: process.env.BLOB_READ_WRITE_TOKEN,
        })
        console.log('Successfully deleted blob:', media.mediaUrl)
      } catch (blobError) {
        console.error('Error deleting blob:', blobError)
        // Continue with database deletion even if blob deletion fails
      }
    }

    // Soft delete - mark as inactive
    await prisma.projectMedia.update({
      where: { id: mediaId },
      data: { isActive: false }
    })

    // Reorder remaining media to fill gaps
    // First, get all remaining active media
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