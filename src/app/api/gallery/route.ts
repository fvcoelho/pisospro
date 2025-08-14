import { NextRequest, NextResponse } from 'next/server'
import { del } from '@vercel/blob'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = searchParams.get('limit')
    const page = searchParams.get('page')
    const pageSize = searchParams.get('pageSize')
    const status = searchParams.get('status') // 'active', 'inactive', 'all'
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc'

    // Build where clause
    const where: Record<string, any> = {}
    
    // Status filter
    if (status === 'active') {
      where.isActive = true
    } else if (status === 'inactive') {
      where.isActive = false
    } else if (!status || status === 'default') {
      // Default behavior - only show active
      where.isActive = true
    }
    // status === 'all' shows everything (no filter)

    // Category filter
    if (category && category !== 'all') {
      where.category = category
    }

    // Pagination setup
    const currentPage = page ? parseInt(page) : 1
    const itemsPerPage = pageSize ? parseInt(pageSize) : (limit ? parseInt(limit) : 20)
    const skip = (currentPage - 1) * itemsPerPage

    // Get total count for pagination
    const totalCount = await prisma.galleryImage.count({ where })

    // Build orderBy
    const orderBy: Record<string, 'asc' | 'desc'> = {}
    if (sortBy === 'title') {
      orderBy.title = sortOrder
    } else if (sortBy === 'category') {
      orderBy.category = sortOrder
    } else if (sortBy === 'updatedAt') {
      orderBy.updatedAt = sortOrder
    } else {
      orderBy.createdAt = sortOrder
    }

    // Fetch images with pagination
    const images = await prisma.galleryImage.findMany({
      where,
      orderBy,
      skip: page ? skip : undefined,
      take: itemsPerPage
    })

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / itemsPerPage)
    const hasNextPage = currentPage < totalPages
    const hasPreviousPage = currentPage > 1

    return NextResponse.json({
      images,
      pagination: {
        currentPage,
        pageSize: itemsPerPage,
        totalCount,
        totalPages,
        hasNextPage,
        hasPreviousPage
      }
    })
  } catch (error) {
    console.error('Error fetching gallery images:', error)
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Image ID is required' }, { status: 400 })
    }

    const image = await prisma.galleryImage.findUnique({
      where: { id: parseInt(id) }
    })

    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }

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

    // Mark as inactive in database instead of hard delete to maintain referential integrity
    await prisma.galleryImage.update({
      where: { id: parseInt(id) },
      data: { isActive: false }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}