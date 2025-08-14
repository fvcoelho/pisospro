'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import HeroVideo from './HeroVideo'
import { useVideo } from '@/context/VideoContext'

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { setVideoReady } = useVideo()

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const handleVideoReady = (canPlay: boolean) => {
    setVideoReady(canPlay)
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video Background */}
      <HeroVideo src="/intro.mp4" onVideoReady={handleVideoReady} />
      
      {/* Fallback gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-green-700 -z-10" />

      {/* Main Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-5xl mx-auto">
          <div className={`transition-all duration-1000 transform ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}>
            {/* Main Title */}
            <h1 className="font-cinzel text-5xl md:text-7xl lg:text-8xl mb-6 tracking-wider font-light text-white drop-shadow-lg">
              <span className="block text-gradient-gold">
                Conforto e segurança para cada passo
              </span>
            </h1>
            
            {/* Subtitle */}
            <p className="font-montserrat text-xl md:text-2xl mb-12 font-light tracking-wide text-white/90 drop-shadow">
              Transformamos ambientes com arte e precisão há mais de 15 anos
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/contact"
                className="group relative px-12 py-4 overflow-hidden bg-green-600 hover:bg-green-700 transition-colors duration-300 rounded"
              >
                <span className="relative z-10 font-montserrat text-sm tracking-widest uppercase text-white">
                  Solicitar Orçamento
                </span>
              </Link>

              <Link 
                href="/portfolio"
                className="font-montserrat text-sm tracking-widest uppercase text-white/90 hover:text-white transition-colors duration-300 border border-white/50 hover:border-white px-12 py-4 rounded"
              >
                Nossos Projetos
              </Link>
            </div>

            {/* Trust Indicators */}
            {/* <div className="mt-16 pt-8 border-t border-white/20">
              <div className="flex flex-wrap justify-center items-center gap-8 text-white/90">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <span className="font-montserrat text-sm">15+ Anos de Experiência</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🏆</span>
                  <span className="font-montserrat text-sm">1000+ Projetos Realizados</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✅</span>
                  <span className="font-montserrat text-sm">Garantia Total</span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center text-white/60 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
          <span className="font-montserrat text-xs mt-2 tracking-widest uppercase">Scroll</span>
        </div>
      </div>
    </section>
  )
}