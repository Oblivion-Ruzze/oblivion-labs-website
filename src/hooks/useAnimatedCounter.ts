import { useEffect, useState, useRef, useCallback } from 'react'

interface UseAnimatedCounterOptions {
  start?: number
  end: number
  duration?: number
  suffix?: string
  prefix?: string
}

export const useAnimatedCounter = ({
  start = 0,
  end,
  duration = 1000,
  suffix = '',
  prefix = ''
}: UseAnimatedCounterOptions) => {
  const [count, setCount] = useState(start)
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number>()
  const hasAnimated = useRef(false)
  const observerRef = useRef<IntersectionObserver>()

  // Optimized intersection observer
  useEffect(() => {
    if (!ref.current) return

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsInView(true)
        }
      },
      {
        threshold: 0.3,
        rootMargin: '50px'
      }
    )

    observerRef.current.observe(ref.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  // Optimized counter animation
  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true
      console.log(`Starting counter animation from ${start} to ${end}`)
      const startTime = performance.now()
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Eased animation for smoother feel
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        const currentCount = start + (end - start) * easeOutQuart
        
        setCount(Math.floor(currentCount))
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate)
        } else {
          console.log(`Counter animation completed: ${end}`)
        }
      }
      
      animationRef.current = requestAnimationFrame(animate)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isInView, start, end, duration])

  const formatNumber = useCallback((num: number) => {
    return `${prefix}${num}${suffix}`
  }, [prefix, suffix])

  return {
    ref,
    count: formatNumber(count),
    isAnimating: isInView && count < end
  }
}