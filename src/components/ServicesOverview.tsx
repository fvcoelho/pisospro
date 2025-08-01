'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const services = [
  {
    title: 'Instalação de Madeira',
    description: 'Instalação especializada de pisos de madeira premium com precisão artesanal e acabamento impecável.',
    icon: '🪵',
    href: '/services/hardwood',
    gradient: 'from-wood-400 to-wood-600',
    featured: true
  },
  {
    title: 'Restauração Premium',
    description: 'Restaure a beleza original dos seus pisos de madeira com técnicas profissionais de lixamento e envernizamento.',
    icon: '✨',
    href: '/services/refinishing',
    gradient: 'from-gold-400 to-gold-600',
    featured: true
  },
  {
    title: 'Piso Laminado',
    description: 'Opções de laminado de alta qualidade, acessíveis e duráveis para todos os ambientes residenciais.',
    icon: '📋',
    href: '/services/laminate',
    gradient: 'from-neutral-400 to-neutral-600',
    featured: false
  },
  {
    title: 'Vinílico Premium',
    description: 'Soluções impermeáveis em piso vinílico de luxo, ideais para áreas úmidas e alto tráfego.',
    icon: '💧',
    href: '/services/vinyl',
    gradient: 'from-wood-300 to-wood-500',
    featured: false
  },
  {
    title: 'Acabamentos Especiais',
    description: 'Rodapés, soleiras e acabamentos personalizados que complementam perfeitamente seu piso.',
    icon: '🎨',
    href: '/services/finishing',
    gradient: 'from-gold-300 to-gold-500',
    featured: false
  },
  {
    title: 'Consultoria Técnica',
    description: 'Orientação especializada para escolha do piso ideal considerando ambiente, uso e orçamento.',
    icon: '🎯',
    href: '/services/consulting',
    gradient: 'from-wood-500 to-wood-700',
    featured: false
  }
]

export default function ServicesOverview() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleCards(prev => [...prev, index])
          }
        })
      },
      { threshold: 0.1 }
    )

    const cards = document.querySelectorAll('.service-card')
    cards.forEach(card => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with wood grain */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 to-wood-50 wood-grain"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-wood-600 font-semibold text-sm uppercase tracking-wider bg-wood-100 px-4 py-2 rounded-full">
              Nossos Serviços
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-wood-900 mb-6">
            Soluções Completas em
            <span className="block text-gradient mt-2">Pisos de Madeira</span>
          </h2>
          <p className="text-xl text-wood-700 max-w-3xl mx-auto leading-relaxed">
            Da instalação à restauração, oferecemos expertise especializada 
            para transformar seu espaço com a beleza e durabilidade da madeira natural.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              data-index={index}
              className={`service-card group relative overflow-hidden rounded-2xl transition-all duration-700 hover-lift ${
                visibleCards.includes(index) ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'
              } ${service.featured ? 'md:col-span-1 lg:col-span-1' : ''}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Glass morphism background */}
              <div className="glass-enhanced h-full p-8 relative">
                {/* Gradient accent */}
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.gradient}`}></div>
                
                {/* Service icon with floating animation */}
                <div className="relative mb-6">
                  <div className="text-6xl mb-4 group-hover:animate-float transition-all duration-300">
                    {service.icon}
                  </div>
                  {service.featured && (
                    <div className="absolute -top-2 -right-2">
                      <span className="bg-gradient-gold text-wood-900 text-xs font-bold px-2 py-1 rounded-full">
                        DESTAQUE
                      </span>
                    </div>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-wood-900 mb-4 group-hover:text-wood-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-wood-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <Link 
                  href={service.href}
                  className="inline-flex items-center text-wood-700 font-semibold hover:text-wood-900 group-hover:translate-x-2 transition-all duration-300"
                >
                  Saiba Mais
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>

                {/* Hover overlay effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="glass-enhanced inline-block p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-wood-900 mb-4">
              Precisa de uma Solução Personalizada?
            </h3>
            <p className="text-wood-700 mb-6 max-w-md">
              Nossa equipe especializada está pronta para criar a solução perfeita para seu projeto.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/services"
                className="bg-gradient-wood text-white px-8 py-3 rounded-xl font-semibold hover:scale-105 transition-all duration-300 shadow-elegant"
              >
                Ver Todos os Serviços
              </Link>
              <Link 
                href="/contact"
                className="glass-enhanced text-wood-900 px-8 py-3 rounded-xl font-semibold hover:bg-white/50 transition-all duration-300 border-2 border-wood-200"
              >
                Solicitar Orçamento
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}