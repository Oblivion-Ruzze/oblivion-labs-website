import { useEffect, useRef } from 'react'

export const usePerformanceMonitor = () => {
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    console.log('Reduced motion preference:', mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      console.log('Reduced motion preference changed:', e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Performance monitoring utilities
  const measurePerformance = (name: string, fn: () => void) => {
    const start = performance.now()
    fn()
    const end = performance.now()
    
    if (end - start > 16.67) { // More than one frame at 60fps
      console.warn(`Performance warning: ${name} took ${end - start}ms`)
    }
  }

  const throttle = <T extends (...args: any[]) => void>(
    func: T,
    limit: number
  ): T => {
    let inThrottle: boolean
    return ((...args: any[]) => {
      if (!inThrottle) {
        func.apply(null, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }) as T
  }

  const debounce = <T extends (...args: any[]) => void>(
    func: T,
    delay: number
  ): T => {
    let timeoutId: NodeJS.Timeout
    return ((...args: any[]) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func.apply(null, args), delay)
    }) as T
  }

  return {
    measurePerformance,
    throttle,
    debounce,
  }
}