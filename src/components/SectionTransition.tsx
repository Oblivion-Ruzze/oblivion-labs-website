'use client'

import React from 'react'

interface SectionTransitionProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
}

const SectionTransition = ({ 
  children, 
  className = ''
}: SectionTransitionProps) => {
  // Simple wrapper without any animations - just passes through children
  return (
    <div className={className}>
      {children}
    </div>
  )
}

export default SectionTransition