import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Shield,
  Eye,
  AlertTriangle,
  TrendingUp,
  Chrome,
  Globe,
} from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="bg-background main-page">
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
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              Protect Your Privacy
              <span className="text-primary block">Across Every Website</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Advanced AI-powered monitoring that detects privacy risks, harmful
              data collection, and provides instant remediation guides for safer
              browsing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Start Free Monitoring
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-transparent"
              >
                View Demo
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Web Dashboard</span>
            </div>
            <div className="flex items-center space-x-2">
              <Chrome className="h-4 w-4" />
              <span>Browser Extension</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl font-bold text-foreground">
              Complete Privacy Protection
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our dual-platform approach monitors every interaction and provides
              real-time insights to keep your data safe.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Eye className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Real-time Monitoring</CardTitle>
                <CardDescription>
                  Track every website interaction and data request in real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Our extension monitors all website activities, logging data
                  collection attempts and suspicious behavior patterns.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <AlertTriangle className="h-8 w-8 text-accent mb-2" />
                <CardTitle>AI Risk Detection</CardTitle>
                <CardDescription>
                  Advanced AI identifies privacy threats and harmful patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Machine learning algorithms analyze chatbot interactions and
                  detect when websites attempt to collect sensitive personal
                  information.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-chart-3 mb-2" />
                <CardTitle>Instant Remediation</CardTitle>
                <CardDescription>
                  Step-by-step guides to protect yourself from detected threats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Get immediate guidance on clearing cookies, revoking
                  permissions, and finding safer alternatives to risky websites.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              Ready to Take Control of Your Privacy?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Join thousands of users who trust Privacy Guard to keep their data
              safe across the web.
            </p>
          </div>

          <Link href="/register">
            <Button size="lg">Get Started Free</Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-8 px-4">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Privacy Guard. Protecting your digital privacy.</p>
        </div>
      </footer>
    </div>
  )
}
