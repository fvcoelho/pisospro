import { NextResponse } from 'next/server';
import { list } from '@vercel/blob';

export async function GET() {
  try {
    const storeId = process.env.BLOB_STORE_ID;
    const baseUrl = process.env.BLOB_BASE_URL;
    const token = process.env.BLOB_READ_WRITE_TOKEN;

    if (!token) {
      return NextResponse.json({
        success: false,
        error: 'BLOB_READ_WRITE_TOKEN not configured',
        config: {
          token: false,
          storeId: storeId || 'Not configured',
          baseUrl: baseUrl || 'Not configured'
        }
      });
    }

    // Test the connection by listing existing blobs
    const { blobs } = await list({ token });

    return NextResponse.json({
      success: true,
      config: {
        storeId: storeId || 'Default',
        baseUrl: baseUrl || 'https://blob.vercel-storage.com',
        blobCount: blobs.length
      }
    });

  } catch (error: any) {
    console.error('Blob connection test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Unknown error',
      details: error.code || 'No error code',
      config: {
        token: !!process.env.BLOB_READ_WRITE_TOKEN,
        storeId: process.env.BLOB_STORE_ID || 'Not configured',
        baseUrl: process.env.BLOB_BASE_URL || 'Not configured'
      }
    }, { status: 500 });
  }
}