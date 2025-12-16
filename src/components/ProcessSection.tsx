'use client'

import { useTranslation } from '@/hooks/useTranslation'
import SectionContainer from './SectionContainer'

const ProcessSection = () => {
  const { t } = useTranslation()

  const steps = [
    {
      id: 'contact',
      icon: '📞',
      number: '01',
      ...t.process.steps.contact
    },
    {
      id: 'planning',
      icon: '📋',
      number: '02',
      ...t.process.steps.planning
    },
    {
      id: 'development',
      icon: '💻',
      number: '03',
      ...t.process.steps.development
    },
    {
      id: 'approval',
      icon: '✅',
      number: '04',
      ...t.process.steps.approval
    },
    {
      id: 'deployment',
      icon: '🚀',
      number: '05',
      ...t.process.steps.deployment
    }
  ]

  return (
    <SectionContainer sectionId="process" className="bg-dark-850 relative">
      {/* Static background with hero-derived colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-850 via-dark-800 to-dark-900" />
      <div className="absolute inset-0 bg-gradient-to-l from-secondary-950/15 via-transparent to-primary-950/15" />
      
      <div className="relative z-10 min-h-screen px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="gradient-text-static">
                {t.process.title}
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t.process.subtitle}
            </p>
          </div>

          {/* Process Steps */}
          <div className="relative">
            {/* Desktop Layout - Horizontal Timeline */}
            <div className="hidden lg:block">
              {/* Connection Line - Fixed positioning */}
              <div className="absolute top-12 left-0 right-0 flex justify-center">
                <div className="w-full max-w-5xl h-0.5 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
              </div>
              
              <div className="grid grid-cols-5 gap-4 max-w-6xl mx-auto">
                {steps.map((step) => (
                  <div key={step.id} className="text-center group">
                    {/* Step Number & Icon */}
                    <div className="relative mb-6">
                      <div className="w-24 h-24 mx-auto bg-dark-850 border-2 border-primary-500/30 rounded-full flex items-center justify-center text-4xl group-hover:border-primary-500/60 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary-500/30 relative z-10">
                        {step.icon}
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold z-20 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-500">
                        {step.number}
                      </div>
                    </div>
                    
                    {/* Step Content */}
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile/Tablet Layout - Vertical Timeline */}
            <div className="lg:hidden space-y-8">
              {steps.map((step, index) => (
                <div key={step.id} className="relative">
                  {/* Mobile Connection Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-12 top-24 w-0.5 h-8 bg-gradient-to-b from-primary-500/50 to-primary-500/20"></div>
                  )}
                  
                  <div className="flex items-start space-x-4 group">
                    {/* Step Number & Icon */}
                    <div className="relative flex-shrink-0">
                      <div className="w-24 h-24 bg-dark-850 border-2 border-primary-500/30 rounded-full flex items-center justify-center text-3xl group-hover:border-primary-500/60 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary-500/30">
                        {step.icon}
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-bold transition-all duration-300 group-hover:scale-110 group-hover:bg-primary-500">
                        {step.number}
                      </div>
                    </div>
                    
                    {/* Step Content */}
                    <div className="flex-1 pt-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-primary-400 transition-colors duration-300 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-20 p-8 bg-gradient-to-r from-primary-900/20 to-secondary-900/20 rounded-2xl border border-primary-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              {t.process.readyCta.title}
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              {t.process.readyCta.description}
            </p>
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact')
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-all duration-300 ease-out transform hover:scale-105 active:scale-95 hover:shadow-lg hover:shadow-primary-500/30"
            >
              {t.process.readyCta.button}
            </button>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

export default ProcessSection