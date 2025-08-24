'use client'

import { useState, useEffect } from 'react'
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
import { Switch } from '@/components/ui/switch'
import {
  Shield,
  AlertTriangle,
  Eye,
  Globe,
  Activity,
  Wifi,
  WifiOff,
  Settings,
  Play,
  Pause,
  BarChart3,
} from 'lucide-react'
import Link from 'next/link'

// Mock real-time monitoring data
const mockRealTimeData = [
  {
    id: 1,
    website: 'example-shop.com',
    status: 'monitoring',
    riskLevel: 'low',
    lastActivity: '2 seconds ago',
    dataRequests: 3,
  },
  {
    id: 2,
    website: 'social-platform.com',
    status: 'alert',
    riskLevel: 'high',
    lastActivity: '5 seconds ago',
    dataRequests: 12,
  },
  {
    id: 3,
    website: 'news-site.com',
    status: 'safe',
    riskLevel: 'low',
    lastActivity: '10 seconds ago',
    dataRequests: 1,
  },
]

export default function MonitoringPage() {
  const [isMonitoring, setIsMonitoring] = useState(true)
  const [realTimeEnabled, setRealTimeEnabled] = useState(true)
  const [currentSites, setCurrentSites] = useState(mockRealTimeData)

  // Simulate real-time updates
  useEffect(() => {
    if (!realTimeEnabled) return

    const interval = setInterval(() => {
      setCurrentSites((prev) =>
        prev.map((site) => ({
          ...site,
          lastActivity: `${Math.floor(Math.random() * 60)} seconds ago`,
          dataRequests: site.dataRequests + Math.floor(Math.random() * 3),
        }))
      )
    }, 3000)

    return () => clearInterval(interval)
  }, [realTimeEnabled])

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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'monitoring':
        return <Eye className="h-4 w-4 text-primary" />
      case 'alert':
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      case 'safe':
        return <Shield className="h-4 w-4 text-chart-3" />
      default:
        return <Globe className="h-4 w-4 text-muted-foreground" />
    }
  }

  return (

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
            Real-time Monitoring
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Live monitoring of website privacy activities and data collection
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <Activity className="h-5 w-5" />
                <span>Monitoring Status</span>
              </CardTitle>
              <CardDescription>
                Control your privacy monitoring settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {isMonitoring ? (
                    <Wifi className="h-4 w-4 text-chart-3" />
                  ) : (
                    <WifiOff className="h-4 w-4 text-muted-foreground" />
                  )}
                  <span className="font-medium text-sm sm:text-base">
                    Active Monitoring
                  </span>
                </div>
                <Switch
                  checked={isMonitoring}
                  onCheckedChange={setIsMonitoring}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Activity className="h-4 w-4 text-primary" />
                  <span className="font-medium text-sm sm:text-base">
                    Real-time Updates
                  </span>
                </div>
                <Switch
                  checked={realTimeEnabled}
                  onCheckedChange={setRealTimeEnabled}
                />
              </div>
              <div className="pt-4 border-t">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Button
                    size="sm"
                    variant={isMonitoring ? 'outline' : 'default'}
                    className="bg-transparent w-full sm:w-auto"
                  >
                    {isMonitoring ? (
                      <Pause className="h-4 w-4 mr-2" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    {isMonitoring ? 'Pause' : 'Start'} Monitoring
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-transparent w-full sm:w-auto"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Configure
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-lg">
                <BarChart3 className="h-5 w-5" />
                <span>Live Statistics</span>
              </CardTitle>
              <CardDescription>
                Current monitoring session statistics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Active Sites</span>
                <span className="font-bold text-foreground">
                  {currentSites.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Data Requests Detected</span>
                <span className="font-bold text-foreground">
                  {currentSites.reduce(
                    (sum, site) => sum + site.dataRequests,
                    0
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Threats Blocked</span>
                <span className="font-bold text-destructive">3</span>
              </div>
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Protection Level</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="flex items-center space-x-2">
                <Eye className="h-5 w-5" />
                <span>Live Activity Feed</span>
              </div>
              {realTimeEnabled && (
                <Badge
                  variant="outline"
                  className="bg-chart-3/10 text-chart-3 w-fit"
                >
                  <Activity className="h-3 w-3 mr-1" />
                  Live
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Real-time monitoring of currently active websites
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isMonitoring ? (
              <div className="space-y-3 sm:space-y-4">
                {currentSites.map((site) => (
                  <div
                    key={site.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 border rounded-lg space-y-3 sm:space-y-0"
                  >
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      {getStatusIcon(site.status)}
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground text-sm sm:text-base truncate">
                          {site.website}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          Last activity: {site.lastActivity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-3 sm:space-x-4">
                      <div className="text-left sm:text-right">
                        <p className="text-sm font-medium">
                          {site.dataRequests} requests
                        </p>
                        <Badge
                          variant="outline"
                          className={getRiskColor(site.riskLevel)}
                        >
                          {site.riskLevel} risk
                        </Badge>
                      </div>
                      <div
                        className={`w-2 h-2 rounded-full ${getRiskColor(
                          site.riskLevel
                        )} bg-current flex-shrink-0`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <WifiOff className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Monitoring is currently paused
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Enable monitoring to see real-time activity
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <Link href="/dashboard/logs" className="w-full sm:w-auto">
            <Button variant="outline" className="bg-transparent w-full">
              View Full Logs
            </Button>
          </Link>
          <Link href="/dashboard/risks" className="w-full sm:w-auto">
            <Button variant="outline" className="bg-transparent w-full">
              Risk Analysis
            </Button>
          </Link>
        </div>
      </div>
   
  )
}
