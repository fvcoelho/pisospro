'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import SpinningLogo from '@/components/SpinningLogo'

// Carousel hook for managing image navigation
function useCarousel(totalImages: number) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalImages)
  }, [totalImages])

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages)
  }, [totalImages])

  const goToImage = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  return {
    currentIndex,
    nextImage,
    prevImage,
    goToImage,
    reset: () => setCurrentIndex(0)
  }
}

// Gradient colors for categories (can be expanded)
const categoryGradients = [
  'from-wood-400 to-wood-600',
  'from-gold-400 to-gold-600', 
  'from-blue-400 to-blue-600',
  'from-wood-300 to-wood-500',
  'from-neutral-300 to-neutral-500',
  'from-purple-400 to-purple-600',
  'from-red-400 to-red-600',
  'from-indigo-400 to-indigo-600',
  'from-teal-400 to-teal-600',
  'from-orange-400 to-orange-600'
]

interface Category {
  id: number
  name: string
  description: string | null
  slug: string
  imageUrl: string | null
}

interface GalleryImage {
  id: number
  title: string
  description: string | null
  imageUrl: string
  category: string | null
  fileType: string
  mimeType: string | null
  isActive: boolean
  createdAt: string
}

interface Project {
  id: number
  title: string
  description: string | null
  location: string | null
  category: string | null
  completedAt: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string
  galleryImages?: GalleryImage[]
}

// ProjectCard component with carousel capability
interface ProjectCardProps {
  project: Project
  onClick: (project: Project) => void
}

function ProjectCard({ project, onClick }: ProjectCardProps) {
  const images = project.galleryImages?.filter(img => img.isActive) || []
  const hasMultipleImages = images.length > 1
  const carousel = useCarousel(images.length)
  const videoRef = useRef<HTMLVideoElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  // Intersection observer for better video performance
  useEffect(() => {
    if (!cardRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        console.log('👁️ Intersection Observer triggered:', {
          isIntersecting: entry.isIntersecting,
          intersectionRatio: entry.intersectionRatio,
          projectTitle: project.title
        })
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.5 }
    )

    console.log('👁️ Setting up Intersection Observer for project:', project.title)
    observer.observe(cardRef.current)

    return () => {
      console.log('👁️ Disconnecting Intersection Observer for project:', project.title)
      observer.disconnect()
    }
  }, [])

  // Handle video autoplay when carousel changes
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current
      const currentImage = images[carousel.currentIndex]
      
      console.log('🎬 Portfolio ProjectCard video effect triggered:', {
        hasVideo: !!video,
        currentImageType: currentImage?.fileType,
        isInView,
        videoSrc: currentImage?.imageUrl,
        carouselIndex: carousel.currentIndex,
        totalImages: images.length
      })
      
      if (currentImage?.fileType === 'video' && isInView) {
        console.log('🎬 Setting up video autoplay for ProjectCard')
        
        // Force muted state like HeroVideo
        video.muted = true
        video.defaultMuted = true
        video.currentTime = 0
        
        console.log('🎬 Video state after setup:', {
          muted: video.muted,
          readyState: video.readyState,
          currentTime: video.currentTime
        })
        
        const handleCanPlay = () => {
          console.log('🎬 ProjectCard video canPlay event triggered')
          const playPromise = video.play()
          
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log('✅ Portfolio video autoplay successful')
              })
              .catch((error) => {
                console.log('❌ Portfolio autoplay failed:', error)
                // Try again on first user interaction like HeroVideo
                const handleFirstInteraction = () => {
                  console.log('🎬 User interaction detected, retrying video play')
                  video.muted = true
                  video.play().then(() => {
                    console.log('✅ Video play successful after user interaction')
                    document.removeEventListener('click', handleFirstInteraction)
                    document.removeEventListener('touchstart', handleFirstInteraction)
                  }).catch(console.error)
                }
                
                document.addEventListener('click', handleFirstInteraction, { once: true })
                document.addEventListener('touchstart', handleFirstInteraction, { once: true })
              })
          } else {
            console.log('⚠️ Video play() returned undefined')
          }
        }

        // Try to play immediately if video is ready
        if (video.readyState >= 3) { // HAVE_FUTURE_DATA
          console.log('🎬 Video ready immediately, attempting play')
          handleCanPlay()
        } else {
          console.log('🎬 Video not ready, waiting for canplay event')
          // Wait for video to be ready
          video.addEventListener('canplay', handleCanPlay, { once: true })
        }
      } else {
        if (currentImage?.fileType === 'video') {
          console.log('🎬 Pausing video - not in view or not current slide')
        }
        // Pause video if not current slide or not in view
        video.pause()
      }
    }

    return () => {
      // Cleanup: pause video when component unmounts or changes
      if (videoRef.current) {
        console.log('🎬 Cleanup: pausing ProjectCard video')
        videoRef.current.pause()
      }
    }
  }, [carousel.currentIndex, images, isInView])

  const getCategoryGradient = (category: string | null) => {
    switch (category) {
      case 'madeira': return 'from-wood-400 to-wood-600'
      case 'vinílico': return 'from-blue-400 to-blue-600'
      case 'laminado': return 'from-wood-300 to-wood-500'
      case 'acabamento': return 'from-gold-400 to-gold-600'
      case 'outros': return 'from-neutral-300 to-neutral-500'
      default: return 'from-green-400 to-green-600'
    }
  }

  const primaryCategory = project.category || null
  const gradient = getCategoryGradient(primaryCategory)

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger card click when clicking carousel controls
    if ((e.target as HTMLElement).closest('.carousel-control')) {
      return
    }
    onClick(project)
  }

  const handleCarouselNavigation = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation()
    action()
  }

  return (
    <div 
      ref={cardRef}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
      onClick={handleCardClick}
    >
      <div className={`h-56 bg-gradient-to-br ${gradient} flex items-center justify-center relative overflow-hidden`}>
        {images.length > 0 ? (
          <div className="relative w-full h-full">
            {/* Current Image/Video */}
            {images[carousel.currentIndex]?.fileType === 'video' ? (
              <video
                ref={videoRef}
                src={images[carousel.currentIndex]?.imageUrl}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                muted
                loop
                playsInline
                controls={false}
                preload="metadata"
              >
                Seu navegador não suporta o elemento de vídeo.
              </video>
            ) : (
              <img
                src={images[carousel.currentIndex]?.imageUrl}
                alt={images[carousel.currentIndex]?.title || project.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            )}
            
            {/* Carousel Controls - only show if multiple images */}
            {hasMultipleImages && (
              <>
                {/* Navigation Arrows */}
                <button
                  className="carousel-control absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={(e) => handleCarouselNavigation(e, carousel.prevImage)}
                  aria-label="Previous image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  className="carousel-control absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  onClick={(e) => handleCarouselNavigation(e, carousel.nextImage)}
                  aria-label="Next image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Dot Indicators */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      className={`carousel-control w-2 h-2 rounded-full transition-all duration-300 ${
                        index === carousel.currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
                      }`}
                      onClick={(e) => handleCarouselNavigation(e, () => carousel.goToImage(index))}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Image Counter */}
                <div className="absolute top-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  {carousel.currentIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        ) : (
          // Fallback gradient when no images
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent flex items-center justify-center">
            <div className="text-white/70 text-6xl">🏗️</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      
      <div className="p-6">
        <h3 className="font-cinzel text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
          {project.title}
        </h3>
        <p className="text-green-600 font-semibold text-sm mb-3">{project.location || 'Localização não informada'}</p>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description || 'Projeto de pisos profissional.'}</p>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {images.length > 0 && (
              <span className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full font-medium">
                {images.length} mídia{images.length !== 1 ? 's' : ''}
              </span>
            )}
            {project.completedAt && (
              <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                {new Date(project.completedAt).getFullYear()}
              </span>
            )}
          </div>
          <span className="text-green-600 text-sm font-medium group-hover:text-green-700">
            Ver Detalhes →
          </span>
        </div>
      </div>
    </div>
  )
}

// ProjectModal component with image carousel
interface ProjectModalProps {
  project: Project
  categories: Category[]
  onClose: () => void
}

function ProjectModal({ project, categories, onClose }: ProjectModalProps) {
  const images = project.galleryImages?.filter(img => img.isActive) || []
  const carousel = useCarousel(images.length)
  const modalVideoRef = useRef<HTMLVideoElement>(null)
  
  // Handle video autoplay when carousel changes in modal
  useEffect(() => {
    if (modalVideoRef.current) {
      const video = modalVideoRef.current
      const currentImage = images[carousel.currentIndex]
      
      console.log('🎭 Modal video effect triggered:', {
        hasVideo: !!video,
        currentImageType: currentImage?.fileType,
        videoSrc: currentImage?.imageUrl,
        carouselIndex: carousel.currentIndex,
        totalImages: images.length,
        projectTitle: project.title
      })
      
      if (currentImage?.fileType === 'video') {
        console.log('🎭 Setting up modal video autoplay')
        
        // Apply HeroVideo patterns: force muted state
        video.muted = true
        video.defaultMuted = true
        video.currentTime = 0
        
        console.log('🎭 Modal video state after setup:', {
          muted: video.muted,
          readyState: video.readyState,
          currentTime: video.currentTime,
          videoElement: video.tagName
        })
        
        const handleCanPlay = () => {
          console.log('🎭 Modal video canPlay event triggered')
          const playPromise = video.play()
          
          if (playPromise !== undefined) {
            playPromise
              .then(() => {
                console.log('✅ Modal video autoplay successful')
              })
              .catch((error) => {
                console.log('❌ Modal autoplay failed:', error)
                // Try again on first user interaction like HeroVideo
                const handleFirstInteraction = () => {
                  console.log('🎭 User interaction detected in modal, retrying video play')
                  video.muted = true
                  video.play().then(() => {
                    console.log('✅ Modal video play successful after user interaction')
                    document.removeEventListener('click', handleFirstInteraction)
                    document.removeEventListener('touchstart', handleFirstInteraction)
                    document.removeEventListener('keydown', handleFirstInteraction)
                  }).catch(console.error)
                }
                
                document.addEventListener('click', handleFirstInteraction, { once: true })
                document.addEventListener('touchstart', handleFirstInteraction, { once: true })
                document.addEventListener('keydown', handleFirstInteraction, { once: true })
              })
          } else {
            console.log('⚠️ Modal video play() returned undefined')
          }
        }

        // Try to play immediately if video is ready
        if (video.readyState >= 3) { // HAVE_FUTURE_DATA
          console.log('🎭 Modal video ready immediately, attempting play')
          handleCanPlay()
        } else {
          console.log('🎭 Modal video not ready, waiting for canplay event')
          // Wait for video to be ready
          video.addEventListener('canplay', handleCanPlay, { once: true })
        }
      } else {
        if (currentImage?.fileType !== 'video') {
          console.log('🎭 Current slide is not a video, pausing modal video')
        }
        // Pause video if not current slide
        video.pause()
      }
    } else {
      console.log('🎭 No modal video ref available')
    }

    return () => {
      // Cleanup: pause video when modal closes or changes
      if (modalVideoRef.current) {
        console.log('🎭 Cleanup: pausing modal video')
        modalVideoRef.current.pause()
      }
    }
  }, [carousel.currentIndex, images, project.title])
  
  const getCategoryGradient = (category: string | null) => {
    switch (category) {
      case 'madeira': return 'from-wood-400 to-wood-600'
      case 'vinílico': return 'from-blue-400 to-blue-600'
      case 'laminado': return 'from-wood-300 to-wood-500'
      case 'acabamento': return 'from-gold-400 to-gold-600'
      case 'outros': return 'from-neutral-300 to-neutral-500'
      default: return 'from-green-400 to-green-600'
    }
  }

  const primaryCategory = project.category || null
  const gradient = getCategoryGradient(primaryCategory)

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft' && images.length > 1) {
        carousel.prevImage()
      } else if (e.key === 'ArrowRight' && images.length > 1) {
        carousel.nextImage()
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [onClose, carousel, images.length])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-screen overflow-y-auto shadow-2xl">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="font-cinzel text-4xl font-bold text-gray-900">{project.title}</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-3xl transition-colors p-2"
            >
              ✕
            </button>
          </div>
          
          {/* Image Carousel Section */}
          <div className={`h-80 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center mb-8 relative overflow-hidden`}>
            {images.length > 0 ? (
              <div className="relative w-full h-full">
                {/* Current Image/Video */}
                {images[carousel.currentIndex]?.fileType === 'video' ? (
                  <video
                    ref={modalVideoRef}
                    src={images[carousel.currentIndex]?.imageUrl}
                    controls
                    autoPlay
                    muted
                    loop
                    className="w-full h-full object-cover rounded-2xl"
                    playsInline
                    preload="metadata"
                  >
                    Seu navegador não suporta o elemento de vídeo.
                  </video>
                ) : (
                  <img
                    src={images[carousel.currentIndex]?.imageUrl}
                    alt={images[carousel.currentIndex]?.title || project.title}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                )}
                
                {/* Navigation Controls for multiple images */}
                {images.length > 1 && (
                  <>
                    <button
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300"
                      onClick={carousel.prevImage}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300"
                      onClick={carousel.nextImage}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {/* Dot Indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === carousel.currentIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/70'
                          }`}
                          onClick={() => carousel.goToImage(index)}
                        />
                      ))}
                    </div>

                    {/* Image Counter */}
                    <div className="absolute top-4 right-4 bg-black/60 text-white text-sm px-3 py-1 rounded">
                      {carousel.currentIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>
            ) : (
              // Fallback when no images
              <div className="flex items-center justify-center text-white/70">
                <div className="text-center">
                  <div className="text-8xl mb-4">🏗️</div>
                  <p className="text-xl">Imagens em breve</p>
                </div>
              </div>
            )}
          </div>

          {/* Media thumbnails for multiple images/videos */}
          {images.length > 1 && (
            <div className="flex space-x-2 mb-8 overflow-x-auto">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 relative ${
                    index === carousel.currentIndex ? 'border-green-500' : 'border-transparent hover:border-gray-300'
                  }`}
                  onClick={() => carousel.goToImage(index)}
                >
                  {image.fileType === 'video' ? (
                    <>
                      <video
                        src={image.imageUrl}
                        className="w-full h-full object-cover"
                        muted
                        preload="metadata"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <div className="text-white text-xs">▶</div>
                      </div>
                    </>
                  ) : (
                    <img
                      src={image.imageUrl}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </button>
              ))}
            </div>
          )}
          
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-cinzel text-xl font-bold text-gray-900 mb-4">Detalhes do Projeto</h3>
              <p className="font-montserrat text-gray-600 mb-4 leading-relaxed">
                {project.description || 'Projeto profissional de pisos executado com excelência e atenção aos detalhes.'}
              </p>
              <div className="space-y-2">
                <p className="text-green-600 font-semibold">📍 {project.location || 'Localização não informada'}</p>
                {project.completedAt && (
                  <p className="text-blue-600 font-semibold">
                    📅 Concluído em {new Date(project.completedAt).toLocaleDateString('pt-BR')}
                  </p>
                )}
                <p className="text-purple-600 font-semibold">
                  🎬 {images.length} mídia{images.length !== 1 ? 's' : ''} disponível{images.length !== 1 ? 'is' : ''}
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="font-cinzel text-xl font-bold text-gray-900 mb-4">Categorias da Mídia</h3>
              {images.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {[...new Set(images.map(img => img.category))].filter(Boolean).map(category => (
                    <span key={category} className="inline-block bg-green-100 text-green-800 text-sm px-3 py-1 rounded-full font-medium">
                      {categories.find(cat => cat.slug === category || cat.name === category)?.name || category}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">Nenhuma categoria de mídia disponível</p>
              )}

              {/* Current media details if available */}
              {images[carousel.currentIndex] && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">
                    {images[carousel.currentIndex].fileType === 'video' ? 'Vídeo Atual:' : 'Imagem Atual:'}
                  </h4>
                  <p className="text-sm text-gray-700">{images[carousel.currentIndex].title}</p>
                  {images[carousel.currentIndex].description && (
                    <p className="text-sm text-gray-600 mt-1">{images[carousel.currentIndex].description}</p>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex gap-4">
            <a 
              href="/contact"
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 flex-1 text-center font-montserrat shadow-lg"
            >
              Iniciar Projeto Semelhante
            </a>
            <button 
              onClick={onClose}
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors font-montserrat"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PortfolioClient() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories')
      const data = await response.json()
      setCategories(data.categories || [])
    } catch (error) {
      console.error('❌ Error fetching categories:', error)
    }
  }

  const fetchProjects = async () => {
    try {
      console.log('📡 Fetching projects from API...')
      const response = await fetch('/api/projects?status=active')
      const data = await response.json()
      const projectsWithVideos = data.projects?.filter((p: Project) => 
        p.galleryImages?.some(img => img.fileType === 'video')
      ) || []
      
      console.log('📡 Projects fetched:')
      console.log('Total projects:', data.projects?.length || 0)
      console.log('Projects with videos:', projectsWithVideos.length)
      console.log('All projects:', data.projects?.map((p: Project) => ({
        id: p.id,
        title: p.title,
        galleryImagesCount: p.galleryImages?.length || 0,
        hasVideos: p.galleryImages?.some(img => img.fileType === 'video') || false,
        videoCount: p.galleryImages?.filter(img => img.fileType === 'video').length || 0,
        imageTypes: p.galleryImages?.map(img => img.fileType) || []
      })))
      
      if (projectsWithVideos.length > 0) {
        console.log('🎬 Projects with videos detailed:')
        projectsWithVideos.forEach((p: Project) => {
          const videos = p.galleryImages?.filter(img => img.fileType === 'video') || []
          console.log(`  ${p.title}:`, {
            videoCount: videos.length,
            videoUrls: videos.map(v => v.imageUrl)
          })
        })
      } else {
        console.log('⚠️ No projects with videos found. Check gallery images fileType field.')
      }
      setProjects(data.projects || [])
    } catch (error) {
      console.error('❌ Error fetching projects:', error)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await Promise.all([fetchCategories(), fetchProjects()])
      setLoading(false)
    }
    loadData()
  }, [])

  // Filter projects based on project categories
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => {
        // Match by category slug or name
        const selectedCat = categories.find(cat => cat.slug === selectedCategory)
        return project.category === selectedCategory || 
               project.category === selectedCat?.name ||
               project.category === selectedCat?.slug
      })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center">
        <div className="text-center">
          <SpinningLogo size="lg" color="green" className="mb-4" />
          <div className="font-montserrat text-2xl text-gray-700 mb-2">Carregando Portfólio</div>
          <div className="font-montserrat text-gray-500">Preparando nossos melhores projetos...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-green-900 via-green-800 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-cinzel text-5xl md:text-6xl lg:text-7xl mb-6 tracking-wider font-light">
            <span className="text-gradient-gold">
              Nosso Portfólio
            </span>
          </h1>
          <p className="font-montserrat text-xl md:text-2xl mb-8 font-light tracking-wide text-white/90 max-w-4xl mx-auto">
            Explore nossos projetos recentes e veja o artesanato de qualidade que fez da 
            Pisos Pró a escolha confiável para soluções em pisos premium
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {/* All Projects button */}
          <button
            onClick={() => setSelectedCategory('all')}
            className={`relative overflow-hidden px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === 'all'
                ? `bg-gradient-to-r from-green-400 to-green-600 text-white shadow-lg`
                : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-700 shadow-md hover:shadow-lg'
            }`}
          >
            <span className="relative z-10">Todos os Projetos</span>
            {selectedCategory === 'all' && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
            )}
          </button>
          
          {/* Dynamic category buttons */}
          {categories.map((category, index) => {
            const gradient = categoryGradients[index % categoryGradients.length]
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`relative overflow-hidden px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === category.slug
                    ? `bg-gradient-to-r ${gradient} text-white shadow-lg`
                    : 'bg-white text-gray-700 hover:bg-green-50 hover:text-green-700 shadow-md hover:shadow-lg'
                }`}
              >
                <span className="relative z-10">{category.name}</span>
                {selectedCategory === category.slug && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
                )}
              </button>
            )
          })}
        </div>

        {/* Project Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={setSelectedProject}
            />
          ))}
        </div>

        {/* Stats Section */}
        {/* <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl shadow-xl p-12 mb-16">
          <h2 className="font-cinzel text-4xl font-bold text-center text-gray-900 mb-12">
            Nossa Experiência em Números
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                1,000+
              </div>
              <div className="font-montserrat text-gray-700 font-medium">Projetos Concluídos</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold bg-gradient-to-r from-wood-500 to-wood-700 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                200k+
              </div>
              <div className="font-montserrat text-gray-700 font-medium">Metros Quadrados</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold bg-gradient-to-r from-gold-500 to-gold-700 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                98%
              </div>
              <div className="font-montserrat text-gray-700 font-medium">Satisfação do Cliente</div>
            </div>
            <div className="text-center group">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                15+
              </div>
              <div className="font-montserrat text-gray-700 font-medium">Anos de Experiência</div>
            </div>
          </div>
        </div> */}

        {/* CTA Section */}
        {/* <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-700 text-white rounded-2xl p-12 text-center shadow-2xl">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-gold">
              Pronto para Transformar seu Espaço?
            </span>
          </h2>
          <p className="font-montserrat text-xl md:text-2xl mb-8 font-light text-white/90 max-w-3xl mx-auto">
            Deixe-nos criar o projeto dos seus sonhos com a mesma excelência e dedicação 
            demonstradas em nosso portfólio
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/contact"
              className="group relative px-12 py-4 overflow-hidden bg-green-600 hover:bg-green-700 transition-colors duration-300 rounded font-montserrat font-semibold text-lg"
            >
              <span className="relative z-10">Iniciar seu Projeto</span>
            </a>
            <a 
              href="/services"
              className="group relative px-12 py-4 border-2 border-white text-white hover:bg-white hover:text-green-900 transition-all duration-300 rounded font-montserrat font-semibold text-lg"
            >
              <span className="relative z-10">Explorar Serviços</span>
            </a>
          </div>
        </div> */}

        {/* Project Detail Modal */}
        {selectedProject && (
          <ProjectModal 
            project={selectedProject}
            categories={categories} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </div>
    </div>
  )
}