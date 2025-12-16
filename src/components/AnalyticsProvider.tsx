'use client'

import { useAnalytics } from '@/hooks/useAnalytics'
import { useEffect } from 'react'

export default function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const { trackEvent } = useAnalytics()

  useEffect(() => {
    // Track initial page load
    trackEvent('page_load', {
      timestamp: new Date().toISOString(),
      user_agent: navigator.userAgent,
      screen_resolution: `${screen.width}x${screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`
    })

    // Track when user becomes active/inactive
    let isActive = true
    
    const handleVisibilityChange = () => {
      if (document.hidden && isActive) {
        trackEvent('page_blur', { timestamp: new Date().toISOString() })
        isActive = false
      } else if (!document.hidden && !isActive) {
        trackEvent('page_focus', { timestamp: new Date().toISOString() })
        isActive = true
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [trackEvent])

  return <>{children}</>
}