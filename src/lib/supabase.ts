import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a mock client if environment variables are not set
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: () => Promise.resolve({ data: { user: null }, error: { message: 'Supabase not configured' } }),
        signOut: () => Promise.resolve({ error: null })
      },
      from: () => ({
        select: () => Promise.resolve({ data: [], error: null }),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => Promise.resolve({ data: null, error: null }),
        delete: () => Promise.resolve({ data: null, error: null })
      })
    } as any

// Types for our analytics data
export interface PageView {
  id?: string
  page_path: string
  user_agent: string
  referrer: string
  ip_address: string
  country?: string
  city?: string
  device_type: 'desktop' | 'mobile' | 'tablet'
  session_id: string
  timestamp: string
  duration?: number
}

export interface ContactSubmission {
  id?: string
  name: string
  email: string
  company?: string
  budget: string
  message: string
  source_page: string
  user_agent: string
  ip_address: string
  timestamp: string
  status: 'pending' | 'contacted' | 'converted'
}

export interface UserSession {
  id?: string
  session_id: string
  first_visit: string
  last_visit: string
  page_views: number
  total_duration: number
  referrer: string
  country?: string
  city?: string
  device_type: 'desktop' | 'mobile' | 'tablet'
  converted: boolean
}

export interface SEOMetrics {
  id?: string
  date: string
  organic_traffic: number
  keyword_rankings: Record<string, number>
  backlinks: number
  domain_authority: number
  page_speed_score: number
  core_web_vitals: {
    lcp: number
    fid: number
    cls: number
  }
}