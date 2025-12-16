'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { trackEvent } from '@/lib/analytics'

function AdminLoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [attempts, setAttempts] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  const MAX_ATTEMPTS = 3
  const BLOCK_DURATION = 15 * 60 * 1000 // 15 minutes



  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user?.email === 'ruzze@oblivion.dev') {
        const redirectTo = searchParams.get('redirectedFrom') || '/admin'
        router.push(redirectTo)
      }
    }
    checkAuth()

    // Check if IP is blocked (simplified - in production use Redis or database)
    const blockData = localStorage.getItem('admin_login_block')
    if (blockData) {
      const { timestamp, attempts: storedAttempts } = JSON.parse(blockData)
      const timePassed = Date.now() - timestamp
      
      if (timePassed < BLOCK_DURATION && storedAttempts >= MAX_ATTEMPTS) {
        setIsBlocked(true)
        setError(`Too many failed attempts. Try again in ${Math.ceil((BLOCK_DURATION - timePassed) / 60000)} minutes.`)
      } else if (timePassed >= BLOCK_DURATION) {
        localStorage.removeItem('admin_login_block')
      } else {
        setAttempts(storedAttempts)
      }
    }
  }, [router, searchParams])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isBlocked) return

    setIsLoading(true)
    setError('')

    try {
      // Validate credentials against predefined admin credentials
      const adminUsername = 'Ruzze'
      const adminPassword = 'sAUnuaiX.123Gabriela'
      const adminEmail = 'ruzze@oblivion.dev'

      if (username !== adminUsername || password !== adminPassword) {
        const newAttempts = attempts + 1
        setAttempts(newAttempts)
        
        // Store failed attempts
        localStorage.setItem('admin_login_block', JSON.stringify({
          timestamp: Date.now(),
          attempts: newAttempts
        }))

        if (newAttempts >= MAX_ATTEMPTS) {
          setIsBlocked(true)
          setError(`Too many failed attempts. Access blocked for ${BLOCK_DURATION / 60000} minutes.`)
          
          // Track security event
          trackEvent('admin_login_blocked', {
            attempts: newAttempts,
            timestamp: new Date().toISOString()
          })
        } else {
          setError(`Invalid credentials. ${MAX_ATTEMPTS - newAttempts} attempts remaining.`)
        }
        
        // Track failed login attempt
        trackEvent('admin_login_failed', {
          username,
          attempts: newAttempts,
          timestamp: new Date().toISOString()
        })
        
        return
      }

      // If credentials are correct, sign in with Supabase
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: adminEmail,
        password: adminPassword
      })

      if (authError) {
        // If user doesn't exist, create admin user
        if (authError.message.includes('Invalid login credentials')) {
          const { error: signUpError } = await supabase.auth.signUp({
            email: adminEmail,
            password: adminPassword,
            options: {
              data: {
                username: adminUsername,
                role: 'admin'
              }
            }
          })

          if (signUpError) {
            setError('Failed to create admin account. Please contact support.')
            return
          }

          // Try signing in again
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email: adminEmail,
            password: adminPassword
          })

          if (signInError) {
            setError('Authentication failed. Please try again.')
            return
          }

          if (signInData.user) {
            // Clear failed attempts
            localStorage.removeItem('admin_login_block')
            
            // Track successful login
            trackEvent('admin_login_success', {
              username,
              timestamp: new Date().toISOString()
            })

            const redirectTo = searchParams.get('redirectedFrom') || '/admin'
            router.push(redirectTo)
          }
        } else {
          setError(authError.message)
        }
      } else if (data.user) {
        // Clear failed attempts
        localStorage.removeItem('admin_login_block')
        
        // Track successful login
        trackEvent('admin_login_success', {
          username,
          timestamp: new Date().toISOString()
        })

        const redirectTo = searchParams.get('redirectedFrom') || '/admin'
        router.push(redirectTo)
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-950 to-dark-950" />
      <div className="absolute inset-0 bg-gradient-to-bl from-accent-950/25 via-transparent to-primary-950/25" />
      
      <div className="relative z-10 max-w-md w-full">
        <div className="bg-dark-900/50 backdrop-blur-sm rounded-2xl border border-white/10 p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Access</h1>
            <p className="text-gray-400">Secure authentication required</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isBlocked}
                className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isBlocked}
                className="w-full px-4 py-3 bg-dark-800/50 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter password"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {attempts > 0 && !isBlocked && (
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-400 text-sm">
                Warning: {attempts} failed attempt{attempts > 1 ? 's' : ''}. {MAX_ATTEMPTS - attempts} remaining.
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || isBlocked}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all duration-200 ${
                isLoading || isBlocked
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 hover:scale-105 active:scale-95 shadow-lg shadow-primary-500/30'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Authenticating...</span>
                </div>
              ) : isBlocked ? (
                'Access Blocked'
              ) : (
                'Secure Login'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Authorized personnel only
            </p>
          </div>

          {/* Security Features */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <div className="text-xs text-gray-500 space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>SSL Encrypted</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Rate Limited</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Session Protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <AdminLoginForm />
    </Suspense>
  )
}