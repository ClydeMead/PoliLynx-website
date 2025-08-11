import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  MessageCircle, 
  Calendar, 
  FileText, 
  TrendingUp, 
  Shield, 
  Zap,
  X,
  ChevronRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  Download
} from 'lucide-react'

// Chatbot Component
export const PoliLynxChatbot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm the PoliLynx AI assistant. I can help you learn about our blockchain insurance transformation platform. What would you like to know?",
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const quickActions = [
    { label: "Platform Demo", action: "demo" },
    { label: "Pricing Info", action: "pricing" },
    { label: "ROI Calculator", action: "roi" },
    { label: "Schedule Call", action: "schedule" }
  ]

  const botResponses = {
    demo: "I'd be happy to show you our platform! Our blockchain-powered system transforms insurance agencies with AI automation, policy tokenization, and XRP integration. Would you like to schedule a personalized demo?",
    pricing: "Our pricing is performance-based! We typically charge 15-25% of the measurable improvements we deliver. For a $3M agency, this usually means $75K-$125K implementation with $3.5K-$18K monthly retainers. Want to see specific numbers for your agency size?",
    roi: "Great question! Our platform typically delivers 600-1,500% ROI in the first year. For example, a $3M agency usually sees $1.23M in additional annual profit. Would you like me to calculate the potential ROI for your specific situation?",
    schedule: "Perfect! I can connect you with Clyde Mead, our founder who's built multiple seven-figure insurance companies. He'll personally assess your transformation potential. What's the best way to reach you?",
    default: "I understand you're interested in learning more about PoliLynx. Our platform helps insurance agencies achieve 30-40% EBITDA margins through blockchain technology and proven operational expertise. What specific aspect would you like to explore?"
  }

  const handleQuickAction = (action) => {
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: quickActions.find(qa => qa.action === action)?.label || action,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    
    setTimeout(() => {
      setIsTyping(true)
      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          type: 'bot',
          content: botResponses[action] || botResponses.default,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
        setIsTyping(false)
      }, 1500)
    }, 500)
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    
    // Simple keyword-based responses
    setTimeout(() => {
      setIsTyping(true)
      setTimeout(() => {
        let response = botResponses.default
        
        if (inputValue.toLowerCase().includes('demo')) response = botResponses.demo
        else if (inputValue.toLowerCase().includes('price') || inputValue.toLowerCase().includes('cost')) response = botResponses.pricing
        else if (inputValue.toLowerCase().includes('roi') || inputValue.toLowerCase().includes('return')) response = botResponses.roi
        else if (inputValue.toLowerCase().includes('call') || inputValue.toLowerCase().includes('schedule')) response = botResponses.schedule
        
        const botMessage = {
          id: messages.length + 2,
          type: 'bot',
          content: response,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
        setIsTyping(false)
      }, 1500)
    }, 500)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300"
          size="lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 h-[500px] bg-white rounded-lg shadow-2xl border border-border flex flex-col">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex justify-between items-center">
        <div>
          <h3 className="font-semibold">PoliLynx Assistant</h3>
          <p className="text-sm opacity-90">Ask me anything about our platform</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsOpen(false)}
          className="text-primary-foreground hover:bg-primary-foreground/20"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted text-muted-foreground p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-border">
        <div className="grid grid-cols-2 gap-2 mb-4">
          {quickActions.map((action) => (
            <Button
              key={action.action}
              variant="outline"
              size="sm"
              onClick={() => handleQuickAction(action.action)}
              className="text-xs"
            >
              {action.label}
            </Button>
          ))}
        </div>

        {/* Input */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <Button onClick={handleSendMessage} size="sm">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

// ROI Calculator Widget
export const ROICalculator = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [agencyRevenue, setAgencyRevenue] = useState('')
  const [currentMargin, setCurrentMargin] = useState('')
  const [results, setResults] = useState(null)

  const calculateROI = () => {
    const revenue = parseFloat(agencyRevenue) * 1000000 // Convert to millions
    const currentEBITDA = revenue * (parseFloat(currentMargin) / 100)
    const newMargin = 0.35 // 35% target margin
    const newEBITDA = revenue * newMargin
    const improvement = newEBITDA - currentEBITDA
    const implementationCost = Math.min(Math.max(revenue * 0.05, 75000), 400000) // 5% of revenue, min $75K, max $400K
    const roi = (improvement / implementationCost) * 100

    setResults({
      currentEBITDA: currentEBITDA,
      newEBITDA: newEBITDA,
      improvement: improvement,
      implementationCost: implementationCost,
      roi: roi,
      paybackMonths: implementationCost / (improvement / 12)
    })
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 left-6 z-40">
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          variant="outline"
        >
          <TrendingUp className="h-5 w-5 mr-2" />
          ROI Calculator
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-6 left-6 z-40 w-80">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">ROI Calculator</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription>
            Calculate your potential transformation ROI
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Annual Revenue ($ millions)
            </label>
            <input
              type="number"
              value={agencyRevenue}
              onChange={(e) => setAgencyRevenue(e.target.value)}
              placeholder="3.0"
              className="w-full px-3 py-2 border border-border rounded-md text-sm"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Current EBITDA Margin (%)
            </label>
            <input
              type="number"
              value={currentMargin}
              onChange={(e) => setCurrentMargin(e.target.value)}
              placeholder="18"
              className="w-full px-3 py-2 border border-border rounded-md text-sm"
            />
          </div>

          <Button 
            onClick={calculateROI} 
            className="w-full"
            disabled={!agencyRevenue || !currentMargin}
          >
            Calculate ROI
          </Button>

          {results && (
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Current EBITDA</p>
                  <p className="font-semibold">${(results.currentEBITDA / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-muted-foreground">New EBITDA</p>
                  <p className="font-semibold text-green-600">${(results.newEBITDA / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Annual Improvement</p>
                  <p className="font-semibold text-green-600">+${(results.improvement / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Implementation</p>
                  <p className="font-semibold">${(results.implementationCost / 1000).toFixed(0)}K</p>
                </div>
              </div>
              
              <div className="text-center p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-700 mb-1">ROI</p>
                <p className="text-2xl font-bold text-green-800">{results.roi.toFixed(0)}%</p>
                <p className="text-xs text-green-600">Payback: {results.paybackMonths.toFixed(1)} months</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Smart Notifications
export const SmartNotifications = () => {
  const [notifications, setNotifications] = useState([])
  const [visitDuration, setVisitDuration] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    
    const timer = setInterval(() => {
      const duration = Math.floor((Date.now() - startTime) / 1000)
      setVisitDuration(duration)
      
      // Show notifications based on behavior
      if (duration === 30 && notifications.length === 0) {
        setNotifications([{
          id: 1,
          type: 'info',
          title: 'Interested in a Quick Demo?',
          message: 'See how PoliLynx can transform your agency in just 5 minutes.',
          action: 'Watch Demo',
          actionType: 'demo'
        }])
      }
      
      if (duration === 90 && notifications.length === 1) {
        setNotifications(prev => [...prev, {
          id: 2,
          type: 'offer',
          title: 'Free ROI Assessment',
          message: 'Get a personalized ROI calculation for your agency.',
          action: 'Calculate ROI',
          actionType: 'roi'
        }])
      }
      
      if (duration === 180 && notifications.length === 2) {
        setNotifications(prev => [...prev, {
          id: 3,
          type: 'urgent',
          title: 'Limited Time: Free Consultation',
          message: 'Schedule a free consultation with our founder this week.',
          action: 'Schedule Now',
          actionType: 'schedule'
        }])
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [notifications.length])

  const handleNotificationAction = (actionType, notificationId) => {
    // Remove the notification
    setNotifications(prev => prev.filter(n => n.id !== notificationId))
    
    // Handle the action
    switch (actionType) {
      case 'demo':
        // Scroll to platform section or open demo modal
        document.getElementById('platform')?.scrollIntoView({ behavior: 'smooth' })
        break
      case 'roi':
        // Trigger ROI calculator
        document.querySelector('[data-roi-calculator]')?.click()
        break
      case 'schedule':
        // Scroll to contact form
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
        break
    }
  }

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }

  return (
    <div className="fixed top-6 right-6 z-30 space-y-3">
      {notifications.map((notification) => (
        <Card key={notification.id} className="w-80 shadow-lg border-l-4 border-l-primary animate-in slide-in-from-right">
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center space-x-2">
                {notification.type === 'urgent' && <AlertCircle className="h-4 w-4 text-red-500" />}
                {notification.type === 'offer' && <TrendingUp className="h-4 w-4 text-green-500" />}
                {notification.type === 'info' && <CheckCircle className="h-4 w-4 text-blue-500" />}
                <h4 className="font-semibold text-sm">{notification.title}</h4>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismissNotification(notification.id)}
                className="h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{notification.message}</p>
            <Button
              size="sm"
              onClick={() => handleNotificationAction(notification.actionType, notification.id)}
              className="w-full"
            >
              {notification.action}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Exit Intent Modal
export const ExitIntentModal = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !hasShown) {
        setIsVisible(true)
        setHasShown(true)
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave)
    return () => document.removeEventListener('mouseleave', handleMouseLeave)
  }, [hasShown])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Wait! Don't Miss Out</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Before you go, get your free ROI assessment and see how much PoliLynx could improve your agency's profitability.
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="text-sm">Free personalized ROI calculation</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="text-sm">5-minute consultation call</span>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
              <Shield className="h-5 w-5 text-purple-600" />
              <span className="text-sm">No obligation, no pressure</span>
            </div>
          </div>

          <div className="space-y-2">
            <Button 
              className="w-full"
              onClick={() => {
                setIsVisible(false)
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Get My Free ROI Assessment
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setIsVisible(false)}
            >
              Maybe Later
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default {
  PoliLynxChatbot,
  ROICalculator,
  SmartNotifications,
  ExitIntentModal
}

