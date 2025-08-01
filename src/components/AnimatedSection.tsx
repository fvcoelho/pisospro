'use client'

import { useEffect, useState } from 'react'
import { useIntersectionObserver } from '@/lib/hooks/useScrollAnimations'

interface AnimatedSectionProps {
  children: React.ReactNode
  animation?: 'fade-in' | 'fade-in-up' | 'fade-in-down' | 'slide-in-left' | 'slide-in-right' | 'scale-in'
  delay?: number
  duration?: number
  threshold?: number
  className?: string
  id?: string
}

export default function AnimatedSection({
  children,
  animation = 'fade-in-up',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  className = '',
  id
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const animationId = id || `animated-${Math.random().toString(36).substr(2, 9)}`

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true)
            }, delay)
          }
        })
      },
      { threshold }
    )

    const element = document.querySelector(`[data-animate-id="${animationId}"]`)
    if (element) {
      observer.observe(element)
    }

    return () => observer.disconnect()
  }, [animationId, delay, threshold])

  const getAnimationClass = () => {
    const baseClasses = 'transition-all ease-out'
    const durationClass = `duration-${duration}`
    
    if (!isVisible) {
      switch (animation) {
        case 'fade-in':
          return `${baseClasses} ${durationClass} opacity-0`
        case 'fade-in-up':
          return `${baseClasses} ${durationClass} opacity-0 translate-y-8`
        case 'fade-in-down':
          return `${baseClasses} ${durationClass} opacity-0 -translate-y-8`
        case 'slide-in-left':
          return `${baseClasses} ${durationClass} opacity-0 -translate-x-8`
        case 'slide-in-right':
          return `${baseClasses} ${durationClass} opacity-0 translate-x-8`
        case 'scale-in':
          return `${baseClasses} ${durationClass} opacity-0 scale-95`
        default:
          return `${baseClasses} ${durationClass} opacity-0 translate-y-8`
      }
    }

    return `${baseClasses} ${durationClass} opacity-100 translate-y-0 translate-x-0 scale-100`
  }

  return (
    <div
      data-animate-id={animationId}
      className={`${getAnimationClass()} ${className}`}
    >
      {children}
    </div>
  )
}

// Staggered animation component for lists
export function StaggeredList({
  children,
  staggerDelay = 100,
  animation = 'fade-in-up',
  className = ''
}: {
  children: React.ReactNode[]
  staggerDelay?: number
  animation?: AnimatedSectionProps['animation']
  className?: string
}) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <AnimatedSection
          key={index}
          animation={animation}
          delay={index * staggerDelay}
          className="w-full"
        >
          {child}
        </AnimatedSection>
      ))}
    </div>
  )
}