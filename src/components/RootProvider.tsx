'use client'

import { useState, useEffect } from 'react'
import PreloadScreen from './PreloadScreen'
import AnalyticsProvider from './AnalyticsProvider'
import ConditionalLayout from './ConditionalLayout'
import { VideoProvider, useVideo } from '@/context/VideoContext'

interface RootProviderProps {
  children: React.ReactNode
}

function RootProviderInner({ children }: RootProviderProps) {
  const [isLoading, setIsLoading] = useState(true)
  const { isVideoReady } = useVideo()

  // For non-home pages, skip preloader
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      setIsLoading(false)
    }
  }, [])

  // When video is ready, hide preloader
  useEffect(() => {
    if (isVideoReady) {
      setIsLoading(false)
    }
  }, [isVideoReady])

  return (
    <>
      <PreloadScreen isLoading={isLoading} />
      <AnalyticsProvider>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </AnalyticsProvider>
    </>
  )
}

export default function RootProvider({ children }: RootProviderProps) {
  return (
    <VideoProvider>
      <RootProviderInner>
        {children}
      </RootProviderInner>
    </VideoProvider>
  )
}