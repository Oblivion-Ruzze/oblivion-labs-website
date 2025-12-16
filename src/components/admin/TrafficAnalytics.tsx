'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface TrafficData {
  hourlyTraffic: Array<{ hour: string; visitors: number; pageViews: number }>
  referrerSources: Array<{ source: string; visitors: number; percentage: number }>
  topPages: Array<{ page: string; views: number; uniqueVisitors: number; avgDuration: number }>
  geographicData: Array<{ country: string; city: string; visitors: number }>
  deviceStats: Array<{ device: string; visitors: number; percentage: number }>
  browserStats: Array<{ browser: string; visitors: number; percentage: number }>
}

export default function TrafficAnalytics() {
  const [trafficData, setTrafficData] = useState<TrafficData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7d')

  useEffect(() => {
    fetchTrafficData()
  }, [timeRange])

  const fetchTrafficData = async () => {
    setIsLoading(true)
    try {
      const endDate = new Date()
      const startDate = new Date()
      
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
      }

      // Fetch page views and sessions
      const { data: pageViews } = await supabase
        .from('page_views')
        .select('*')
        .gte('timestamp', startDate.toISOString())
        .lte('timestamp', endDate.toISOString())

      const { data: sessions } = await supabase
        .from('user_sessions')
        .select('*')
        .gte('first_visit', startDate.toISOString())
        .lte('first_visit', endDate.toISOString())

      if (pageViews && sessions) {
        // Process hourly traffic
        const hourlyData: Record<string, { visitors: Set<string>; pageViews: number }> = {}
        
        pageViews.forEach(pv => {
          const hour = new Date(pv.timestamp).toISOString().slice(0, 13) + ':00'
          if (!hourlyData[hour]) {
            hourlyData[hour] = { visitors: new Set(), pageViews: 0 }
          }
          hourlyData[hour].visitors.add(pv.session_id)
          hourlyData[hour].pageViews++
        })

        const hourlyTraffic = Object.entries(hourlyData)
          .map(([hour, data]) => ({
            hour: new Date(hour).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            visitors: data.visitors.size,
            pageViews: data.pageViews
          }))
          .sort((a, b) => a.hour.localeCompare(b.hour))

        // Process referrer sources
        const referrerCounts: Record<string, number> = {}
        sessions.forEach(session => {
          const referrer = session.referrer || 'direct'
          let source = 'Direct'
          
          if (referrer.includes('google')) source = 'Google'
          else if (referrer.includes('facebook')) source = 'Facebook'
          else if (referrer.includes('twitter')) source = 'Twitter'
          else if (referrer.includes('linkedin')) source = 'LinkedIn'
          else if (referrer !== 'direct') source = 'Other'
          
          referrerCounts[source] = (referrerCounts[source] || 0) + 1
        })

        const totalReferrers = Object.values(referrerCounts).reduce((a, b) => a + b, 0)
        const referrerSources = Object.entries(referrerCounts)
          .map(([source, visitors]) => ({
            source,
            visitors,
            percentage: Math.round((visitors / totalReferrers) * 100)
          }))
          .sort((a, b) => b.visitors - a.visitors)

        // Process top pages
        const pageStats: Record<string, { views: number; sessions: Set<string>; totalDuration: number }> = {}
        
        pageViews.forEach(pv => {
          if (!pageStats[pv.page_path]) {
            pageStats[pv.page_path] = { views: 0, sessions: new Set(), totalDuration: 0 }
          }
          pageStats[pv.page_path].views++
          pageStats[pv.page_path].sessions.add(pv.session_id)
          pageStats[pv.page_path].totalDuration += pv.duration || 0
        })

        const topPages = Object.entries(pageStats)
          .map(([page, stats]) => ({
            page,
            views: stats.views,
            uniqueVisitors: stats.sessions.size,
            avgDuration: Math.round(stats.totalDuration / stats.views) || 0
          }))
          .sort((a, b) => b.views - a.views)
          .slice(0, 10)

        // Process geographic data
        const geoCounts: Record<string, number> = {}
        sessions.forEach(session => {
          const location = `${session.country || 'Unknown'}, ${session.city || 'Unknown'}`
          geoCounts[location] = (geoCounts[location] || 0) + 1
        })

        const geographicData = Object.entries(geoCounts)
          .map(([location, visitors]) => {
            const [country, city] = location.split(', ')
            return { country, city, visitors }
          })
          .sort((a, b) => b.visitors - a.visitors)
          .slice(0, 10)

        // Process device stats
        const deviceCounts: Record<string, number> = {}
        sessions.forEach(session => {
          deviceCounts[session.device_type] = (deviceCounts[session.device_type] || 0) + 1
        })

        const totalDevices = Object.values(deviceCounts).reduce((a, b) => a + b, 0)
        const deviceStats = Object.entries(deviceCounts)
          .map(([device, visitors]) => ({
            device,
            visitors,
            percentage: Math.round((visitors / totalDevices) * 100)
          }))

        // Process browser stats (simplified from user agent)
        const browserCounts: Record<string, number> = {}
        pageViews.forEach(pv => {
          const userAgent = pv.user_agent || ''
          let browser = 'Other'
          
          if (userAgent.includes('Chrome')) browser = 'Chrome'
          else if (userAgent.includes('Firefox')) browser = 'Firefox'
          else if (userAgent.includes('Safari')) browser = 'Safari'
          else if (userAgent.includes('Edge')) browser = 'Edge'
          
          browserCounts[browser] = (browserCounts[browser] || 0) + 1
        })

        const totalBrowsers = Object.values(browserCounts).reduce((a, b) => a + b, 0)
        const browserStats = Object.entries(browserCounts)
          .map(([browser, visitors]) => ({
            browser,
            visitors,
            percentage: Math.round((visitors / totalBrowsers) * 100)
          }))
          .sort((a, b) => b.visitors - a.visitors)

        setTrafficData({
          hourlyTraffic,
          referrerSources,
          topPages,
          geographicData,
          deviceStats,
          browserStats
        })
      }
    } catch (error) {
      console.error('Error fetching traffic data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading traffic analytics...</div>
      </div>
    )
  }

  if (!trafficData) {
    return (
      <div className="text-center text-gray-400">
        No traffic data available.
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Traffic Analytics</h2>
        <div className="flex space-x-2">
          {['24h', '7d', '30d'].map((range) => (
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

      {/* Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Traffic Sources</h3>
          <div className="space-y-4">
            {trafficData.referrerSources.map((source) => (
              <div key={source.source} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                  <span className="text-white">{source.source}</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">{source.visitors}</div>
                  <div className="text-gray-400 text-sm">{source.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Device Breakdown</h3>
          <div className="space-y-4">
            {trafficData.deviceStats.map((device) => (
              <div key={device.device} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    {device.device === 'desktop' ? '🖥️' : device.device === 'mobile' ? '📱' : '📱'}
                  </span>
                  <span className="text-white capitalize">{device.device}</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">{device.visitors}</div>
                  <div className="text-gray-400 text-sm">{device.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Pages */}
      <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Top Pages</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 text-sm">
                <th className="text-left py-2">Page</th>
                <th className="text-right py-2">Views</th>
                <th className="text-right py-2">Unique Visitors</th>
                <th className="text-right py-2">Avg. Duration</th>
              </tr>
            </thead>
            <tbody>
              {trafficData.topPages.map((page) => (
                <tr key={page.page} className="border-t border-white/5">
                  <td className="py-3 text-white">{page.page}</td>
                  <td className="py-3 text-right text-gray-300">{page.views.toLocaleString()}</td>
                  <td className="py-3 text-right text-gray-300">{page.uniqueVisitors.toLocaleString()}</td>
                  <td className="py-3 text-right text-gray-300">{Math.round(page.avgDuration / 60)}m</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Geographic Data */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Top Locations</h3>
          <div className="space-y-3">
            {trafficData.geographicData.slice(0, 8).map((location, index) => (
              <div key={`${location.country}-${location.city}`} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400 text-sm w-4">{index + 1}</span>
                  <div>
                    <div className="text-white">{location.country}</div>
                    <div className="text-gray-400 text-sm">{location.city}</div>
                  </div>
                </div>
                <span className="text-gray-300">{location.visitors}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Browser Usage</h3>
          <div className="space-y-3">
            {trafficData.browserStats.map((browser, index) => (
              <div key={browser.browser} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400 text-sm w-4">{index + 1}</span>
                  <span className="text-white">{browser.browser}</span>
                </div>
                <div className="text-right">
                  <div className="text-gray-300">{browser.visitors}</div>
                  <div className="text-gray-400 text-sm">{browser.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}