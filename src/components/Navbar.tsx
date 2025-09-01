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
              href="/#contact" 
              data-track-id="nav-quote" 
              className="ml-4 bg-gradient-gold text-wood-900 px-6 py-2.5 rounded-lg text-sm font-bold hover:scale-105 transition-all duration-300 shadow-soft hover:shadow-gold-400/25"
            >
              Orçamento
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