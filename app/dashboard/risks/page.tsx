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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import {
  Shield,
  AlertTriangle,
  Brain,
  TrendingUp,
  TrendingDown,
  Eye,
  Bot,
  CreditCard,
  Phone,
  Mail,
  MapPin,
  User,
  Building,
} from 'lucide-react'
import Link from 'next/link'

// Mock risk analysis data
const riskTrendData = [
  { date: 'Jan 1', high: 4, medium: 12, low: 8 },
  { date: 'Jan 2', high: 6, medium: 15, low: 10 },
  { date: 'Jan 3', high: 3, medium: 18, low: 12 },
  { date: 'Jan 4', high: 8, medium: 14, low: 9 },
  { date: 'Jan 5', high: 5, medium: 20, low: 15 },
  { date: 'Jan 6', high: 7, medium: 16, low: 11 },
  { date: 'Jan 7', high: 9, medium: 22, low: 13 },
]

const riskCategoryData = [
  { name: 'Personal Info', value: 35, color: '#dc2626' },
  { name: 'Financial Data', value: 25, color: '#f59e0b' },
  { name: 'Location', value: 20, color: '#3b82f6' },
  { name: 'Contact Info', value: 15, color: '#22c55e' },
  { name: 'Other', value: 5, color: '#6b7280' },
]

const aiDetectionData = [
  { hour: '00:00', chatbots: 2, dataRequests: 5, threats: 1 },
  { hour: '04:00', chatbots: 1, dataRequests: 3, threats: 0 },
  { hour: '08:00', chatbots: 8, dataRequests: 15, threats: 3 },
  { hour: '12:00', chatbots: 12, dataRequests: 25, threats: 5 },
  { hour: '16:00', chatbots: 15, dataRequests: 30, threats: 7 },
  { hour: '20:00', chatbots: 10, dataRequests: 18, threats: 4 },
]

const riskPatterns = [
  {
    id: 1,
    pattern: 'Phone Number Requests',
    icon: Phone,
    detections: 23,
    riskLevel: 'high',
    trend: 'up',
    description: 'AI chatbots requesting phone numbers',
  },
  {
    id: 2,
    pattern: 'Email Collection',
    icon: Mail,
    detections: 18,
    riskLevel: 'medium',
    trend: 'down',
    description: 'Forms and bots collecting email addresses',
  },
  {
    id: 3,
    pattern: 'Financial Information',
    icon: CreditCard,
    detections: 12,
    riskLevel: 'high',
    trend: 'up',
    description: 'Requests for credit card or banking details',
  },
  {
    id: 4,
    pattern: 'Location Tracking',
    icon: MapPin,
    detections: 15,
    riskLevel: 'medium',
    trend: 'stable',
    description: 'Precise location access requests',
  },
  {
    id: 5,
    pattern: 'Personal Identity',
    icon: User,
    detections: 8,
    riskLevel: 'high',
    trend: 'up',
    description: 'SSN, ID numbers, or personal identifiers',
  },
  {
    id: 6,
    pattern: 'Employment Info',
    icon: Building,
    detections: 6,
    riskLevel: 'low',
    trend: 'down',
    description: 'Job, company, or income information',
  },
]

export default function RiskAnalysisPage() {
  const [timeRange, setTimeRange] = useState('7d')
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

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-destructive" />
      case 'down':
        return <TrendingDown className="h-4 w-4 text-chart-3" />
      default:
        return <div className="w-4 h-4" />
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
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24h</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
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
            AI Risk Detection
          </h1>
          <p className="text-muted-foreground">
            Advanced AI-powered analysis of privacy threats and data collection
            patterns
          </p>
        </div>

        {/* Risk Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Overall Risk Score
              </CardTitle>
              <Brain className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">73/100</div>
              <div className="flex items-center space-x-2 mt-2">
                <Progress value={73} className="flex-1" />
                <span className="text-xs text-accent">Medium</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                AI Detections
              </CardTitle>
              <Bot className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">127</div>
              <p className="text-xs text-muted-foreground">
                Chatbot interactions analyzed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                High Risk Patterns
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">43</div>
              <p className="text-xs text-muted-foreground">
                Critical privacy threats
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Protection Rate
              </CardTitle>
              <Shield className="h-4 w-4 text-chart-3" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-chart-3">94%</div>
              <p className="text-xs text-muted-foreground">
                Threats successfully blocked
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Risk Overview</TabsTrigger>
            <TabsTrigger value="patterns">Threat Patterns</TabsTrigger>
            <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
            <TabsTrigger value="trends">Risk Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Risk Categories Pie Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Risk Categories</CardTitle>
                  <CardDescription>
                    Distribution of detected privacy risks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={riskCategoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {riskCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Risk Trend Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Risk Trend Analysis</CardTitle>
                  <CardDescription>
                    Daily risk detection patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={riskTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="high"
                        stackId="1"
                        stroke="#dc2626"
                        fill="#dc2626"
                      />
                      <Area
                        type="monotone"
                        dataKey="medium"
                        stackId="1"
                        stroke="#f59e0b"
                        fill="#f59e0b"
                      />
                      <Area
                        type="monotone"
                        dataKey="low"
                        stackId="1"
                        stroke="#22c55e"
                        fill="#22c55e"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Detected Risk Patterns</CardTitle>
                <CardDescription>
                  AI-identified privacy threat patterns and their frequency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {riskPatterns.map((pattern) => (
                    <div
                      key={pattern.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-muted rounded-lg">
                          <pattern.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">
                            {pattern.pattern}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {pattern.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-foreground">
                              {pattern.detections}
                            </span>
                            {getTrendIcon(pattern.trend)}
                          </div>
                          <Badge
                            variant="outline"
                            className={getRiskColor(pattern.riskLevel)}
                          >
                            {pattern.riskLevel}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai-analysis" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Chatbot Analysis</CardTitle>
                <CardDescription>
                  Real-time analysis of chatbot interactions and data requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={aiDetectionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="chatbots"
                      fill="#3b82f6"
                      name="Chatbot Interactions"
                    />
                    <Bar
                      dataKey="dataRequests"
                      fill="#f59e0b"
                      name="Data Requests"
                    />
                    <Bar
                      dataKey="threats"
                      fill="#dc2626"
                      name="Threats Detected"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">AI Confidence Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">
                    96.8%
                  </div>
                  <Progress value={96.8} className="mt-2" />
                  <p className="text-xs text-muted-foreground mt-2">
                    Threat detection accuracy
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">False Positives</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-chart-3">2.1%</div>
                  <p className="text-xs text-muted-foreground">
                    Low false positive rate
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Model Updates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">Daily</div>
                  <p className="text-xs text-muted-foreground">
                    AI model refresh frequency
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk Trend Analysis</CardTitle>
                <CardDescription>
                  Historical analysis of privacy risk patterns over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={riskTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="high"
                      stroke="#dc2626"
                      strokeWidth={2}
                      name="High Risk"
                    />
                    <Line
                      type="monotone"
                      dataKey="medium"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      name="Medium Risk"
                    />
                    <Line
                      type="monotone"
                      dataKey="low"
                      stroke="#22c55e"
                      strokeWidth={2}
                      name="Low Risk"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Weekly Summary</CardTitle>
                  <CardDescription>
                    Risk detection summary for the past week
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Threats Detected</span>
                    <span className="font-bold text-foreground">89</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">High-Risk Incidents</span>
                    <span className="font-bold text-destructive">23</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Websites Analyzed</span>
                    <span className="font-bold text-foreground">1,247</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Protection Effectiveness</span>
                    <span className="font-bold text-chart-3">94.2%</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Predictions</CardTitle>
                  <CardDescription>AI-powered risk forecasting</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Expected Threats (Next 24h)</span>
                    <span className="font-bold text-accent">12-15</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Risk Level Trend</span>
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4 text-destructive" />
                      <span className="font-bold text-destructive">
                        Increasing
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Recommended Action</span>
                    <Badge variant="outline" className="text-accent">
                      Enhanced Monitoring
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="mt-8 flex justify-center space-x-4">
          <Link href="/dashboard/logs">
            <Button variant="outline" className="bg-transparent">
              <Eye className="h-4 w-4 mr-2" />
              View Detailed Logs
            </Button>
          </Link>
          <Link href="/dashboard/remediation">
            <Button>
              <Shield className="h-4 w-4 mr-2" />
              Get Remediation Guide
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
