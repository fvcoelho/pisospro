import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const { 
      title, 
      description, 
      location, 
      category, 
      imageUrl, 
      blobId 
    } = await request.json();

    // Validate required fields
    if (!title || !imageUrl || !blobId) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: title, imageUrl, and blobId are required' 
        },
        { status: 400 }
      );
    }

    // Save to database
    const galleryImage = await prisma.galleryImage.create({
      data: {
        title,
        description: description || null,
        location: location || null,
        category: category || null,
        imageUrl,
        publicId: blobId, // Store blob pathname as publicId for consistency
        isActive: true,
      }
    });

    return NextResponse.json({
      success: true,
      image: galleryImage
    });
  } catch (error) {
    console.error('Blob save error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to save image metadata' 
      },
      { status: 500 }
    );
  }
}