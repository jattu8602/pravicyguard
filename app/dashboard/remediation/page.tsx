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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Shield,
  AlertTriangle,
  Chrome,
  FileBox as Firefox,
  Award as Safari,
  Trash2,
  Settings,
  ExternalLink,
  Clock,
  Zap,
  BookOpen,
} from 'lucide-react'
import Link from 'next/link'

// Mock remediation data
const activeThreats = [
  {
    id: 1,
    website: 'social-media-site.com',
    threat: 'Personal Information Collection',
    riskLevel: 'high',
    detectedAt: '2 minutes ago',
    status: 'active',
    remediationSteps: [
      'Immediately stop sharing information',
      'Close the website tab',
      'Clear cookies for this domain',
      'Clear browser cache',
      'Run privacy scan',
    ],
  },
  {
    id: 2,
    website: 'shopping-platform.com',
    threat: 'Third-party Tracking',
    riskLevel: 'medium',
    detectedAt: '15 minutes ago',
    status: 'monitoring',
    remediationSteps: [
      'Review privacy settings',
      'Block third-party cookies',
      'Clear tracking data',
      'Enable enhanced protection',
    ],
  },
]

const remediationGuides = [
  {
    id: 'high-risk-immediate',
    title: 'High-Risk Threat Response',
    description: 'Immediate actions for critical privacy threats',
    category: 'emergency',
    estimatedTime: '2-3 minutes',
    steps: [
      {
        title: 'Stop All Activity',
        description:
          'Immediately cease any interaction with the suspicious website',
        actions: [
          'Close the website tab',
          'Do not provide any additional information',
          'Take a screenshot if needed',
        ],
      },
      {
        title: 'Clear Browser Data',
        description:
          'Remove all traces of the suspicious website from your browser',
        actions: [
          'Clear cookies for the specific domain',
          'Clear browser cache and stored data',
          'Clear form data and passwords',
          'Clear download history',
        ],
      },
      {
        title: 'Revoke Permissions',
        description: 'Remove any permissions granted to the website',
        actions: [
          'Revoke location access',
          'Revoke camera and microphone permissions',
          'Revoke notification permissions',
          'Check for any installed extensions',
        ],
      },
      {
        title: 'Security Scan',
        description: 'Run a comprehensive security check',
        actions: [
          'Run antivirus scan',
          'Check for malware',
          'Verify no unauthorized downloads',
          'Monitor for unusual activity',
        ],
      },
    ],
  },
  {
    id: 'data-collection-response',
    title: 'Data Collection Threat',
    description: 'Response to unauthorized personal data collection',
    category: 'data-protection',
    estimatedTime: '5-10 minutes',
    steps: [
      {
        title: 'Assess Information Shared',
        description: 'Determine what information may have been compromised',
        actions: [
          'Review conversation history',
          'List any personal data shared',
          'Check for financial information disclosure',
          'Document the interaction',
        ],
      },
      {
        title: 'Immediate Protection',
        description: 'Protect your accounts and information',
        actions: [
          'Change passwords for related accounts',
          'Enable two-factor authentication',
          'Monitor bank and credit accounts',
          'Set up fraud alerts',
        ],
      },
      {
        title: 'Report the Incident',
        description: 'Report the suspicious activity to authorities',
        actions: [
          'Report to FTC (reportfraud.ftc.gov)',
          'Contact your bank if financial data involved',
          'Report to local authorities if necessary',
          'Document all evidence',
        ],
      },
    ],
  },
  {
    id: 'browser-cleanup',
    title: 'Complete Browser Cleanup',
    description: 'Comprehensive browser privacy cleanup',
    category: 'maintenance',
    estimatedTime: '10-15 minutes',
    steps: [
      {
        title: 'Clear Browsing Data',
        description: 'Remove all stored browsing information',
        actions: [
          'Clear browsing history',
          'Clear cookies and site data',
          'Clear cached images and files',
          'Clear download history',
        ],
      },
      {
        title: 'Reset Privacy Settings',
        description: 'Configure optimal privacy settings',
        actions: [
          'Block third-party cookies',
          'Disable location sharing',
          'Turn off password saving',
          'Disable autofill for forms',
        ],
      },
      {
        title: 'Update Security',
        description: 'Ensure browser security is up to date',
        actions: [
          'Update browser to latest version',
          'Review installed extensions',
          'Enable safe browsing',
          'Configure DNS over HTTPS',
        ],
      },
    ],
  },
]

const browserInstructions = {
  chrome: {
    name: 'Google Chrome',
    icon: Chrome,
    clearCookies: [
      'Click the three dots menu (⋮) in the top right',
      "Select 'Settings'",
      "Click 'Privacy and security' in the left sidebar",
      "Click 'Cookies and other site data'",
      "Click 'See all cookies and site data'",
      'Search for the website domain',
      'Click the trash icon to delete',
    ],
    clearCache: [
      'Press Ctrl+Shift+Delete (Cmd+Shift+Delete on Mac)',
      "Select 'All time' from the time range dropdown",
      "Check 'Cookies and other site data'",
      "Check 'Cached images and files'",
      "Click 'Clear data'",
    ],
  },
  firefox: {
    name: 'Mozilla Firefox',
    icon: Firefox,
    clearCookies: [
      'Click the menu button (☰) in the top right',
      "Select 'Settings'",
      "Click 'Privacy & Security' in the left panel",
      "Under 'Cookies and Site Data', click 'Manage Data'",
      'Search for the website domain',
      "Select and click 'Remove Selected'",
    ],
    clearCache: [
      'Press Ctrl+Shift+Delete (Cmd+Shift+Delete on Mac)',
      "Select 'Everything' from the time range",
      "Check 'Cookies' and 'Cache'",
      "Click 'Clear Now'",
    ],
  },
  safari: {
    name: 'Safari',
    icon: Safari,
    clearCookies: [
      "Click 'Safari' in the menu bar",
      "Select 'Preferences'",
      "Click the 'Privacy' tab",
      "Click 'Manage Website Data'",
      'Search for the website domain',
      "Select and click 'Remove'",
    ],
    clearCache: [
      "Click 'Safari' in the menu bar",
      "Select 'Clear History'",
      "Choose 'all history' from the dropdown",
      "Click 'Clear History'",
    ],
  },
}

export default function RemediationPage() {
  const [selectedBrowser, setSelectedBrowser] =
    useState<keyof typeof browserInstructions>('chrome')
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>(
    {}
  )
  const [activeGuide, setActiveGuide] = useState<string | null>(null)

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepId]: !prev[stepId],
    }))
  }

  const getCompletionPercentage = (guideId: string) => {
    const guide = remediationGuides.find((g) => g.id === guideId)
    if (!guide) return 0

    const totalSteps = guide.steps.reduce(
      (sum, step) => sum + step.actions.length,
      0
    )
    const completedCount = guide.steps.reduce(
      (sum, step) =>
        sum +
        step.actions.filter(
          (_, actionIndex) =>
            completedSteps[`${guideId}-${step.title}-${actionIndex}`]
        ).length,
      0
    )

    return Math.round((completedCount / totalSteps) * 100)
  }

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
            Remediation Guides
          </h1>
          <p className="text-muted-foreground">
            Step-by-step guides to protect your privacy and resolve threats
          </p>
        </div>

        {/* Active Threats Alert */}
        {activeThreats.length > 0 && (
          <Alert className="mb-8 border-destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle className="text-destructive">
              Active Privacy Threats Detected
            </AlertTitle>
            <AlertDescription>
              You have {activeThreats.length} active privacy threat(s) that
              require immediate attention.
            </AlertDescription>
          </Alert>
        )}

        {/* Active Threats */}
        {activeThreats.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Zap className="h-5 w-5 text-destructive" />
                <span>Immediate Action Required</span>
              </CardTitle>
              <CardDescription>
                Active threats requiring immediate remediation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeThreats.map((threat) => (
                  <div
                    key={threat.id}
                    className="border rounded-lg p-4 bg-destructive/5"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-foreground">
                          {threat.website}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {threat.threat}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Detected {threat.detectedAt}
                        </p>
                      </div>
                      <Badge variant="destructive">{threat.riskLevel}</Badge>
                    </div>
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium">Quick Actions:</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {threat.remediationSteps.map((step, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`threat-${threat.id}-step-${index}`}
                              checked={
                                completedSteps[
                                  `threat-${threat.id}-step-${index}`
                                ] || false
                              }
                              onCheckedChange={() =>
                                toggleStep(`threat-${threat.id}-step-${index}`)
                              }
                            />
                            <label
                              htmlFor={`threat-${threat.id}-step-${index}`}
                              className="text-sm text-foreground cursor-pointer"
                            >
                              {step}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Remediation Guides */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {remediationGuides.map((guide) => (
            <Card
              key={guide.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {guide.description}
                    </CardDescription>
                  </div>
                  <Badge variant="outline" className="ml-2">
                    {guide.category}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{guide.estimatedTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{guide.steps.length} steps</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Progress</span>
                    <span className="text-sm font-medium">
                      {getCompletionPercentage(guide.id)}%
                    </span>
                  </div>
                  <Progress value={getCompletionPercentage(guide.id)} />
                  <Button
                    className="w-full"
                    variant={activeGuide === guide.id ? 'secondary' : 'outline'}
                    onClick={() =>
                      setActiveGuide(activeGuide === guide.id ? null : guide.id)
                    }
                  >
                    {activeGuide === guide.id ? 'Hide Guide' : 'Start Guide'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Active Guide Details */}
        {activeGuide && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>
                {remediationGuides.find((g) => g.id === activeGuide)?.title} -
                Step-by-Step Guide
              </CardTitle>
              <CardDescription>
                Follow these steps carefully to resolve the privacy threat
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {remediationGuides
                  .find((g) => g.id === activeGuide)
                  ?.steps.map((step, stepIndex) => (
                    <AccordionItem key={stepIndex} value={`step-${stepIndex}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center">
                            {stepIndex + 1}
                          </div>
                          <span>{step.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="pl-8 space-y-4">
                          <p className="text-muted-foreground">
                            {step.description}
                          </p>
                          <div className="space-y-2">
                            {step.actions.map((action, actionIndex) => (
                              <div
                                key={actionIndex}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`${activeGuide}-${step.title}-${actionIndex}`}
                                  checked={
                                    completedSteps[
                                      `${activeGuide}-${step.title}-${actionIndex}`
                                    ] || false
                                  }
                                  onCheckedChange={() =>
                                    toggleStep(
                                      `${activeGuide}-${step.title}-${actionIndex}`
                                    )
                                  }
                                />
                                <label
                                  htmlFor={`${activeGuide}-${step.title}-${actionIndex}`}
                                  className="text-sm cursor-pointer"
                                >
                                  {action}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
              </Accordion>
            </CardContent>
          </Card>
        )}

        {/* Browser-Specific Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Settings className="h-5 w-5" />
              <span>Browser-Specific Instructions</span>
            </CardTitle>
            <CardDescription>
              Detailed instructions for clearing data in your specific browser
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Browser Selection */}
              <div className="flex space-x-4">
                {Object.entries(browserInstructions).map(([key, browser]) => (
                  <Button
                    key={key}
                    variant={selectedBrowser === key ? 'default' : 'outline'}
                    onClick={() =>
                      setSelectedBrowser(
                        key as keyof typeof browserInstructions
                      )
                    }
                    className="flex items-center space-x-2"
                  >
                    <browser.icon className="h-4 w-4" />
                    <span>{browser.name}</span>
                  </Button>
                ))}
              </div>

              {/* Instructions */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3 flex items-center space-x-2">
                    <Trash2 className="h-4 w-4" />
                    <span>Clear Cookies for Specific Site</span>
                  </h4>
                  <ol className="space-y-2 text-sm">
                    {browserInstructions[selectedBrowser].clearCookies.map(
                      (step, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      )
                    )}
                  </ol>
                </div>

                <div>
                  <h4 className="font-medium mb-3 flex items-center space-x-2">
                    <Trash2 className="h-4 w-4" />
                    <span>Clear All Browser Cache</span>
                  </h4>
                  <ol className="space-y-2 text-sm">
                    {browserInstructions[selectedBrowser].clearCache.map(
                      (step, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      )
                    )}
                  </ol>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Emergency Contacts */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <span>Emergency Resources</span>
            </CardTitle>
            <CardDescription>
              Important contacts and resources for serious privacy breaches
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium">Report Fraud & Identity Theft</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>FTC Identity Theft Hotline</span>
                    <span className="font-mono">1-877-438-4338</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>FTC Online Reporting</span>
                    <Button variant="ghost" size="sm" className="h-auto p-0">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      reportfraud.ftc.gov
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Credit Monitoring</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Equifax</span>
                    <span className="font-mono">1-800-685-1111</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Experian</span>
                    <span className="font-mono">1-888-397-3742</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>TransUnion</span>
                    <span className="font-mono">1-800-916-8800</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
