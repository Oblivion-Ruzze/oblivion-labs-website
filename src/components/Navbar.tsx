'use client'

import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { useAppStore } from '@/stores/useAppStore'
import { useTranslation } from '@/hooks/useTranslation'
import LanguageSwitcher from './LanguageSwitcher'
import type { NavItem } from '@/types'

const Navbar = () => {
  const { language } = useTranslation()
  const { 
    currentSection, 
    isMobileMenuOpen, 
    setMobileMenuOpen
  } = useAppStore()
  
  const [isScrolled, setIsScrolled] = useState(false)
  
  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 0
    setIsScrolled(scrolled)
  }, [])
  
  useEffect(() => {
    // Set initial state
    handleScroll()
    
    // Add scroll listener with immediate response
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const navItems: NavItem[] = useMemo(() => [
    { id: 'about', label: { en: 'About', es: 'Acerca' }, href: '#about', section: 'about' },
    { id: 'skills', label: { en: 'Technologies', es: 'Tecnologías' }, href: '#skills', section: 'skills' },
    { id: 'projects', label: { en: 'Projects', es: 'Proyectos' }, href: '#projects', section: 'projects' },
    { id: 'services', label: { en: 'Services', es: 'Servicios' }, href: '#services', section: 'services' },
    { id: 'process', label: { en: 'Process', es: 'Proceso' }, href: '#process', section: 'process' },
    { id: 'contact', label: { en: 'Contact', es: 'Contacto' }, href: '#contact', section: 'contact' },
  ], [])

  const handleScrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navbarHeight = 80
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - navbarHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setMobileMenuOpen(false)
  }, [setMobileMenuOpen])

  return (
    <header
      id="main-navbar-fixed"
      className="fixed top-0 left-0 right-0 w-full z-[9999]"
      style={{ 
        position: 'fixed',
        top: '0px',
        left: '0px',
        right: '0px',
        zIndex: 9999,
        width: '100%',
        maxWidth: '100vw',
        transform: 'none',
        backfaceVisibility: 'visible',
        perspective: 'none'
      }}
    >
      <nav 
        className="w-full transition-all duration-150 ease-out"
        style={{
          backgroundColor: isScrolled ? 'rgba(2, 6, 23, 0.9)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(16px)' : 'blur(0px)',
          boxShadow: isScrolled ? '0 10px 15px -3px rgba(217, 70, 239, 0.2)' : 'none',
          willChange: 'background-color, backdrop-filter, box-shadow'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <a 
                href="#hero" 
                onClick={(e) => {
                  e.preventDefault()
                  handleScrollToSection('hero')
                }}
                className="flex items-center space-x-3 text-white hover:text-primary-400 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <img 
                  src="/logo-icon.svg" 
                  alt="Oblivion" 
                  className={`h-10 lg:h-12 w-auto drop-shadow-lg transition-all duration-300 ${
                    isScrolled 
                      ? 'h-8 lg:h-10' 
                      : 'h-10 lg:h-12'
                  }`}
                  style={{ 
                    filter: 'invert(1) brightness(2)'
                  }}
                />
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navItems.map((item, index) => (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault()
                      handleScrollToSection(item.section)
                    }}
                    className={`px-3 py-2 text-sm font-medium transition-all duration-200 relative group hover:-translate-y-0.5 ${
                      currentSection === index + 1
                        ? 'text-primary-400'
                        : isScrolled 
                          ? 'text-gray-300 hover:text-white'
                          : 'text-white/90 hover:text-white drop-shadow-md'
                    }`}
                  >
                    {item.label[language]}
                    
                    {/* Active indicator */}
                    <div
                      className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full transition-transform duration-200 ${
                        currentSection === index + 1 ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                    
                    {/* Hover effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/30 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                  </a>
                ))}
              </div>
            </div>

            {/* Language Switcher & CTA */}
            <div className="hidden lg:flex items-center space-x-4">
              <LanguageSwitcher />

              <button
                onClick={() => handleScrollToSection('contact')}
                className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:from-primary-600 hover:to-accent-600 transition-all duration-200 shadow-lg shadow-primary-500/30 hover:scale-105 active:scale-95 hover:shadow-primary-500/50"
              >
                {language === 'en' ? 'Get Started' : 'Empezar'}
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className={`inline-flex items-center justify-center p-2 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white active:scale-95 ${
                  isScrolled 
                    ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                    : 'text-white/90 hover:text-white hover:bg-white/10 drop-shadow-md'
                }`}
                aria-expanded={isMobileMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span
                    className={`w-6 h-0.5 bg-current block transition-all duration-200 ${
                      isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                    }`}
                  />
                  <span
                    className={`w-6 h-0.5 bg-current block mt-1.5 transition-all duration-200 ${
                      isMobileMenuOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span
                    className={`w-6 h-0.5 bg-current block mt-1.5 transition-all duration-200 ${
                      isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`lg:hidden bg-dark-950/95 backdrop-blur-xl border-t border-white/10 shadow-lg transition-all duration-200 overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, index) => (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault()
                  handleScrollToSection(item.section)
                }}
                className={`block px-3 py-2 text-base font-medium transition-all duration-200 ${
                  currentSection === index + 1
                    ? 'text-primary-400 bg-gradient-to-r from-primary-400/10 to-accent-400/10'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                } rounded-md`}
              >
                {item.label[language]}
              </a>
            ))}
            
            {/* Mobile Language & CTA */}
            <div className="pt-4 pb-2 border-t border-white/10 mt-4">
              <div className="flex items-center justify-between px-3">
                <LanguageSwitcher />
                
                <button
                  onClick={() => handleScrollToSection('contact')}
                  className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-4 py-2 rounded-full text-sm font-medium active:scale-95 transition-transform duration-200"
                >
                  {language === 'en' ? 'Get Started' : 'Empezar'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Navbar