'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import {
  X,
  Bot,
  Shield,
  AlertTriangle,
  CheckCircle,
  Eye,
  BarChart3,
} from 'lucide-react'

interface BotLog {
  timestamp: string
  bot: string
  risk: string
  message: string
}

interface BotDetectorExtensionProps {
  onClose: () => void
  onDashboard: () => void
  logs: BotLog[]
}

export function BotDetectorExtension({
  onClose,
  onDashboard,
  logs,
}: BotDetectorExtensionProps) {
  const [isEnabled, setIsEnabled] = useState(true)

  const mockStats = {
    botsDetected: logs.length,
    harmful: logs.filter((log) => log.risk === 'harmful').length,
    safe: logs.filter((log) => log.risk === 'safe').length,
    warnings: logs.filter(
      (log) => log.risk === 'warning' || log.risk === 'risky'
    ).length,
  }

  const getLatestAlert = () => {
    const recentHarmful = logs.find(
      (log) => log.risk === 'harmful' || log.risk === 'risky'
    )
    return recentHarmful || null
  }

  const latestAlert = getLatestAlert()

  return (
    <Card className="w-80 shadow-lg border-2">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Bot Misuse AI Detector</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Toggle Switch */}
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <span className="text-sm font-medium">Detection Active</span>
          <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
        </div>

        {isEnabled ? (
          <>
            {/* Status Indicators */}
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-4 h-4 text-green-600 mx-auto mb-1" />
                <div className="text-sm font-bold text-green-600">
                  {mockStats.safe}
                </div>
                <div className="text-xs text-muted-foreground">Safe</div>
              </div>
              <div className="text-center p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-yellow-600 mx-auto mb-1" />
                <div className="text-sm font-bold text-yellow-600">
                  {mockStats.warnings}
                </div>
                <div className="text-xs text-muted-foreground">Warning</div>
              </div>
              <div className="text-center p-2 bg-red-50 border border-red-200 rounded-lg">
                <X className="w-4 h-4 text-red-600 mx-auto mb-1" />
                <div className="text-sm font-bold text-red-600">
                  {mockStats.harmful}
                </div>
                <div className="text-xs text-muted-foreground">Harmful</div>
              </div>
            </div>

            {/* Bots Detected */}
            <div className="text-center p-3 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-foreground">
                {mockStats.botsDetected}
              </div>
              <div className="text-sm text-muted-foreground">Bots Detected</div>
            </div>

            {logs.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-semibold">Recent Bot Activity</h4>
                <ScrollArea className="h-24 w-full">
                  <div className="space-y-1">
                    {logs.slice(0, 5).map((log, index) => (
                      <div key={index} className="text-xs p-2 bg-muted rounded">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold">{log.bot}</span>
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
                        </div>
                        <p className="text-muted-foreground truncate mt-1">
                          {log.message}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {log.timestamp}
                        </p>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}

            {/* Recent Alert */}
            {latestAlert && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span className="text-sm font-medium text-red-800">
                    Latest Alert
                  </span>
                </div>
                <p className="text-xs text-red-700">
                  {latestAlert.bot}: {latestAlert.message}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full bg-transparent"
              >
                <Eye className="w-4 h-4 mr-2" />
                View All Details
              </Button>
              <Button onClick={onDashboard} className="w-full">
                <BarChart3 className="w-4 h-4 mr-2" />
                Go to Dashboard
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <Bot className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">
              Detection is disabled
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Enable to start monitoring AI bots
            </p>
          </div>
        )}

        {/* Privacy Notice */}
        <div className="text-xs text-muted-foreground text-center border-t pt-3">
          <Shield className="w-3 h-3 inline mr-1" />
          Client-side processing • End-to-end encrypted
        </div>
      </CardContent>
    </Card>
  )
}
