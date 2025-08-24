'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  X,
  Shield,
  AlertTriangle,
  CheckCircle,
  Activity,
  Eye,
  BarChart3,
} from 'lucide-react'

interface NetworkLog {
  timestamp: string
  type: string
  url: string
  status: string
}

interface NetworkLogsExtensionProps {
  onClose: () => void
  onDashboard: () => void
  tabStatus: 'safe' | 'warning' | 'suspicious' | 'risky'
  logs: NetworkLog[]
}

export function NetworkLogsExtension({
  onClose,
  onDashboard,
  tabStatus,
  logs,
}: NetworkLogsExtensionProps) {
  const getStatusConfig = () => {
    switch (tabStatus) {
      case 'risky':
        return {
          icon: AlertTriangle,
          text: 'Risky',
          color: 'bg-red-500 text-white',
          requests: logs.length,
          warnings: logs.filter(
            (log) => log.status === '403' || log.url.includes('malicious')
          ).length,
          description: 'Harmful website detected',
        }
      case 'suspicious':
        return {
          icon: AlertTriangle,
          text: 'Suspicious',
          color: 'bg-orange-500 text-white',
          requests: logs.length,
          warnings: logs.filter(
            (log) => log.url.includes('suspicious') || log.url.includes('fake')
          ).length,
          description: 'Suspicious activity detected',
        }
      case 'warning':
        return {
          icon: AlertTriangle,
          text: 'Warnings',
          color: 'bg-yellow-500 text-white',
          requests: logs.length,
          warnings: logs.filter((log) => log.url.includes('warning')).length,
          description: 'Some suspicious activity',
        }
      default:
        return {
          icon: CheckCircle,
          text: 'All Good',
          color: 'bg-green-500 text-white',
          requests: logs.length,
          warnings: 0,
          description: 'Safe browsing',
        }
    }
  }

  const status = getStatusConfig()
  const StatusIcon = status.icon

  return (
    <Card className="w-80 shadow-lg border-2">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Network Logs</CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Status Badge */}
        <div className="flex items-center justify-center">
          <Badge className={`${status.color} px-4 py-2 text-sm font-medium`}>
            <StatusIcon className="w-4 h-4 mr-2" />
            {status.text}
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-primary">
              {status.requests}
            </div>
            <div className="text-xs text-muted-foreground">
              Network Requests
            </div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-secondary">
              {status.warnings}
            </div>
            <div className="text-xs text-muted-foreground">Warnings</div>
          </div>
        </div>

        {/* Description */}
        <div className="text-center text-sm text-muted-foreground">
          {status.description}
        </div>

        {logs.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Recent Activity</h4>
            <ScrollArea className="h-32 w-full">
              <div className="space-y-1">
                {logs.slice(0, 10).map((log, index) => (
                  <div
                    key={index}
                    className="text-xs p-2 bg-muted rounded flex justify-between items-center"
                  >
                    <div className="flex-1 truncate">
                      <span className="font-mono">{log.type}</span> {log.url}
                    </div>
                    <Badge
                      variant={
                        log.status === '403' ? 'destructive' : 'secondary'
                      }
                      className="text-xs"
                    >
                      {log.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          {(tabStatus === 'risky' || tabStatus === 'suspicious') && (
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent"
            >
              <Eye className="w-4 h-4 mr-2" />
              See All Logs
            </Button>
          )}
          <Button onClick={onDashboard} className="w-full">
            <BarChart3 className="w-4 h-4 mr-2" />
            Go to Dashboard
          </Button>
        </div>

        {/* End-to-End Encryption Notice */}
        <div className="text-xs text-muted-foreground text-center border-t pt-3">
          <Shield className="w-3 h-3 inline mr-1" />
          End-to-end encrypted
        </div>
      </CardContent>
    </Card>
  )
}
