import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET single project by ID
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      )
    }

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        galleryImages: {
          where: { isActive: true },
          select: {
            id: true,
            title: true,
            description: true,
            imageUrl: true,
            category: true,
            isActive: true,
            createdAt: true
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ project })
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
}

// PUT update project
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      )
    }

    const body = await request.json()
    const { title, description, location, category, imageUrls, completedAt, isActive } = body

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id }
    })

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Validate required fields
    if (title !== undefined && (!title || !title.trim())) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    // Build update data object dynamically
    const updateData: Record<string, any> = {}
    if (title !== undefined) updateData.title = title.trim()
    if (description !== undefined) updateData.description = description?.trim() || null
    if (location !== undefined) updateData.location = location?.trim() || null
    if (category !== undefined) updateData.category = category?.trim() || null
    if (imageUrls !== undefined) updateData.imageUrls = imageUrls || []
    if (completedAt !== undefined) updateData.completedAt = completedAt ? new Date(completedAt) : null
    if (isActive !== undefined) updateData.isActive = isActive

    // Update the project
    const updatedProject = await prisma.project.update({
      where: { id },
      data: updateData,
      include: {
        galleryImages: {
          where: { isActive: true },
          select: {
            id: true,
            title: true,
            description: true,
            imageUrl: true,
            category: true,
            isActive: true,
            createdAt: true
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    return NextResponse.json({
      success: true,
      project: updatedProject
    })
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}

// DELETE project (with hard delete option)
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      )
    }

    const { searchParams } = new URL(request.url)
    const hardDelete = searchParams.get('hard') === 'true'

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        galleryImages: {
          where: { isActive: true },
          select: {
            id: true,
            title: true,
            description: true,
            imageUrl: true,
            category: true,
            isActive: true,
            createdAt: true
          },
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    if (hardDelete) {
      // Hard delete from database
      await prisma.project.delete({
        where: { id }
      })

      return NextResponse.json({
        success: true,
        message: 'Project permanently deleted'
      })
    } else {
      // Soft delete - mark as inactive
      const updatedProject = await prisma.project.update({
        where: { id },
        data: { isActive: false }
      })

      return NextResponse.json({
        success: true,
        message: 'Project marked as inactive',
        project: updatedProject
      })
    }
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}

// PATCH partial update project
export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params
    const id = parseInt(params.id)
    
    if (isNaN(id)) {
      return NextResponse.json(
        { error: 'Invalid project ID' },
        { status: 400 }
      )
    }

    const body = await request.json()

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { id }
    })

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Update only the provided fields
    const updatedProject = await prisma.project.update({
      where: { id },
      data: body
    })

    return NextResponse.json({
      success: true,
      project: updatedProject
    })
  } catch (error) {
    console.error('Error patching project:', error)
    return NextResponse.json(
      { error: 'Failed to update project' },
      { status: 500 }
    )
  }
}