'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface ContactSubmission {
  id: string
  name: string
  email: string
  company?: string
  budget: string
  message: string
  source_page: string
  timestamp: string
  status: 'pending' | 'contacted' | 'converted'
  ip_address?: string
  user_agent?: string
}

interface ContactStats {
  totalSubmissions: number
  pendingCount: number
  contactedCount: number
  convertedCount: number
  conversionRate: number
  avgResponseTime: number
  submissionsBySource: Array<{ source: string; count: number }>
  submissionsByBudget: Array<{ budget: string; count: number }>
  recentSubmissions: ContactSubmission[]
}

export default function ContactSubmissions() {
  const [contactStats, setContactStats] = useState<ContactStats | null>(null)
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30d')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    fetchContactData()
  }, [timeRange, statusFilter])

  const fetchContactData = async () => {
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
        case 'all':
          startDate.setFullYear(2020) // Get all data
          break
      }

      // Build query
      let query = supabase
        .from('contact_submissions')
        .select('*')
        .gte('timestamp', startDate.toISOString())
        .lte('timestamp', endDate.toISOString())
        .order('timestamp', { ascending: false })

      // Apply status filter
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter)
      }

      const { data: contactData } = await query

      if (contactData) {
        // Calculate stats
        const totalSubmissions = contactData.length
        const pendingCount = contactData.filter(c => c.status === 'pending').length
        const contactedCount = contactData.filter(c => c.status === 'contacted').length
        const convertedCount = contactData.filter(c => c.status === 'converted').length
        const conversionRate = totalSubmissions > 0 ? (convertedCount / totalSubmissions) * 100 : 0

        // Calculate average response time (mock data for now)
        const avgResponseTime = 24 // hours

        // Group by source page
        const sourceGroups = contactData.reduce((acc: Record<string, number>, submission) => {
          const source = submission.source_page || 'Unknown'
          acc[source] = (acc[source] || 0) + 1
          return acc
        }, {})

        const submissionsBySource = Object.entries(sourceGroups)
          .map(([source, count]) => ({ source, count }))
          .sort((a, b) => b.count - a.count)

        // Group by budget
        const budgetGroups = contactData.reduce((acc: Record<string, number>, submission) => {
          acc[submission.budget] = (acc[submission.budget] || 0) + 1
          return acc
        }, {})

        const submissionsByBudget = Object.entries(budgetGroups)
          .map(([budget, count]) => ({ budget, count }))
          .sort((a, b) => b.count - a.count)

        const stats: ContactStats = {
          totalSubmissions,
          pendingCount,
          contactedCount,
          convertedCount,
          conversionRate,
          avgResponseTime,
          submissionsBySource,
          submissionsByBudget,
          recentSubmissions: contactData.slice(0, 10)
        }

        setContactStats(stats)
        setSubmissions(contactData)
      }
    } catch (error) {
      console.error('Error fetching contact data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateSubmissionStatus = async (id: string, newStatus: 'pending' | 'contacted' | 'converted') => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ status: newStatus })
        .eq('id', id)

      if (!error) {
        // Refresh data
        fetchContactData()
      }
    } catch (error) {
      console.error('Error updating submission status:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      case 'contacted': return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'converted': return 'bg-green-500/10 text-green-400 border-green-500/20'
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20'
    }
  }

  const getBudgetColor = (budget: string) => {
    const budgetValue = parseInt(budget.replace(/[^0-9]/g, ''))
    if (budgetValue >= 200) return 'text-green-400'
    if (budgetValue >= 100) return 'text-yellow-400'
    return 'text-gray-400'
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading contact submissions...</div>
      </div>
    )
  }

  if (!contactStats) {
    return (
      <div className="text-center text-gray-400">
        No contact submissions available.
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Contact Submissions</h2>
        <div className="flex space-x-2">
          {['7d', '30d', '90d', 'all'].map((range) => (
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

      {/* Contact Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Submissions</p>
              <p className="text-3xl font-bold text-white">{contactStats.totalSubmissions}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📧</span>
            </div>
          </div>
        </div>

        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Pending</p>
              <p className="text-3xl font-bold text-yellow-400">{contactStats.pendingCount}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⏳</span>
            </div>
          </div>
        </div>

        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Conversion Rate</p>
              <p className="text-3xl font-bold text-green-400">{contactStats.conversionRate.toFixed(1)}%</p>
            </div>
            <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
          </div>
        </div>

        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Avg. Response</p>
              <p className="text-3xl font-bold text-white">{contactStats.avgResponseTime}h</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4">
        <div className="text-white font-medium">Filter by status:</div>
        <div className="flex space-x-2">
          {['all', 'pending', 'contacted', 'converted'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors capitalize ${
                statusFilter === status
                  ? 'bg-primary-500 text-white'
                  : 'bg-dark-800/50 text-gray-400 hover:text-white hover:bg-dark-700/50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Submissions by Source</h3>
          <div className="space-y-3">
            {contactStats.submissionsBySource.map((source) => (
              <div key={source.source} className="flex items-center justify-between">
                <span className="text-white">{source.source}</span>
                <div className="text-right">
                  <div className="text-white font-medium">{source.count}</div>
                  <div className="text-gray-400 text-sm">
                    {((source.count / contactStats.totalSubmissions) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Submissions by Budget</h3>
          <div className="space-y-3">
            {contactStats.submissionsByBudget.map((budget) => (
              <div key={budget.budget} className="flex items-center justify-between">
                <span className={`font-medium ${getBudgetColor(budget.budget)}`}>
                  {budget.budget}
                </span>
                <div className="text-right">
                  <div className="text-white font-medium">{budget.count}</div>
                  <div className="text-gray-400 text-sm">
                    {((budget.count / contactStats.totalSubmissions) * 100).toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Recent Submissions</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-gray-400 text-sm border-b border-white/10">
                <th className="text-left py-3">Contact</th>
                <th className="text-left py-3">Company</th>
                <th className="text-left py-3">Budget</th>
                <th className="text-left py-3">Source</th>
                <th className="text-left py-3">Date</th>
                <th className="text-left py-3">Status</th>
                <th className="text-left py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.slice(0, 20).map((submission) => (
                <tr key={submission.id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-4">
                    <div>
                      <div className="text-white font-medium">{submission.name}</div>
                      <div className="text-gray-400 text-sm">{submission.email}</div>
                    </div>
                  </td>
                  <td className="py-4 text-gray-300">
                    {submission.company || 'N/A'}
                  </td>
                  <td className="py-4">
                    <span className={`font-medium ${getBudgetColor(submission.budget)}`}>
                      {submission.budget}
                    </span>
                  </td>
                  <td className="py-4 text-gray-300">
                    {submission.source_page}
                  </td>
                  <td className="py-4 text-gray-300">
                    {new Date(submission.timestamp).toLocaleDateString()}
                  </td>
                  <td className="py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(submission.status)}`}>
                      {submission.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex space-x-2">
                      {submission.status === 'pending' && (
                        <button
                          onClick={() => updateSubmissionStatus(submission.id, 'contacted')}
                          className="px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded text-xs hover:bg-blue-500/20 transition-colors"
                        >
                          Mark Contacted
                        </button>
                      )}
                      {submission.status === 'contacted' && (
                        <button
                          onClick={() => updateSubmissionStatus(submission.id, 'converted')}
                          className="px-2 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded text-xs hover:bg-green-500/20 transition-colors"
                        >
                          Mark Converted
                        </button>
                      )}
                      <button
                        onClick={() => {
                          const subject = `Re: ${submission.name} - Portfolio Inquiry`
                          const body = `Hi ${submission.name},\n\nThank you for your interest in my services. I'd love to discuss your project further.\n\nBest regards,\nOblivion`
                          window.open(`mailto:${submission.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`)
                        }}
                        className="px-2 py-1 bg-gray-500/10 text-gray-400 border border-gray-500/20 rounded text-xs hover:bg-gray-500/20 transition-colors"
                      >
                        Reply
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {submissions.length === 0 && (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">📧</div>
            <div className="text-white font-medium">No submissions yet</div>
            <div className="text-gray-400 text-sm">Contact submissions will appear here</div>
          </div>
        )}
      </div>

      {/* Message Preview Modal would go here */}
      {/* For now, we'll show the message in a simple expandable format */}
      {submissions.length > 0 && (
        <div className="bg-dark-900/50 backdrop-blur-sm rounded-xl border border-white/10 p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Latest Message</h3>
          <div className="bg-dark-800/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-white font-medium">{submissions[0].name}</div>
              <div className="text-gray-400 text-sm">
                {new Date(submissions[0].timestamp).toLocaleString()}
              </div>
            </div>
            <div className="text-gray-300 whitespace-pre-wrap">
              {submissions[0].message}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}