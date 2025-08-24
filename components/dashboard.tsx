'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  ArrowLeft,
  Activity,
  Bot,
  Shield,
  CheckCircle,
  Clock,
} from 'lucide-react'

interface NetworkLog {
  timestamp: string
  type: string
  url: string
  status: string
}

interface BotLog {
  timestamp: string
  bot: string
  risk: string
  message: string
}

interface DashboardProps {
  onBack: () => void
  networkLogs: NetworkLog[]
  botLogs: BotLog[]
}

export function Dashboard({ onBack, networkLogs, botLogs }: DashboardProps) {
  const networkStats = {
    totalRequests: networkLogs.length,
    blockedThreats: networkLogs.filter(
      (log) => log.status === '403' || log.url.includes('malicious')
    ).length,
    safeConnections: networkLogs.filter((log) => log.status === '200').length,
    riskySites: networkLogs.filter(
      (log) => log.url.includes('xyz.com') || log.url.includes('suspicious')
    ).length,
  }

  const botStats = {
    botsAnalyzed: botLogs.length,
    safeInteractions: botLogs.filter((log) => log.risk === 'safe').length,
    warnings: botLogs.filter(
      (log) => log.risk === 'warning' || log.risk === 'risky'
    ).length,
    harmfulBots: botLogs.filter((log) => log.risk === 'harmful').length,
  }

  const recentActivity = [
    ...networkLogs.slice(0, 3).map((log) => ({
      time: log.timestamp,
      site: log.url,
      status:
        log.status === '403'
          ? 'blocked'
          : log.status === '200'
          ? 'safe'
          : 'warning',
      type: 'network' as const,
    })),
    ...botLogs.slice(0, 2).map((log) => ({
      time: log.timestamp,
      site: log.bot,
      status:
        log.risk === 'harmful'
          ? 'blocked'
          : log.risk === 'safe'
          ? 'safe'
          : 'warning',
      type: 'bot' as const,
    })),
  ]
    .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
    .slice(0, 10)

  return (
    <div className="h-[600px] overflow-auto bg-background">
      {/* Header */}
      <div className="sticky top-0 bg-background border-b p-4 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Browser
          </Button>
          <div>
            <h1 className="text-2xl font-bold">SecureGuard Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Real-time security monitoring and analysis
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Network Requests
                  </p>
                  <p className="text-2xl font-bold">
                    {networkStats.totalRequests}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Threats Blocked
                  </p>
                  <p className="text-2xl font-bold text-red-500">
                    {networkStats.blockedThreats}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-sm text-muted-foreground">Bots Analyzed</p>
                  <p className="text-2xl font-bold">{botStats.botsAnalyzed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Safe Connections
                  </p>
                  <p className="text-2xl font-bold text-green-500">
                    {networkStats.safeConnections}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Analytics */}
        <Tabs defaultValue="network" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="network">Network Logs</TabsTrigger>
            <TabsTrigger value="bots">Bot Detection</TabsTrigger>
            <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="network" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Network Security Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Safe Connections</span>
                    <Badge className="bg-green-500 text-white">
                      {networkStats.safeConnections}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Blocked Threats</span>
                    <Badge className="bg-red-500 text-white">
                      {networkStats.blockedThreats}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Risky Sites Detected</span>
                    <Badge className="bg-orange-500 text-white">
                      {networkStats.riskySites}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Network Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-48">
                    <div className="space-y-2">
                      {networkLogs.slice(0, 20).map((log, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-2 bg-muted rounded text-sm"
                        >
                          <div className="flex-1 truncate">
                            <span className="font-mono text-xs">
                              {log.type}
                            </span>{' '}
                            {log.url}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                log.status === '403'
                                  ? 'destructive'
                                  : 'secondary'
                              }
                              className="text-xs"
                            >
                              {log.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {log.timestamp}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="bots" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    Bot Analysis Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Safe Interactions</span>
                    <Badge className="bg-green-500 text-white">
                      {botStats.safeInteractions}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Warnings Issued</span>
                    <Badge className="bg-yellow-500 text-white">
                      {botStats.warnings}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Harmful Bots</span>
                    <Badge className="bg-red-500 text-white">
                      {botStats.harmfulBots}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bot Interaction Logs</CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-48">
                    <div className="space-y-2">
                      {botLogs.slice(0, 15).map((log, index) => (
                        <div
                          key={index}
                          className="p-2 bg-muted rounded text-sm"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-semibold">{log.bot}</span>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={
                                  log.risk === 'harmful'
                                    ? 'destructive'
                                    : log.risk === 'risky'
                                    ? 'destructive'
                                    : log.risk === 'warning'
                                    ? 'secondary'
                                    : 'default'
                                }
                                className="text-xs"
                              >
                                {log.risk}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {log.timestamp}
                              </span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {log.message}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Security Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-3">
                    {recentActivity.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          {activity.type === 'network' ? (
                            <Activity className="w-4 h-4 text-primary" />
                          ) : (
                            <Bot className="w-4 h-4 text-blue-500" />
                          )}
                          <div>
                            <p className="text-sm font-medium">
                              {activity.site}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {activity.time}
                            </p>
                          </div>
                        </div>
                        <Badge
                          className={
                            activity.status === 'blocked'
                              ? 'bg-red-500 text-white'
                              : activity.status === 'warning'
                              ? 'bg-yellow-500 text-white'
                              : 'bg-green-500 text-white'
                          }
                        >
                          {activity.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
