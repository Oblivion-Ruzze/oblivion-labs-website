'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface ConversionData {
  totalConversions: number
  conversionRate: number
  conversionsBySource: Array<{ source: string; conversions: number; rate: number }>
  conversionFunnel: Array<{ step: string; visitors: number; conversionRate: number }>
  conversionsByPage: Array<{ page: string; conversions: number; visitors: number; rate: number }>
  conversionsByDevice: Array<{ device: string; conversions: number; rate: number }>
  conversionTrends: Array<{ date: string; conversions: number; visitors: number; rate: number }>
  avgTimeToConversion: number
  topConvertingCountries: Array<{ country: string; conversions: number; rate: number }>
}

export default function ConversionMetrics() {
  const [conversionData, setConversionData] = useState<ConversionData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30d')

  useEffect(() => {
    fetchConversionData()
  }, [timeRange])

  const fetchConversionData = async () => {
    setIsLoading(true)
    try {
      const endDate = new Date()
      const startDate = new Date()
      
      switch (timeRange) {
        case '7d':
          startDate.setDate(endDate.getDate() - 7)
          break
        case '30d':
          startDate.setDate(endDate.getDate() - 30)
          break
        case '90d':
          startDate.setDate(endDate.getDate() - 90)
          break
      }

      // Fetch sessions and contact submissions
      const { data: sessions } = await supabase
        .from('user_sessions')
        .select('*')
        .gte('first_visit', startDate.toISOString())
        .lte('first_visit', endDate.toISOString())

      const { data: contacts } = await supabase
        .from('contact_submissions')
        .select('*')
        .gte('timestamp', startDate.toISOString())
        .lte('timestamp', endDate.toISOString())

      const { data: pageViews } = await supabase
        .from('page_views')
        .select('*')
        .gte('timestamp', startDate.toISOString())
        .lte('timestamp', endDate.toISOString())

      if (sessions && contacts && pageViews) {
        const totalVisitors = sessions.length
        const totalConversions = contacts.length
        const conversionRate = totalVisitors > 0 ? (totalConversions / totalVisitors) * 100 : 0

        // Conversions by source
        const sourceConversions: Record<string, { conversions: number; visitors: number }> = {}
        
        sessions.forEach(session => {
          const referrer = session.referrer || 'direct'
          let source = 'Direct'
          
          if (referrer.includes('google')) source = 'Google'
          else if (referrer.includes('facebook')) source = 'Facebook'
          else if (referrer.includes('twitter')) source = 'Twitter'
          else if (referrer.includes('linkedin')) source = 'LinkedIn'
          else if (referrer !== 'direct') source = 'Other'
          
          if (!sourceConversions[source]) {
            sourceConversions[source] = { conversions: 0, visitors: 0 }
          }
          sourceConversions[source].visitors++
          
          if (session.converted) {
            sourceConversions[source].conversions++
          }
        })

        const conversionsBySource = Object.entries(sourceConversions)
          .map(([source, data]) => ({
            source,
            conversions: data.conversions,
            rate: data.visitors > 0 ? (data.conversions / data.visitors) * 100 : 0
          }))
          .sort((a, b) => b.rate - a.rate)

        // Conversion funnel (simplified)
        const homePageViews = pageViews.filter(pv => pv.page_path === '/').length
        const aboutPageViews = pageViews.filter(pv => pv.page_path.includes('about')).length
        const contactPageViews = pageViews.filter(pv => pv.page_path.includes('contact')).length
        
        const conversionFunnel = [
          {
            step: 'Landing Page',
            visitors: homePageViews,
            conversionRate: 100
          },
          {
            step: 'About Section',
            visitors: aboutPageViews,
            conversionRate: homePageViews > 0 ? (aboutPageViews / homePageViews) * 100 : 0
          },
          {
            step: 'Contact Form',
            visitors: contactPageViews,
            conversionRate: homePageViews > 0 ? (contactPageViews / homePageViews) * 100 : 0
          },
          {
            step: 'Conversion',
            visitors: totalConversions,
            conversionRate: homePageViews > 0 ? (totalConversions / homePageViews) * 100 : 0
          }
        ]

        // Conversions by page
        const pageConversions: Record<string, { conversions: number; visitors: Set<string> }> = {}
        
        pageViews.forEach(pv => {
          if (!pageConversions[pv.page_path]) {
            pageConversions[pv.page_path] = { conversions: 0, visitors: new Set() }
          }
          pageConversions[pv.page_path].visitors.add(pv.session_id)
        })

        contacts.forEach(contact => {
          const sourcePage = contact.source_page || '/'
          if (pageConversions[sourcePage]) {
            pageConversions[sourcePage].conversions++
          }
        })

        const conversionsByPage = Object.entries(pageConversions)
          .map(([page, data]) => ({
            page,
            conversions: data.conversions,
            visitors: data.visitors.size,
            rate: data.visitors.size > 0 ? (data.conversions / data.visitors.size) * 100 : 0
          }))
          .sort((a, b) => b.rate - a.rate)
          .slice(0, 5)

        // Conversions by device
        const deviceConversions: Record<string, { conversions: number; visitors: number }> = {}
        
        sessions.forEach(session => {
          if (!deviceConversions[session.device_type]) {
            deviceConversions[session.device_type] = { conversions: 0, visitors: 0 }
          }
          deviceConversions[session.device_type].visitors++
          
          if (session.converted) {
            deviceConversions[session.device_type].conversions++
          }
        })

        const conversionsByDevice = Object.entries(deviceConversions)
          .map(([device, data]) => ({
            device,
            conversions: data.conversions,
            rate: data.visitors > 0 ? (data.conversions / data.visitors) * 100 : 0
          }))

        // Conversion trends (daily)
        const dailyData: Record<string, { conversions: number; visitors: Set<string> }> = {}
        
        sessions.forEach(session => {
          const date = new Date(session.first_visit).toISOString().split('T')[0]
          if (!dailyData[date]) {
            dailyData[date] = { conversions: 0, visitors: new Set() }
          }
          dailyData[date].visitors.add(session.session_id)
          
          if (session.converted) {
            dailyData[date].conversions++
          }
        })

        const conversionTrends = Object.entries(dailyData)
          .map(([date, data]) => ({
            date,
            conversions: data.conversions,
            visitors: data.visitors.size,
            rate: data.visitors.size > 0 ? (data.conversions / data.visitors.size) * 100 : 0
          }))
          .sort((a, b) => a.date.localeCompare(b.date))

        // Average time to conversion (simplified calculation)
        const avgTimeToConversion = sessions
          .filter(s => s.converted)
          .reduce((acc, s) => acc + (s.total_duration || 0), 0) / totalConversions || 0

        // Top converting countries
        const countryConversions: Record<string, { conversions: number; visitors: number }> = {}
        
        sessions.forEach(session => {
          const country = session.country || 'Unknown'
          if (!countryConversions[country]) {
            countryConversions[country] = { conversions: 0, visitors: 0 }
          }
          countryConversions[country].visitors++
          
          if (session.converted) {
            countryConversions[country].conversions++
          }
        })

        const topConvertingCountries = Object.entries(countryConversions)
          .map(([country, data]) => ({
            country,
            conversions: data.conversions,
            rate: data.visitors > 0 ? (data.conversions / data.visitors) * 100 : 0
          }))
          .sort((a, b) => b.conversions - a.conversions)
          .slice(0, 5)

        setConversionData({
          totalConversions,
          conversionRate,
          conversionsBySource,
          conversionFunnel,
          conversionsByPage,
          conversionsByDevice,
          conversionTrends,
          avgTimeToConversion,
          topConvertingCountries
        })
      }
    } catch (error) {
      console.error('Error fetching conversion data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading conversion metrics...</div>
      </div>
    )
  }

  if (!conversionData) {
    return (
      <div className="text-center text-gray-400">
        No conversion data available.
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Conversion Metrics</h2>
        <div className="flex space-x-2">
          {['7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-primary-500 text-white'
                  : 'bg-dark-800/50 text-gray-400 hover:text-white hover:bg-dark-700/50'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Key Conversion Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Conversions</p>
              <p className="text-3xl font-bold text-white">{conversionData.totalConversions}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
          </div>
        </div>

        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Conversion Rate</p>
              <p className="text-3xl font-bold text-white">{conversionData.conversionRate.toFixed(1)}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📈</span>
            </div>
          </div>
        </div>

        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg. Time to Convert</p>
              <p className="text-3xl font-bold text-white">{Math.round(conversionData.avgTimeToConversion / 60)}m</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⏱️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Conversion Funnel */}
      <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <h3 className="text-xl font-semibold text-white mb-6">Conversion Funnel</h3>
        <div className="space-y-4">
          {conversionData.conversionFunnel.map((step, index) => (
            <div key={step.step} className="relative">
              <div className="flex items-center justify-between p-4 bg-dark-800/30 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="text-white font-medium">{step.step}</div>
                    <div className="text-gray-400 text-sm">{step.visitors.toLocaleString()} visitors</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">{step.conversionRate.toFixed(1)}%</div>
                  <div className="text-gray-400 text-sm">conversion rate</div>
                </div>
              </div>
              {index < conversionData.conversionFunnel.length - 1 && (
                <div className="flex justify-center py-2">
                  <div className="w-0.5 h-4 bg-gray-600"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Conversions by Source and Device */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Conversions by Source</h3>
          <div className="space-y-3">
            {conversionData.conversionsBySource.map((source) => (
              <div key={source.source} className="flex items-center justify-between">
                <span className="text-white">{source.source}</span>
                <div className="text-right">
                  <div className="text-white font-medium">{source.conversions}</div>
                  <div className="text-gray-400 text-sm">{source.rate.toFixed(1)}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Conversions by Device</h3>
          <div className="space-y-3">
            {conversionData.conversionsByDevice.map((device) => (
              <div key={device.device} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    {device.device === 'desktop' ? '🖥️' : device.device === 'mobile' ? '📱' : '📱'}
                  </span>
                  <span className="text-white capitalize">{device.device}</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">{device.conversions}</div>
                  <div className="text-gray-400 text-sm">{device.rate.toFixed(1)}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Converting Pages */}
      <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Top Converting Pages</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 text-sm">
                <th className="text-left py-2">Page</th>
                <th className="text-right py-2">Conversions</th>
                <th className="text-right py-2">Visitors</th>
                <th className="text-right py-2">Rate</th>
              </tr>
            </thead>
            <tbody>
              {conversionData.conversionsByPage.map((page) => (
                <tr key={page.page} className="border-t border-white/5">
                  <td className="py-3 text-white">{page.page}</td>
                  <td className="py-3 text-right text-gray-300">{page.conversions}</td>
                  <td className="py-3 text-right text-gray-300">{page.visitors}</td>
                  <td className="py-3 text-right text-gray-300">{page.rate.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Converting Countries */}
      <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Top Converting Countries</h3>
        <div className="space-y-3">
          {conversionData.topConvertingCountries.map((country, index) => (
            <div key={country.country} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-gray-400 text-sm w-4">{index + 1}</span>
                <span className="text-white">{country.country}</span>
              </div>
              <div className="text-right">
                <div className="text-white font-medium">{country.conversions}</div>
                <div className="text-gray-400 text-sm">{country.rate.toFixed(1)}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}