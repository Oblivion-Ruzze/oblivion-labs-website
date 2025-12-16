'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface SEOData {
  organicTraffic: number
  organicGrowth: number
  avgPosition: number
  totalKeywords: number
  topKeywords: Array<{ keyword: string; position: number; traffic: number; trend: 'up' | 'down' | 'stable' }>
  coreWebVitals: {
    lcp: number
    fid: number
    cls: number
    score: 'good' | 'needs-improvement' | 'poor'
  }
  pageSpeedScore: number
  backlinks: number
  domainAuthority: number
  technicalIssues: Array<{ issue: string; severity: 'high' | 'medium' | 'low'; count: number }>
  topLandingPages: Array<{ page: string; organicTraffic: number; avgPosition: number }>
}

export default function SEOMetrics() {
  const [seoData, setSeoData] = useState<SEOData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30d')

  useEffect(() => {
    fetchSEOData()
  }, [timeRange])

  const fetchSEOData = async () => {
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

      // Fetch organic traffic from page views (simplified - in real app you'd use Google Analytics API)
      const { data: pageViews } = await supabase
        .from('page_views')
        .select('*')
        .gte('timestamp', startDate.toISOString())
        .lte('timestamp', endDate.toISOString())

      // Fetch SEO metrics from database
      const { data: seoMetrics } = await supabase
        .from('seo_metrics')
        .select('*')
        .gte('date', startDate.toISOString().split('T')[0])
        .lte('date', endDate.toISOString().split('T')[0])
        .order('date', { ascending: false })

      if (pageViews) {
        // Calculate organic traffic (simplified - filter by referrer containing search engines)
        const organicViews = pageViews.filter(pv => 
          pv.referrer && (
            pv.referrer.includes('google') || 
            pv.referrer.includes('bing') || 
            pv.referrer.includes('yahoo') ||
            pv.referrer.includes('duckduckgo')
          )
        )
        
        const organicTraffic = organicViews.length
        
        // Calculate growth (compare with previous period)
        const previousStartDate = new Date(startDate)
        const previousEndDate = new Date(startDate)
        const daysDiff = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
        previousStartDate.setDate(previousStartDate.getDate() - daysDiff)
        
        const { data: previousPageViews } = await supabase
          .from('page_views')
          .select('*')
          .gte('timestamp', previousStartDate.toISOString())
          .lte('timestamp', previousEndDate.toISOString())

        const previousOrganicViews = previousPageViews?.filter(pv => 
          pv.referrer && (
            pv.referrer.includes('google') || 
            pv.referrer.includes('bing') || 
            pv.referrer.includes('yahoo') ||
            pv.referrer.includes('duckduckgo')
          )
        ) || []

        const organicGrowth = previousOrganicViews.length > 0 
          ? ((organicTraffic - previousOrganicViews.length) / previousOrganicViews.length) * 100 
          : 0

        // Mock SEO data (in real app, you'd integrate with Google Search Console, SEMrush, etc.)
        const mockSEOData: SEOData = {
          organicTraffic,
          organicGrowth,
          avgPosition: 15.2,
          totalKeywords: 47,
          topKeywords: [
            { keyword: 'web developer cuba', position: 3, traffic: 120, trend: 'up' },
            { keyword: 'fullstack developer', position: 8, traffic: 85, trend: 'stable' },
            { keyword: 'react developer', position: 12, traffic: 65, trend: 'up' },
            { keyword: 'portfolio website', position: 18, traffic: 45, trend: 'down' },
            { keyword: 'freelance developer', position: 22, traffic: 32, trend: 'stable' }
          ],
          coreWebVitals: {
            lcp: 1.2, // Largest Contentful Paint (seconds)
            fid: 8,   // First Input Delay (milliseconds)
            cls: 0.05, // Cumulative Layout Shift
            score: 'good'
          },
          pageSpeedScore: 94,
          backlinks: 23,
          domainAuthority: 28,
          technicalIssues: [
            { issue: 'Missing meta descriptions', severity: 'medium', count: 2 },
            { issue: 'Images without alt text', severity: 'low', count: 1 },
            { issue: 'Slow loading resources', severity: 'medium', count: 3 }
          ],
          topLandingPages: [
            { page: '/', organicTraffic: organicTraffic * 0.6, avgPosition: 12.5 },
            { page: '/about', organicTraffic: organicTraffic * 0.2, avgPosition: 18.3 },
            { page: '/contact', organicTraffic: organicTraffic * 0.1, avgPosition: 25.1 },
            { page: '/projects', organicTraffic: organicTraffic * 0.1, avgPosition: 22.8 }
          ]
        }

        // If we have real SEO metrics from database, use those instead
        if (seoMetrics && seoMetrics.length > 0) {
          const latestMetrics = seoMetrics[0]
          mockSEOData.pageSpeedScore = latestMetrics.page_speed_score || mockSEOData.pageSpeedScore
          mockSEOData.backlinks = latestMetrics.backlinks || mockSEOData.backlinks
          mockSEOData.domainAuthority = latestMetrics.domain_authority || mockSEOData.domainAuthority
          
          if (latestMetrics.core_web_vitals) {
            mockSEOData.coreWebVitals = {
              ...mockSEOData.coreWebVitals,
              ...latestMetrics.core_web_vitals
            }
          }
        }

        setSeoData(mockSEOData)
      }
    } catch (error) {
      console.error('Error fetching SEO data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading SEO metrics...</div>
      </div>
    )
  }

  if (!seoData) {
    return (
      <div className="text-center text-gray-400">
        No SEO data available.
      </div>
    )
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400'
    if (score >= 70) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getVitalsColor = (score: string) => {
    switch (score) {
      case 'good': return 'text-green-400'
      case 'needs-improvement': return 'text-yellow-400'
      case 'poor': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈'
      case 'down': return '📉'
      case 'stable': return '➡️'
      default: return '➡️'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">SEO Metrics</h2>
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

      {/* Key SEO Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Organic Traffic</p>
              <p className="text-3xl font-bold text-white">{seoData.organicTraffic}</p>
              <p className={`text-sm ${seoData.organicGrowth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {seoData.organicGrowth >= 0 ? '+' : ''}{seoData.organicGrowth.toFixed(1)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🔍</span>
            </div>
          </div>
        </div>

        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg. Position</p>
              <p className="text-3xl font-bold text-white">{seoData.avgPosition}</p>
              <p className="text-gray-400 text-sm">{seoData.totalKeywords} keywords</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
          </div>
        </div>

        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Page Speed</p>
              <p className={`text-3xl font-bold ${getScoreColor(seoData.pageSpeedScore)}`}>
                {seoData.pageSpeedScore}
              </p>
              <p className="text-gray-400 text-sm">Score</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
          </div>
        </div>

        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Domain Authority</p>
              <p className="text-3xl font-bold text-white">{seoData.domainAuthority}</p>
              <p className="text-gray-400 text-sm">{seoData.backlinks} backlinks</p>
            </div>
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🔗</span>
            </div>
          </div>
        </div>
      </div>

      {/* Core Web Vitals */}
      <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Core Web Vitals</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-white font-semibold">LCP</div>
            <div className={`text-2xl font-bold ${getVitalsColor(seoData.coreWebVitals.score)}`}>
              {seoData.coreWebVitals.lcp}s
            </div>
            <div className="text-gray-400 text-sm">Largest Contentful Paint</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-white font-semibold">FID</div>
            <div className={`text-2xl font-bold ${getVitalsColor(seoData.coreWebVitals.score)}`}>
              {seoData.coreWebVitals.fid}ms
            </div>
            <div className="text-gray-400 text-sm">First Input Delay</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl mb-2">📐</div>
            <div className="text-white font-semibold">CLS</div>
            <div className={`text-2xl font-bold ${getVitalsColor(seoData.coreWebVitals.score)}`}>
              {seoData.coreWebVitals.cls}
            </div>
            <div className="text-gray-400 text-sm">Cumulative Layout Shift</div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getVitalsColor(seoData.coreWebVitals.score)}`}>
            Overall Score: {seoData.coreWebVitals.score.replace('-', ' ').toUpperCase()}
          </span>
        </div>
      </div>

      {/* Top Keywords and Landing Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Top Keywords</h3>
          <div className="space-y-3">
            {seoData.topKeywords.map((keyword, index) => (
              <div key={keyword.keyword} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400 text-sm w-4">{index + 1}</span>
                  <div>
                    <div className="text-white">{keyword.keyword}</div>
                    <div className="text-gray-400 text-sm">{keyword.traffic} visits</div>
                  </div>
                </div>
                <div className="text-right flex items-center space-x-2">
                  <div>
                    <div className="text-white font-medium">#{keyword.position}</div>
                    <div className="text-gray-400 text-sm">position</div>
                  </div>
                  <span className="text-lg">{getTrendIcon(keyword.trend)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Top Landing Pages</h3>
          <div className="space-y-3">
            {seoData.topLandingPages.map((page, index) => (
              <div key={page.page} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400 text-sm w-4">{index + 1}</span>
                  <div>
                    <div className="text-white">{page.page}</div>
                    <div className="text-gray-400 text-sm">#{page.avgPosition.toFixed(1)} avg position</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">{Math.round(page.organicTraffic)}</div>
                  <div className="text-gray-400 text-sm">organic visits</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Technical Issues */}
      <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Technical SEO Issues</h3>
        {seoData.technicalIssues.length > 0 ? (
          <div className="space-y-3">
            {seoData.technicalIssues.map((issue) => (
              <div key={issue.issue} className="flex items-center justify-between p-3 bg-dark-800/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    issue.severity === 'high' ? 'bg-red-500' :
                    issue.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></div>
                  <div>
                    <div className="text-white">{issue.issue}</div>
                    <div className={`text-sm capitalize ${getSeverityColor(issue.severity)}`}>
                      {issue.severity} severity
                    </div>
                  </div>
                </div>
                <div className="text-white font-medium">
                  {issue.count} {issue.count === 1 ? 'issue' : 'issues'}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">✅</div>
            <div className="text-white font-medium">No technical issues found!</div>
            <div className="text-gray-400 text-sm">Your site is technically optimized</div>
          </div>
        )}
      </div>

      {/* SEO Recommendations */}
      <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">SEO Recommendations</h3>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-500/10 rounded-lg flex items-center justify-center mt-0.5">
              <span className="text-blue-400 text-sm">💡</span>
            </div>
            <div>
              <div className="text-white font-medium">Improve Core Web Vitals</div>
              <div className="text-gray-400 text-sm">Optimize images and reduce JavaScript bundle size to improve LCP</div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-500/10 rounded-lg flex items-center justify-center mt-0.5">
              <span className="text-green-400 text-sm">🎯</span>
            </div>
            <div>
              <div className="text-white font-medium">Target Long-tail Keywords</div>
              <div className="text-gray-400 text-sm">Focus on "freelance web developer Cuba" and similar specific terms</div>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-purple-500/10 rounded-lg flex items-center justify-center mt-0.5">
              <span className="text-purple-400 text-sm">🔗</span>
            </div>
            <div>
              <div className="text-white font-medium">Build Quality Backlinks</div>
              <div className="text-gray-400 text-sm">Reach out to tech blogs and local business directories</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}