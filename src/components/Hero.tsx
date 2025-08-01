'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-wood">
      {/* Parallax Background Layers */}
      <div className="absolute inset-0">
        {/* Background Layer with Wood Texture */}
        <div 
          className="absolute inset-0 bg-wood-texture opacity-20"
          style={{
            transform: `translateY(${scrollY * 0.5}px)`,
          }}
        />
        
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-wood-700/90 via-wood-600/80 to-wood-500/70"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />
        
        {/* Floating Wood Particles */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gold-400/60 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                transform: `translateY(${scrollY * (0.1 + i * 0.02)}px)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          {/* Glass Morphism Container */}
          <div className="glass-enhanced mx-auto max-w-4xl p-8 md:p-12 animate-fade-in-up">
            <div className="mb-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight">
                Especialistas em
                <span className="block text-gradient-gold">
                  Pisos de Madeira
                </span>
              </h1>
              <div className="w-24 h-1 bg-gradient-gold mx-auto mb-6 rounded-full"></div>
            </div>
            
            <p className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-12 leading-relaxed font-light">
              Transformamos seu espaço com instalação, reforma e restauração de pisos de madeira premium. 
              <span className="block mt-2 text-gold-300 font-medium">
                Artesanato de excelência com mais de 25 anos de experiência em São Paulo.
              </span>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link 
                href="/contact" 
                data-track-id="hero-quote-button"
                className="group bg-gradient-gold text-wood-900 px-10 py-4 rounded-xl text-lg font-bold hover:scale-105 transition-all duration-300 shadow-elegant hover:shadow-gold-400/25 min-w-[200px]"
              >
                <span className="relative z-10">Orçamento Grátis</span>
                <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link 
                href="/portfolio" 
                data-track-id="hero-portfolio-button"
                className="group glass-enhanced text-white px-10 py-4 rounded-xl text-lg font-semibold hover:bg-white/30 transition-all duration-300 border-2 border-white/30 hover:border-white/50 min-w-[200px]"
              >
                Ver Nossos Trabalhos
                <span className="ml-2 group-hover:transform group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="flex flex-wrap justify-center items-center gap-8 text-white/80">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center">
                    <span className="text-gold-400">⭐</span>
                  </div>
                  <span className="text-sm font-medium">25+ Anos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center">
                    <span className="text-gold-400">🏆</span>
                  </div>
                  <span className="text-sm font-medium">5000+ Projetos</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gold-500/20 rounded-full flex items-center justify-center">
                    <span className="text-gold-400">✅</span>
                  </div>
                  <span className="text-sm font-medium">Garantia Total</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}