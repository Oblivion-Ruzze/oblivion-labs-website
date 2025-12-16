'use client'


import { useTranslation } from '@/hooks/useTranslation'

import SectionContainer from './SectionContainer'
import SkillCard from './SkillCard'

// Real skills data based on experience
const skillsData = [
  {
    id: 'html',
    name: 'HTML5',
    category: 'frontend' as const,
    proficiency: 95,
    yearsOfExperience: 4,
    color: '#E34F26',
    iconUrl: '/html5-svgrepo-com.svg'
  },
  {
    id: 'css',
    name: 'CSS3',
    category: 'frontend' as const,
    proficiency: 95,
    yearsOfExperience: 4,
    color: '#1572B6',
    iconUrl: '/css-3-svgrepo-com.svg'
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'frontend' as const,
    proficiency: 90,
    yearsOfExperience: 4,
    color: '#F7DF1E',
    iconUrl: '/js-svgrepo-com.svg'
  },
  {
    id: 'react',
    name: 'React',
    category: 'frontend' as const,
    proficiency: 85,
    yearsOfExperience: 1,
    color: '#61DAFB',
    iconUrl: '/react-svgrepo-com.svg'
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'frontend' as const,
    proficiency: 80,
    yearsOfExperience: 1,
    color: '#000000',
    iconUrl: '/next-js-svgrepo-com.svg'
  },
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    category: 'frontend' as const,
    proficiency: 90,
    yearsOfExperience: 1,
    color: '#06B6D4',
    iconUrl: '/tailwind-svgrepo-com.svg'
  },
  {
    id: 'astro',
    name: 'Astro',
    category: 'frontend' as const,
    proficiency: 70,
    yearsOfExperience: 1,
    color: '#FF5D01',
    iconUrl: '/astro-svgrepo-com.svg'
  },
  {
    id: 'express',
    name: 'Express.js',
    category: 'backend' as const,
    proficiency: 85,
    yearsOfExperience: 1,
    color: '#000000',
    iconUrl: '/express-svgrepo-com.svg'
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'backend' as const,
    proficiency: 85,
    yearsOfExperience: 1,
    color: '#339933',
    iconUrl: '/node-svgrepo-com.svg'
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'backend' as const,
    proficiency: 80,
    yearsOfExperience: 2,
    color: '#336791',
    iconUrl: '/postgresql.svg'
  },
  {
    id: 'python',
    name: 'Python',
    category: 'backend' as const,
    proficiency: 85,
    yearsOfExperience: 2,
    color: '#3776AB',
    iconUrl: '/python-svgrepo-com.svg'
  },
  {
    id: 'cpp',
    name: 'C++',
    category: 'backend' as const,
    proficiency: 75,
    yearsOfExperience: 2,
    color: '#00599C',
    iconUrl: '/c.svg'
  },
  {
    id: 'photoshop',
    name: 'Photoshop',
    category: 'design' as const,
    proficiency: 90,
    yearsOfExperience: 2,
    color: '#31A8FF',
    iconUrl: '/photoshop.svg'
  },
  {
    id: 'illustrator',
    name: 'Illustrator',
    category: 'design' as const,
    proficiency: 85,
    yearsOfExperience: 2,
    color: '#FF9A00',
    iconUrl: '/illustrator-svgrepo-com.svg'
  },
  {
    id: 'branding',
    name: 'Logo Design',
    category: 'design' as const,
    proficiency: 90,
    yearsOfExperience: 2,
    color: '#FF6B6B',
    iconUrl: '/design-education-learning-svgrepo-com.svg'
  },
  {
    id: 'git',
    name: 'Git',
    category: 'tools' as const,
    proficiency: 85,
    yearsOfExperience: 3,
    color: '#F05032',
    iconUrl: '/git-svgrepo-com.svg'
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'tools' as const,
    proficiency: 95,
    yearsOfExperience: 4,
    color: '#007ACC',
    iconUrl: '/vs-code-svgrepo-com.svg'
  }
]

const SkillsSection = () => {
  const { t } = useTranslation()


  const categories = {
    frontend: skillsData.filter(skill => skill.category === 'frontend'),
    backend: skillsData.filter(skill => skill.category === 'backend'),
    design: skillsData.filter(skill => skill.category === 'design'),
    tools: skillsData.filter(skill => skill.category === 'tools')
  }

  return (
    <SectionContainer sectionId="skills" className="bg-dark-800 relative">
      {/* Static background with hero-derived colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-800 via-dark-850 to-dark-900" />
      <div className="absolute inset-0 bg-gradient-to-l from-accent-950/20 via-transparent to-primary-950/20" />
      
      <div className="relative z-10 min-h-screen px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="gradient-text-static">
                {t.skills.title}
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.skills.subtitle}
            </p>
          </div>

          {/* Skills Grid */}
          <div className="space-y-12">
            {Object.entries(categories).map(([categoryName, skills]) => (
              skills.length > 0 && (
                <div key={categoryName}>
                  <h3 className="text-2xl font-semibold text-white mb-6">
                    {categoryName === 'frontend' ? t.skills.frontend :
                     categoryName === 'backend' ? t.skills.backend :
                     categoryName === 'design' ? t.skills.design :
                     categoryName === 'tools' ? t.skills.tools : categoryName}
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {skills.map((skill) => (
                      <SkillCard
                        key={skill.id}
                        skill={skill}
                      />
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold gradient-text-static mb-2">15+</div>
              <div className="text-gray-400">{t.skills.stats.technologies}</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text-static mb-2">4+</div>
              <div className="text-gray-400">{t.skills.stats.experience}</div>
            </div>
            <div>
              <div className="text-4xl font-bold gradient-text-static mb-2">3+</div>
              <div className="text-gray-400">{t.skills.stats.projects}</div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

export default SkillsSection