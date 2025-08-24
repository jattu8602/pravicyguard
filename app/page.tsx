'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
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

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function HomePage() {
  // Refs for GSAP animations
  const headerRef = useRef<HTMLElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const howItWorksRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Optimize GSAP performance
    gsap.set(".gsap-animate", { clearProps: "all" })
    
    // Header animation - simple fade in
    gsap.fromTo(headerRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    )

    // Hero section animation - simplified
    if (heroRef.current) {
      gsap.fromTo(heroRef.current.children,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out" 
        }
      )
    }

    // Stats animation - optimized
    if (statsRef.current) {
      gsap.fromTo(statsRef.current.children,
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      )
    }

    // Features animation - simplified
    if (featuresRef.current) {
      gsap.fromTo(featuresRef.current.children,
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      )
    }

    // Testimonials animation - simplified
    if (testimonialsRef.current) {
      gsap.fromTo(testimonialsRef.current.children,
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: testimonialsRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      )
    }

    // How it works animation - simplified
    if (howItWorksRef.current) {
      gsap.fromTo(howItWorksRef.current.children,
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.5,
          stagger: 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: howItWorksRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      )
    }

    // CTA animation - simplified
    if (ctaRef.current) {
      gsap.fromTo(ctaRef.current.children,
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      )
    }

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <header ref={headerRef} className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 hover:bg-card/90">
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
              
            </Link>
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg px-6 py-3">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section ref={heroRef} className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="container mx-auto text-center space-y-16 relative z-10">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-3 bg-primary/10 text-primary px-6 py-3 rounded-full text-lg font-medium mb-6">
              <Shield className="h-5 w-5" />
              <span>Trusted by 50,000+ users worldwide</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold text-foreground leading-tight">
              Protect Your Privacy
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent block">
                Across Every Website
              </span>
            </h1>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Advanced AI-powered monitoring that detects privacy risks, harmful
              data collection, and provides instant remediation guides for safer
              browsing. Your digital guardian in an interconnected world.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-xl px-10 py-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <Zap className="h-6 w-6 mr-3" />
                Start Free Monitoring
              </Button>
            </Link>
            <Link href="/demo">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-transparent border-2 hover:bg-primary/5 text-xl px-10 py-8 group transition-all duration-300"
              >
                <Play className="h-6 w-6 mr-3 group-hover:scale-110 transition-transform duration-300" />
                Watch Demo
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center space-x-16 text-lg text-muted-foreground">
            <div className="flex items-center space-x-3 hover:text-primary transition-colors duration-300 cursor-pointer">
              <Globe className="h-6 w-6" />
              <span>Web Dashboard</span>
            </div>
            <div className="flex items-center space-x-3 hover:text-primary transition-colors duration-300 cursor-pointer">
              <Chrome className="h-6 w-6" />
              <span>Browser Extension</span>
            </div>
            <div className="flex items-center space-x-3 hover:text-primary transition-colors duration-300 cursor-pointer">
              <Smartphone className="h-6 w-6" />
              <span>Mobile App</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-muted/30 via-background to-muted/30">
        <div className="container mx-auto">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-3 group-hover:scale-110 transition-transform duration-300">
                50K+
              </div>
              <div className="text-lg text-muted-foreground">Active Users</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-accent mb-3 group-hover:scale-110 transition-transform duration-300">
                1M+
              </div>
              <div className="text-lg text-muted-foreground">Threats Blocked</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-chart-3 mb-3 group-hover:scale-110 transition-transform duration-300">
                99.9%
              </div>
              <div className="text-lg text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-chart-1 mb-3 group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-lg text-muted-foreground">Monitoring</div>
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
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Advanced monitoring and protection across all your devices
            </p>
          </div>

          <div ref={featuresRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200 mb-4">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-xl">Real-time Monitoring</CardTitle>
                <CardDescription className="text-sm">
                  Track every website interaction with advanced analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Monitor website activities, detect data collection attempts, and identify suspicious patterns with precision.
                </p>
                <div className="mt-4 flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform duration-200">
                  Learn more <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-200 mb-4">
                  <Cpu className="h-6 w-6 text-accent" />
                </div>
                <CardTitle className="text-xl">AI Risk Detection</CardTitle>
                <CardDescription className="text-sm">
                  Advanced AI identifies threats with 99.7% accuracy
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Machine learning algorithms detect when websites attempt to collect sensitive personal information.
                </p>
                <div className="mt-4 flex items-center text-accent font-medium text-sm group-hover:translate-x-1 transition-transform duration-200">
                  Learn more <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center group-hover:bg-chart-3/20 transition-colors duration-200 mb-4">
                  <TrendingUp className="h-6 w-6 text-chart-3" />
                </div>
                <CardTitle className="text-xl">Instant Remediation</CardTitle>
                <CardDescription className="text-sm">
                  Step-by-step guides to protect yourself from threats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Get immediate guidance on clearing cookies, revoking permissions, and finding safer alternatives.
                </p>
                <div className="mt-4 flex items-center text-chart-3 font-medium text-sm group-hover:translate-x-1 transition-transform duration-200">
                  Learn more <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-chart-1/10 rounded-lg flex items-center justify-center group-hover:bg-chart-1/20 transition-colors duration-200 mb-4">
                  <BarChart3 className="h-6 w-6 text-chart-1" />
                </div>
                <CardTitle className="text-xl">Privacy Analytics</CardTitle>
                <CardDescription className="text-sm">
                  Comprehensive insights into your digital footprint
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Detailed analytics showing your privacy score, data exposure trends, and security recommendations.
                </p>
                <div className="mt-4 flex items-center text-chart-1 font-medium text-sm group-hover:translate-x-1 transition-transform duration-200">
                  Learn more <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center group-hover:bg-chart-2/20 transition-colors duration-200 mb-4">
                  <Lock className="h-6 w-6 text-chart-2" />
                </div>
                <CardTitle className="text-xl">Secure Browsing</CardTitle>
                <CardDescription className="text-sm">
                  Encrypted connections and secure recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Detect insecure connections, get VPN recommendations, and maintain encrypted browsing practices.
                </p>
                <div className="mt-4 flex items-center text-chart-2 font-medium text-sm group-hover:translate-x-1 transition-transform duration-200">
                  Learn more <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-chart-4/10 rounded-lg flex items-center justify-center group-hover:bg-chart-4/20 transition-colors duration-200 mb-4">
                  <Fingerprint className="h-6 w-6 text-chart-4" />
                </div>
                <CardTitle className="text-xl">Identity Protection</CardTitle>
                <CardDescription className="text-sm">
                  Advanced identity theft prevention and monitoring
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Monitor for identity theft attempts, data breaches, and suspicious activities that could compromise your data.
                </p>
                <div className="mt-4 flex items-center text-chart-4 font-medium text-sm group-hover:translate-x-1 transition-transform duration-200">
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
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              See what our users say about their privacy protection experience
            </p>
          </div>

          <div ref={testimonialsRef} className="grid md:grid-cols-3 gap-6">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic text-sm leading-relaxed">
                  "Privacy Guard has completely transformed how I browse the web. The real-time alerts and remediation guides are incredibly helpful."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Sarah Chen</div>
                    <div className="text-sm text-muted-foreground">Software Engineer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic text-sm leading-relaxed">
                  "The AI detection is incredibly accurate. It caught several data collection attempts I never would have noticed."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Michael Rodriguez</div>
                    <div className="text-sm text-muted-foreground">Privacy Consultant</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic text-sm leading-relaxed">
                  "As someone who works with sensitive data, Privacy Guard gives me peace of mind. The browser extension is seamless."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-chart-3/10 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-chart-3" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Emily Watson</div>
                    <div className="text-sm text-muted-foreground">Data Analyst</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto">
          <div className="text-center space-y-8 mb-20">
            <h2 className="text-5xl font-bold text-foreground">
              How Privacy Guard Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Simple setup, powerful protection in just three easy steps
            </p>
          </div>

          <div ref={howItWorksRef} className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-primary/20 transition-colors duration-300">
                <Download className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">1. Install Extension</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Download and install our browser extension in just a few clicks. 
                Works with Chrome, Firefox, Safari, and Edge.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-accent/20 transition-colors duration-300">
                <Monitor className="h-10 w-10 text-accent" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">2. Start Monitoring</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The extension automatically begins monitoring your browsing activity,
                detecting privacy risks and data collection attempts in real-time.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 bg-chart-3/10 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:bg-chart-3/20 transition-colors duration-300">
                <Shield className="h-10 w-10 text-chart-3" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">3. Stay Protected</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Receive instant alerts, view detailed analytics, and get step-by-step
                guidance to protect your privacy across all websites.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-32 px-4 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5">
        <div className="container mx-auto text-center space-y-12">
          <div className="space-y-8">
            <h2 className="text-5xl font-bold text-foreground">
              Ready to Take Control of Your Privacy?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join thousands of users who trust Privacy Guard to keep their data
              safe across the web. Start your free trial today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-xl px-10 py-8 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <Shield className="h-6 w-6 mr-3" />
                Get Started Free
              </Button>
            </Link>
            <Link href="/pricing">
              <Button variant="outline" size="lg" className="text-xl px-10 py-8 border-2 hover:bg-primary/5 transition-all duration-300">
                View Pricing
              </Button>
            </Link>
          </div>

          <div className="text-lg text-muted-foreground">
            <p>✓ No credit card required • ✓ 30-day free trial • ✓ Cancel anytime</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Shield className="h-7 w-7 text-primary" />
                <span className="text-2xl font-bold text-foreground">Privacy Guard</span>
              </div>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Protecting your digital privacy with advanced AI-powered monitoring and real-time threat detection.
              </p>
            </div>
            
            <div className="space-y-6">
              <h4 className="font-semibold text-foreground text-xl">Product</h4>
              <div className="space-y-3 text-lg text-muted-foreground">
                <div className="hover:text-primary transition-colors duration-300 cursor-pointer">Features</div>
                <div className="hover:text-primary transition-colors duration-300 cursor-pointer">Pricing</div>
                <div className="hover:text-primary transition-colors duration-300 cursor-pointer">API</div>
                <div className="hover:text-primary transition-colors duration-300 cursor-pointer">Documentation</div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="font-semibold text-foreground text-xl">Company</h4>
              <div className="space-y-3 text-lg text-muted-foreground">
                <div className="hover:text-primary transition-colors duration-300 cursor-pointer">About</div>
                <div className="hover:text-primary transition-colors duration-300 cursor-pointer">Blog</div>
                <div className="hover:text-primary transition-colors duration-300 cursor-pointer">Careers</div>
                <div className="hover:text-primary transition-colors duration-300 cursor-pointer">Contact</div>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="font-semibold text-foreground text-xl">Support</h4>
              <div className="space-y-3 text-lg text-muted-foreground">
                <div className="hover:text-primary transition-colors duration-300 cursor-pointer">Help Center</div>
                <div className="hover:text-primary transition-colors duration-300 cursor-pointer">Privacy Policy</div>
                <div className="hover:text-primary transition-colors duration-300 cursor-pointer">Terms of Service</div>
                <div className="hover:text-primary transition-colors duration-300 cursor-pointer">Status</div>
              </div>
            </div>
          </div>
          
          <div className="border-t pt-12 text-center text-lg text-muted-foreground">
            <p>&copy; 2024 Privacy Guard. All rights reserved. Protecting your digital privacy.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
