'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Bot, User, Send, X } from 'lucide-react'

interface ChatBotProps {
  type: 'safe' | 'banking' | 'suspicious' | 'malicious'
  onPersonalInfoRequest: (info: string) => void
  onClose?: () => void // Added optional onClose prop
}

interface Message {
  id: string
  sender: 'user' | 'bot'
  content: string
  timestamp: Date
}

const personalInfoPatterns = [
  {
    pattern: /phone|number|mobile|cell/i,
    type: 'phone number',
    risk: 'medium',
  },
  { pattern: /email|e-mail/i, type: 'email address', risk: 'medium' },
  {
    pattern: /address|home|street|location/i,
    type: 'home address',
    risk: 'high',
  },
  {
    pattern: /credit card|debit card|card number/i,
    type: 'credit card',
    risk: 'high',
  },
  {
    pattern: /ssn|social security/i,
    type: 'social security number',
    risk: 'high',
  },
  { pattern: /birth|birthday|dob/i, type: 'date of birth', risk: 'high' },
  {
    pattern: /passport|driver|license|id number/i,
    type: 'government ID',
    risk: 'high',
  },
  {
    pattern: /bank account|routing|account number/i,
    type: 'bank account',
    risk: 'high',
  },
  {
    pattern: /income|salary|earnings/i,
    type: 'financial information',
    risk: 'medium',
  },
  { pattern: /full name|first name|last name/i, type: 'name', risk: 'low' },
]

export function ChatBot({
  type,
  onPersonalInfoRequest,
  onClose,
}: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      content: getBotGreeting(type),
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')

  function getBotGreeting(type: string) {
    switch (type) {
      case 'safe':
        return "Hi! I'm here to help you with general questions. How can I assist you today?"
      case 'banking':
        return "Hello! I'm your banking assistant. I can help with account information and general banking questions."
      case 'suspicious':
        return "Welcome! I can help you find amazing deals! To get started, I'll need some information about you."
      case 'malicious':
        return "Congratulations! You've won $1000! To claim your prize, I need to verify your identity with some personal details."
      default:
        return 'Hello! How can I help you?'
    }
  }

  const generateBotResponse = async (userMessage: string) => {
    let response = ''

    switch (type) {
      case 'safe':
        response =
          "Thanks for your message! I'm here to help with general questions without needing personal information."
        break
      case 'banking':
        if (Math.random() > 0.7) {
          response =
            'To better assist you with your account, could you provide your phone number for verification?'
          onPersonalInfoRequest('phone number')
        } else {
          response =
            'I can help you with general banking information. What would you like to know?'
        }
        break
      case 'suspicious':
        const suspiciousRequests = [
          "To show you personalized deals, what's your email address?",
          "For shipping, I'll need your home address.",
          'To process your order, could you share your phone number?',
          "What's your full name for the account setup?",
        ]
        response =
          suspiciousRequests[
            Math.floor(Math.random() * suspiciousRequests.length)
          ]

        // Detect what personal info is being requested
        personalInfoPatterns.forEach(({ pattern, type: infoType }) => {
          if (pattern.test(response)) {
            onPersonalInfoRequest(infoType)
          }
        })
        break
      case 'malicious':
        const maliciousRequests = [
          'To claim your $1000 prize, I need your social security number for tax purposes.',
          'Please provide your credit card number to cover the small processing fee.',
          "What's your bank account number so we can deposit your winnings?",
          'I need your full address and date of birth to verify your identity.',
          "Could you share your mother's maiden name for security verification?",
        ]
        response =
          maliciousRequests[
            Math.floor(Math.random() * maliciousRequests.length)
          ]

        // Detect malicious requests
        personalInfoPatterns.forEach(({ pattern, type: infoType }) => {
          if (pattern.test(response)) {
            onPersonalInfoRequest(infoType)
          }
        })
        break
    }

    return response
  }

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')

    // Simulate bot response delay
    setTimeout(async () => {
      const botResponse = await generateBotResponse(input)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        content: botResponse,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1000)
  }

  const getBotColor = () => {
    switch (type) {
      case 'safe':
        return 'text-green-600'
      case 'banking':
        return 'text-blue-600'
      case 'suspicious':
        return 'text-orange-600'
      case 'malicious':
        return 'text-red-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className={`w-5 h-5 ${getBotColor()}`} />
            <span className="font-semibold">AI Assistant</span>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                type === 'safe'
                  ? 'bg-green-100 text-green-800'
                  : type === 'banking'
                  ? 'bg-blue-100 text-blue-800'
                  : type === 'suspicious'
                  ? 'bg-orange-100 text-orange-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {type}
            </span>
          </div>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="h-64 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-2 ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'bot' && (
                <Bot className={`w-4 h-4 mt-1 ${getBotColor()}`} />
              )}
              <div
                className={`max-w-[80%] p-2 rounded-lg text-sm ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                {message.content}
              </div>
              {message.sender === 'user' && (
                <User className="w-4 h-4 mt-1 text-primary" />
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button onClick={sendMessage} size="sm">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
