'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface OverviewStats {
  totalVisitors: number
  totalPageViews: number
  conversionRate: number
  avgSessionDuration: number
  topPages: Array<{ page: string; views: number }>
  topCountries: Array<{ country: string; visitors: number }>
  deviceBreakdown: Array<{ device: string; percentage: number }>
  recentContacts: number
}

export default function AnalyticsOverview() {
  const [stats, setStats] = useState<OverviewStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7d')

  useEffect(() => {
    fetchOverviewStats()
  }, [timeRange])

  const fetchOverviewStats = async () => {
    setIsLoading(true)
    try {
      const endDate = new Date()
      const startDate = new Date()
      
      // Calculate date range
      switch (timeRange) {
        case '24h':
          startDate.setDate(endDate.getDate() - 1)
          break
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

      // Fetch page views
      const { data: pageViews } = await supabase
        .from('page_views')
        .select('*')
        .gte('timestamp', startDate.toISOString())
        .lte('timestamp', endDate.toISOString())

      // Fetch user sessions
      const { data: sessions } = await supabase
        .from('user_sessions')
        .select('*')
        .gte('first_visit', startDate.toISOString())
        .lte('first_visit', endDate.toISOString())

      // Fetch contact submissions
      const { data: contacts } = await supabase
        .from('contact_submissions')
        .select('*')
        .gte('timestamp', startDate.toISOString())
        .lte('timestamp', endDate.toISOString())

      if (pageViews && sessions) {
        // Calculate stats
        const totalVisitors = sessions.length
        const totalPageViews = pageViews.length
        const conversions = sessions.filter(s => s.converted).length
        const conversionRate = totalVisitors > 0 ? (conversions / totalVisitors) * 100 : 0
        const avgSessionDuration = sessions.reduce((acc, s) => acc + (s.total_duration || 0), 0) / sessions.length || 0

        // Top pages
        const pageViewCounts = pageViews.reduce((acc: Record<string, number>, pv) => {
          acc[pv.page_path] = (acc[pv.page_path] || 0) + 1
          return acc
        }, {})
        const topPages = Object.entries(pageViewCounts)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5)
          .map(([page, views]) => ({ page, views }))

        // Top countries
        const countryCounts = sessions.reduce((acc: Record<string, number>, s) => {
          const country = s.country || 'Unknown'
          acc[country] = (acc[country] || 0) + 1
          return acc
        }, {})
        const topCountries = Object.entries(countryCounts)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5)
          .map(([country, visitors]) => ({ country, visitors }))

        // Device breakdown
        const deviceCounts = sessions.reduce((acc: Record<string, number>, s) => {
          acc[s.device_type] = (acc[s.device_type] || 0) + 1
          return acc
        }, {})
        const deviceBreakdown = Object.entries(deviceCounts)
          .map(([device, count]) => ({
            device,
            percentage: Math.round((count / totalVisitors) * 100)
          }))

        setStats({
          totalVisitors,
          totalPageViews,
          conversionRate,
          avgSessionDuration,
          topPages,
          topCountries,
          deviceBreakdown,
          recentContacts: contacts?.length || 0
        })
      }
    } catch (error) {
      console.error('Error fetching overview stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading analytics...</div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div className="text-center text-gray-400">
        No data available. Make sure your Supabase tables are set up correctly.
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Analytics Overview</h2>
        <div className="flex space-x-2">
          {['24h', '7d', '30d', '90d'].map((range) => (
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Visitors</p>
              <p className="text-3xl font-bold text-white">{stats.totalVisitors.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>

        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Page Views</p>
              <p className="text-3xl font-bold text-white">{stats.totalPageViews.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📄</span>
            </div>
          </div>
        </div>

        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Conversion Rate</p>
              <p className="text-3xl font-bold text-white">{stats.conversionRate.toFixed(1)}%</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
          </div>
        </div>

        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg. Session</p>
              <p className="text-3xl font-bold text-white">{Math.round(stats.avgSessionDuration / 60)}m</p>
            </div>
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⏱️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top Pages */}
        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Top Pages</h3>
          <div className="space-y-3">
            {stats.topPages.map((page, index) => (
              <div key={page.page} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400 text-sm w-4">{index + 1}</span>
                  <span className="text-white">{page.page}</span>
                </div>
                <span className="text-gray-400">{page.views} views</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Countries */}
        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Top Countries</h3>
          <div className="space-y-3">
            {stats.topCountries.map((country, index) => (
              <div key={country.country} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400 text-sm w-4">{index + 1}</span>
                  <span className="text-white">{country.country}</span>
                </div>
                <span className="text-gray-400">{country.visitors} visitors</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Device Breakdown */}
      <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Device Breakdown</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.deviceBreakdown.map((device) => (
            <div key={device.device} className="text-center">
              <div className="text-2xl mb-2">
                {device.device === 'desktop' ? '🖥️' : device.device === 'mobile' ? '📱' : '📱'}
              </div>
              <div className="text-white font-semibold capitalize">{device.device}</div>
              <div className="text-gray-400">{device.percentage}%</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}