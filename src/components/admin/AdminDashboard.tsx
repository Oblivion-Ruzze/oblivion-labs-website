'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import AnalyticsOverview from './AnalyticsOverview'
import TrafficAnalytics from './TrafficAnalytics'
import ConversionMetrics from './ConversionMetrics'
import SEOMetrics from './SEOMetrics'
import ContactSubmissions from './ContactSubmissions'
import UserEngagement from './UserEngagement'

type TabType = 'overview' | 'traffic' | 'engagement' | 'conversions' | 'seo' | 'contacts'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('overview')
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'traffic', label: 'Traffic', icon: '🚦' },
    { id: 'engagement', label: 'Engagement', icon: '⏱️' },
    { id: 'conversions', label: 'Conversions', icon: '🎯' },
    { id: 'seo', label: 'SEO', icon: '🔍' },
    { id: 'contacts', label: 'Contacts', icon: '📧' }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <AnalyticsOverview />
      case 'traffic':
        return <TrafficAnalytics />
      case 'engagement':
        return <UserEngagement />
      case 'conversions':
        return <ConversionMetrics />
      case 'seo':
        return <SEOMetrics />
      case 'contacts':
        return <ContactSubmissions />
      default:
        return <AnalyticsOverview />
    }
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Header */}
      <header className="bg-dark-900/50 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-white">Analytics Dashboard</h1>
              <div className="text-sm text-gray-400">
                Portfolio Performance & SEO Metrics
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-400">
                Last updated: {new Date().toLocaleString()}
              </div>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 text-sm bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-dark-900/30 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-400 text-primary-400'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>
    </div>
  )
}