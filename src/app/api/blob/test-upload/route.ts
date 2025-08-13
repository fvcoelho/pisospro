import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

export async function POST(request: NextRequest) {
  try {
    const { filename, content } = await request.json();

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({
        success: false,
        error: 'BLOB_READ_WRITE_TOKEN not configured'
      });
    }

    // Convert base64 content to buffer
    const buffer = Buffer.from(content, 'base64');
    
    // Upload test file to Vercel Blob
    const blob = await put(`test/${Date.now()}-${filename}`, buffer, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN,
      contentType: 'image/png'
    });

    return NextResponse.json({
      success: true,
      blob: {
        url: blob.url,
        pathname: blob.pathname,
        size: buffer.length
      }
    });

  } catch (error: any) {
    console.error('Test upload failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Upload failed',
      details: error.code || 'No error code'
    }, { status: 500 });
  }
}