'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'glass-enhanced shadow-elegant' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <div className="relative">
                <Image 
                  src="/logo_full.svg" 
                  alt="Pisos Pró - Especialistas em Pisos de Madeira" 
                  width={400} 
                  height={200}
                  className={`h-16 w-auto transition-all duration-300 ${
                    scrolled ? '' : 'invert'
                  }`}
                  priority
                />
                {/* Logo glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-gold opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg blur-sm"></div>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/" scrolled={scrolled} data-track-id="nav-home">
              Início
            </NavLink>
            <NavLink href="/#portfolio" scrolled={scrolled} data-track-id="nav-portfolio">
              Portfólio
            </NavLink>
            <NavLink href="/#services" scrolled={scrolled} data-track-id="nav-services">
              Serviços
            </NavLink>
            {/* <NavLink href="/#products" scrolled={scrolled} data-track-id="nav-products">
              Produtos
            </NavLink> */}
            <NavLink href="/#about" scrolled={scrolled} data-track-id="nav-about">
              Sobre
            </NavLink>
            <Link 
              href="https://wa.me/5511940147157?text=Olá! Gostaria de solicitar um orçamento para pisos de madeira." 
              data-track-id="nav-quote" 
              className="ml-4 bg-gradient-gold text-wood-900 px-6 py-2.5 rounded-lg text-sm font-bold hover:scale-105 transition-all duration-300 shadow-soft hover:shadow-gold-400/25 flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                // Track WhatsApp quote click
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  (window as any).gtag('event', 'whatsapp_quote_click', {
                    event_category: 'engagement',
                    event_label: 'navbar_whatsapp_quote',
                    phone_number: '5511940147157'
                  });
                }
              }}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.382z"/>
              </svg>
              Orçamento ligue (11) 94014-7157
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              data-track-id="mobile-menu-toggle"
              className={`transition-colors duration-300 focus:outline-none ${
                scrolled ? 'text-wood-900 hover:text-wood-700' : 'text-white hover:text-gold-300'
              }`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden animate-slide-down">
            <div className="glass-enhanced mt-2 rounded-lg overflow-hidden">
              <div className="px-4 py-3 space-y-2">
                <MobileNavLink href="/" data-track-id="mobile-nav-home" onClick={() => setIsOpen(false)}>
                  Início
                </MobileNavLink>
                <MobileNavLink href="/#portfolio" data-track-id="mobile-nav-portfolio" onClick={() => setIsOpen(false)}>
                  Portfólio
                </MobileNavLink>
                <MobileNavLink href="/#services" data-track-id="mobile-nav-services" onClick={() => setIsOpen(false)}>
                  Serviços
                </MobileNavLink>
                <MobileNavLink href="/#products" data-track-id="mobile-nav-products" onClick={() => setIsOpen(false)}>
                  Produtos
                </MobileNavLink>
                <MobileNavLink href="/#about" data-track-id="mobile-nav-about" onClick={() => setIsOpen(false)}>
                  Sobre
                </MobileNavLink>
                <Link 
                  href="/#contact" 
                  data-track-id="mobile-nav-quote" 
                  onClick={() => setIsOpen(false)}
                  className="block bg-gradient-gold text-wood-900 px-4 py-3 rounded-lg text-base font-bold text-center hover:scale-105 transition-all duration-300 mt-4"
                >
                  Orçamento
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

// Desktop Navigation Link Component
function NavLink({ href, children, scrolled, ...props }: {
  href: string
  children: React.ReactNode
  scrolled: boolean
  [key: string]: any
}) {
  return (
    <Link 
      href={href} 
      {...props}
      className={`relative px-4 py-2 text-base font-medium transition-all duration-300 rounded-lg group ${
        scrolled 
          ? 'text-wood-900 hover:text-wood-700 hover:bg-wood-100' 
          : 'text-white hover:text-gold-300'
      }`}
    >
      {children}
      <div className={`absolute bottom-0 left-1/2 w-0 h-0.5 group-hover:w-3/4 transition-all duration-300 transform -translate-x-1/2 ${
        scrolled ? 'bg-wood-700' : 'bg-gold-400'
      }`}></div>
    </Link>
  )
}

// Mobile Navigation Link Component
function MobileNavLink({ href, children, onClick, ...props }: {
  href: string
  children: React.ReactNode
  onClick: () => void
  [key: string]: any
}) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      {...props}
      className="block text-wood-900 hover:text-wood-700 hover:bg-wood-100/50 px-3 py-2 text-lg font-medium rounded-lg transition-all duration-300"
    >
      {children}
    </Link>
  )
}