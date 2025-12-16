import { useEffect, useRef } from 'react'
import { useAppStore } from '@/stores/useAppStore'

const sectionMap: Record<string, number> = {
  'hero': 0,
  'about': 1,
  'skills': 2,
  'projects': 3,
  'services': 4,
  'process': 5,
  'contact': 6
}

export const useSectionObserver = (sections: string[]) => {
  const { setCurrentSection } = useAppStore()
  const ticking = useRef(false)
  const lastSectionIndex = useRef(-1)

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const viewportHeight = window.innerHeight
          const navbarHeight = 80
          
          let currentSectionIndex = 0
          let maxVisibleHeight = 0

          // Optimized calculation using getBoundingClientRect directly
          sections.forEach((sectionId) => {
            const element = document.getElementById(sectionId)
            if (!element) return

            const rect = element.getBoundingClientRect()
            
            // Calculate visible height in viewport (accounting for navbar)
            const visibleTop = Math.max(rect.top, navbarHeight)
            const visibleBottom = Math.min(rect.bottom, viewportHeight)
            const visibleHeight = Math.max(0, visibleBottom - visibleTop)
            
            // Calculate what percentage of viewport this section occupies
            const viewportPercentage = visibleHeight / (viewportHeight - navbarHeight)
            
            // If this section occupies 50% or more of viewport, and it's the most visible
            if (viewportPercentage >= 0.5 && visibleHeight > maxVisibleHeight) {
              maxVisibleHeight = visibleHeight
              const sectionIndex = sectionMap[sectionId]
              if (sectionIndex !== undefined) {
                currentSectionIndex = sectionIndex
              }
            }
          })

          // Only update if section actually changed
          if (currentSectionIndex !== lastSectionIndex.current) {
            setCurrentSection(currentSectionIndex)
            lastSectionIndex.current = currentSectionIndex
          }
          
          ticking.current = false
        })
        ticking.current = true
      }
    }

    // Initial check
    handleScroll()
    
    // Listen to scroll events with immediate response
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [sections, setCurrentSection])
}