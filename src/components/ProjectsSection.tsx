'use client'

import { useState } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from '@/hooks/useTranslation'
import SectionContainer from './SectionContainer'

interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  image: string
  icon: string
  category: 'web' | 'mobile' | 'desktop'
  featured: boolean
  links: {
    demo?: string
    github?: string
    live?: string
  }
}



const ProjectsSection = () => {
  const { t } = useTranslation()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)


  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
  }

  const handleCloseProject = () => {
    setSelectedProject(null)
  }

  return (
    <SectionContainer sectionId="projects" className="bg-dark-900 relative">
      {/* Static background with hero-derived colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-900 to-dark-800" />
      <div className="absolute inset-0 bg-gradient-to-tl from-secondary-950/20 via-transparent to-accent-950/20" />
      
      <div className="relative z-10 min-h-screen px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="gradient-text-static">
                {t.projects.title}
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.projects.subtitle}
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.sampleProjects.map((project) => (
              <div
                key={project.id}
                className="group cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                <div className="relative bg-dark-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 hover:border-primary-500/50 transition-all duration-300 hover:transform hover:scale-105">
                  {/* Project Icon/Image */}
                  <div className="relative mb-6 overflow-hidden rounded-xl">
                    <div className="aspect-video bg-gradient-to-br from-primary-900/20 to-secondary-900/20 flex items-center justify-center text-6xl transition-transform duration-300 group-hover:scale-110">
                      {project.icon}
                    </div>
                    
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white font-medium">{t.common.viewProject}</span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <span className="px-2 py-1 text-xs font-medium bg-primary-500/20 text-primary-400 rounded-full">
                          {t.common.featured}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-400 text-sm line-clamp-3">
                      {project.description}
                    </p>
                    
                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 text-xs bg-dark-700/50 text-gray-300 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-dark-700/50 text-gray-400 rounded-md">
                          +{project.technologies.length - 3} {t.common.moreItems}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/90 backdrop-blur-sm opacity-100 transition-opacity duration-300"
          onClick={handleCloseProject}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-dark-800 rounded-2xl border border-gray-700 scale-100 opacity-100 transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
              {/* Close Button */}
              <button
                onClick={handleCloseProject}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-dark-700/80 hover:bg-dark-600 rounded-full text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>

              {/* Project Content */}
              <div className="p-8">
                {/* Header */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-4xl">{selectedProject.icon}</div>
                    <div>
                      <h2 className="text-3xl font-bold text-white mb-2">
                        {selectedProject.title}
                      </h2>
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 text-sm bg-primary-500/20 text-primary-400 rounded-full capitalize">
                          {selectedProject.category === 'web' ? t.projects.web :
                           selectedProject.category === 'mobile' ? t.projects.mobile :
                           selectedProject.category === 'desktop' ? t.projects.desktop : selectedProject.category}
                        </span>
                        {selectedProject.featured && (
                          <span className="px-3 py-1 text-sm bg-secondary-500/20 text-secondary-400 rounded-full">
                            {t.common.featured}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">{t.common.aboutProject}</h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Technologies */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-white mb-4">{t.common.technologiesUsed}</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 bg-dark-700/50 text-gray-300 rounded-lg border border-gray-700/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="flex flex-wrap gap-4">
                  {selectedProject.links.live && (
                    <a
                      href={selectedProject.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                    >
                      {t.common.viewLiveSite}
                    </a>
                  )}
                  {selectedProject.links.demo && (
                    <a
                      href={selectedProject.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg font-medium transition-colors"
                    >
                      {t.common.viewDemo}
                    </a>
                  )}
                  {selectedProject.links.github && (
                    <a
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-dark-700 hover:bg-dark-600 text-white rounded-lg font-medium transition-colors border border-gray-600"
                    >
                      {t.common.viewCode}
                    </a>
                  )}
                </div>
              </div>
          </div>
        </div>
      )}
    </SectionContainer>
  )
}

export default ProjectsSection