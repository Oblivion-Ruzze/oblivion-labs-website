'use client'

import { useAccessibility } from '@/hooks/useAccessibility'

const SkipLinks = () => {
  const { focusMainContent } = useAccessibility()

  return (
    <div className="skip-links">
      <a
        href="#main-content"
        onClick={(e) => {
          e.preventDefault()
          focusMainContent()
        }}
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md z-50 transition-all duration-200"
      >
        Skip to main content
      </a>
    </div>
  )
}

export default SkipLinks