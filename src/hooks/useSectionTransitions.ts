import { useEffect } from 'react'
import { useAppStore } from '@/stores/useAppStore'

export const useSectionTransitions = () => {
  const { 
    currentSection, 
    scrollDirection, 
    isTransitioning, 
    setIsTransitioning,
    animationsEnabled,
    prefersReducedMotion
  } = useAppStore()

  // Handle section transition states
  useEffect(() => {
    if (isTransitioning) {
      // Set a timeout to reset transition state
      const timeout = setTimeout(() => {
        setIsTransitioning(false)
      }, 800) // Match animation duration

      return () => clearTimeout(timeout)
    }
    return undefined
  }, [isTransitioning, setIsTransitioning])

  // Get transition variants based on scroll direction and reduced motion preference
  const getTransitionVariants = (customDelay = 0) => {
    if (prefersReducedMotion || !animationsEnabled) {
      return {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { duration: 0.3, delay: customDelay }
        }
      }
    }

    const baseVariants = {
      hidden: {
        opacity: 0,
        y: scrollDirection === 'down' ? 50 : -50,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          delay: customDelay,
          ease: [0.25, 0.46, 0.45, 0.94],
        }
      }
    }

    return baseVariants
  }

  // Get staggered children variants for complex animations
  const getStaggeredVariants = (staggerDelay = 0.1) => {
    if (prefersReducedMotion || !animationsEnabled) {
      return {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
          }
        }
      }
    }

    return {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: 0.2,
        }
      }
    }
  }

  // Get child variants for staggered animations
  const getChildVariants = () => {
    if (prefersReducedMotion || !animationsEnabled) {
      return {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { duration: 0.3 }
        }
      }
    }

    return {
      hidden: {
        opacity: 0,
        y: 30,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }
      }
    }
  }

  return {
    currentSection,
    scrollDirection,
    isTransitioning,
    animationsEnabled,
    prefersReducedMotion,
    getTransitionVariants,
    getStaggeredVariants,
    getChildVariants,
  }
}