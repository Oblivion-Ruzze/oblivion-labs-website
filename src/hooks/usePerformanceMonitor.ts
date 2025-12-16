import { useEffect, useRef } from 'react'
import { useAppStore } from '@/stores/useAppStore'

export const usePerformanceMonitor = () => {
  const { setFrameRate, setPrefersReducedMotion } = useAppStore()
  const frameCountRef = useRef(0)
  const lastTimeRef = useRef(performance.now())
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)

    // DISABLED: Frame rate monitoring for better performance
    // const measureFrameRate = () => {
    //   frameCountRef.current++
    //   const currentTime = performance.now()
    //   
    //   if (currentTime - lastTimeRef.current >= 1000) {
    //     const fps = Math.round((frameCountRef.current * 1000) / (currentTime - lastTimeRef.current))
    //     setFrameRate(fps)
    //     
    //     frameCountRef.current = 0
    //     lastTimeRef.current = currentTime
    //   }
    //   
    //   animationFrameRef.current = requestAnimationFrame(measureFrameRate)
    // }

    // animationFrameRef.current = requestAnimationFrame(measureFrameRate)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [setFrameRate, setPrefersReducedMotion])

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