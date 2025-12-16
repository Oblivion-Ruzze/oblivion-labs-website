import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Lost Astronaut */}
        <div className="relative mb-8">
          <div className="animate-float">
            <svg
              className="w-32 h-32 mx-auto text-purple-400"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              <circle cx="8.5" cy="9" r="1"/>
              <circle cx="15.5" cy="9" r="1"/>
              <path d="M12 16c-1.48 0-2.75-.81-3.45-2H6.89c.8 2.04 2.78 3.5 5.11 3.5s4.31-1.46 5.11-3.5h-1.66c-.7 1.19-1.97 2-3.45 2z"/>
            </svg>
          </div>
          {/* Question marks floating */}
          <div className="absolute -top-2 -left-8 text-purple-400 text-2xl animate-bounce">?</div>
          <div className="absolute -bottom-4 -right-6 text-blue-400 text-lg animate-pulse">?</div>
          <div className="absolute top-4 -right-10 text-pink-400 text-xl animate-ping">?</div>
        </div>

        {/* 404 Content */}
        <div className="space-y-6">
          <div>
            <h1 className="text-6xl font-bold text-white mb-2">404</h1>
            <h2 className="text-2xl font-semibold text-purple-300 mb-2">
              Lost in Space
            </h2>
            <p className="text-purple-200">
              The page you're looking for has drifted into the void
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-purple-500/20">
            <p className="text-purple-100 text-sm">
              This page doesn't exist or has been moved to another dimension
            </p>
          </div>

          <Link
            href="/"
            className="inline-block px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Return to Earth
          </Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            50% {
              transform: translateY(-15px) rotate(5deg);
            }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
        `
      }} />
    </div>
  )
}