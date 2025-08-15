'use client'

import { useEffect, useState } from 'react'
import SpinningLogo from '@/components/SpinningLogo'

interface PreloadScreenProps {
  isLoading: boolean
  onComplete?: () => void
}

export default function PreloadScreen({ isLoading, onComplete }: PreloadScreenProps) {
  const [shouldShow, setShouldShow] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (!isLoading && shouldShow) {
      // Start fade out animation
      setIsAnimating(true)
      
      // Complete the transition after animation
      const timeout = setTimeout(() => {
        setShouldShow(false)
        onComplete?.()
      }, 500) // 500ms fade out duration

      return () => clearTimeout(timeout)
    }
  }, [isLoading, shouldShow, onComplete])

  if (!shouldShow) return null

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-green-900 via-green-800 to-green-700 transition-opacity duration-500 ${
        isAnimating ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        {/* Spinning Logo */}
        <div className="mb-8">
          <SpinningLogo size="xl" color="white" />
        </div>

        {/* Loading Text */}
        <div className="text-white">
          <h2 className="font-cinzel text-2xl md:text-3xl mb-4 tracking-wider font-light">
            Pisos Pró
          </h2>
          <div className="flex items-center justify-center space-x-2">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <p className="font-montserrat text-sm tracking-widest uppercase mt-4 text-white/80">
            Carregando...
          </p>
        </div>
      </div>
    </div>
  )
}