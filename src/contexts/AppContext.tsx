'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import type { Language } from '@/types'

interface AppContextType {
  language: Language
  setLanguage: (lang: Language) => void
  isMobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en')
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <AppContext.Provider value={{
      language,
      setLanguage,
      isMobileMenuOpen,
      setMobileMenuOpen
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider')
  }
  return context
}