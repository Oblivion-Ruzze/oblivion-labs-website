import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { trackPageView, trackScrollDepth, trackTimeOnPage, trackEvent } from '@/lib/analytics'

export const useAnalytics = () => {
  const pathname = usePathname()

  useEffect(() => {
    // Track page view
    trackPageView(pathname)

    // Track time on page
    const cleanup = trackTimeOnPage()

    // Track scroll depth
    let maxScrollDepth = 0
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = Math.round((scrollTop / docHeight) * 100)
      
      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent
        
        // Track scroll milestones
        if ([25, 50, 75, 100].includes(scrollPercent)) {
          trackScrollDepth(scrollPercent)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      cleanup()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [pathname])

  // Return tracking functions for manual use
  return {
    trackEvent,
    trackPageView,
    trackScrollDepth
  }
}