'use client'

import SectionContainer from './SectionContainer'
import { useTranslation } from '@/hooks/useTranslation'

const HeroSection = () => {
  const { t } = useTranslation()

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <SectionContainer sectionId="hero" className="relative overflow-hidden" style={{ paddingTop: '80px' }}>
        <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-dark-950" />
        
        <div 
          className="absolute top-10 left-5 w-[600px] h-[600px] rounded-full animate-mega-float"
          style={{ 
            background: 'radial-gradient(circle, rgba(217,70,239,0.15) 0%, rgba(244,63,94,0.1) 50%, rgba(14,165,233,0.08) 100%)',
            filter: 'blur(80px) brightness(1.2) saturate(1.4)',
            willChange: 'transform, opacity'
          }} 
        />
        
        {/* NEW: Top Left Corner Orb - Elegant Addition */}
        <div 
          className="absolute top-5 left-10 w-[400px] h-[400px] rounded-full animate-mega-twinkle"
          style={{ 
            background: 'radial-gradient(circle, rgba(14,165,233,0.18) 0%, rgba(217,70,239,0.12) 50%, rgba(244,63,94,0.08) 100%)',
            filter: 'blur(60px) brightness(1.3) saturate(1.6)',
            willChange: 'transform, opacity'
          }} 
        />
        
        <div 
          className="absolute bottom-10 right-5 w-[550px] h-[550px] rounded-full animate-mega-glow"
          style={{ 
            background: 'radial-gradient(circle, rgba(14,165,233,0.12) 0%, rgba(217,70,239,0.09) 50%, rgba(244,63,94,0.06) 100%)',
            filter: 'blur(70px) brightness(1.3) saturate(1.5)',
            willChange: 'transform, opacity'
          }} 
        />
        
        <div 
          className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full animate-mega-drift"
          style={{ 
            background: 'radial-gradient(circle, rgba(244,63,94,0.25) 0%, rgba(217,70,239,0.18) 50%, rgba(14,165,233,0.12) 100%)',
            filter: 'blur(45px) brightness(1.4) saturate(1.6)',
            willChange: 'transform, opacity'
          }} 
        />
        
        <div 
          className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full animate-mega-wave"
          style={{ 
            background: 'radial-gradient(circle, rgba(14,165,233,0.22) 0%, rgba(244,63,94,0.16) 50%, rgba(217,70,239,0.1) 100%)',
            filter: 'blur(40px) brightness(1.5) saturate(1.7)',
            willChange: 'transform, opacity'
          }} 
        />
        
        <div 
          className="absolute top-1/3 left-1/2 w-32 h-32 rounded-full animate-mega-sparkle"
          style={{ 
            background: 'radial-gradient(circle, rgba(217,70,239,0.4) 0%, rgba(244,63,94,0.3) 100%)',
            filter: 'blur(20px) brightness(1.6) saturate(1.8)',
            willChange: 'transform, opacity'
          }} 
        />
        
        <div 
          className="absolute bottom-1/3 right-1/2 w-28 h-28 rounded-full animate-mega-twinkle"
          style={{ 
            background: 'radial-gradient(circle, rgba(244,63,94,0.35) 0%, rgba(14,165,233,0.25) 100%)',
            filter: 'blur(18px) brightness(1.5) saturate(1.7)',
            willChange: 'transform, opacity'
          }} 
        />
        
        {/* Tiny Particles - Delicate Details */}
        <div 
          className="absolute top-20 right-20 w-16 h-16 rounded-full animate-mega-dust"
          style={{ 
            background: 'radial-gradient(circle, rgba(217,70,239,0.5) 0%, rgba(244,63,94,0.4) 100%)',
            filter: 'blur(12px) brightness(1.7) saturate(2)',
            willChange: 'transform, opacity'
          }} 
        />
        
        <div 
          className="absolute bottom-20 left-20 w-20 h-20 rounded-full animate-mega-bounce"
          style={{ 
            background: 'radial-gradient(circle, rgba(14,165,233,0.45) 0%, rgba(217,70,239,0.35) 100%)',
            filter: 'blur(15px) brightness(1.6) saturate(1.9)',
            willChange: 'transform, opacity'
          }} 
        />
        
        <div 
          className="absolute top-1/2 right-10 w-12 h-12 rounded-full animate-mega-zoom"
          style={{ 
            background: 'radial-gradient(circle, rgba(244,63,94,0.6) 0%, rgba(14,165,233,0.5) 100%)',
            filter: 'blur(10px) brightness(1.8) saturate(2.1)',
            willChange: 'transform, opacity'
          }} 
        />
        
        <div 
          className="absolute top-10 left-1/2 w-4 h-4 rounded-full animate-mega-flare"
          style={{ 
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(217,70,239,0.2) 100%)',
            filter: 'blur(8px) brightness(2) saturate(0)',
            boxShadow: '0 0 30px rgba(255,255,255,0.2), 0 0 60px rgba(217,70,239,0.15)',
            willChange: 'transform, opacity'
          }} 
        />
        
        <div 
          className="absolute bottom-10 right-1/2 w-6 h-6 rounded-full animate-mega-pulse"
          style={{ 
            background: 'radial-gradient(circle, rgba(255,255,255,0.25) 0%, rgba(14,165,233,0.18) 100%)',
            filter: 'blur(6px) brightness(1.9) saturate(0.2)',
            boxShadow: '0 0 25px rgba(255,255,255,0.18), 0 0 50px rgba(14,165,233,0.12)',
            willChange: 'transform, opacity'
          }} 
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950/40 via-transparent to-dark-950/20" />
      </div>

      <div className="relative z-10 min-h-screen container-responsive">
        <div className="flex flex-col justify-center items-center text-center min-h-screen py-20 max-w-6xl mx-auto safe-area">
          
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 backdrop-blur-sm mb-8 w-fit">
            <span className="text-primary-400 text-sm font-medium">{t.hero.badge}</span>
          </div>

          {/* Titulo Principal */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-4xl text-responsive">
            <span className="text-white">{t.hero.title}</span>
            <br />
            <span className="gradient-text-static">{t.hero.titleHighlight}</span>
            <br />
            <span className="text-white">{t.hero.titleEnd}</span>
          </h1>

          {/* Subtitulo */}
          <p className="text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed text-responsive">
            {t.hero.subtitle}
          </p>

          {/* CTA */}
          <div className="flex-responsive flex-col sm:flex-row gap-4 mb-12">
            <button
              onClick={() => {
                const projectsSection = document.getElementById('projects')
                if (projectsSection) {
                  projectsSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-primary-600 hover:to-accent-600 transition-all duration-300 ease-out shadow-lg shadow-primary-500/40 transform hover:scale-105 active:scale-95 hover:shadow-primary-500/60"
            >
              {t.hero.ctaPrimary}
            </button>
            
            <button
              onClick={() => {
                const contactSection = document.getElementById('contact')
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="border border-white/20 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300 ease-out backdrop-blur-sm transform hover:scale-105 active:scale-95"
            >
              {t.hero.ctaSecondary}
            </button>
          </div>

          {/* Seccion de Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-8">
            <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-lg hover:shadow-primary-500/20">
              <div className="text-5xl font-bold gradient-text-static mb-2">
                {t.hero.stats.technologies.number}
              </div>
              <div className="text-gray-300 text-base font-medium">{t.hero.stats.technologies.title}</div>
              <div className="text-gray-500 text-sm mt-1">{t.hero.stats.technologies.description}</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-lg hover:shadow-primary-500/20">
              <div className="text-5xl font-bold gradient-text-static mb-2">
                {t.hero.stats.experience.number}
              </div>
              <div className="text-gray-300 text-base font-medium">{t.hero.stats.experience.title}</div>
              <div className="text-gray-500 text-sm mt-1">{t.hero.stats.experience.description}</div>
            </div>
            <div className="text-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 ease-out transform hover:scale-105 hover:shadow-lg hover:shadow-primary-500/20">
              <div className="text-5xl font-bold gradient-text-static mb-2">
                {t.hero.stats.projects.number}
              </div>
              <div className="text-gray-300 text-base font-medium">{t.hero.stats.projects.title}</div>
              <div className="text-gray-500 text-sm mt-1">{t.hero.stats.projects.description}</div>
            </div>
          </div>
        </div>

        {/* Indicador de Scroll */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce-slow">
          <button
            onClick={scrollToNext}
            className="text-gray-400 hover:text-white transition-all duration-300 ease-out transform hover:scale-110 hover:drop-shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </div>
      </div>

    </SectionContainer>
  )
}

export default HeroSection