'use client';

export interface UploadProgress {
  fileIndex: number;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
  message?: string;
}

export interface UploadConfig {
  uploadUrl: string;
  clientPayload: string;
  maxFiles: number;
  maxSize: number;
  allowedContentTypes: string[];
}

export interface BlobResult {
  url: string;
  pathname: string;
  size: number;
  downloadUrl: string;
}

class BlobUploadService {
  private baseUrl = '/api/gallery'; // Use the existing gallery API structure

  /**
   * Get upload configuration from the server
   */
  async getUploadToken(partnerId?: string, fileCount: number = 1): Promise<UploadConfig> {
    const response = await fetch(`${this.baseUrl}/blob/config`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        partnerId,
        fileCount,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to get upload config: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.error || 'Failed to get upload configuration');
    }

    return data.config;
  }

  /**
   * Upload files using the gallery API endpoint with enhanced logging
   */
  async uploadFiles(
    files: File[],
    config: UploadConfig,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<BlobResult[]> {
    const results: BlobResult[] = [];
    console.log('🚀 BlobUploadService: Starting upload of', files.length, 'files');

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const startTime = Date.now();
      
      try {
        console.log(`📤 BlobUploadService: Uploading file ${i + 1}/${files.length}:`, {
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
          type: file.type
        });

        onProgress?.({
          fileIndex: i,
          progress: 0,
          status: 'uploading',
          message: `Uploading ${file.name}...`,
        });

        // Upload via the gallery API endpoint with enhanced form data
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', file.name.replace(/\.[^/.]+$/, '')); // Remove extension for title
        formData.append('description', 'Uploaded via blob service');
        formData.append('category', 'blob-upload'); // Add category for tracking

        console.log('📡 BlobUploadService: Sending request to /api/gallery/upload');

        const response = await fetch('/api/gallery/upload', {
          method: 'POST',
          body: formData,
        });

        console.log('📥 BlobUploadService: Response received:', {
          status: response.status,
          statusText: response.statusText,
          ok: response.ok
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('❌ BlobUploadService: Upload failed with error:', errorText);
          throw new Error(`Upload failed: ${response.status} ${response.statusText} - ${errorText}`);
        }

        const data = await response.json();
        console.log('📋 BlobUploadService: Response data:', data);

        if (!data.success) {
          console.error('❌ BlobUploadService: API returned success=false:', data);
          throw new Error(data.error || 'Upload failed');
        }

        const uploadTime = Date.now() - startTime;
        console.log('✅ BlobUploadService: Upload completed successfully:', {
          file: file.name,
          uploadTime: `${uploadTime}ms`,
          blobUrl: data.blob.url,
          dbId: data.image?.id
        });

        const result: BlobResult = {
          url: data.blob.url,
          pathname: data.blob.pathname,
          size: data.blob.size,
          downloadUrl: data.blob.downloadUrl || data.blob.url,
        };

        results.push(result);

        onProgress?.({
          fileIndex: i,
          progress: 100,
          status: 'completed',
          message: `${file.name} uploaded successfully (${uploadTime}ms)`,
        });
      } catch (error) {
        const uploadTime = Date.now() - startTime;
        console.error('❌ BlobUploadService: Upload failed:', {
          file: file.name,
          uploadTime: `${uploadTime}ms`,
          error: error instanceof Error ? error.message : 'Unknown error'
        });

        onProgress?.({
          fileIndex: i,
          progress: 0,
          status: 'error',
          message: `Failed to upload ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
        throw error;
      }
    }

    console.log('🎉 BlobUploadService: All uploads completed:', {
      totalFiles: files.length,
      successfulUploads: results.length
    });

    return results;
  }

  /**
   * Upload a single file to Vercel Blob with metadata using the gallery API
   */
  async uploadGalleryImage(
    file: File,
    metadata: {
      title: string;
      description?: string;
      location?: string;
      category?: string;
    }
  ): Promise<{ blob: BlobResult; galleryImage: any }> {
    const startTime = Date.now();
    
    try {
      console.log('🖼️ BlobUploadService: Uploading gallery image:', {
        file: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)}MB`,
        title: metadata.title,
        category: metadata.category
      });

      // Upload via the gallery API endpoint
      const formData = new FormData();
      formData.append('file', file);
      formData.append('title', metadata.title);
      
      if (metadata.description) {
        formData.append('description', metadata.description);
      }
      if (metadata.location) {
        formData.append('location', metadata.location);
      }
      if (metadata.category) {
        formData.append('category', metadata.category);
      }

      console.log('📡 BlobUploadService: Sending gallery upload request...');

      const response = await fetch('/api/gallery/upload', {
        method: 'POST',
        body: formData,
      });

      console.log('📥 BlobUploadService: Gallery upload response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ BlobUploadService: Gallery upload failed:', errorText);
        throw new Error(`Upload failed: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      console.log('📋 BlobUploadService: Gallery upload data:', data);

      if (!data.success) {
        console.error('❌ BlobUploadService: Gallery API returned success=false:', data);
        throw new Error(data.error || 'Upload failed');
      }

      const uploadTime = Date.now() - startTime;
      console.log('✅ BlobUploadService: Gallery image uploaded successfully:', {
        file: file.name,
        uploadTime: `${uploadTime}ms`,
        blobUrl: data.blob.url,
        dbId: data.image?.id,
        title: data.image?.title
      });

      const blobResult: BlobResult = {
        url: data.blob.url,
        pathname: data.blob.pathname,
        size: data.blob.size,
        downloadUrl: data.blob.downloadUrl || data.blob.url,
      };

      return {
        blob: blobResult,
        galleryImage: data.image,
      };
    } catch (error) {
      const uploadTime = Date.now() - startTime;
      console.error('❌ BlobUploadService: Gallery upload error:', {
        file: file.name,
        uploadTime: `${uploadTime}ms`,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }
}

export const blobUploadService = new BlobUploadService();