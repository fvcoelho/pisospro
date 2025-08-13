import { NextRequest, NextResponse } from 'next/server'
import { del } from '@vercel/blob'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const limit = searchParams.get('limit')

    const where = {
      isActive: true,
      ...(category && category !== 'all' ? { category } : {})
    }

    const images = await prisma.galleryImage.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      },
      ...(limit ? { take: parseInt(limit) } : {})
    })

    return NextResponse.json({ images })
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