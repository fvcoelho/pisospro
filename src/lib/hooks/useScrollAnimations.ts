'use client'

import { useEffect, useState } from 'react'

export function useScrollAnimations() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return scrollY
}

export function useIntersectionObserver(options = { threshold: 0.1 }) {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute('data-animate-id')
          if (id) {
            if (entry.isIntersecting) {
              setVisibleElements(prev => new Set([...prev, id]))
            }
          }
        })
      },
      options
    )

    // Observe all elements with data-animate-id
    const elements = document.querySelectorAll('[data-animate-id]')
    elements.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [options])

  const isVisible = (id: string) => visibleElements.has(id)

  return { isVisible, visibleElements }
}

export function useParallax(speed = 0.5) {
  const scrollY = useScrollAnimations()
  return scrollY * speed
}

// Smooth scroll to element
export function scrollToElement(elementId: string, offset = 0) {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

// Utility function to stagger animations
export function getStaggerDelay(index: number, baseDelay = 100) {
  return `${index * baseDelay}ms`
}