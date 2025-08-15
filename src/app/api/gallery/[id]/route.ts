import { NextRequest, NextResponse } from 'next/server'
import { del } from '@vercel/blob'
import { prisma } from '@/lib/prisma'

// GET single gallery image by ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid image ID' },
        { status: 400 }
      )
    }

    const image = await prisma.galleryImage.findUnique({
      where: { id },
      include: {
        project: {
          select: {
            id: true,
            title: true,
            description: true,
            location: true,
            isActive: true
          }
        }
      }
    })

    if (!image) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ image })
  } catch (error) {
    console.error('Error fetching gallery image:', error)
    return NextResponse.json(
      { error: 'Failed to fetch image' },
      { status: 500 }
    )
  }
}

// PUT update gallery image
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid image ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { title, description, location, category, projectId, isActive } = body

    // Check if image exists
    const existingImage = await prisma.galleryImage.findUnique({
      where: { id }
    })

    if (!existingImage) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      )
    }

    // Validate project exists if projectId is provided
    if (projectId !== undefined) {
      const project = await prisma.project.findUnique({
        where: { id: projectId }
      })
      
      if (!project) {
        return NextResponse.json(
          { error: 'Project not found' },
          { status: 400 }
        )
      }
    }

    // Build update data object dynamically
    const updateData: Record<string, any> = {}
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (location !== undefined) updateData.location = location
    if (category !== undefined) updateData.category = category
    if (projectId !== undefined) updateData.projectId = projectId
    if (isActive !== undefined) updateData.isActive = isActive

    // Update the image
    const updatedImage = await prisma.galleryImage.update({
      where: { id },
      data: updateData,
      include: {
        project: {
          select: {
            id: true,
            title: true,
            description: true,
            location: true,
            isActive: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      image: updatedImage
    })
  } catch (error) {
    console.error('Error updating gallery image:', error)
    return NextResponse.json(
      { error: 'Failed to update image' },
      { status: 500 }
    )
  }
}

// DELETE gallery image (with hard delete option)
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid image ID' },
        { status: 400 }
      )
    }

    const { searchParams } = new URL(request.url)
    const hardDelete = searchParams.get('hard') === 'true'

    const image = await prisma.galleryImage.findUnique({
      where: { id },
      include: {
        project: {
          select: {
            id: true,
            title: true,
            description: true,
            location: true,
            isActive: true
          }
        }
      }
    })

    if (!image) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      )
    }

    if (hardDelete) {
      // Delete from Vercel Blob if it's a blob URL
      if (image.imageUrl && image.imageUrl.includes('blob.vercel-storage.com')) {
        try {
          await del(image.imageUrl, {
            token: process.env.BLOB_READ_WRITE_TOKEN,
          })
          console.log('Successfully deleted blob:', image.imageUrl)
        } catch (blobError) {
          console.error('Error deleting blob:', blobError)
          // Continue with database deletion even if blob deletion fails
        }
      }

      // Hard delete from database
      await prisma.galleryImage.delete({
        where: { id }
      })

      return NextResponse.json({
        success: true,
        message: 'Image permanently deleted'
      })
    } else {
      // Soft delete - mark as inactive
      const updatedImage = await prisma.galleryImage.update({
        where: { id },
        data: { isActive: false }
      })

      return NextResponse.json({
        success: true,
        message: 'Image marked as inactive',
        image: updatedImage
      })
    }
  } catch (error) {
    console.error('Error deleting gallery image:', error)
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}

// PATCH partial update gallery image
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid image ID' },
        { status: 400 }
      )
    }

    const body = await request.json()

    // Check if image exists
    const existingImage = await prisma.galleryImage.findUnique({
      where: { id }
    })

    if (!existingImage) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      )
    }

    // Update only the provided fields
    const updatedImage = await prisma.galleryImage.update({
      where: { id },
      data: body
    })

    return NextResponse.json({
      success: true,
      image: updatedImage
    })
  } catch (error) {
    console.error('Error patching gallery image:', error)
    return NextResponse.json(
      { error: 'Failed to update image' },
      { status: 500 }
    )
  }
}