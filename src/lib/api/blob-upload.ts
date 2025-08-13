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
   * Upload files using the gallery API endpoint
   */
  async uploadFiles(
    files: File[],
    config: UploadConfig,
    onProgress?: (progress: UploadProgress) => void
  ): Promise<BlobResult[]> {
    const results: BlobResult[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      try {
        onProgress?.({
          fileIndex: i,
          progress: 0,
          status: 'uploading',
          message: `Uploading ${file.name}...`,
        });

        // Upload via the gallery API endpoint
        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', file.name.replace(/\.[^/.]+$/, '')); // Remove extension for title
        formData.append('description', 'Uploaded via blob service');

        const response = await fetch('/api/gallery/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Upload failed');
        }

        const result: BlobResult = {
          url: data.blob.url,
          pathname: data.blob.pathname,
          size: data.blob.size,
          downloadUrl: data.blob.downloadUrl,
        };

        results.push(result);

        onProgress?.({
          fileIndex: i,
          progress: 100,
          status: 'completed',
          message: `${file.name} uploaded successfully`,
        });
      } catch (error) {
        onProgress?.({
          fileIndex: i,
          progress: 0,
          status: 'error',
          message: `Failed to upload ${file.name}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        });
        throw error;
      }
    }

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
    try {
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

      const response = await fetch('/api/gallery/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Upload failed');
      }

      const blobResult: BlobResult = {
        url: data.blob.url,
        pathname: data.blob.pathname,
        size: data.blob.size,
        downloadUrl: data.blob.downloadUrl,
      };

      return {
        blob: blobResult,
        galleryImage: data.image,
      };
    } catch (error) {
      console.error('Gallery upload error:', error);
      throw error;
    }
  }
}

export const blobUploadService = new BlobUploadService();