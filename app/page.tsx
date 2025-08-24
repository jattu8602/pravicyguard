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
  CheckCircle,
  Users,
  Zap,
  Lock,
  BarChart3,
  Star,
  ArrowRight,
  Play,
  Download,
  Smartphone,
  Monitor,
  Database,
  Cpu,
  Fingerprint,
} from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 hover:bg-card/90">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors duration-300">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
              Privacy Guard
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="hover:bg-primary/10 transition-all duration-300">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="container mx-auto text-center space-y-12 relative z-10">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4 animate-fade-in">
              <Shield className="h-4 w-4" />
              <span>Trusted by 50,000+ users worldwide</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
              Protect Your Privacy
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">
                Across Every Website
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Advanced AI-powered monitoring that detects privacy risks, harmful
              data collection, and provides instant remediation guides for safer
              browsing. Your digital guardian in an interconnected world.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-lg px-8 py-6 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <Zap className="h-5 w-5 mr-2" />
                Start Free Monitoring
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-transparent border-2 hover:bg-primary/5 text-lg px-8 py-6 group transition-all duration-300"
              >
                <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                Watch Demo
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center space-x-12 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2 hover:text-primary transition-colors duration-300 cursor-pointer">
              <Globe className="h-5 w-5" />
              <span>Web Dashboard</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-primary transition-colors duration-300 cursor-pointer">
              <Chrome className="h-5 w-5" />
              <span>Browser Extension</span>
            </div>
            <div className="flex items-center space-x-2 hover:text-primary transition-colors duration-300 cursor-pointer">
              <Smartphone className="h-5 w-5" />
              <span>Mobile App</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-muted/30 via-background to-muted/30">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                50K+
              </div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center group animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-3xl md:text-4xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform duration-300">
                1M+
              </div>
              <div className="text-sm text-muted-foreground">Threats Blocked</div>
            </div>
            <div className="text-center group animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-3xl md:text-4xl font-bold text-chart-3 mb-2 group-hover:scale-110 transition-transform duration-300">
                99.9%
              </div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center group animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-3xl md:text-4xl font-bold text-chart-1 mb-2 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-sm text-muted-foreground">Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl font-bold text-foreground">
              Complete Privacy Protection
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
              Our dual-platform approach monitors every interaction and provides
              real-time insights to keep your data safe across all devices and platforms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300 mb-4">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Real-time Monitoring</CardTitle>
                <CardDescription className="text-base">
                  Track every website interaction and data request in real-time with advanced analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our intelligent extension monitors all website activities, logging data
                  collection attempts, tracking cookies, and suspicious behavior patterns
                  with millisecond precision.
                </p>
                <div className="mt-4 flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
                  Learn more <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300 mb-4">
                  <Cpu className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-xl">AI Risk Detection</CardTitle>
                <CardDescription className="text-base">
                  Advanced AI identifies privacy threats and harmful patterns with 99.7% accuracy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Machine learning algorithms analyze chatbot interactions, form submissions,
                  and detect when websites attempt to collect sensitive personal information
                  through sophisticated pattern recognition.
                </p>
                <div className="mt-4 flex items-center text-accent font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
                  Learn more <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-chart-3/10 rounded-xl flex items-center justify-center group-hover:bg-chart-3/20 transition-colors duration-300 mb-4">
                  <TrendingUp className="h-6 w-6 text-chart-3" />
                </div>
                <CardTitle className="text-xl">Instant Remediation</CardTitle>
                <CardDescription className="text-base">
                  Step-by-step guides to protect yourself from detected threats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Get immediate guidance on clearing cookies, revoking permissions,
                  finding safer alternatives, and implementing privacy best practices
                  tailored to each detected threat.
                </p>
                <div className="mt-4 flex items-center text-chart-3 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
                  Learn more <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-chart-1/10 rounded-xl flex items-center justify-center group-hover:bg-chart-1/20 transition-colors duration-300 mb-4">
                  <BarChart3 className="h-6 w-6 text-chart-1" />
                </div>
                <CardTitle className="text-xl">Privacy Analytics</CardTitle>
                <CardDescription className="text-base">
                  Comprehensive insights into your digital footprint and privacy score
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Detailed analytics dashboard showing your privacy score, data exposure
                  trends, and personalized recommendations to improve your online security.
                </p>
                <div className="mt-4 flex items-center text-chart-1 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
                  Learn more <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm animate-scale-in" style={{ animationDelay: '0.5s' }}>
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-chart-2/10 rounded-xl flex items-center justify-center group-hover:bg-chart-2/20 transition-colors duration-300 mb-4">
                  <Lock className="h-6 w-6 text-chart-2" />
                </div>
                <CardTitle className="text-xl">Secure Browsing</CardTitle>
                <CardDescription className="text-base">
                  Encrypted connections and secure browsing recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Automatic detection of insecure connections, VPN recommendations,
                  and secure browsing practices to keep your data encrypted and protected.
                </p>
                <div className="mt-4 flex items-center text-chart-2 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
                  Learn more <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm animate-scale-in" style={{ animationDelay: '0.6s' }}>
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-chart-4/10 rounded-xl flex items-center justify-center group-hover:bg-chart-4/20 transition-colors duration-300 mb-4">
                  <Fingerprint className="h-6 w-6 text-chart-4" />
                </div>
                <CardTitle className="text-xl">Identity Protection</CardTitle>
                <CardDescription className="text-base">
                  Advanced identity theft prevention and monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Monitor for identity theft attempts, data breaches, and suspicious
                  activities that could compromise your personal information.
                </p>
                <div className="mt-4 flex items-center text-chart-4 font-medium text-sm group-hover:translate-x-1 transition-transform duration-300">
                  Learn more <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-muted/30 via-background to-muted/30">
        <div className="container mx-auto">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl font-bold text-foreground">
              Trusted by Privacy-Conscious Users
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              See what our users say about their privacy protection experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "Privacy Guard has completely transformed how I browse the web. The real-time alerts and remediation guides are incredibly helpful. I feel much safer online now."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Sarah Chen</div>
                    <div className="text-sm text-muted-foreground">Software Engineer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "The AI detection is incredibly accurate. It caught several data collection attempts I never would have noticed. The dashboard is intuitive and informative."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Michael Rodriguez</div>
                    <div className="text-sm text-muted-foreground">Privacy Consultant</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <CardContent className="pt-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic">
                  "As someone who works with sensitive data, Privacy Guard gives me peace of mind. The browser extension is seamless and the web dashboard provides excellent insights."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-chart-3/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-chart-3" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Emily Watson</div>
                    <div className="text-sm text-muted-foreground">Data Analyst</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl font-bold text-foreground">
              How Privacy Guard Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Simple setup, powerful protection in just three easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center group animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <Download className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">1. Install Extension</h3>
              <p className="text-muted-foreground">
                Download and install our browser extension in just a few clicks. 
                Works with Chrome, Firefox, Safari, and Edge.
              </p>
            </div>

            <div className="text-center group animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                <Monitor className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">2. Start Monitoring</h3>
              <p className="text-muted-foreground">
                The extension automatically begins monitoring your browsing activity,
                detecting privacy risks and data collection attempts in real-time.
              </p>
            </div>

            <div className="text-center group animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-16 bg-chart-3/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-chart-3/20 transition-colors duration-300">
                <Shield className="h-8 w-8 text-chart-3" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">3. Stay Protected</h3>
              <p className="text-muted-foreground">
                Receive instant alerts, view detailed analytics, and get step-by-step
                guidance to protect your privacy across all websites.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
        <div className="container mx-auto text-center space-y-8">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-foreground">
              Ready to Take Control of Your Privacy?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Join thousands of users who trust Privacy Guard to keep their data
              safe across the web. Start your free trial today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-lg px-8 py-6 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <Shield className="h-5 w-5 mr-2" />
                Get Started Free
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-2 hover:bg-primary/5 transition-all duration-300">
                View Pricing
              </Button>
            </Link>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>✓ No credit card required • ✓ 30-day free trial • ✓ Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold text-foreground">Privacy Guard</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Protecting your digital privacy with advanced AI-powered monitoring and real-time threat detection.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Product</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="hover:text-primary transition-colors duration-300 cursor-pointer">Features</div>
                <div className="hover:text-primary transition-colors duration-300 cursor-pointer">Pricing</div>
                <div className="hover:text-primary transition-colors duration-300 cursor-pointer">API</div>
                <div className="hover:text-primary transition-colors duration-300 cursor-pointer">Documentation</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Company</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="hover:text-primary transition-colors duration-300 cursor-pointer">About</div>
                <div className="hover:text-primary transition-colors duration-300 cursor-pointer">Blog</div>
                <div className="hover:text-primary transition-colors duration-300 cursor-pointer">Careers</div>
                <div className="hover:text-primary transition-colors duration-300 cursor-pointer">Contact</div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Support</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="hover:text-primary transition-colors duration-300 cursor-pointer">Help Center</div>
                <div className="hover:text-primary transition-colors duration-300 cursor-pointer">Privacy Policy</div>
                <div className="hover:text-primary transition-colors duration-300 cursor-pointer">Terms of Service</div>
                <div className="hover:text-primary transition-colors duration-300 cursor-pointer">Status</div>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 Privacy Guard. All rights reserved. Protecting your digital privacy.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
