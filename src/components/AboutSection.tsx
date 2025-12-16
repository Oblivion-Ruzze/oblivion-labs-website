'use client'


import { useTranslation } from '@/hooks/useTranslation'
import SectionContainer from './SectionContainer'









const AboutSection = () => {
  const { t } = useTranslation()

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <SectionContainer sectionId="about" className="bg-dark-900 relative">
      {/* Static background with hero-derived colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-950 to-dark-900" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-950/25 via-transparent to-secondary-950/25" />
      
      {/* Floating orbs for visual appeal */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-secondary-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-3/4 left-3/4 w-24 h-24 bg-accent-500/10 rounded-full blur-xl"></div>
      </div>
      
      <div className="relative z-10 min-h-screen px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="gradient-text-static">
                {t.about.title}
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.about.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Photo and Personal Info */}
            <div className="flex flex-col items-center lg:items-start space-y-8">
              {/* Photo */}
              <div className="relative group">
                <div className="relative">
                  {/* Glow effect behind photo */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-secondary-500/30 rounded-2xl blur-2xl transform scale-110 group-hover:scale-125 transition-transform duration-500"></div>
                  
                  {/* Main photo */}
                  <div className="relative bg-gradient-to-br from-primary-900/20 to-secondary-900/20 p-2 rounded-2xl border border-primary-500/30 group-hover:border-primary-500/60 transition-all duration-300">
                    <img 
                      src="/photo-3.png" 
                      alt="Ernesto - Developer from Cuba"
                      className="w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Floating badge */}
                  <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    {t.meetDev.fromCuba}
                  </div>
                </div>
              </div>

              {/* Personal story */}
              <div className="space-y-6 text-gray-300 leading-relaxed text-center lg:text-left">
                <p>
                  {t.about.description}
                </p>
                <p>
                  {t.about.description2}
                </p>
                <p>
                  {t.about.description3}
                </p>
              </div>

              {/* Key highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
                <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50 hover:border-primary-500/50 transition-all duration-300">
                  <div className="text-2xl mb-2">🎓</div>
                  <h4 className="font-bold text-white text-sm mb-1">
                    {t.about.highlights.student.title}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {t.about.highlights.student.description}
                  </p>
                </div>

                <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50 hover:border-primary-500/50 transition-all duration-300">
                  <div className="text-2xl mb-2">🚀</div>
                  <h4 className="font-bold text-white text-sm mb-1">
                    {t.about.highlights.company.title}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {t.about.highlights.company.description}
                  </p>
                </div>

                <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50 hover:border-primary-500/50 transition-all duration-300">
                  <div className="text-2xl mb-2">💪</div>
                  <h4 className="font-bold text-white text-sm mb-1">
                    {t.about.highlights.challenges.title}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {t.about.highlights.challenges.description}
                  </p>
                </div>

                <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50 hover:border-primary-500/50 transition-all duration-300">
                  <div className="text-2xl mb-2">🤖</div>
                  <h4 className="font-bold text-white text-sm mb-1">
                    {t.about.highlights.passion.title}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {t.about.highlights.passion.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Columna Derecha - Linea de tiempo */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8">{t.about.experience}</h3>
              <div className="space-y-8">
                {t.experiences.map((experience, index) => (
                  <div
                    key={experience.id}
                    className="relative"
                  >
                    {/* Linea de tiempo */}
                    {index < t.experiences.length - 1 && (
                      <div className="absolute left-4 top-12 w-0.5 h-16 bg-gradient-to-b from-primary-500 to-transparent"></div>
                    )}
                    
                    {/* Dot */}
                    <div className="absolute left-2 top-6 w-4 h-4 bg-primary-500 rounded-full border-2 border-dark-900"></div>
                    
                    {/* Contenido */}
                    <div className="ml-12 bg-dark-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50 hover:border-primary-500/50 transition-all duration-300">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h4 className="text-lg font-bold text-white">
                          {experience.title}
                        </h4>
                        <span className="text-sm text-primary-400 font-medium">
                          {experience.period}
                        </span>
                      </div>
                      
                      <p className="text-secondary-400 font-medium mb-3">
                        {experience.company}
                      </p>
                      
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {experience.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs bg-dark-700/50 text-gray-300 rounded-full border border-gray-700/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Seccion de Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-dark-800/50 backdrop-blur-sm rounded-xl border border-gray-800/50 hover:border-primary-500/50 transition-all duration-300">
              <div className="text-3xl font-bold gradient-text-static mb-2">+3</div>
              <div className="text-gray-300 text-sm font-medium">{t.about.stats.projects.title}</div>
              <div className="text-gray-500 text-xs mt-1">{t.about.stats.projects.description}</div>
            </div>
            <div className="text-center p-6 bg-dark-800/50 backdrop-blur-sm rounded-xl border border-gray-800/50 hover:border-primary-500/50 transition-all duration-300">
              <div className="text-3xl font-bold gradient-text-static mb-2">100%</div>
              <div className="text-gray-300 text-sm font-medium">{t.about.stats.satisfaction.title}</div>
              <div className="text-gray-500 text-xs mt-1">{t.about.stats.satisfaction.description}</div>
            </div>
            <div className="text-center p-6 bg-dark-800/50 backdrop-blur-sm rounded-xl border border-gray-800/50 hover:border-primary-500/50 transition-all duration-300">
              <div className="text-3xl font-bold gradient-text-static mb-2">+4</div>
              <div className="text-gray-300 text-sm font-medium">{t.about.stats.yearsExp.title}</div>
              <div className="text-gray-500 text-xs mt-1">{t.about.stats.yearsExp.description}</div>
            </div>
            <div className="text-center p-6 bg-dark-800/50 backdrop-blur-sm rounded-xl border border-gray-800/50 hover:border-primary-500/50 transition-all duration-300">
              <div className="text-3xl font-bold gradient-text-static mb-2">+15</div>
              <div className="text-gray-300 text-sm font-medium">{t.about.stats.leadership.title}</div>
              <div className="text-gray-500 text-xs mt-1">{t.about.stats.leadership.description}</div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <button
              onClick={scrollToContact}
              className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-primary-500/30 hover:scale-105 active:scale-95 hover:shadow-primary-500/50"
            >
              {t.common.letsWorkTogether}
            </button>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

export default AboutSection