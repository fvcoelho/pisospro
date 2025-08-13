'use client'

import React, { createContext, useContext, useState } from 'react'

interface VideoContextType {
  isVideoReady: boolean
  setVideoReady: (ready: boolean) => void
}

const VideoContext = createContext<VideoContextType | undefined>(undefined)

export function VideoProvider({ children }: { children: React.ReactNode }) {
  const [isVideoReady, setIsVideoReady] = useState(false)

  const setVideoReady = (ready: boolean) => {
    setIsVideoReady(ready)
  }

  return (
    <VideoContext.Provider value={{ isVideoReady, setVideoReady }}>
      {children}
    </VideoContext.Provider>
  )
}

export function useVideo() {
  const context = useContext(VideoContext)
  if (context === undefined) {
    throw new Error('useVideo must be used within a VideoProvider')
  }
  return context
}