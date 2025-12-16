'use client'

import { useEffect } from 'react'


import SkipLinks from '@/components/SkipLinks'
import HeroSection from '@/components/HeroSection'
import AboutSection from '@/components/AboutSection'
import SkillsSection from '@/components/SkillsSection'
import ProjectsSection from '@/components/ProjectsSection'
import ServicesSection from '@/components/ServicesSection'
import ProcessSection from '@/components/ProcessSection'

import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

import { useSectionObserver } from '@/hooks/useSectionObserver'

import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor'
import { useAppStore } from '@/stores/useAppStore'

const sections = ['hero', 'about', 'skills', 'projects', 'services', 'process', 'contact']

export default function Home() {

  
  // Global section observer (only one observer for all sections)
  useSectionObserver(sections)
  

  
  // Initialize performance monitoring
  usePerformanceMonitor()

  // Initialize reduced motion preference
  useEffect(() => {
    // Initialize reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const setPrefersReducedMotion = useAppStore.getState().setPrefersReducedMotion
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return (
    <>
      <SkipLinks />
      <main id="main-content" className="relative safe-area min-h-screen">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ServicesSection />
        <ProcessSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}