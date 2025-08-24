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
  ArrowLeft,
  Calendar,
  TrendingUp,
  AlertTriangle,
} from 'lucide-react'
import Link from 'next/link'

// Mock monitoring data
const monitoringLogs = [
  {
    id: 1,
    timestamp: '2024-01-15T10:30:00Z',
    website: 'social-media-site.com',
    riskLevel: 'high',
    threat: 'Personal Information Request',
    description: 'AI chatbot requested phone number and email address',
    action: 'blocked',
  },
  {
    id: 2,
    timestamp: '2024-01-15T10:25:00Z',
    website: 'shopping-platform.com',
    riskLevel: 'medium',
    threat: 'Third-party Tracking',
    description: 'Multiple tracking cookies detected from advertising networks',
    action: 'monitored',
  },
  {
    id: 3,
    timestamp: '2024-01-15T10:20:00Z',
    website: 'news-website.com',
    riskLevel: 'low',
    threat: 'Standard Analytics',
    description: 'Google Analytics tracking detected',
    action: 'allowed',
  },
  {
    id: 4,
    timestamp: '2024-01-15T10:15:00Z',
    website: 'banking-site.com',
    riskLevel: 'high',
    threat: 'Suspicious Data Collection',
    description: 'Unusual form fields detected requesting SSN',
    action: 'blocked',
  },
  {
    id: 5,
    timestamp: '2024-01-15T10:10:00Z',
    website: 'weather-app.com',
    riskLevel: 'medium',
    threat: 'Location Tracking',
    description: 'Precise location access requested',
    action: 'monitored',
  },
]

export default function MonitoringLogsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [riskFilter, setRiskFilter] = useState('all')

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
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const filteredLogs = monitoringLogs.filter((log) => {
    const matchesSearch =
      log.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRisk = riskFilter === 'all' || log.riskLevel === riskFilter
    return matchesSearch && matchesRisk
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Navigation Header */}
        <div className="mb-8">
          <Link href="/dashboard" className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors duration-200 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Activity Logs
              </h1>
              <p className="text-muted-foreground">
                Monitor your privacy protection activities
              </p>
            </div>
            <div className="flex items-center space-x-3">
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
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Today's Activity</p>
                  <p className="text-2xl font-bold text-foreground">247</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Threats Blocked</p>
                  <p className="text-2xl font-bold text-destructive">12</p>
                </div>
                <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Protection Rate</p>
                  <p className="text-2xl font-bold text-chart-3">98%</p>
                </div>
                <div className="w-12 h-12 bg-chart-3/10 rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-chart-3" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search websites or threats..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-transparent border-2 focus:border-primary/50"
                />
              </div>
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-full sm:w-48 bg-transparent border-2">
                  <SelectValue placeholder="Filter by risk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Risk Levels</SelectItem>
                  <SelectItem value="high">High Risk</SelectItem>
                  <SelectItem value="medium">Medium Risk</SelectItem>
                  <SelectItem value="low">Low Risk</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Logs List */}
        <div className="space-y-4">
          {filteredLogs.map((log) => (
            <Card 
              key={log.id} 
              className="border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm animate-scale-in"
              style={{ animationDelay: `${log.id * 0.1}s` }}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className={`w-3 h-3 rounded-full mt-2 ${getRiskColor(log.riskLevel)} bg-current`} />
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <Globe className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-foreground text-lg">
                          {log.website}
                        </h3>
                        <Badge variant={getRiskBadgeVariant(log.riskLevel)} className="text-xs">
                          {log.riskLevel}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-foreground mb-1">
                        {log.threat}
                      </h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {log.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getActionIcon(log.action)}
                    <span className="text-sm text-muted-foreground capitalize">
                      {log.action}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatTimestamp(log.timestamp)}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 hover:bg-primary/10">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredLogs.length === 0 && (
          <Card className="border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
            <CardContent className="pt-12 pb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No logs found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('')
                    setRiskFilter('all')
                  }}
                  className="bg-transparent"
                >
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Load More */}
        {filteredLogs.length > 0 && (
          <div className="text-center mt-8">
            <Button variant="outline" className="bg-transparent">
              Load More Logs
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
