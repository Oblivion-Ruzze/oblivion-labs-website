'use client'

import React, { useRef } from 'react'

interface SectionContainerProps {
  children: React.ReactNode
  sectionId: string
  className?: string
  fullHeight?: boolean
}

const SectionContainer = ({ 
  children, 
  sectionId, 
  className = '', 
  fullHeight = true
}: SectionContainerProps) => {
  const sectionRef = useRef<HTMLElement>(null)

  // Section observation is handled globally by useSectionObserver hook

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      data-section-id={sectionId}
      className={`
        relative w-full safe-area overflow-x-hidden
        ${fullHeight ? 'min-h-screen' : 'min-h-[50vh]'}
        ${className}
      `}
      style={{ display: 'block' }}
    >
      {children}
    </section>
  )
}

export default SectionContainer