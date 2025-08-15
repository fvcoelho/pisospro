'use client'

import Image from 'next/image'

interface SpinningLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  showText?: boolean
  text?: string
  color?: 'white' | 'green' | 'blue' | 'gray'
}

const sizeMap = {
  sm: 'w-8 h-8',
  md: 'w-16 h-16', 
  lg: 'w-24 h-24',
  xl: 'w-32 h-32'
}

const colorMap = {
  white: 'filter brightness-0 invert',
  green: 'filter hue-rotate-90',
  blue: 'filter hue-rotate-180', 
  gray: 'filter grayscale'
}

export default function SpinningLogo({ 
  size = 'md', 
  className = '', 
  showText = false, 
  text = 'Carregando...',
  color = 'white'
}: SpinningLogoProps) {
  return (
    <div className={`text-center ${className}`}>
      {/* Spinning Logo */}
      <div className={`relative ${sizeMap[size]} mx-auto ${showText ? 'mb-4' : ''}`}>
        <div className="absolute inset-0 animate-spin">
          <Image
            src="/logo.svg"
            alt="Pisos Pró"
            width={128}
            height={128}
            className={`w-full h-full object-contain ${colorMap[color]}`}
            priority
          />
        </div>
      </div>

      {/* Optional Loading Text */}
      {showText && (
        <div className="text-center">
          <p className="font-montserrat text-sm tracking-widest uppercase text-current opacity-80">
            {text}
          </p>
        </div>
      )}
    </div>
  )
}