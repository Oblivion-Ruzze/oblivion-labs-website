'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            {/* Broken Satellite */}
            <div className="relative mb-8">
              <div className="animate-float">
                <svg
                  className="w-32 h-32 mx-auto text-red-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                  <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
              </div>
              {/* Error sparks */}
              <div className="absolute -top-2 -left-4 w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
              <div className="absolute -bottom-2 -right-6 w-1 h-1 bg-orange-400 rounded-full animate-pulse"></div>
              <div className="absolute top-8 -right-8 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce"></div>
            </div>

            {/* Error Content */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  System Malfunction!
                </h1>
                <p className="text-red-200 text-lg">
                  A critical error has occurred in the matrix
                </p>
              </div>

              <div className="bg-red-900/20 backdrop-blur-sm rounded-lg p-4 border border-red-500/20">
                <p className="text-red-100 text-sm font-mono">
                  FATAL_ERROR: {error.message || 'Unknown system failure'}
                </p>
                {error.digest && (
                  <p className="text-red-300 text-xs mt-2">
                    Error ID: {error.digest}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={reset}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  Restart System
                </button>
                <button
                  onClick={() => window.location.href = '/'}
                  className="px-6 py-3 bg-transparent border border-red-500 hover:bg-red-500/10 text-red-300 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  Emergency Exit
                </button>
              </div>
            </div>
          </div>

          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes float {
                0%, 100% {
                  transform: translateY(0px) rotate(0deg);
                }
                50% {
                  transform: translateY(-15px) rotate(10deg);
                }
              }
              .animate-float {
                animation: float 2s ease-in-out infinite;
              }
            `
          }} />
        </div>
      </body>
    </html>
  )
}