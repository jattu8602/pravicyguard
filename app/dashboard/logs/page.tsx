'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Shield,
  Eye,
  Search,
  Filter,
  Download,
  RefreshCw,
  Globe,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ExternalLink,
} from 'lucide-react'
import Link from 'next/link'

// Mock monitoring data
const monitoringLogs = [
  {
    id: 1,
    timestamp: '2024-01-15T10:30:00Z',
    website: 'social-media-site.com',
    url: 'https://social-media-site.com/chat',
    riskLevel: 'high',
    category: 'data_collection',
    threat: 'Personal Information Request',
    description: 'AI chatbot requested phone number and email address',
    dataRequested: ['phone', 'email'],
    action: 'blocked',
    userAgent: 'Chrome Extension',
    ipAddress: '192.168.1.100',
  },
  {
    id: 2,
    timestamp: '2024-01-15T10:25:00Z',
    website: 'shopping-platform.com',
    url: 'https://shopping-platform.com/checkout',
    riskLevel: 'medium',
    category: 'tracking',
    threat: 'Third-party Tracking',
    description: 'Multiple tracking cookies detected from advertising networks',
    dataRequested: ['browsing_history', 'location'],
    action: 'monitored',
    userAgent: 'Chrome Extension',
    ipAddress: '192.168.1.100',
  },
  {
    id: 3,
    timestamp: '2024-01-15T10:20:00Z',
    website: 'news-website.com',
    url: 'https://news-website.com/article/123',
    riskLevel: 'low',
    category: 'analytics',
    threat: 'Standard Analytics',
    description: 'Google Analytics tracking detected',
    dataRequested: ['page_views'],
    action: 'allowed',
    userAgent: 'Chrome Extension',
    ipAddress: '192.168.1.100',
  },
  {
    id: 4,
    timestamp: '2024-01-15T10:15:00Z',
    website: 'banking-site.com',
    url: 'https://banking-site.com/login',
    riskLevel: 'high',
    category: 'suspicious',
    threat: 'Suspicious Data Collection',
    description: 'Unusual form fields detected requesting SSN',
    dataRequested: ['ssn', 'bank_account'],
    action: 'blocked',
    userAgent: 'Chrome Extension',
    ipAddress: '192.168.1.100',
  },
  {
    id: 5,
    timestamp: '2024-01-15T10:10:00Z',
    website: 'weather-app.com',
    url: 'https://weather-app.com/forecast',
    riskLevel: 'medium',
    category: 'location',
    threat: 'Location Tracking',
    description: 'Precise location access requested',
    dataRequested: ['precise_location'],
    action: 'monitored',
    userAgent: 'Chrome Extension',
    ipAddress: '192.168.1.100',
  },
]

export default function MonitoringLogsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [riskFilter, setRiskFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [activeTab, setActiveTab] = useState('all')

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'text-destructive'
      case 'medium':
        return 'text-accent'
      case 'low':
        return 'text-chart-3'
      default:
        return 'text-muted-foreground'
    }
  }

  const getRiskBadgeVariant = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'destructive'
      case 'medium':
        return 'secondary'
      case 'low':
        return 'outline'
      default:
        return 'outline'
    }
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'blocked':
        return <XCircle className="h-4 w-4 text-destructive" />
      case 'allowed':
        return <CheckCircle className="h-4 w-4 text-chart-3" />
      case 'monitored':
        return <Eye className="h-4 w-4 text-accent" />
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />
    }
  }

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString()
  }

  const filteredLogs = monitoringLogs.filter((log) => {
    const matchesSearch =
      log.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRisk = riskFilter === 'all' || log.riskLevel === riskFilter
    const matchesCategory =
      categoryFilter === 'all' || log.category === categoryFilter
    return matchesSearch && matchesRisk && matchesCategory
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">
              Privacy Guard
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="ghost">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Monitoring Logs
          </h1>
          <p className="text-muted-foreground">
            Detailed logs of all website privacy monitoring activities
          </p>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Filters & Search</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search websites or threats..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Risk Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="data_collection">
                    Data Collection
                  </SelectItem>
                  <SelectItem value="tracking">Tracking</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                  <SelectItem value="suspicious">Suspicious</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="bg-transparent">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monitoring Logs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Activity Logs</span>
                <Badge variant="outline">{filteredLogs.length} entries</Badge>
              </div>
            </CardTitle>
            <CardDescription>
              Real-time monitoring of website privacy activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredLogs.map((log) => (
                <div
                  key={log.id}
                  className="border rounded-lg p-4 hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-3 h-3 rounded-full ${getRiskColor(
                          log.riskLevel
                        )} bg-current`}
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium text-foreground">
                            {log.website}
                          </span>
                          <ExternalLink className="h-3 w-3 text-muted-foreground" />
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {log.url}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getRiskBadgeVariant(log.riskLevel)}>
                        {log.riskLevel}
                      </Badge>
                      {getActionIcon(log.action)}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <h4 className="font-medium text-foreground mb-1">
                        {log.threat}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {log.description}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">
                        Data Requested
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {log.dataRequested.map((data, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                          >
                            {data.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground border-t pt-3">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatTimestamp(log.timestamp)}</span>
                      </div>
                      <span>Category: {log.category.replace('_', ' ')}</span>
                      <span>Action: {log.action}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-1 text-xs"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {filteredLogs.length === 0 && (
              <div className="text-center py-8">
                <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  No monitoring logs found
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Try adjusting your filters or visit some websites to generate
                  logs
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Today's Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">247</div>
              <p className="text-xs text-muted-foreground">
                Websites monitored
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Threats Detected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">12</div>
              <p className="text-xs text-muted-foreground">
                High-risk activities blocked
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Data Protected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-3">98%</div>
              <p className="text-xs text-muted-foreground">
                Privacy protection rate
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
