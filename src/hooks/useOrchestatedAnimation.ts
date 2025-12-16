import { useEffect, useState } from 'react'
import { useAppStore } from '@/stores/useAppStore'

interface AnimationStep {
  id: string
  delay: number
  duration: number
  trigger?: () => void
  cleanup?: () => void
}

interface UseOrchestratedAnimationOptions {
  steps: AnimationStep[]
  autoStart?: boolean
  onComplete?: () => void
}

export const useOrchestratedAnimation = ({
  steps,
  autoStart = true,
  onComplete
}: UseOrchestratedAnimationOptions) => {
  const { animationsEnabled, addToAnimationQueue, removeFromAnimationQueue } = useAppStore()
  const [currentStep, setCurrentStep] = useState(-1)
  const [isRunning, setIsRunning] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set())

  const startAnimation = () => {
    if (!animationsEnabled || isRunning) return

    setIsRunning(true)
    setCurrentStep(0)
    setCompletedSteps(new Set())

    // Add all steps to animation queue
    steps.forEach(step => addToAnimationQueue(step.id))
  }

  const stopAnimation = () => {
    setIsRunning(false)
    setCurrentStep(-1)
    
    // Cleanup all steps
    steps.forEach(step => {
      step.cleanup?.()
      removeFromAnimationQueue(step.id)
    })
  }

  const skipToStep = (stepIndex: number) => {
    if (stepIndex < 0 || stepIndex >= steps.length) return
    
    setCurrentStep(stepIndex)
    
    // Mark previous steps as completed
    const newCompleted = new Set<string>()
    for (let i = 0; i < stepIndex; i++) {
      newCompleted.add(steps[i].id)
    }
    setCompletedSteps(newCompleted)
  }

  // Execute animation steps
  useEffect(() => {
    if (!isRunning || currentStep < 0 || currentStep >= steps.length) return

    const step = steps[currentStep]
    
    // Trigger the step
    const timeoutId = setTimeout(() => {
      step.trigger?.()
      
      // Mark step as completed
      setCompletedSteps(prev => new Set([...prev, step.id]))
      removeFromAnimationQueue(step.id)
      
      // Move to next step or complete
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1)
      } else {
        setIsRunning(false)
        onComplete?.()
      }
    }, step.delay)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [currentStep, isRunning, steps, onComplete, removeFromAnimationQueue])

  // Auto-start if enabled
  useEffect(() => {
    if (autoStart && animationsEnabled) {
      startAnimation()
    }
  }, [autoStart, animationsEnabled])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAnimation()
    }
  }, [])

  return {
    startAnimation,
    stopAnimation,
    skipToStep,
    currentStep,
    isRunning,
    completedSteps,
    progress: completedSteps.size / steps.length,
    isStepCompleted: (stepId: string) => completedSteps.has(stepId),
    isStepActive: (stepIndex: number) => currentStep === stepIndex
  }
}

// Predefined animation sequences
export const createStaggeredEntrance = (
  elements: string[],
  baseDelay = 0,
  staggerDelay = 100
): AnimationStep[] => {
  return elements.map((elementId, index) => ({
    id: `entrance-${elementId}`,
    delay: baseDelay + (index * staggerDelay),
    duration: 600,
    trigger: () => {
      const element = document.getElementById(elementId)
      if (element) {
        element.style.opacity = '1'
        element.style.transform = 'translateY(0)'
      }
    },
    cleanup: () => {
      const element = document.getElementById(elementId)
      if (element) {
        element.style.opacity = '0'
        element.style.transform = 'translateY(20px)'
      }
    }
  }))
}

export const createSequentialReveal = (
  selectors: string[],
  baseDelay = 0,
  stepDelay = 300
): AnimationStep[] => {
  return selectors.map((selector, index) => ({
    id: `reveal-${index}`,
    delay: baseDelay + (index * stepDelay),
    duration: 500,
    trigger: () => {
      const elements = document.querySelectorAll(selector)
      elements.forEach(element => {
        (element as HTMLElement).style.opacity = '1'
        ;(element as HTMLElement).style.transform = 'scale(1)'
      })
    },
    cleanup: () => {
      const elements = document.querySelectorAll(selector)
      elements.forEach(element => {
        (element as HTMLElement).style.opacity = '0'
        ;(element as HTMLElement).style.transform = 'scale(0.9)'
      })
    }
  }))
}