'use client'

import { useEffect } from 'react'
import { setupGlobalTracking } from '@/lib/analytics/tracker'

interface AnalyticsProviderProps {
  children: React.ReactNode
}

export default function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  useEffect(() => {
    // Setup global tracking when component mounts
    setupGlobalTracking()
  }, [])

  return <>{children}</>
}