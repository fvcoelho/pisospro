'use client'

import { useEffect, useRef, useState } from 'react'
import SpinningLogo from '@/components/SpinningLogo'

interface HeroVideoProps {
  src: string
  className?: string
  onVideoReady?: (canPlay: boolean) => void
}

export default function HeroVideo({ src, className = '', onVideoReady }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [canPlay, setCanPlay] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Force muted state
    video.muted = true
    video.defaultMuted = true

    const handleCanPlay = () => {
      console.log('Video can play (enough data buffered)')
      setCanPlay(true)
      onVideoReady?.(true)
      
      // Try to play the video as soon as we have enough data
      const playPromise = video.play()
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Video autoplay successful')
            setIsPlaying(true)
          })
          .catch((error) => {
            console.log('Autoplay failed:', error)
            // Try again on first user interaction
            const handleFirstInteraction = () => {
              video.play().then(() => {
                setIsPlaying(true)
                document.removeEventListener('click', handleFirstInteraction)
                document.removeEventListener('touchstart', handleFirstInteraction)
                document.removeEventListener('keydown', handleFirstInteraction)
              }).catch(console.error)
            }
            
            document.addEventListener('click', handleFirstInteraction, { once: true })
            document.addEventListener('touchstart', handleFirstInteraction, { once: true })
            document.addEventListener('keydown', handleFirstInteraction, { once: true })
          })
      }
    }

    const handlePlay = () => {
      console.log('Video started playing')
      setIsPlaying(true)
    }

    const handlePause = () => {
      console.log('Video paused')
      setIsPlaying(false)
    }

    const handleError = (e: Event) => {
      console.error('Video error:', e)
    }

    // Add event listeners
    video.addEventListener('canplay', handleCanPlay)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('error', handleError)

    // Cleanup
    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('error', handleError)
    }
  }, [])

  return (
    <>
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover ${className}`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        style={{ opacity: canPlay ? 1 : 0 }}
      >
        <source src="/intro-optimized.mp4" type="video/mp4" />
        <source src={src} type="video/mp4" />
        <source src="/intro.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      
      {/* Loading indicator */}
      {!canPlay && (
        <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-green-700 flex items-center justify-center">
          <div className="text-white text-center">
            <SpinningLogo size="sm" color="white" showText text="Carregando vídeo..." />
          </div>
        </div>
      )}

      {/* Play button if not playing */}
      {canPlay && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <button
            onClick={() => {
              const video = videoRef.current
              if (video) {
                video.muted = true
                video.play()
              }
            }}
            className="bg-white/20 backdrop-blur-sm rounded-full p-6 hover:bg-white/30 transition-all duration-300 group"
            aria-label="Play video"
          >
            <svg 
              className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      )}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      
      {/* Additional gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-transparent" />
    </>
  )
}