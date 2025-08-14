import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { prisma } from '@/lib/prisma'

const MAX_MEDIA_PER_PROJECT = 10
const MAX_IMAGE_SIZE = 10 * 1024 * 1024 // 10MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024 // 50MB
const MAX_VIDEO_DURATION = 30 // 30 seconds

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/mov']

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const startTime = Date.now()
  
  try {
    console.log('🚀 Project media upload started')
    
    const { id } = await params
    const projectId = parseInt(id)
    
    if (isNaN(projectId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid project ID' },
        { status: 400 }
      )
    }

    // Verify project exists
    const project = await prisma.project.findUnique({
      where: { id: projectId }
    })

    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found' },
        { status: 404 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const title = formData.get('title') as string
    const description = formData.get('description') as string

    console.log('📁 File details:', {
      name: file?.name,
      size: file?.size ? `${(file.size / 1024 / 1024).toFixed(2)}MB` : 'unknown',
      type: file?.type,
      title,
      projectId
    })

    // Validation
    if (!file) {
      return NextResponse.json({
        success: false,
        error: 'No file provided',
        details: 'File field is required in form data'
      }, { status: 400 })
    }

    if (!title) {
      return NextResponse.json({
        success: false,
        error: 'Title is required',
        details: 'Title field is required for project media'
      }, { status: 400 })
    }

    // Check project media count limit
    const currentMediaCount = await prisma.projectMedia.count({
      where: {
        projectId,
        isActive: true
      }
    })

    if (currentMediaCount >= MAX_MEDIA_PER_PROJECT) {
      return NextResponse.json({
        success: false,
        error: `Maximum ${MAX_MEDIA_PER_PROJECT} media items per project`,
        details: `Project already has ${currentMediaCount} media items`
      }, { status: 400 })
    }

    // Determine media type and validate
    let mediaType: 'IMAGE' | 'VIDEO'
    let maxSize: number

    if (ALLOWED_IMAGE_TYPES.includes(file.type)) {
      mediaType = 'IMAGE'
      maxSize = MAX_IMAGE_SIZE
    } else if (ALLOWED_VIDEO_TYPES.includes(file.type)) {
      mediaType = 'VIDEO'
      maxSize = MAX_VIDEO_SIZE
    } else {
      return NextResponse.json({
        success: false,
        error: 'Invalid file type',
        details: `Allowed types: ${[...ALLOWED_IMAGE_TYPES, ...ALLOWED_VIDEO_TYPES].join(', ')}`
      }, { status: 400 })
    }

    // Validate file size
    if (file.size > maxSize) {
      return NextResponse.json({
        success: false,
        error: `File too large. Maximum size for ${mediaType.toLowerCase()}s is ${maxSize / 1024 / 1024}MB`,
        details: `File size: ${(file.size / 1024 / 1024).toFixed(2)}MB`
      }, { status: 400 })
    }

    // Check Vercel Blob configuration
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({
        success: false,
        error: 'Blob storage not configured',
        details: 'Check BLOB_READ_WRITE_TOKEN environment variable'
      }, { status: 500 })
    }

    console.log('📤 Uploading to Vercel Blob...')
    
    // Upload to Vercel Blob
    const filename = `projects/${projectId}/${mediaType.toLowerCase()}/${Date.now()}-${file.name}`
    const blob = await put(filename, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    console.log('✅ Blob uploaded successfully:', {
      url: blob.url,
      pathname: blob.pathname,
      uploadTime: `${Date.now() - startTime}ms`
    })

    // Get next display order by finding all media (active and inactive) to avoid conflicts
    const allProjectMedia = await prisma.projectMedia.findMany({
      where: {
        projectId
      },
      select: {
        displayOrder: true
      }
    })

    // Find the highest displayOrder across all records and add 1, or use 0 if no media exists
    const displayOrder = allProjectMedia.length > 0 
      ? Math.max(...allProjectMedia.map(m => m.displayOrder)) + 1 
      : 0

    console.log('💾 Saving to database with displayOrder:', displayOrder)

    // Use a transaction to ensure atomicity
    const projectMedia = await prisma.$transaction(async (tx) => {
      // Check if this project already has a cover
      const existingCover = await tx.projectMedia.findFirst({
        where: {
          projectId,
          isCover: true,
          isActive: true
        }
      })

      // Determine if this should be the cover (first media or explicitly set as cover)
      const shouldBeCover = !existingCover

      // If this will be the new cover and there's an existing cover, remove the old cover status
      if (shouldBeCover && existingCover) {
        await tx.projectMedia.update({
          where: { id: existingCover.id },
          data: { isCover: false }
        })
      }

      // Save to database
      return await tx.projectMedia.create({
        data: {
          projectId,
          title,
          description: description || null,
          mediaUrl: blob.url,
          publicId: blob.pathname,
          mediaType: mediaType as any, // Cast to enum
          displayOrder,
          fileSize: file.size,
          duration: mediaType === 'VIDEO' ? null : null, // TODO: Extract video duration if needed
          isCover: shouldBeCover,
          isActive: true,
        }
      })
    })

    console.log('✅ Project media saved to database:', {
      id: projectMedia.id,
      title: projectMedia.title,
      mediaType: projectMedia.mediaType,
      totalTime: `${Date.now() - startTime}ms`
    })

    return NextResponse.json({
      success: true,
      media: projectMedia,
      blob: {
        url: blob.url,
        pathname: blob.pathname,
        downloadUrl: blob.downloadUrl || blob.url,
      },
      uploadTime: Date.now() - startTime,
      debug: {
        filename,
        originalName: file.name,
        fileSize: file.size,
        mediaType,
        displayOrder
      }
    })

  } catch (error: any) {
    const uploadTime = Date.now() - startTime
    console.error('❌ Project media upload failed:', error)
    console.error('Upload duration before error:', `${uploadTime}ms`)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to upload media',
      details: error instanceof Error ? error.message : 'Unknown error occurred',
      debug: {
        uploadTime,
        errorType: error.constructor.name,
        hasToken: !!process.env.BLOB_READ_WRITE_TOKEN,
      }
    }, { status: 500 })
  }
}