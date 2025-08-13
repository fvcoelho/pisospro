import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const location = formData.get('location') as string
    const category = formData.get('category') as string

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 })
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File size must be less than 10MB' }, { status: 400 })
    }

    // Check if Vercel Blob is configured
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ 
        error: 'Blob storage not configured. Please set BLOB_READ_WRITE_TOKEN environment variable.' 
      }, { status: 500 })
    }

    // Upload to Vercel Blob
    const filename = `gallery/${Date.now()}-${file.name}`
    const blob = await put(filename, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    // Save to database
    const galleryImage = await prisma.galleryImage.create({
      data: {
        title,
        description: description || null,
        location: location || null,
        imageUrl: blob.url,
        publicId: blob.pathname, // Store blob pathname as publicId
        category: category || null,
        isActive: true,
      }
    })

    return NextResponse.json({
      success: true,
      image: galleryImage,
      blob: {
        url: blob.url,
        pathname: blob.pathname,
        size: file.size, // Use the original file size
        downloadUrl: blob.downloadUrl,
      }
    })

  } catch (error) {
    console.error('Upload error:', error)
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        return NextResponse.json(
          { error: 'Blob storage authentication failed. Check BLOB_READ_WRITE_TOKEN.' },
          { status: 401 }
        )
      }
      if (error.message.includes('413') || error.message.includes('too large')) {
        return NextResponse.json(
          { error: 'File too large. Maximum size is 10MB.' },
          { status: 413 }
        )
      }
    }
    
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    )
  }
}