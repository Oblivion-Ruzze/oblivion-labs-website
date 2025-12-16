'use client'

import { useTranslation } from '@/hooks/useTranslation'
import SectionContainer from './SectionContainer'

const MeetTheDevSection = () => {
  const { t } = useTranslation()

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <SectionContainer sectionId="meet-dev" className="bg-dark-900 relative">
      {/* Static background with hero-derived colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-950 to-dark-900" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-950/25 via-transparent to-secondary-950/25" />
      
      {/* Floating orbs for visual appeal */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-secondary-500/10 rounded-full blur-xl"></div>
        <div className="absolute top-3/4 left-3/4 w-24 h-24 bg-accent-500/10 rounded-full blur-xl"></div>
      </div>
      
      <div className="relative z-10 min-h-screen px-4 sm:px-6 lg:px-8 py-20 flex items-center">
        <div className="max-w-7xl mx-auto w-full">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Column - Photo */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative group">
                {/* Photo container with effects */}
                <div className="relative">
                  {/* Glow effect behind photo */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/30 to-secondary-500/30 rounded-2xl blur-2xl transform scale-110 group-hover:scale-125 transition-transform duration-500"></div>
                  
                  {/* Main photo */}
                  <div className="relative bg-gradient-to-br from-primary-900/20 to-secondary-900/20 p-2 rounded-2xl border border-primary-500/30 group-hover:border-primary-500/60 transition-all duration-300">
                    <img 
                      src="/photo-3.png" 
                      alt="Developer from Cuba"
                      className="w-80 h-80 lg:w-96 lg:h-96 object-cover rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  {/* Floating badge */}
                  <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                    {t.meetDev.fromCuba}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="space-y-8 text-center lg:text-left">
              
              {/* Header */}
              <div>
                <div className="inline-flex items-center px-4 py-2 bg-primary-500/10 border border-primary-500/30 rounded-full text-primary-400 text-sm font-medium mb-6">
                  {t.meetDev.badge}
                </div>
                
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                  <span className="gradient-text-static">
                    {t.meetDev.title}
                  </span>
                </h2>
                
                <p className="text-xl text-gray-300 leading-relaxed">
                  {t.meetDev.subtitle}
                </p>
              </div>

              {/* Personal story */}
              <div className="space-y-6 text-gray-300 leading-relaxed">
                <p>
                  {t.meetDev.description}
                </p>
                <p>
                  {t.meetDev.description2}
                </p>
              </div>

              {/* Key highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50 hover:border-primary-500/50 transition-all duration-300">
                  <div className="text-2xl mb-2">🎓</div>
                  <h4 className="font-bold text-white text-sm mb-1">
                    {t.meetDev.highlights.student.title}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {t.meetDev.highlights.student.description}
                  </p>
                </div>

                <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50 hover:border-primary-500/50 transition-all duration-300">
                  <div className="text-2xl mb-2">🚀</div>
                  <h4 className="font-bold text-white text-sm mb-1">
                    {t.meetDev.highlights.company.title}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {t.meetDev.highlights.company.description}
                  </p>
                </div>

                <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50 hover:border-primary-500/50 transition-all duration-300">
                  <div className="text-2xl mb-2">💪</div>
                  <h4 className="font-bold text-white text-sm mb-1">
                    {t.meetDev.highlights.challenges.title}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {t.meetDev.highlights.challenges.description}
                  </p>
                </div>

                <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50 hover:border-primary-500/50 transition-all duration-300">
                  <div className="text-2xl mb-2">🤖</div>
                  <h4 className="font-bold text-white text-sm mb-1">
                    {t.meetDev.highlights.passion.title}
                  </h4>
                  <p className="text-xs text-gray-400">
                    {t.meetDev.highlights.passion.description}
                  </p>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-8">
                <button
                  onClick={scrollToContact}
                  className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-primary-500/30 hover:scale-105 active:scale-95 hover:shadow-primary-500/50"
                >
                  {t.meetDev.cta}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

export default MeetTheDevSection