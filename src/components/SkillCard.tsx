'use client'


import { useState } from 'react'

interface SkillCardProps {
  skill: {
    id: string
    name: string
    category: 'frontend' | 'backend' | 'design' | 'tools'
    proficiency: number // 0-100
    yearsOfExperience: number
    iconUrl?: string
    color: string
  }
}

const SkillCard = ({ skill }: SkillCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const categoryColors = {
    frontend: 'from-blue-500 to-cyan-500',
    backend: 'from-green-500 to-emerald-500', 
    design: 'from-purple-500 to-pink-500',
    tools: 'from-orange-500 to-red-500'
  }

  const categoryIcons = {
    frontend: '🎨',
    backend: '⚙️',
    design: '✨',
    tools: '🔧'
  }

  return (
    <div
      className="relative group hover:scale-105 hover:-translate-y-2 transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 h-full overflow-hidden transition-all duration-300 hover:border-white/20 hover:bg-dark-800/70">
        
        {/* Background gradient effect */}
        <div className={`absolute inset-0 bg-gradient-to-br ${categoryColors[skill.category]} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
        
        {/* Technology icon/logo area */}
        <div className="flex items-center justify-center mb-4">
          <div 
            className="w-16 h-16 rounded-xl flex items-center justify-center p-3 transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: skill.color + '15', border: `2px solid ${skill.color}30` }}
          >
            {skill.iconUrl ? (
              <img 
                src={skill.iconUrl} 
                alt={skill.name}
                className="w-10 h-10 object-contain"
                style={{ filter: 'brightness(1.2)' }}
              />
            ) : (
              <div 
                className="w-8 h-8 rounded-lg"
                style={{ backgroundColor: skill.color }}
              />
            )}
          </div>
        </div>

        {/* Skill name */}
        <h3 className="text-xl font-semibold text-white text-center mb-2 group-hover:text-primary-400 transition-colors duration-300">
          {skill.name}
        </h3>

        {/* Category badge */}
        <div className="flex justify-center">
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${categoryColors[skill.category]} text-white`}>
            <span className="mr-1">{categoryIcons[skill.category]}</span>
            {skill.category}
          </div>
        </div>

        {/* Glow effect on hover */}
        <div
          className={`absolute inset-0 rounded-xl bg-gradient-to-r ${categoryColors[skill.category]} blur-xl -z-10 transition-opacity duration-300 ${
            isHovered ? 'opacity-20' : 'opacity-0'
          }`}
        />
      </div>
    </div>
  )
}

export default SkillCard