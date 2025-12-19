// Google Analytics and tracking utilities

// Generate unique session ID
export const getSessionId = (): string => {
  if (typeof window === 'undefined') return 'server-session'
  
  let sessionId = sessionStorage.getItem('session_id')
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`
    sessionStorage.setItem('session_id', sessionId)
  }
  return sessionId
}

// Get user location (simplified)
export const getUserLocation = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    return {
      ip: data.ip || 'unknown',
      country: data.country_name || 'unknown',
      city: data.city || 'unknown',
      region: data.region || 'unknown'
    }
  } catch (error) {
    console.error('Error getting user location:', error)
    return {
      ip: 'unknown',
      country: 'unknown',
      city: 'unknown',
      region: 'unknown'
    }
  }
}

// Track page views with Google Analytics
export const trackPageView = async (pagePath: string) => {
  if (typeof window === 'undefined') return

  try {
    // Google Analytics page view
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_path: pagePath,
      })
    }

    console.log('Page view tracked:', pagePath)
  } catch (error) {
    console.error('Error tracking page view:', error)
  }
}

// Track contact form submission (conversion)
export const trackContactSubmission = async (formData: {
  name: string
  email: string
  company?: string
  budget: string
  message: string
}) => {
  try {
    // Track conversion with Google Analytics
    trackEvent('contact_form_submission', {
      budget: formData.budget,
      has_company: !!formData.company,
      message_length: formData.message.length,
      conversion: true
    })
    
    console.log('Contact submission tracked:', {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      budget: formData.budget
    })
    
    return true
  } catch (error) {
    console.error('Error in trackContactSubmission:', error)
    return false
  }
}

// Track custom events with Google Analytics
export const trackEvent = (eventName: string, properties: Record<string, any> = {}) => {
  if (typeof window === 'undefined') return

  try {
    // Google Analytics event tracking
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', eventName, {
        event_category: properties.category || 'engagement',
        event_label: properties.label,
        value: properties.value,
        ...properties
      })
    }

    console.log('Event tracked:', eventName, properties)
  } catch (error) {
    console.error('Error tracking event:', error)
  }
}

// Track user engagement
export const trackEngagement = (action: string, details?: Record<string, any>) => {
  trackEvent('user_engagement', {
    action,
    ...details,
    timestamp: new Date().toISOString()
  })
}

// Track scroll depth
export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll_depth', {
    percentage,
    page: window.location.pathname
  })
}

// Track time on page
export const trackTimeOnPage = (seconds: number) => {
  trackEvent('time_on_page', {
    seconds,
    page: window.location.pathname,
    category: 'engagement'
  })
}

// Initialize analytics
export const initializeAnalytics = () => {
  if (typeof window === 'undefined') return

  // Track initial page view
  trackPageView(window.location.pathname)

  // Track scroll depth
  let maxScroll = 0
  const trackScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    )
    
    if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
      maxScroll = scrollPercent
      trackScrollDepth(scrollPercent)
    }
  }

  window.addEventListener('scroll', trackScroll, { passive: true })

  // Track time on page
  const startTime = Date.now()
  const trackTimeBeforeUnload = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000)
    trackTimeOnPage(timeSpent)
  }

  window.addEventListener('beforeunload', trackTimeBeforeUnload)

  console.log('Analytics initialized')
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}