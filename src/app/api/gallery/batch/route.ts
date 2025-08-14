import { NextRequest, NextResponse } from 'next/server'
import { del } from '@vercel/blob'
import { prisma } from '@/lib/prisma'

// POST batch operations
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { operation, ids, data } = body

    // Validate required fields
    if (!operation || !ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request. Operation and IDs array are required.' },
        { status: 400 }
      )
    }

    // Convert string IDs to numbers
    const numericIds = ids.map(id => typeof id === 'string' ? parseInt(id) : id)
    const validIds = numericIds.filter(id => !isNaN(id))

    if (validIds.length === 0) {
      return NextResponse.json(
        { error: 'No valid IDs provided' },
        { status: 400 }
      )
    }

    switch (operation) {
      case 'update':
        return handleBatchUpdate(validIds, data)
      
      case 'delete':
        return handleBatchDelete(validIds, data?.hardDelete)
      
      case 'activate':
        return handleBatchStatusChange(validIds, true)
      
      case 'deactivate':
        return handleBatchStatusChange(validIds, false)
      
      case 'changeCategory':
        return handleBatchCategoryChange(validIds, data?.category)
      
      default:
        return NextResponse.json(
          { error: `Unknown operation: ${operation}` },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('Error in batch operation:', error)
    return NextResponse.json(
      { error: 'Failed to perform batch operation' },
      { status: 500 }
    )
  }
}

// Batch update multiple fields
async function handleBatchUpdate(ids: number[], data: Record<string, any>) {
  try {
    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: 'No update data provided' },
        { status: 400 }
      )
    }

    // Build update data object
    const updateData: Record<string, any> = {}
    if (data.title !== undefined) updateData.title = data.title
    if (data.description !== undefined) updateData.description = data.description
    if (data.location !== undefined) updateData.location = data.location
    if (data.category !== undefined) updateData.category = data.category
    if (data.isActive !== undefined) updateData.isActive = data.isActive

    // Update all images
    const result = await prisma.galleryImage.updateMany({
      where: {
        id: { in: ids }
      },
      data: updateData
    })

    return NextResponse.json({
      success: true,
      message: `Updated ${result.count} images`,
      count: result.count
    })
  } catch (error) {
    console.error('Batch update error:', error)
    throw error
  }
}

// Batch delete (soft or hard)
async function handleBatchDelete(ids: number[], hardDelete: boolean = false) {
  try {
    if (hardDelete) {
      // Get images for blob deletion
      const images = await prisma.galleryImage.findMany({
        where: {
          id: { in: ids }
        }
      })

      // Delete blobs
      const blobDeletions = images
        .filter(img => img.imageUrl?.includes('blob.vercel-storage.com'))
        .map(img => 
          del(img.imageUrl, {
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }).catch(err => {
            console.error(`Failed to delete blob for image ${img.id}:`, err)
            return null
          })
        )

      await Promise.allSettled(blobDeletions)

      // Hard delete from database
      const result = await prisma.galleryImage.deleteMany({
        where: {
          id: { in: ids }
        }
      })

      return NextResponse.json({
        success: true,
        message: `Permanently deleted ${result.count} images`,
        count: result.count
      })
    } else {
      // Soft delete - mark as inactive
      const result = await prisma.galleryImage.updateMany({
        where: {
          id: { in: ids }
        },
        data: {
          isActive: false
        }
      })

      return NextResponse.json({
        success: true,
        message: `Deactivated ${result.count} images`,
        count: result.count
      })
    }
  } catch (error) {
    console.error('Batch delete error:', error)
    throw error
  }
}

// Batch activate/deactivate
async function handleBatchStatusChange(ids: number[], isActive: boolean) {
  try {
    const result = await prisma.galleryImage.updateMany({
      where: {
        id: { in: ids }
      },
      data: {
        isActive
      }
    })

    return NextResponse.json({
      success: true,
      message: `${isActive ? 'Activated' : 'Deactivated'} ${result.count} images`,
      count: result.count
    })
  } catch (error) {
    console.error('Batch status change error:', error)
    throw error
  }
}

// Batch category change
async function handleBatchCategoryChange(ids: number[], category: string | null) {
  try {
    if (category === undefined) {
      return NextResponse.json(
        { error: 'Category is required for category change operation' },
        { status: 400 }
      )
    }

    const result = await prisma.galleryImage.updateMany({
      where: {
        id: { in: ids }
      },
      data: {
        category
      }
    })

    return NextResponse.json({
      success: true,
      message: `Updated category for ${result.count} images`,
      count: result.count
    })
  } catch (error) {
    console.error('Batch category change error:', error)
    throw error
  }
}

// GET batch information (fetch multiple images by IDs)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const idsParam = searchParams.get('ids')

    if (!idsParam) {
      return NextResponse.json(
        { error: 'IDs parameter is required' },
        { status: 400 }
      )
    }

    // Parse IDs from comma-separated string
    const ids = idsParam.split(',').map(id => parseInt(id)).filter(id => !isNaN(id))

    if (ids.length === 0) {
      return NextResponse.json(
        { error: 'No valid IDs provided' },
        { status: 400 }
      )
    }

    const images = await prisma.galleryImage.findMany({
      where: {
        id: { in: ids }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json({
      images,
      found: images.length,
      requested: ids.length
    })
  } catch (error) {
    console.error('Error fetching batch images:', error)
    return NextResponse.json(
      { error: 'Failed to fetch images' },
      { status: 500 }
    )
  }
}