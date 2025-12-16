'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area } from 'recharts'

interface EngagementData {
  sessionDurationRanges: Array<{ range: string; count: number; percentage: number }>
  dailyEngagement: Array<{ date: string; avgDuration: number; sessions: number; bounceRate: number }>
  hourlyActivity: Array<{ hour: string; sessions: number; avgDuration: number }>
  scrollDepthData: Array<{ depth: string; users: number; percentage: number }>
  pageEngagement: Array<{ page: string; avgDuration: number; bounceRate: number; interactions: number }>
  userRetention: Array<{ day: string; returningUsers: number; newUsers: number }>
  deviceEngagement: Array<{ device: string; avgDuration: number; bounceRate: number }>
  realTimeMetrics: {
    activeUsers: number
    currentPageViews: number
    avgSessionDuration: number
    topActivePage: string
  }
}

export default function UserEngagement() {
  const [engagementData, setEngagementData] = useState<EngagementData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7d')
  const [refreshInterval, setRefreshInterval] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    fetchEngagementData()
    
    // Set up real-time updates every 30 seconds
    const interval = setInterval(fetchEngagementData, 30000)
    setRefreshInterval(interval)

    return () => {
      if (refreshInterval) clearInterval(refreshInterval)
      if (interval) clearInterval(interval)
    }
  }, [timeRange])

  const fetchEngagementData = async () => {
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

      // Fetch sessions and events
      const { data: sessions } = await supabase
        .from('user_sessions')
        .select('*')
        .gte('first_visit', startDate.toISOString())
        .lte('first_visit', endDate.toISOString())

      const { data: events } = await supabase
        .from('custom_events')
        .select('*')
        .gte('timestamp', startDate.toISOString())
        .lte('timestamp', endDate.toISOString())

      const { data: pageViews } = await supabase
        .from('page_views')
        .select('*')
        .gte('timestamp', startDate.toISOString())
        .lte('timestamp', endDate.toISOString())

      if (sessions && events && pageViews) {
        // Session duration ranges
        const durationRanges = [
          { range: '0-1 min', min: 0, max: 60 },
          { range: '1-3 min', min: 60, max: 180 },
          { range: '3-5 min', min: 180, max: 300 },
          { range: '5-10 min', min: 300, max: 600 },
          { range: '10+ min', min: 600, max: Infinity }
        ]

        const sessionDurationRanges = durationRanges.map(range => {
          const count = sessions.filter(s => 
            s.total_duration >= range.min && s.total_duration < range.max
          ).length
          return {
            range: range.range,
            count,
            percentage: sessions.length > 0 ? Math.round((count / sessions.length) * 100) : 0
          }
        })

        // Daily engagement trends
        const dailyData: Record<string, { sessions: number; totalDuration: number; bounces: number }> = {}
        
        sessions.forEach(session => {
          const date = new Date(session.first_visit).toISOString().split('T')[0]
          if (!dailyData[date]) {
            dailyData[date] = { sessions: 0, totalDuration: 0, bounces: 0 }
          }
          dailyData[date].sessions++
          dailyData[date].totalDuration += session.total_duration || 0
          
          // Consider bounce if session duration < 30 seconds or only 1 page view
          if ((session.total_duration || 0) < 30 || session.page_views <= 1) {
            dailyData[date].bounces++
          }
        })

        const dailyEngagement = Object.entries(dailyData)
          .map(([date, data]) => ({
            date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            avgDuration: Math.round(data.totalDuration / data.sessions) || 0,
            sessions: data.sessions,
            bounceRate: Math.round((data.bounces / data.sessions) * 100) || 0
          }))
          .sort((a, b) => a.date.localeCompare(b.date))

        // Hourly activity
        const hourlyData: Record<string, { sessions: number; totalDuration: number }> = {}
        
        sessions.forEach(session => {
          const hour = new Date(session.first_visit).getHours()
          const hourKey = `${hour}:00`
          if (!hourlyData[hourKey]) {
            hourlyData[hourKey] = { sessions: 0, totalDuration: 0 }
          }
          hourlyData[hourKey].sessions++
          hourlyData[hourKey].totalDuration += session.total_duration || 0
        })

        const hourlyActivity = Array.from({ length: 24 }, (_, i) => {
          const hourKey = `${i}:00`
          const data = hourlyData[hourKey] || { sessions: 0, totalDuration: 0 }
          return {
            hour: hourKey,
            sessions: data.sessions,
            avgDuration: data.sessions > 0 ? Math.round(data.totalDuration / data.sessions) : 0
          }
        })

        // Scroll depth analysis
        const scrollEvents = events.filter(e => e.event_name === 'scroll_depth')
        const scrollDepthCounts = { '25%': 0, '50%': 0, '75%': 0, '100%': 0 }
        
        scrollEvents.forEach(event => {
          const depth = event.properties?.depth
          if (depth && scrollDepthCounts.hasOwnProperty(`${depth}%`)) {
            scrollDepthCounts[`${depth}%` as keyof typeof scrollDepthCounts]++
          }
        })

        const totalScrollUsers = Object.values(scrollDepthCounts).reduce((a, b) => Math.max(a, b), 0)
        const scrollDepthData = Object.entries(scrollDepthCounts).map(([depth, users]) => ({
          depth,
          users,
          percentage: totalScrollUsers > 0 ? Math.round((users / totalScrollUsers) * 100) : 0
        }))

        // Page engagement
        const pageEngagementData: Record<string, { durations: number[]; bounces: number; interactions: number }> = {}
        
        pageViews.forEach(pv => {
          if (!pageEngagementData[pv.page_path]) {
            pageEngagementData[pv.page_path] = { durations: [], bounces: 0, interactions: 0 }
          }
          pageEngagementData[pv.page_path].durations.push(pv.duration || 0)
          
          if ((pv.duration || 0) < 30) {
            pageEngagementData[pv.page_path].bounces++
          }
        })

        // Count interactions per page
        events.forEach(event => {
          const page = event.properties?.page || '/'
          if (pageEngagementData[page]) {
            pageEngagementData[page].interactions++
          }
        })

        const pageEngagement = Object.entries(pageEngagementData)
          .map(([page, data]) => ({
            page,
            avgDuration: data.durations.length > 0 
              ? Math.round(data.durations.reduce((a, b) => a + b, 0) / data.durations.length) 
              : 0,
            bounceRate: data.durations.length > 0 
              ? Math.round((data.bounces / data.durations.length) * 100) 
              : 0,
            interactions: data.interactions
          }))
          .sort((a, b) => b.avgDuration - a.avgDuration)
          .slice(0, 5)

        // User retention (simplified)
        const retentionData: Record<string, { new: number; returning: number }> = {}
        
        sessions.forEach(session => {
          const date = new Date(session.first_visit).toISOString().split('T')[0]
          if (!retentionData[date]) {
            retentionData[date] = { new: 0, returning: 0 }
          }
          
          // Simple heuristic: if session has referrer, likely returning user
          if (session.referrer && !session.referrer.includes('google') && session.referrer !== 'direct') {
            retentionData[date].returning++
          } else {
            retentionData[date].new++
          }
        })

        const userRetention = Object.entries(retentionData)
          .map(([date, data]) => ({
            day: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            returningUsers: data.returning,
            newUsers: data.new
          }))
          .sort((a, b) => a.day.localeCompare(b.day))

        // Device engagement
        const deviceData: Record<string, { durations: number[]; bounces: number }> = {}
        
        sessions.forEach(session => {
          if (!deviceData[session.device_type]) {
            deviceData[session.device_type] = { durations: [], bounces: 0 }
          }
          deviceData[session.device_type].durations.push(session.total_duration || 0)
          
          if ((session.total_duration || 0) < 30 || session.page_views <= 1) {
            deviceData[session.device_type].bounces++
          }
        })

        const deviceEngagement = Object.entries(deviceData).map(([device, data]) => ({
          device,
          avgDuration: data.durations.length > 0 
            ? Math.round(data.durations.reduce((a, b) => a + b, 0) / data.durations.length) 
            : 0,
          bounceRate: data.durations.length > 0 
            ? Math.round((data.bounces / data.durations.length) * 100) 
            : 0
        }))

        // Real-time metrics (last 5 minutes)
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
        const recentSessions = sessions.filter(s => new Date(s.last_visit) > fiveMinutesAgo)
        const recentPageViews = pageViews.filter(pv => new Date(pv.timestamp) > fiveMinutesAgo)
        
        const realTimeMetrics = {
          activeUsers: recentSessions.length,
          currentPageViews: recentPageViews.length,
          avgSessionDuration: recentSessions.length > 0 
            ? Math.round(recentSessions.reduce((acc, s) => acc + (s.total_duration || 0), 0) / recentSessions.length)
            : 0,
          topActivePage: recentPageViews.length > 0 
            ? recentPageViews.reduce((acc, pv) => {
                acc[pv.page_path] = (acc[pv.page_path] || 0) + 1
                return acc
              }, {} as Record<string, number>)
            : { '/': 0 }
        }

        const topActivePage = Object.entries(realTimeMetrics.topActivePage)
          .sort(([,a], [,b]) => (b as number) - (a as number))[0]?.[0] || '/'

        setEngagementData({
          sessionDurationRanges,
          dailyEngagement,
          hourlyActivity,
          scrollDepthData,
          pageEngagement,
          userRetention,
          deviceEngagement,
          realTimeMetrics: {
            ...realTimeMetrics,
            topActivePage
          }
        })
      }
    } catch (error) {
      console.error('Error fetching engagement data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const COLORS = ['#d946ef', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading engagement analytics...</div>
      </div>
    )
  }

  if (!engagementData) {
    return (
      <div className="text-center text-gray-400">
        No engagement data available.
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">User Engagement Analytics</h2>
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

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Active Users</p>
              <p className="text-3xl font-bold text-green-400">{engagementData.realTimeMetrics.activeUsers}</p>
              <p className="text-gray-500 text-xs">Last 5 minutes</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Page Views</p>
              <p className="text-3xl font-bold text-blue-400">{engagementData.realTimeMetrics.currentPageViews}</p>
              <p className="text-gray-500 text-xs">Real-time</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">👁️</span>
            </div>
          </div>
        </div>

        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg. Session</p>
              <p className="text-3xl font-bold text-purple-400">{Math.round(engagementData.realTimeMetrics.avgSessionDuration / 60)}m</p>
              <p className="text-gray-500 text-xs">Current sessions</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⏱️</span>
            </div>
          </div>
        </div>

        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Top Active Page</p>
              <p className="text-lg font-bold text-white truncate">{engagementData.realTimeMetrics.topActivePage}</p>
              <p className="text-gray-500 text-xs">Most viewed now</p>
            </div>
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🔥</span>
            </div>
          </div>
        </div>
      </div>

      {/* Session Duration Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Session Duration Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={engagementData.sessionDurationRanges}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ range, percentage }) => `${range}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {engagementData.sessionDurationRanges.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Scroll Depth Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={engagementData.scrollDepthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="depth" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="users" fill="#d946ef" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Daily Engagement Trends */}
      <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Daily Engagement Trends</h3>
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={engagementData.dailyEngagement}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" />
            <YAxis yAxisId="left" stroke="#9CA3AF" />
            <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#F9FAFB'
              }} 
            />
            <Area yAxisId="left" type="monotone" dataKey="avgDuration" stackId="1" stroke="#d946ef" fill="#d946ef" fillOpacity={0.6} />
            <Line yAxisId="right" type="monotone" dataKey="bounceRate" stroke="#ef4444" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Hourly Activity & Page Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Hourly Activity Pattern</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={engagementData.hourlyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="hour" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Line type="monotone" dataKey="sessions" stroke="#06b6d4" strokeWidth={2} />
              <Line type="monotone" dataKey="avgDuration" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Top Engaging Pages</h3>
          <div className="space-y-4">
            {engagementData.pageEngagement.map((page, index) => (
              <div key={page.page} className="flex items-center justify-between p-3 bg-dark-800/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400 text-sm w-4">{index + 1}</span>
                  <div>
                    <div className="text-white font-medium">{page.page}</div>
                    <div className="text-gray-400 text-sm">{page.interactions} interactions</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">{Math.round(page.avgDuration / 60)}m</div>
                  <div className="text-gray-400 text-sm">{page.bounceRate}% bounce</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Retention & Device Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">User Retention</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={engagementData.userRetention}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="day" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151',
                  borderRadius: '8px',
                  color: '#F9FAFB'
                }} 
              />
              <Bar dataKey="newUsers" stackId="a" fill="#10b981" />
              <Bar dataKey="returningUsers" stackId="a" fill="#06b6d4" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Device Engagement</h3>
          <div className="space-y-4">
            {engagementData.deviceEngagement.map((device) => (
              <div key={device.device} className="flex items-center justify-between p-4 bg-dark-800/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    {device.device === 'desktop' ? '🖥️' : device.device === 'mobile' ? '📱' : '📱'}
                  </span>
                  <span className="text-white capitalize font-medium">{device.device}</span>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">{Math.round(device.avgDuration / 60)}m avg</div>
                  <div className="text-gray-400 text-sm">{device.bounceRate}% bounce rate</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}