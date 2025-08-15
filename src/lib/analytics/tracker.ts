// Simple analytics tracking library
let sessionId: string | null = null

// Check if current route should be tracked
function shouldTrack(): boolean {
  if (typeof window === 'undefined') return false
  
  // Skip tracking for admin routes
  const pathname = window.location.pathname
  if (pathname.startsWith('/admin')) {
    return false
  }
  
  return true
}

// Generate or retrieve session ID
function getSessionId(): string {
  if (sessionId) return sessionId
  
  // Check localStorage first
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('analytics_session_id')
    if (stored) {
      sessionId = stored
      return sessionId
    }
  }
  
  // Generate new session ID
  sessionId = generateId()
  
  if (typeof window !== 'undefined') {
    localStorage.setItem('analytics_session_id', sessionId)
  }
  
  return sessionId
}

// Generate unique ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Get basic session info
function getSessionInfo() {
  if (typeof window === 'undefined') return {}
  
  return {
    sessionId: getSessionId(),
    userAgent: navigator.userAgent,
    referrer: document.referrer || undefined,
    landingPage: window.location.pathname + window.location.search,
    // Additional client-side data
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    colorDepth: window.screen.colorDepth,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: navigator.language || navigator.languages?.[0]
  }
}

// Track page view
export async function trackPageView(page?: string, title?: string) {
  if (!shouldTrack()) return
  
  const pageUrl = page || window.location.pathname
  const pageTitle = title || document.title
  
  try {
    await fetch('/api/track/pageview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...getSessionInfo(),
        page: pageUrl,
        title: pageTitle
      })
    })
  } catch (error) {
    console.error('Failed to track page view:', error)
  }
}

// Track click event
export async function trackClick(element: HTMLElement, customData?: any) {
  if (!shouldTrack()) return
  
  // Extract element information
  const elementId = element.id || 
                   element.getAttribute('data-track-id') || 
                   element.getAttribute('data-id') ||
                   undefined
  
  const elementText = element.innerText?.trim() || 
                     element.textContent?.trim() || 
                     element.getAttribute('aria-label') ||
                     element.getAttribute('title') ||
                     undefined
  
  const elementType = element.tagName.toLowerCase()
  
  // Skip if no meaningful data
  if (!elementText && !elementId) return
  
  try {
    await fetch('/api/track/click', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...getSessionInfo(),
        page: window.location.pathname,
        elementId,
        elementText,
        elementType,
        ...customData
      })
    })
  } catch (error) {
    console.error('Failed to track click:', error)
  }
}

// Setup global click listener
export function setupGlobalTracking() {
  if (!shouldTrack()) return
  
  // Track initial page view
  trackPageView()
  
  // Track all clicks
  document.addEventListener('click', (event) => {
    const target = event.target as HTMLElement
    if (target) {
      trackClick(target)
    }
  }, { passive: true })
  
  // Track page visibility changes (for time tracking)
  let pageStartTime = Date.now()
  
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      const timeSpent = Math.round((Date.now() - pageStartTime) / 1000)
      // Update current page view with time spent
      updatePageViewTime(timeSpent)
    } else {
      pageStartTime = Date.now()
    }
  })
  
  // Track before page unload
  window.addEventListener('beforeunload', () => {
    const timeSpent = Math.round((Date.now() - pageStartTime) / 1000)
    updatePageViewTime(timeSpent)
  })
}

// Update page view with time spent
async function updatePageViewTime(timeSpent: number) {
  if (!shouldTrack() || timeSpent < 1) return // Ignore very short visits or admin routes
  
  try {
    await fetch('/api/track/pageview', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionId: getSessionId(),
        page: window.location.pathname,
        timeSpent
      })
    })
  } catch (error) {
    console.error('Failed to update page view time:', error)
  }
}

// Manual tracking functions for special cases
export const analytics = {
  trackEvent: (eventName: string, data?: any) => {
    if (!shouldTrack()) return
    
    const element = document.createElement('span')
    element.setAttribute('data-track-id', eventName)
    element.textContent = eventName
    
    trackClick(element, data)
  },
  
  identify: (userId: string, traits?: any) => {
    if (!shouldTrack()) return
    
    localStorage.setItem('analytics_user_id', userId)
    if (traits) {
      localStorage.setItem('analytics_user_traits', JSON.stringify(traits))
    }
  },
  
  getSessionId,
  trackPageView,
  trackClick
}