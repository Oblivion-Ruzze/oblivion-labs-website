'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import AdminDashboard from '@/components/admin/AdminDashboard'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      const isValidAdmin = session?.user?.email === 'ruzze@oblivion.dev'
      setIsAuthenticated(isValidAdmin)
      setIsLoading(false)
      
      // If not authenticated, redirect to login
      if (!isValidAdmin) {
        window.location.href = '/admin/login'
      }
    }

    checkAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const isValidAdmin = session?.user?.email === 'ruzze@oblivion.dev'
      setIsAuthenticated(isValidAdmin)
      
      if (!isValidAdmin) {
        window.location.href = '/admin/login'
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-white">Verifying authentication...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {isAuthenticated ? <AdminDashboard /> : null}
    </div>
  )
}