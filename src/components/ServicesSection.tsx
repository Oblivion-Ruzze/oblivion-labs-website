'use client'

import { useState } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import SectionContainer from './SectionContainer'

interface Service {
  id: string
  icon: string
  price: {
    starting: string
    currency: string
  }
  category: 'development' | 'design' | 'consulting'
}

const ServicesSection = () => {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const services: Service[] = [
    {
      id: 'webDevelopment',
      icon: '🌐',
      price: { starting: '250', currency: 'USD' },
      category: 'development'
    },
    {
      id: 'logoBranding',
      icon: '🎨',
      price: { starting: '30', currency: 'USD' },
      category: 'design'
    },
    {
      id: 'aiIntegration',
      icon: '🤖',
      price: { starting: '150', currency: 'USD' },
      category: 'development'
    },
    {
      id: 'basicWebsite',
      icon: '📄',
      price: { starting: '80', currency: 'USD' },
      category: 'development'
    },
    {
      id: 'consulting',
      icon: '💡',
      price: { starting: '10', currency: 'USD/hour' },
      category: 'consulting'
    },
    {
      id: 'maintenance',
      icon: '🔧',
      price: { starting: '30', currency: 'USD/month' },
      category: 'development'
    }
  ]

  const getServiceData = (serviceId: string) => {
    const serviceKey = serviceId as keyof typeof t.services.items
    return t.services.items[serviceKey] || t.services.items.webDevelopment
  }

  const categories = [
    { id: 'all', label: t.services.categories.all },
    { id: 'development', label: t.services.categories.development },
    { id: 'design', label: t.services.categories.design },
    { id: 'consulting', label: t.services.categories.consulting }
  ]

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory)

  return (
    <SectionContainer sectionId="services" className="bg-dark-850 relative">
      {/* Static background with hero-derived colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-850 via-dark-800 to-dark-900" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary-950/15 via-transparent to-secondary-950/15" />
      
      <div className="relative z-10 min-h-screen px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              <span className="gradient-text-static">
                {t.services.title}
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              {t.services.subtitle}
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                      : 'bg-dark-700/50 text-gray-300 hover:bg-dark-600/50 hover:text-white'
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service) => {
              const serviceData = getServiceData(service.id)
              return (
                <div
                  key={service.id}
                  className="group"
                >
                  <div className="relative h-full bg-dark-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-800/50 hover:border-primary-500/50 transition-all duration-300 hover:transform hover:scale-105">
                    {/* Service Icon */}
                    <div className="mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-primary-900/20 to-secondary-900/20 rounded-2xl flex items-center justify-center text-3xl mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-1">
                        {service.icon}
                      </div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-primary-400 transition-colors">
                        {serviceData.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {serviceData.description}
                    </p>

                    {/* Features */}
                    <div className="mb-8">
                      <h4 className="text-white font-semibold mb-3">{t.services.pricing.whatsIncluded}</h4>
                      <ul className="space-y-2">
                        {serviceData.features.slice(0, 4).map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-300">
                            <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 flex-shrink-0"></span>
                            {feature}
                          </li>
                        ))}
                        {serviceData.features.length > 4 && (
                          <li className="text-sm text-gray-400 ml-4">
                            +{serviceData.features.length - 4} {t.services.pricing.moreFeatures}
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Pricing & Timeline */}
                    <div className="mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <span className="text-sm text-gray-400">{t.services.pricing.starting}</span>
                          <div className="text-2xl font-bold text-white">
                            {service.price.currency === 'USD/hour' || service.price.currency === 'USD/month' 
                              ? `${service.price.starting}`
                              : `${service.price.starting} ${service.price.currency}`
                            }
                          </div>
                          {(service.price.currency === 'USD/hour' || service.price.currency === 'USD/month') && (
                            <span className="text-sm text-gray-400">
                              {service.price.currency.split('/')[1]}
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-gray-400">{t.services.pricing.delivery}</span>
                          <div className="text-sm font-medium text-gray-300">
                            {serviceData.deliveryTime}
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          const contactSection = document.getElementById('contact')
                          if (contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth' })
                          }
                        }}
                        className="w-full py-3 bg-primary-600/20 hover:bg-primary-600 text-primary-400 hover:text-white rounded-lg font-medium transition-all duration-300 border border-primary-600/30 hover:border-primary-600"
                      >
                        {t.services.pricing.getStarted}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16 p-8 bg-gradient-to-r from-primary-900/20 to-secondary-900/20 rounded-2xl border border-primary-500/20">
            <h3 className="text-2xl font-bold text-white mb-4">
              {t.services.customCta.title}
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              {t.services.customCta.description}
            </p>
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact')
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            >
              {t.services.customCta.button}
            </button>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
}

export default ServicesSection