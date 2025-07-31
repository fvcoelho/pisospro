'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Image 
                src="/logo.svg" 
                alt="Pisos Pró - Venda & Instalação" 
                width={400} 
                height={200}
                className="h-16 w-auto"
                priority
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" data-track-id="nav-home" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Início
            </Link>
            <Link href="/services" data-track-id="nav-services" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Serviços
            </Link>
            <Link href="/products" data-track-id="nav-products" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Produtos
            </Link>
            <Link href="/portfolio" data-track-id="nav-portfolio" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Portfólio
            </Link>
            <Link href="/about" data-track-id="nav-about" className="text-gray-900 hover:text-blue-600 px-3 py-2 text-sm font-medium">
              Sobre
            </Link>
            <Link href="/contact" data-track-id="nav-quote" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Orçamento
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              data-track-id="mobile-menu-toggle"
              className="text-gray-900 hover:text-blue-600 focus:outline-none focus:text-blue-600"
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <Link href="/" data-track-id="mobile-nav-home" className="block text-gray-900 hover:text-blue-600 px-3 py-2 text-base font-medium">
                Início
              </Link>
              <Link href="/services" data-track-id="mobile-nav-services" className="block text-gray-900 hover:text-blue-600 px-3 py-2 text-base font-medium">
                Serviços
              </Link>
              <Link href="/products" data-track-id="mobile-nav-products" className="block text-gray-900 hover:text-blue-600 px-3 py-2 text-base font-medium">
                Produtos
              </Link>
              <Link href="/portfolio" data-track-id="mobile-nav-portfolio" className="block text-gray-900 hover:text-blue-600 px-3 py-2 text-base font-medium">
                Portfólio
              </Link>
              <Link href="/about" data-track-id="mobile-nav-about" className="block text-gray-900 hover:text-blue-600 px-3 py-2 text-base font-medium">
                Sobre
              </Link>
              <Link href="/contact" data-track-id="mobile-nav-quote" className="block bg-blue-600 text-white px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700 mx-3">
                Orçamento
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}