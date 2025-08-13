import { NextRequest, NextResponse } from 'next/server'
import { put } from '@vercel/blob'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // Enhanced logging for debugging
    console.log('🚀 Gallery upload started')
    
    const formData = await request.formData()
    const file = formData.get('file') as File
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const location = formData.get('location') as string
    const category = formData.get('category') as string

    console.log('📁 File details:', {
      name: file?.name,
      size: file?.size ? `${(file.size / 1024 / 1024).toFixed(2)}MB` : 'unknown',
      type: file?.type,
      title,
      category
    })

    // Validation with enhanced error details
    if (!file) {
      console.log('❌ No file provided')
      return NextResponse.json({ 
        success: false,
        error: 'No file provided',
        details: 'File field is required in form data'
      }, { status: 400 })
    }

    if (!title) {
      console.log('❌ No title provided')
      return NextResponse.json({ 
        success: false,
        error: 'Title is required',
        details: 'Title field is required for gallery images'
      }, { status: 400 })
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.log('❌ Invalid file type:', file.type)
      return NextResponse.json({ 
        success: false,
        error: 'Only image files are allowed',
        details: `Received file type: ${file.type}. Allowed types: image/*`
      }, { status: 400 })
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      console.log('❌ File too large:', `${(file.size / 1024 / 1024).toFixed(2)}MB`)
      return NextResponse.json({ 
        success: false,
        error: 'File size must be less than 10MB',
        details: `File size: ${(file.size / 1024 / 1024).toFixed(2)}MB. Max allowed: 10MB`
      }, { status: 400 })
    }

    // Check if Vercel Blob is configured
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.log('❌ Blob storage not configured')
      return NextResponse.json({ 
        success: false,
        error: 'Blob storage not configured. Please set BLOB_READ_WRITE_TOKEN environment variable.',
        details: 'Check your .env file for BLOB_READ_WRITE_TOKEN configuration'
      }, { status: 500 })
    }

    console.log('📤 Uploading to Vercel Blob...')
    
    // Upload to Vercel Blob with enhanced error handling
    const filename = `gallery/${Date.now()}-${file.name}`
    const blob = await put(filename, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    console.log('✅ Blob uploaded successfully:', {
      url: blob.url,
      pathname: blob.pathname,
      uploadTime: `${Date.now() - startTime}ms`
    })

    console.log('💾 Saving to database...')

    // Save to database with enhanced error handling
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

    console.log('✅ Gallery image saved to database:', {
      id: galleryImage.id,
      title: galleryImage.title,
      totalTime: `${Date.now() - startTime}ms`
    })

    // Test blob URL accessibility
    try {
      const testResponse = await fetch(blob.url, { method: 'HEAD' })
      console.log('🔍 Blob URL accessibility test:', testResponse.ok ? '✅ Accessible' : '⚠️ Not accessible')
    } catch (testError) {
      console.log('⚠️ Blob URL test failed:', testError)
    }

    return NextResponse.json({
      success: true,
      image: galleryImage,
      blob: {
        url: blob.url,
        pathname: blob.pathname,
        size: file.size, // Use the original file size
        downloadUrl: blob.downloadUrl || blob.url,
      },
      uploadTime: Date.now() - startTime,
      debug: {
        filename,
        originalName: file.name,
        fileSize: file.size,
        blobPath: blob.pathname
      }
    })

  } catch (error: any) {
    const uploadTime = Date.now() - startTime
    console.error('❌ Gallery upload failed:', error)
    console.error('Upload duration before error:', `${uploadTime}ms`)
    
    // Enhanced error debugging like test-simple-upload
    if (error.response) {
      console.error('HTTP Error Details:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        url: error.config?.url
      })
    } else if (error.request) {
      console.error('Network Error - No response received:', error.request)
    } else {
      console.error('Error Details:', {
        name: error.constructor.name,
        message: error.message,
        stack: error.stack?.split('\n')[0]
      })
    }
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        console.log('🔑 Authentication issue detected')
        return NextResponse.json({
          success: false,
          error: 'Blob storage authentication failed. Check BLOB_READ_WRITE_TOKEN.',
          details: 'The BLOB_READ_WRITE_TOKEN is either missing or invalid',
          debug: {
            hasToken: !!process.env.BLOB_READ_WRITE_TOKEN,
            storeId: process.env.BLOB_STORE_ID || 'Not configured',
            uploadTime
          }
        }, { status: 401 })
      }
      
      if (error.message.includes('413') || error.message.includes('too large')) {
        console.log('📏 File size issue detected')
        return NextResponse.json({
          success: false,
          error: 'File too large. Maximum size is 10MB.',
          details: 'The uploaded file exceeds the 10MB limit',
          debug: { uploadTime }
        }, { status: 413 })
      }

      if (error.message.includes('ECONNREFUSED')) {
        console.log('🚫 Connection refused')
        return NextResponse.json({
          success: false,
          error: 'Connection to Vercel Blob service failed',
          details: 'Unable to connect to blob storage service',
          debug: { uploadTime }
        }, { status: 503 })
      }
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to upload image',
      details: error instanceof Error ? error.message : 'Unknown error occurred',
      debug: {
        uploadTime,
        errorType: error.constructor.name,
        hasToken: !!process.env.BLOB_READ_WRITE_TOKEN,
        storeId: process.env.BLOB_STORE_ID || 'Not configured'
      }
    }, { status: 500 })
  }
}