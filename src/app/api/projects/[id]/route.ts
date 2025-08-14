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

    // Fetch project with media count
    const project = await prisma.project.findUnique({
      where: { 
        id: projectId,
        isActive: true 
      },
      include: {
        _count: {
          select: {
            media: {
              where: { isActive: true }
            }
          }
        }
      }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      project
    })
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    )
  }
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
    const { title, description, location, completedAt } = body

    // Validate required fields
    if (!title || !title.trim()) {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    // Check if project exists
    const existingProject = await prisma.project.findUnique({
      where: { 
        id: projectId,
        isActive: true 
      }
    })

    if (!existingProject) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Update project
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        location: location?.trim() || null,
        completedAt: completedAt ? new Date(completedAt) : null,
        updatedAt: new Date()
      },
      include: {
        _count: {
          select: {
            media: {
              where: { isActive: true }
            }
          }
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

export async function DELETE(
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

    // Check if project exists
    const project = await prisma.project.findUnique({
      where: { 
        id: projectId,
        isActive: true 
      },
      include: {
        _count: {
          select: {
            media: {
              where: { isActive: true }
            }
          }
        }
      }
    })

    if (!project) {
      return NextResponse.json(
        { error: 'Project not found' },
        { status: 404 }
      )
    }

    // Check if project has active media
    if (project._count.media > 0) {
      return NextResponse.json(
        { error: `Cannot delete project with ${project._count.media} active media items. Please remove all media first.` },
        { status: 400 }
      )
    }

    // Soft delete the project
    await prisma.project.update({
      where: { id: projectId },
      data: { 
        isActive: false,
        updatedAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting project:', error)
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    )
  }
}