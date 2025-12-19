'use client'

import React from 'react'
import { useEffect } from 'react'
// import { motion } from 'framer-motion'
import { useAppContext } from '@/contexts/AppContext'
import type { Language } from '@/types'

const LanguageSwitcher = () => {
  const { language, setLanguage } = useAppContext()

  // Persist language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as Language
    if (savedLanguage && savedLanguage !== language) {
      setLanguage(savedLanguage)
    }
  }, [language, setLanguage])

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'es' : 'en'
    setLanguage(newLanguage)
    localStorage.setItem('preferred-language', newLanguage)
  }

  return (
    <div className="flex items-center gap-2">
      <span className={`text-sm font-medium transition-colors ${language === 'en' ? 'text-white' : 'text-gray-400'}`}>
        EN
      </span>
      
      <button
        onClick={toggleLanguage}
        className="relative w-12 h-6 bg-gray-600 rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-950 active:scale-95"
        style={{
          backgroundColor: language === 'es' ? '#d946ef' : '#4b5563'
        }}
      >
        <div
          className={`w-4 h-4 bg-white rounded-full shadow-md transition-transform duration-300 ${
            language === 'es' ? 'translate-x-6' : 'translate-x-0'
          }`}
        />
      </button>
      
      <span className={`text-sm font-medium transition-colors ${language === 'es' ? 'text-white' : 'text-gray-400'}`}>
        ES
      </span>
    </div>
  )
}

export default LanguageSwitcher