import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  try {
    const storeId = process.env.BLOB_STORE_ID || '';
    const baseUrl = process.env.BLOB_BASE_URL || '';
    const token = process.env.BLOB_READ_WRITE_TOKEN || '';
    
    const isConfigured = !!(storeId && baseUrl && token);
    
    return NextResponse.json({
      success: true,
      config: {
        storeId: storeId || 'Not configured',
        baseUrl: baseUrl || 'Not configured',
        isConfigured
      }
    });
  } catch (error) {
    console.error('Failed to get blob config:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to get configuration' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { partnerId, fileCount } = await request.json();

    // Validate environment variables
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Blob storage not configured properly. Missing BLOB_READ_WRITE_TOKEN.' 
        },
        { status: 500 }
      );
    }

    // Return upload configuration
    const config = {
      uploadUrl: process.env.BLOB_BASE_URL || 'https://blob.vercel-storage.com',
      clientPayload: JSON.stringify({ partnerId }),
      maxFiles: Math.max(1, Math.min(fileCount || 1, 10)), // Limit to 10 files max
      maxSize: 10 * 1024 * 1024, // 10MB max file size
      allowedContentTypes: [
        'image/jpeg',
        'image/jpg', 
        'image/png',
        'image/webp',
        'image/gif'
      ]
    };

    return NextResponse.json({
      success: true,
      config
    });
  } catch (error) {
    console.error('Blob config error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to get upload configuration' 
      },
      { status: 500 }
    );
  }
}