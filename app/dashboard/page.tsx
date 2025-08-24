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
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Shield,
  AlertTriangle,
  Eye,
  TrendingUp,
  Globe,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react'
import Link from 'next/link'

// Mock data for demonstration
const mockData = {
  riskScore: 85,
  sitesMonitored: 247,
  threatsBlocked: 12,
  recentAlerts: 3,
  weeklyTrend: +15,
}

const recentActivity = [
  {
    id: 1,
    site: 'social-media-site.com',
    risk: 'high',
    threat: 'Personal data collection attempt',
    time: '2 minutes ago',
    status: 'blocked',
  },
  {
    id: 2,
    site: 'shopping-platform.com',
    risk: 'medium',
    threat: 'Tracking cookies detected',
    time: '15 minutes ago',
    status: 'monitored',
  },
  {
    id: 3,
    site: 'news-website.com',
    risk: 'low',
    threat: 'Standard analytics',
    time: '1 hour ago',
    status: 'safe',
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

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

  return (
    <div className="bg-background">
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
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" size="sm">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Privacy Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor your online privacy and security across all websites
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Privacy Score
              </CardTitle>
              <Shield className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {mockData.riskScore}%
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <Progress value={mockData.riskScore} className="flex-1" />
                <span className="text-xs text-chart-3">Good</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Sites Monitored
              </CardTitle>
              <Globe className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {mockData.sitesMonitored}
              </div>
              <p className="text-xs text-muted-foreground">Active monitoring</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Threats Blocked
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {mockData.threatsBlocked}
              </div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Recent Alerts
              </CardTitle>
              <Eye className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {mockData.recentAlerts}
              </div>
              <div className="flex items-center text-xs text-chart-3">
                <TrendingUp className="h-3 w-3 mr-1" />+{mockData.weeklyTrend}%
                from last week
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
            <TabsTrigger value="risks">Risk Analysis</TabsTrigger>
            <TabsTrigger value="remediation">Remediation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>
                  Latest privacy monitoring events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-2 h-2 rounded-full ${getRiskColor(
                            activity.risk
                          )} bg-current`}
                        />
                        <div>
                          <p className="font-medium text-foreground">
                            {activity.site}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {activity.threat}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge variant={getRiskBadgeVariant(activity.risk)}>
                          {activity.risk}
                        </Badge>
                        <div className="flex items-center space-x-2">
                          {activity.status === 'blocked' ? (
                            <XCircle className="h-4 w-4 text-destructive" />
                          ) : activity.status === 'safe' ? (
                            <CheckCircle className="h-4 w-4 text-chart-3" />
                          ) : (
                            <Eye className="h-4 w-4 text-accent" />
                          )}
                          <span className="text-xs text-muted-foreground">
                            {activity.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Link href="/dashboard/logs">
                    <Button variant="outline" className="w-full bg-transparent">
                      View All Activity
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Extension Status</CardTitle>
                  <CardDescription>
                    Browser extension monitoring status
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Monitoring</span>
                    <Badge
                      variant="outline"
                      className="bg-chart-3/10 text-chart-3"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Online
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Real-time Protection</span>
                    <Badge
                      variant="outline"
                      className="bg-chart-3/10 text-chart-3"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Enabled
                    </Badge>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Configure Extension
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy Insights</CardTitle>
                  <CardDescription>
                    Weekly privacy analysis summary
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Data Requests Blocked</span>
                    <span className="font-medium">23</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Risky Sites Detected</span>
                    <span className="font-medium">7</span>
                  </div>
                  <Link href="/dashboard/analytics">
                    <Button variant="outline" className="w-full bg-transparent">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      View Analytics
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monitoring">
            <Card>
              <CardHeader>
                <CardTitle>Website Monitoring</CardTitle>
                <CardDescription>
                  Real-time monitoring of all visited websites
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Monitoring logs will be displayed here
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Visit websites to see real-time monitoring data
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risks">
            <Card>
              <CardHeader>
                <CardTitle>Risk Analysis</CardTitle>
                <CardDescription>
                  AI-powered privacy risk detection and analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Risk analysis dashboard will be displayed here
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Advanced AI analytics for privacy threats
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="remediation">
            <Card>
              <CardHeader>
                <CardTitle>Remediation Guides</CardTitle>
                <CardDescription>
                  Step-by-step guides to protect your privacy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Remediation guides will be displayed here
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Get instant help when threats are detected
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
