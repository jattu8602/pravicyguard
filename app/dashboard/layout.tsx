'use client'

import type React from 'react'

import {
  Shield,
  Home,
  Eye,
  AlertTriangle,
  Settings,
  BarChart3,
  FileText,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Monitoring', href: '/dashboard/monitoring', icon: Eye },
  { name: 'Risk Analysis', href: '/dashboard/risks', icon: AlertTriangle },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'Logs', href: '/dashboard/logs', icon: FileText },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
]

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow pt-5 bg-sidebar border-r overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <Shield className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-sidebar-foreground">
              Privacy Guard
            </span>
          </div>
          <div className="mt-8 flex-grow flex flex-col">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors',
                      isActive
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                    )}
                  >
                    <item.icon
                      className={cn(
                        'mr-3 h-5 w-5 flex-shrink-0',
                        isActive
                          ? 'text-sidebar-accent-foreground'
                          : 'text-sidebar-foreground'
                      )}
                    />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-y-auto dashboard-content">
        {children}
      </div>
    </div>
  )
}
