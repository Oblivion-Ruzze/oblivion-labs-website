import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Language, AnimationState } from '@/types'

interface AppState extends AnimationState {
  // Language state
  language: Language
  setLanguage: (language: Language) => void
  
  // Navigation state
  setCurrentSection: (section: number) => void
  
  // Project state
  setSelectedProject: (projectId: string | null) => void
  setProjectPanelVisible: (visible: boolean) => void
  
  // Animation state
  setAnimationsEnabled: (enabled: boolean) => void
  
  // Menu state (mobile)
  isMobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  
  // Performance monitoring
  frameRate: number
  setFrameRate: (fps: number) => void
  
  // Animation queue for complex sequences
  animationQueue: string[]
  addToAnimationQueue: (animationId: string) => void
  removeFromAnimationQueue: (animationId: string) => void
  clearAnimationQueue: () => void
  
  // Reduced motion preference
  prefersReducedMotion: boolean
  setPrefersReducedMotion: (prefers: boolean) => void
}

export const useAppStore = create<AppState>()(
  devtools(
    (set, get) => ({
      // Initial state
      language: 'en',
      currentSection: 0,
      isTransitioning: false,
      selectedProject: null,
      projectPanelVisible: false,
      scrollDirection: 'down',
      animationsEnabled: true,
      isMobileMenuOpen: false,
      frameRate: 60,
      animationQueue: [],
      prefersReducedMotion: false,
      
      // Actions
      setLanguage: (language) => set({ language }),
      setCurrentSection: (currentSection) => set({ currentSection }),
      setIsTransitioning: (isTransitioning: boolean) => set({ isTransitioning }),
      setScrollDirection: (scrollDirection: 'up' | 'down') => set({ scrollDirection }),
      setSelectedProject: (selectedProject) => set({ selectedProject }),
      setProjectPanelVisible: (projectPanelVisible) => set({ projectPanelVisible }),
      setAnimationsEnabled: (animationsEnabled) => {
        // Automatically disable animations if reduced motion is preferred
        const { prefersReducedMotion } = get()
        set({ animationsEnabled: prefersReducedMotion ? false : animationsEnabled })
      },
      setMobileMenuOpen: (isMobileMenuOpen) => set({ isMobileMenuOpen }),
      
      // Performance monitoring
      setFrameRate: (frameRate) => {
        set({ frameRate })
        // Automatically disable animations if performance is poor
        if (frameRate < 30) {
          set({ animationsEnabled: false })
        }
      },
      
      // Animation queue management
      addToAnimationQueue: (animationId) => {
        const { animationQueue } = get()
        if (!animationQueue.includes(animationId)) {
          set({ animationQueue: [...animationQueue, animationId] })
        }
      },
      removeFromAnimationQueue: (animationId) => {
        const { animationQueue } = get()
        set({ animationQueue: animationQueue.filter(id => id !== animationId) })
      },
      clearAnimationQueue: () => set({ animationQueue: [] }),
      
      // Reduced motion preference
      setPrefersReducedMotion: (prefersReducedMotion) => {
        set({ prefersReducedMotion })
        if (prefersReducedMotion) {
          set({ animationsEnabled: false })
        }
      },
    }),
    {
      name: 'oblivion-app-store',
    }
  )
)