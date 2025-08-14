'use client'

import { useState } from 'react'

interface ProjectMedia {
  id: number
  title: string
  description: string | null
  mediaUrl: string
  mediaType: 'IMAGE' | 'VIDEO'
  displayOrder: number
  fileSize: number | null
  duration: number | null
  isCover: boolean
}

interface ProjectMediaGalleryProps {
  media: ProjectMedia[]
  className?: string
}

interface MediaModalProps {
  media: ProjectMedia | null
  onClose: () => void
}

function MediaModal({ media, onClose }: MediaModalProps) {
  if (!media) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="relative max-w-4xl w-full max-h-screen bg-white rounded-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full w-10 h-10 flex items-center justify-center z-10 transition-all duration-200"
        >
          ✕
        </button>
        
        <div className="relative">
          {media.mediaType === 'IMAGE' ? (
            <img
              src={media.mediaUrl}
              alt={media.title}
              className="w-full max-h-[80vh] object-contain bg-black"
            />
          ) : (
            <div className="bg-black">
              <video
                src={media.mediaUrl}
                controls
                autoPlay
                className="w-full max-h-[80vh] object-contain"
              />
            </div>
          )}
        </div>
        
        <div className="p-6 bg-white">
          <h3 className="font-cinzel text-2xl font-bold text-gray-900 mb-2">
            {media.title}
          </h3>
          {media.description && (
            <p className="font-montserrat text-gray-600 mb-4">
              {media.description}
            </p>
          )}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              media.mediaType === 'IMAGE' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-purple-100 text-purple-800'
            }`}>
              {media.mediaType}
            </span>
            {media.fileSize && (
              <span>{(media.fileSize / 1024 / 1024).toFixed(2)}MB</span>
            )}
            {media.duration && (
              <span>{media.duration}s</span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProjectMediaGallery({ media, className = '' }: ProjectMediaGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<ProjectMedia | null>(null)

  if (!media || media.length === 0) {
    return (
      <div className={`text-center py-12 text-gray-500 ${className}`}>
        <div className="text-4xl mb-4">📷</div>
        <p className="font-montserrat">Nenhuma mídia disponível para este projeto</p>
      </div>
    )
  }

  // Sort media with cover first, then by display order
  const sortedMedia = [...media].sort((a, b) => {
    if (a.isCover && !b.isCover) return -1
    if (!a.isCover && b.isCover) return 1
    return a.displayOrder - b.displayOrder
  })
  
  // Get primary media (cover or first one) for hero display
  const primaryMedia = sortedMedia.find(m => m.isCover) || sortedMedia[0]
  const thumbnailMedia = sortedMedia.filter(m => m.id !== primaryMedia?.id)

  return (
    <>
      <div className={`space-y-6 ${className}`}>
        {/* Primary Media Display */}
        <div className="relative">
          <div 
            className="aspect-video bg-gray-900 rounded-2xl overflow-hidden cursor-pointer group"
            onClick={() => setSelectedMedia(primaryMedia)}
          >
            {primaryMedia.mediaType === 'IMAGE' ? (
              <img
                src={primaryMedia.mediaUrl}
                alt={primaryMedia.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="relative w-full h-full">
                <video
                  src={primaryMedia.mediaUrl}
                  className="w-full h-full object-cover"
                  muted
                  poster={primaryMedia.mediaUrl}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300">
                  <div className="bg-white bg-opacity-90 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M8 5l6 5-6 5V5z"/>
                    </svg>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Media type indicator */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
              primaryMedia.mediaType === 'IMAGE' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-purple-100 text-purple-800'
            }`}>
              {primaryMedia.mediaType === 'IMAGE' ? '📷 Imagem' : '🎥 Vídeo'}
            </span>
            {primaryMedia.isCover && (
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                ⭐ Capa
              </span>
            )}
          </div>

          {/* Media count indicator */}
          {sortedMedia.length > 1 && (
            <div className="absolute top-4 right-4">
              <span className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm font-medium">
                {sortedMedia.length} mídias
              </span>
            </div>
          )}
          
          <div className="mt-4">
            <h3 className="font-cinzel text-xl font-bold text-gray-900 mb-2">
              {primaryMedia.title}
            </h3>
            {primaryMedia.description && (
              <p className="font-montserrat text-gray-600">
                {primaryMedia.description}
              </p>
            )}
          </div>
        </div>

        {/* Thumbnail Gallery for Additional Media */}
        {thumbnailMedia.length > 0 && (
          <div>
            <h4 className="font-cinzel text-lg font-semibold text-gray-900 mb-4">
              Mais Mídias ({thumbnailMedia.length})
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {thumbnailMedia.map((mediaItem) => (
                <div
                  key={mediaItem.id}
                  className="relative aspect-square bg-gray-900 rounded-lg overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300"
                  onClick={() => setSelectedMedia(mediaItem)}
                >
                  {mediaItem.mediaType === 'IMAGE' ? (
                    <img
                      src={mediaItem.mediaUrl}
                      alt={mediaItem.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <video
                        src={mediaItem.mediaUrl}
                        className="w-full h-full object-cover"
                        muted
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300">
                        <div className="bg-white bg-opacity-90 rounded-full p-2 group-hover:scale-110 transition-transform duration-300">
                          <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 5l6 5-6 5V5z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Media type indicator for thumbnails */}
                  <div className="absolute bottom-2 left-2">
                    <span className="text-white text-xs bg-black bg-opacity-70 px-2 py-1 rounded">
                      {mediaItem.mediaType === 'IMAGE' ? '📷' : '🎥'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Media Stats */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
          <h4 className="font-cinzel text-lg font-semibold text-gray-900 mb-4">
            Detalhes das Mídias
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                {sortedMedia.length}
              </div>
              <div className="font-montserrat text-gray-700 text-sm">Total de Mídias</div>
            </div>
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {sortedMedia.filter(m => m.mediaType === 'IMAGE').length}
              </div>
              <div className="font-montserrat text-gray-700 text-sm">Imagens</div>
            </div>
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                {sortedMedia.filter(m => m.mediaType === 'VIDEO').length}
              </div>
              <div className="font-montserrat text-gray-700 text-sm">Vídeos</div>
            </div>
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-gold-600 to-gold-800 bg-clip-text text-transparent">
                {sortedMedia
                  .reduce((total, m) => total + (m.fileSize || 0), 0)
                  .toFixed(0)}MB
              </div>
              <div className="font-montserrat text-gray-700 text-sm">Tamanho Total</div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for Media Preview */}
      <MediaModal 
        media={selectedMedia}
        onClose={() => setSelectedMedia(null)}
      />
    </>
  )
}