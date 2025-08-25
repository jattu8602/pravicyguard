'use client'

import type React from 'react'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  AlertTriangle,
  X,
  Plus,
  Minimize2,
  Square,
  MoreHorizontal,
  Lock,
  Bot,
  Activity,
} from 'lucide-react'
import { NetworkLogsExtension } from './network-logs-extension'
import { BotDetectorExtension } from './bot-detector-extension'
import { Dashboard } from './dashboard'
import { ChatBot } from './chat-bot'

const initialTabs = [
  {
    id: 'youtube',
    title: 'YouTube',
    url: 'youtube.com',
    favicon: '🎥',
    active: false,
    status: 'safe',
  },
  {
    id: 'google',
    title: 'Google',
    url: 'google.com',
    favicon: '🔍',
    active: false,
    status: 'safe',
  },
  {
    id: 'amazon',
    title: 'Amazon',
    url: 'amazon.com',
    favicon: '📦',
    active: true,
    status: 'safe',
  },
  {
    id: 'xyz',
    title: 'XYZ Site',
    url: 'xyz.com',
    favicon: '⚠️',
    active: false,
    status: 'risky',
  },
  {
    id: 'banking',
    title: 'SecureBank',
    url: 'securebank.com',
    favicon: '🏦',
    active: false,
    status: 'warning',
  },
  {
    id: 'shopping',
    title: 'ShopNow',
    url: 'shopnow.com',
    favicon: '🛒',
    active: false,
    status: 'suspicious',
  },
  {
    id: 'social',
    title: 'SocialHub',
    url: 'socialhub.com',
    favicon: '👥',
    active: false,
    status: 'safe',
  },
  {
    id: 'crypto',
    title: 'CryptoScam',
    url: 'cryptoscam.com',
    favicon: '💰',
    active: false,
    status: 'risky',
  },
  {
    id: 'dating',
    title: 'LoveMatch',
    url: 'lovematch.com',
    favicon: '💕',
    active: false,
    status: 'suspicious',
  },
  {
    id: 'pharmacy',
    title: 'PillsOnline',
    url: 'pillsonline.com',
    favicon: '💊',
    active: false,
    status: 'risky',
  },
  {
    id: 'news',
    title: 'FakeNews',
    url: 'fakenews.com',
    favicon: '📰',
    active: false,
    status: 'warning',
  },
  {
    id: 'gaming',
    title: 'GameHub',
    url: 'gamehub.com',
    favicon: '🎮',
    active: false,
    status: 'safe',
  },
  {
    id: 'education',
    title: 'EduPortal',
    url: 'eduportal.com',
    favicon: '📚',
    active: false,
    status: 'safe',
  },
  {
    id: 'travel',
    title: 'TravelDeals',
    url: 'traveldeals.com',
    favicon: '✈️',
    active: false,
    status: 'warning',
  },
  {
    id: 'tech',
    title: 'TechBlog',
    url: 'techblog.com',
    favicon: '💻',
    active: false,
    status: 'safe',
  },
]

export function BrowserInterface() {
  const [activeTab, setActiveTab] = useState('amazon')
  const [showNetworkExtension, setShowNetworkExtension] = useState(false)
  const [showBotExtension, setShowBotExtension] = useState(false)
  const [showDashboard, setShowDashboard] = useState(false)
  const [addressBar, setAddressBar] = useState('amazon.com')
  const [tabs, setTabs] = useState(initialTabs)
  const [networkLogs, setNetworkLogs] = useState<
    Array<{ timestamp: string; type: string; url: string; status: string }>
  >([])
  const [botLogs, setBotLogs] = useState<
    Array<{ timestamp: string; bot: string; risk: string; message: string }>
  >([])
  const [showChatBot, setShowChatBot] = useState(false)

  const addNetworkLog = (type: string, url: string, status: string) => {
    const newLog = {
      timestamp: new Date().toLocaleTimeString(),
      type,
      url,
      status,
    }
    setNetworkLogs((prev) => [newLog, ...prev.slice(0, 49)])

    setTimeout(() => {
      const additionalLogs = [
        {
          timestamp: new Date().toLocaleTimeString(),
          type: 'GET',
          url: `${url}/api/analytics`,
          status: '200',
        },
        {
          timestamp: new Date().toLocaleTimeString(),
          type: 'POST',
          url: `${url}/api/tracking`,
          status: '200',
        },
        {
          timestamp: new Date().toLocaleTimeString(),
          type: 'GET',
          url: `${url}/ads.js`,
          status: '200',
        },
      ]
      setNetworkLogs((prev) => [...additionalLogs, ...prev.slice(0, 47)])
    }, 500)
  }

  const addBotLog = (bot: string, risk: string, message: string) => {
    const newLog = {
      timestamp: new Date().toLocaleTimeString(),
      bot,
      risk,
      message,
    }
    setBotLogs((prev) => [newLog, ...prev.slice(0, 49)])
  }

  const addNewTab = () => {
    const newTab = {
      id: `tab-${Date.now()}`,
      title: 'New Tab',
      url: 'about:blank',
      favicon: '🌐',
      active: false,
      status: 'safe' as const,
    }
    setTabs([...tabs, newTab])
  }

  const closeTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const updatedTabs = tabs.filter((tab) => tab.id !== tabId)
    if (updatedTabs.length === 0) {
      addNewTab()
      return
    }

    if (activeTab === tabId) {
      const newActiveTab = updatedTabs[0]
      setActiveTab(newActiveTab.id)
      setAddressBar(newActiveTab.url)
      setTabs(
        updatedTabs.map((tab) => ({
          ...tab,
          active: tab.id === newActiveTab.id,
        }))
      )
    } else {
      setTabs(updatedTabs)
    }
  }

  const navigateToUrl = (url: string) => {
    setAddressBar(url)
    const updatedTabs = tabs.map((tab) =>
      tab.active ? { ...tab, url, title: url.split('.')[0] } : tab
    )
    setTabs(updatedTabs)

    addNetworkLog('GET', url, '200')
    addNetworkLog('GET', `${url}/assets/style.css`, '200')
    addNetworkLog('GET', `${url}/api/data`, '200')
  }

  const getTabStatus = (tabId: string) => {
    const tab = tabs.find((t) => t.id === tabId)
    return tab?.status || 'safe'
  }

  const handleNetworkExtensionClick = () => {
    setShowNetworkExtension(!showNetworkExtension)
    if (showBotExtension) setShowBotExtension(false)
  }

  const handleBotExtensionClick = () => {
    setShowBotExtension(!showBotExtension)
    if (showNetworkExtension) setShowNetworkExtension(false)
  }

  const switchTab = (tab: { id: string; url: string; status?: string }) => {
    setActiveTab(tab.id)
    setAddressBar(tab.url)
    setTabs(tabs.map((t) => ({ ...t, active: t.id === tab.id })))
    setShowChatBot(false)

    addNetworkLog('GET', tab.url, '200')
    if (tab.status === 'risky') {
      addNetworkLog('BLOCKED', `${tab.url}/malicious.js`, '403')
      addNetworkLog('BLOCKED', `${tab.url}/tracker.js`, '403')
    }
    if (tab.status === 'suspicious') {
      addNetworkLog('WARNING', `${tab.url}/suspicious-script.js`, '200')
    }
  }

  if (showDashboard) {
    return (
      <Dashboard
        onBack={() => setShowDashboard(false)}
        networkLogs={networkLogs}
        botLogs={botLogs}
      />
    )
  }

  return (
    <div className="h-[600px] flex flex-col bg-background">
      {/* Browser Header - STICKY */}
      <div className="flex items-center justify-between p-2 bg-muted border-b sticky top-0 z-20">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm">
            <Minimize2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <Square className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Tab Bar - STICKY */}
      <div className="flex items-center bg-muted border-b sticky top-[52px] z-20">
        <div className="flex flex-1 overflow-x-auto">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`flex items-center gap-2 px-4 py-2 border-r cursor-pointer min-w-0 max-w-48 flex-shrink-0 ${
                tab.active ? 'bg-background' : 'hover:bg-background/50'
              }`}
              onClick={() => switchTab(tab)}
            >
              <span className="text-sm">{tab.favicon}</span>
              <span className="text-sm truncate">{tab.title}</span>
              {tab.status === 'risky' && (
                <AlertTriangle className="w-3 h-3 text-red-500 flex-shrink-0" />
              )}
              {tab.status === 'suspicious' && (
                <AlertTriangle className="w-3 h-3 text-orange-500 flex-shrink-0" />
              )}
              {tab.status === 'warning' && (
                <AlertTriangle className="w-3 h-3 text-yellow-500 flex-shrink-0" />
              )}
              <Button
                variant="ghost"
                size="sm"
                className="w-4 h-4 p-0 ml-auto"
                onClick={(e) => closeTab(tab.id, e)}
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ))}
        </div>
        <Button variant="ghost" size="sm" onClick={addNewTab} className="px-2">
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Address Bar & Extensions - STICKY */}
      <div className="flex items-center gap-2 p-2 bg-muted border-b sticky top-[88px] z-20">
        <div className="flex items-center gap-2 flex-1">
          <Lock className="w-4 h-4 text-primary" />
          <Input
            value={addressBar}
            onChange={(e) => setAddressBar(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && navigateToUrl(addressBar)}
            className="flex-1"
            placeholder="Enter URL..."
          />
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNetworkExtensionClick}
            className="relative"
          >
            <Activity className="w-4 h-4" />
            {getTabStatus(activeTab) === 'risky' && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
            )}
            {getTabStatus(activeTab) === 'suspicious' && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full"></div>
            )}
            {getTabStatus(activeTab) === 'warning' && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-500 rounded-full"></div>
            )}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleBotExtensionClick}>
            <Bot className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Content Area - SCROLLABLE */}
      <div className="flex-1 relative overflow-hidden">
        <div className="h-full overflow-y-auto">
          <div className="p-8 pb-20">
            {activeTab === 'youtube' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">YouTube</h1>
                <p className="text-muted-foreground">Broadcast Yourself</p>

                <div className="space-y-6">
                  <h2 className="text-xl font-semibold">Trending Videos</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
                      <Card key={i} className="p-4">
                        <div className="w-full h-32 bg-muted rounded mb-2"></div>
                        <h3 className="font-semibold text-sm">
                          Amazing Video {i}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          1.2M views • 2 days ago
                        </p>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'google' && (
              <div className="space-y-6">
                <div className="text-center py-12">
                  <h1 className="text-4xl font-bold mb-8">Google</h1>
                  <div className="max-w-md mx-auto">
                    <Input
                      placeholder="Search Google or type a URL"
                      className="text-center"
                    />
                    <div className="flex gap-2 justify-center mt-4">
                      <Button variant="outline">Google Search</Button>
                      <Button variant="outline">I&apos;m Feeling Lucky</Button>
                    </div>
                  </div>
                </div>

                <div className="max-w-2xl mx-auto space-y-4">
                  <h2 className="text-lg font-semibold">Recent Searches</h2>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <Card key={i} className="p-4">
                      <h3 className="font-medium text-blue-600">
                        Search Result {i}
                      </h3>
                      <p className="text-sm text-green-600">
                        https://example{i}.com
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        This is a sample search result description that shows
                        what you might find...
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'amazon' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">Welcome to Amazon</h1>
                <p className="text-muted-foreground">
                  Your one-stop shop for everything
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
                    (i) => (
                      <Card key={i} className="p-4">
                        <div className="w-full h-32 bg-muted rounded mb-2"></div>
                        <h3 className="font-semibold">Product {i}</h3>
                        <p className="text-sm text-muted-foreground">$29.99</p>
                        <Button size="sm" className="mt-2 w-full">
                          Add to Cart
                        </Button>
                      </Card>
                    )
                  )}
                </div>

                <div className="mt-8 space-y-4">
                  <h2 className="text-2xl font-bold">Recommended for You</h2>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                      <Card key={`rec-${i}`} className="p-4">
                        <div className="w-full h-24 bg-muted rounded mb-2"></div>
                        <h4 className="font-medium text-sm">
                          Recommended Item {i}
                        </h4>
                        <p className="text-xs text-muted-foreground">$19.99</p>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'banking' && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h1 className="text-2xl font-bold text-blue-800">
                    SecureBank Online
                  </h1>
                  <p className="text-blue-600 mt-2">
                    Your trusted banking partner
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h3 className="font-bold mb-4">Account Balance</h3>
                    <p className="text-3xl font-bold text-green-600">
                      $12,345.67
                    </p>
                  </Card>
                  <Card className="p-6">
                    <h3 className="font-bold mb-4">Recent Transactions</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Coffee Shop</span>
                        <span>-$4.50</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Salary Deposit</span>
                        <span className="text-green-600">+$3,200.00</span>
                      </div>
                    </div>
                  </Card>
                </div>

                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold">Banking Assistant</h3>
                    <Button
                      size="sm"
                      onClick={() => setShowChatBot(!showChatBot)}
                      className="bg-blue-600"
                    >
                      <Bot className="w-4 h-4 mr-2" />
                      Chat with AI
                    </Button>
                  </div>
                  {showChatBot && (
                    <ChatBot
                      type="banking"
                      onPersonalInfoRequest={(info) =>
                        addBotLog(
                          'Banking Bot',
                          'warning',
                          `Requested: ${info}`
                        )
                      }
                      onClose={() => setShowChatBot(false)}
                    />
                  )}
                </Card>
              </div>
            )}

            {activeTab === 'shopping' && (
              <div className="space-y-6">
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h1 className="text-2xl font-bold text-orange-800">
                    ShopNow - Suspicious Site
                  </h1>
                  <p className="text-orange-600 mt-2">
                    Deals too good to be true!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="p-4 border-orange-200">
                      <div className="w-full h-32 bg-orange-100 rounded mb-2"></div>
                      <h3 className="font-semibold">Fake Product {i}</h3>
                      <p className="text-sm text-muted-foreground line-through">
                        $199.99
                      </p>
                      <p className="text-lg font-bold text-orange-600">$9.99</p>
                      <Button size="sm" className="mt-2 w-full bg-orange-600">
                        Buy Now - Limited Time!
                      </Button>
                    </Card>
                  ))}
                </div>

                <Card className="p-4 border-orange-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-orange-800">
                      Shopping Assistant
                    </h3>
                    <Button
                      size="sm"
                      onClick={() => setShowChatBot(!showChatBot)}
                      className="bg-orange-600"
                    >
                      <Bot className="w-4 h-4 mr-2" />
                      Get Help
                    </Button>
                  </div>
                  {showChatBot && (
                    <ChatBot
                      type="suspicious"
                      onPersonalInfoRequest={(info) =>
                        addBotLog(
                          'Shopping Bot',
                          'risky',
                          `Suspicious request: ${info}`
                        )
                      }
                      onClose={() => setShowChatBot(false)}
                    />
                  )}
                </Card>
              </div>
            )}

            {activeTab === 'social' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">SocialHub</h1>
                <p className="text-muted-foreground">
                  Connect with friends and family
                </p>

                <div className="space-y-4">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <Card key={i} className="p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-muted rounded-full"></div>
                        <div>
                          <h4 className="font-semibold">User {i}</h4>
                          <p className="text-xs text-muted-foreground">
                            2 hours ago
                          </p>
                        </div>
                      </div>
                      <p className="text-sm mb-3">
                        This is a sample social media post content...
                      </p>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>👍 {Math.floor(Math.random() * 100)} likes</span>
                        <span>
                          💬 {Math.floor(Math.random() * 20)} comments
                        </span>
                        <span>🔄 {Math.floor(Math.random() * 10)} shares</span>
                      </div>
                    </Card>
                  ))}
                </div>

                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold">Social Assistant</h3>
                    <Button
                      size="sm"
                      onClick={() => setShowChatBot(!showChatBot)}
                    >
                      <Bot className="w-4 h-4 mr-2" />
                      Chat
                    </Button>
                  </div>
                  {showChatBot && (
                    <ChatBot
                      type="safe"
                      onPersonalInfoRequest={(info) =>
                        addBotLog(
                          'Social Bot',
                          'safe',
                          `Safe interaction: ${info}`
                        )
                      }
                      onClose={() => setShowChatBot(false)}
                    />
                  )}
                </Card>
              </div>
            )}

            {activeTab === 'xyz' && (
              <div className="space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h1 className="text-2xl font-bold text-red-800">
                    Suspicious Website
                  </h1>
                  <p className="text-red-600 mt-2">
                    This website may contain harmful content or attempt to steal
                    your information.
                  </p>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-bold">Win $1000 Now!</h2>
                  <p className="text-sm">
                    Just enter your personal information below:
                  </p>
                  <Input placeholder="Enter your full name..." />
                  <Input placeholder="Enter your email..." />
                  <Input placeholder="Enter your phone number..." />
                  <Input placeholder="Enter your address..." />
                  <Input placeholder="Enter your social security number..." />
                  <Input placeholder="Enter your credit card..." />
                  <Input
                    placeholder="Enter your bank account..."
                    type="password"
                  />
                  <Button className="w-full bg-red-600">
                    Submit Personal Information
                  </Button>
                </div>

                <Card className="p-4 border-red-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-red-800">Prize Assistant</h3>
                    <Button
                      size="sm"
                      onClick={() => setShowChatBot(!showChatBot)}
                      className="bg-red-600"
                    >
                      <Bot className="w-4 h-4 mr-2" />
                      Claim Prize
                    </Button>
                  </div>
                </Card>

                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-bold">Fake Reviews</h3>
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="p-4 border-red-200">
                      <p className="text-sm">
                        &ldquo;This website is totally legitimate! I won
                        $1000!&rdquo; - Fake User {i}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'crypto' && (
              <div className="space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h1 className="text-2xl font-bold text-red-800">
                    🚨 CryptoScam - Get Rich Quick! 🚨
                  </h1>
                  <p className="text-red-600 mt-2">
                    URGENT: Limited time offer! Double your Bitcoin in 24 hours!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6 border-red-200">
                    <h3 className="font-bold mb-4 text-red-800">
                      Send Bitcoin, Get Double Back!
                    </h3>
                    <p className="text-sm mb-4">
                      Send any amount of Bitcoin to our wallet and receive 2x
                      back within 24 hours!
                    </p>
                    <Input
                      placeholder="Your Bitcoin wallet address..."
                      className="mb-2"
                    />
                    <Input
                      placeholder="Amount to send (BTC)..."
                      className="mb-4"
                    />
                    <Button className="w-full bg-red-600">
                      Send Bitcoin Now!
                    </Button>
                  </Card>

                  <Card className="p-6 border-red-200">
                    <h3 className="font-bold mb-4 text-red-800">
                      Fake Testimonials
                    </h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        &ldquo;I sent 1 BTC and got 2 BTC back!&rdquo; - Fake
                        User 1
                      </p>
                      <p>
                        &ldquo;This is totally legit!&rdquo; - Bot Account 2
                      </p>
                      <p>&ldquo;Made $50,000 in one day!&rdquo; - Scammer 3</p>
                    </div>
                  </Card>
                </div>

                <Card className="p-4 border-red-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-red-800">Crypto Assistant</h3>
                    <Button
                      size="sm"
                      onClick={() => setShowChatBot(!showChatBot)}
                      className="bg-red-600"
                    >
                      <Bot className="w-4 h-4 mr-2" />
                      Get Rich Quick!
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'dating' && (
              <div className="space-y-6">
                <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
                  <h1 className="text-2xl font-bold text-pink-800">
                    💕 LoveMatch - Find Your Soulmate! 💕
                  </h1>
                  <p className="text-pink-600 mt-2">
                    1000+ singles in your area want to meet you!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="p-4 border-pink-200">
                      <div className="w-full h-32 bg-pink-100 rounded mb-2 flex items-center justify-center">
                        <span className="text-4xl">💕</span>
                      </div>
                      <h3 className="font-semibold">Perfect Match {i}</h3>
                      <p className="text-sm text-muted-foreground">
                        Age: {20 + i}, Distance: {i} miles
                      </p>
                      <Button size="sm" className="mt-2 w-full bg-pink-600">
                        Message Now
                      </Button>
                    </Card>
                  ))}
                </div>

                <Card className="p-4 border-pink-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-pink-800">
                      Dating Assistant
                    </h3>
                    <Button
                      size="sm"
                      onClick={() => setShowChatBot(!showChatBot)}
                      className="bg-pink-600"
                    >
                      <Bot className="w-4 h-4 mr-2" />
                      Find Love
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'pharmacy' && (
              <div className="space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h1 className="text-2xl font-bold text-red-800">
                    💊 PillsOnline - No Prescription Needed! 💊
                  </h1>
                  <p className="text-red-600 mt-2">
                    Get prescription drugs without a doctor visit!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    'Painkillers',
                    'Antibiotics',
                    'Sleep Aids',
                    'Diet Pills',
                    'Anxiety Meds',
                    'ADHD Meds',
                  ].map((pill, i) => (
                    <Card key={i} className="p-4 border-red-200">
                      <div className="w-full h-32 bg-red-100 rounded mb-2 flex items-center justify-center">
                        <span className="text-4xl">💊</span>
                      </div>
                      <h3 className="font-semibold">{pill}</h3>
                      <p className="text-sm text-muted-foreground line-through">
                        $199.99
                      </p>
                      <p className="text-lg font-bold text-red-600">$29.99</p>
                      <Button size="sm" className="mt-2 w-full bg-red-600">
                        Buy Without Prescription
                      </Button>
                    </Card>
                  ))}
                </div>

                <Card className="p-4 border-red-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-red-800">
                      Pharmacy Assistant
                    </h3>
                    <Button
                      size="sm"
                      onClick={() => setShowChatBot(!showChatBot)}
                      className="bg-red-600"
                    >
                      <Bot className="w-4 h-4 mr-2" />
                      Get Pills
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'gaming' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">🎮 GameHub</h1>
                <p className="text-muted-foreground">
                  Your ultimate gaming destination
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    'Action RPG',
                    'Strategy',
                    'Puzzle',
                    'Racing',
                    'Sports',
                    'Adventure',
                  ].map((genre, i) => (
                    <Card key={i} className="p-4">
                      <div className="w-full h-32 bg-muted rounded mb-2 flex items-center justify-center">
                        <span className="text-4xl">🎮</span>
                      </div>
                      <h3 className="font-semibold">{genre} Games</h3>
                      <p className="text-sm text-muted-foreground">
                        50+ games available
                      </p>
                      <Button size="sm" className="mt-2 w-full">
                        Play Now
                      </Button>
                    </Card>
                  ))}
                </div>

                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold">Gaming Assistant</h3>
                    <Button
                      size="sm"
                      onClick={() => setShowChatBot(!showChatBot)}
                    >
                      <Bot className="w-4 h-4 mr-2" />
                      Get Help
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'news' && (
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h1 className="text-2xl font-bold text-yellow-800">
                    📰 FakeNews
                  </h1>
                  <p className="text-yellow-600 mt-2">
                    Stay informed with the latest news
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="p-4 border-yellow-200">
                      <div className="w-full h-32 bg-yellow-100 rounded mb-2 flex items-center justify-center">
                        <span className="text-4xl">📰</span>
                      </div>
                      <h3 className="font-semibold">Fake News Article {i}</h3>
                      <p className="text-sm text-muted-foreground">
                        Published {Math.floor(Math.random() * 30)} days ago
                      </p>
                      <Button size="sm" className="mt-2 w-full bg-yellow-600">
                        Read More
                      </Button>
                    </Card>
                  ))}
                </div>

                <Card className="p-4 border-yellow-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-yellow-800">
                      News Assistant
                    </h3>
                    <Button
                      size="sm"
                      onClick={() => setShowChatBot(!showChatBot)}
                    >
                      <Bot className="w-4 h-4 mr-2" />
                      Get Help
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'travel' && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h1 className="text-2xl font-bold text-blue-800">
                    ✈️ TravelDeals
                  </h1>
                  <p className="text-blue-600 mt-2">
                    Find the best deals on flights and hotels
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="p-4 border-blue-200">
                      <div className="w-full h-32 bg-blue-100 rounded mb-2 flex items-center justify-center">
                        <span className="text-4xl">✈️</span>
                      </div>
                      <h3 className="font-semibold">Travel Deal {i}</h3>
                      <p className="text-sm text-muted-foreground">
                        To {`Destination ${i}`} for $
                        {Math.floor(Math.random() * 500) + 100}
                      </p>
                      <Button size="sm" className="mt-2 w-full bg-blue-600">
                        Book Now
                      </Button>
                    </Card>
                  ))}
                </div>

                <Card className="p-4 border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-blue-800">
                      Travel Assistant
                    </h3>
                    <Button
                      size="sm"
                      onClick={() => setShowChatBot(!showChatBot)}
                    >
                      <Bot className="w-4 h-4 mr-2" />
                      Get Help
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'tech' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">💻 TechBlog</h1>
                <p className="text-muted-foreground">
                  Latest tech news and reviews
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="p-4">
                      <div className="w-full h-32 bg-muted rounded mb-2 flex items-center justify-center">
                        <span className="text-4xl">💻</span>
                      </div>
                      <h3 className="font-semibold">Tech Article {i}</h3>
                      <p className="text-sm text-muted-foreground">
                        Published {Math.floor(Math.random() * 30)} days ago
                      </p>
                      <Button size="sm" className="mt-2 w-full">
                        Read More
                      </Button>
                    </Card>
                  ))}
                </div>

                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold">Tech Assistant</h3>
                    <Button
                      size="sm"
                      onClick={() => setShowChatBot(!showChatBot)}
                    >
                      <Bot className="w-4 h-4 mr-2" />
                      Get Help
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'education' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold">📚 EduPortal</h1>
                <p className="text-muted-foreground">
                  Your gateway to online education
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="p-4">
                      <div className="w-full h-32 bg-muted rounded mb-2 flex items-center justify-center">
                        <span className="text-4xl">📚</span>
                      </div>
                      <h3 className="font-semibold">Course {i}</h3>
                      <p className="text-sm text-muted-foreground">
                        Duration: {Math.floor(Math.random() * 10) + 1} hours
                      </p>
                      <Button size="sm" className="mt-2 w-full">
                        Enroll Now
                      </Button>
                    </Card>
                  ))}
                </div>

                <Card className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold">Education Assistant</h3>
                    <Button
                      size="sm"
                      onClick={() => setShowChatBot(!showChatBot)}
                    >
                      <Bot className="w-4 h-4 mr-2" />
                      Get Help
                    </Button>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>

        {showChatBot && (
          <div className="fixed bottom-4 right-4 z-30 w-80">
            <ChatBot
              type={
                activeTab === 'xyz' ||
                activeTab === 'crypto' ||
                activeTab === 'pharmacy'
                  ? 'malicious'
                  : activeTab === 'shopping' || activeTab === 'dating'
                  ? 'suspicious'
                  : activeTab === 'banking' ||
                    activeTab === 'news' ||
                    activeTab === 'travel'
                  ? 'banking'
                  : 'safe'
              }
              onPersonalInfoRequest={(info) => {
                const riskLevel =
                  activeTab === 'xyz' ||
                  activeTab === 'crypto' ||
                  activeTab === 'pharmacy'
                    ? 'harmful'
                    : activeTab === 'shopping' || activeTab === 'dating'
                    ? 'risky'
                    : 'warning'
                addBotLog(`${activeTab} Bot`, riskLevel, `Requested: ${info}`)
              }}
              onClose={() => setShowChatBot(false)}
            />
          </div>
        )}

        {/* Extension Popups */}
        {showNetworkExtension && (
          <div className="absolute top-4 right-4 z-10">
            <NetworkLogsExtension
              onClose={() => setShowNetworkExtension(false)}
              onDashboard={() => setShowDashboard(true)}
              tabStatus={
                getTabStatus(activeTab) as
                  | 'safe'
                  | 'risky'
                  | 'warning'
                  | 'suspicious'
              }
              logs={networkLogs}
            />
          </div>
        )}

        {showBotExtension && (
          <div className="absolute top-4 right-20 z-10">
            <BotDetectorExtension
              onClose={() => setShowBotExtension(false)}
              onDashboard={() => setShowDashboard(true)}
              logs={botLogs}
            />
          </div>
        )}
      </div>
    </div>
  )
}
