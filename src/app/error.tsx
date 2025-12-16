'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Floating Astronaut */}
        <div className="relative mb-8">
          <div className="animate-float">
            <svg
              className="w-32 h-32 mx-auto text-purple-400"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              <circle cx="9" cy="9" r="1.5"/>
              <circle cx="15" cy="9" r="1.5"/>
              <path d="M12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
            </svg>
          </div>
          {/* Floating particles */}
          <div className="absolute -top-4 -left-4 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
          <div className="absolute -bottom-2 -right-6 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="absolute top-8 -right-8 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"></div>
        </div>

        {/* Error Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Houston, we have a problem!
            </h1>
            <p className="text-purple-200 text-lg">
              Something went wrong in the digital space
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20">
            <p className="text-purple-100 text-sm">
              Error: {error.message || 'An unexpected error occurred'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="px-6 py-3 bg-transparent border border-purple-500 hover:bg-purple-500/10 text-purple-300 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        `
      }} />
    </div>
  )
}