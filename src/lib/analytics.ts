import { supabase, PageView, ContactSubmission, UserSession } from './supabase'

// Generate unique session ID
export const generateSessionId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`
}

// Get or create session ID
export const getSessionId = (): string => {
  if (typeof window === 'undefined') return ''
  
  let sessionId = sessionStorage.getItem('portfolio_session_id')
  if (!sessionId) {
    sessionId = generateSessionId()
    sessionStorage.setItem('portfolio_session_id', sessionId)
  }
  return sessionId
}

// Detect device type
export const getDeviceType = (): 'desktop' | 'mobile' | 'tablet' => {
  if (typeof window === 'undefined') return 'desktop'
  
  const width = window.innerWidth
  if (width < 768) return 'mobile'
  if (width < 1024) return 'tablet'
  return 'desktop'
}

// Get user's IP and location (using a free service)
export const getUserLocation = async () => {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    return {
      ip: data.ip,
      country: data.country_name,
      city: data.city
    }
  } catch (error) {
    console.error('Error getting user location:', error)
    return { ip: 'unknown', country: 'unknown', city: 'unknown' }
  }
}

// Track page view
export const trackPageView = async (pagePath: string) => {
  if (typeof window === 'undefined') return

  try {
    // DISABLED: Analytics disabled until Supabase is properly configured
    console.log('Analytics tracking (page view):', pagePath)
    return
    
    const sessionId = getSessionId()
    
    // Check if Supabase is properly configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.log('Analytics tracking (page view):', pagePath)
      return
    }
    
    const location = await getUserLocation()
    
    const pageView: Omit<PageView, 'id'> = {
      page_path: pagePath,
      user_agent: navigator.userAgent,
      referrer: document.referrer || 'direct',
      ip_address: location.ip,
      country: location.country,
      city: location.city,
      device_type: getDeviceType(),
      session_id: sessionId,
      timestamp: new Date().toISOString()
    }

    // Insert page view
    const { error } = await supabase
      .from('page_views')
      .insert([pageView])

    if (error) {
      console.error('Error tracking page view:', error)
    }

    // Update or create user session
    await updateUserSession(sessionId, location)
    
  } catch (error) {
    console.error('Error in trackPageView:', error)
  }
}

// Update user session
const updateUserSession = async (sessionId: string, location: any) => {
  try {
    // Check if Supabase is properly configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      return
    }
    
    // Check if session exists
    const { data: existingSession } = await supabase
      .from('user_sessions')
      .select('*')
      .eq('session_id', sessionId)
      .single()

    if (existingSession) {
      // Update existing session
      const { error } = await supabase
        .from('user_sessions')
        .update({
          last_visit: new Date().toISOString(),
          page_views: existingSession.page_views + 1
        })
        .eq('session_id', sessionId)

      if (error) console.error('Error updating session:', error)
    } else {
      // Create new session
      const newSession: Omit<UserSession, 'id'> = {
        session_id: sessionId,
        first_visit: new Date().toISOString(),
        last_visit: new Date().toISOString(),
        page_views: 1,
        total_duration: 0,
        referrer: document.referrer || 'direct',
        country: location.country,
        city: location.city,
        device_type: getDeviceType(),
        converted: false
      }

      const { error } = await supabase
        .from('user_sessions')
        .insert([newSession])

      if (error) console.error('Error creating session:', error)
    }
  } catch (error) {
    console.error('Error in updateUserSession:', error)
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
    // DISABLED: Analytics disabled until Supabase is properly configured
    console.log('Analytics tracking (contact submission):', formData)
    return true
    
    // Check if Supabase is properly configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.log('Analytics tracking (contact submission):', formData)
      return true
    }
    
    const sessionId = getSessionId()
    const location = await getUserLocation()
    
    const submission: Omit<ContactSubmission, 'id'> = {
      ...formData,
      source_page: window.location.pathname,
      user_agent: navigator.userAgent,
      ip_address: location.ip,
      timestamp: new Date().toISOString(),
      status: 'pending'
    }

    // Insert contact submission
    const { error } = await supabase
      .from('contact_submissions')
      .insert([submission])

    if (error) {
      console.error('Error tracking contact submission:', error)
      return false
    }

    // Mark session as converted
    await supabase
      .from('user_sessions')
      .update({ converted: true })
      .eq('session_id', sessionId)

    return true
  } catch (error) {
    console.error('Error in trackContactSubmission:', error)
    return false
  }
}

// Track custom events
export const trackEvent = async (eventName: string, properties: Record<string, any> = {}) => {
  try {
    // DISABLED: Analytics disabled until Supabase is properly configured
    console.log('Analytics tracking (event):', eventName, properties)
    return
    
    // Check if Supabase is properly configured
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.log('Analytics tracking (event):', eventName, properties)
      return
    }
    
    const sessionId = getSessionId()
    
    const event = {
      session_id: sessionId,
      event_name: eventName,
      properties,
      timestamp: new Date().toISOString()
    }

    const { error } = await supabase
      .from('custom_events')
      .insert([event])

    if (error) {
      console.error('Error tracking custom event:', error)
    }
  } catch (error) {
    console.error('Error in trackEvent:', error)
  }
}

// Track scroll depth
export const trackScrollDepth = (depth: number) => {
  // Only track significant scroll milestones
  if ([25, 50, 75, 100].includes(depth)) {
    trackEvent('scroll_depth', { depth, page: window.location.pathname })
  }
}

// Track time on page
export const trackTimeOnPage = () => {
  const startTime = Date.now()
  
  const handleBeforeUnload = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000) // seconds
    trackEvent('time_on_page', { 
      duration: timeSpent, 
      page: window.location.pathname 
    })
  }

  window.addEventListener('beforeunload', handleBeforeUnload)
  
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload)
  }
}