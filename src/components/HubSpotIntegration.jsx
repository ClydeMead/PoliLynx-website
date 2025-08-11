import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

// HubSpot API configuration
const HUBSPOT_API_KEY = process.env.REACT_APP_HUBSPOT_API_KEY || 'YOUR_HUBSPOT_API_KEY_HERE'
const HUBSPOT_API_BASE = 'https://api.hubapi.com'

class HubSpotAPI {
  constructor(apiKey) {
    this.apiKey = apiKey
    this.baseURL = HUBSPOT_API_BASE
  }

  async createContact(contactData) {
    try {
      const response = await fetch(`${this.baseURL}/crm/v3/objects/contacts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          properties: contactData
        })
      })

      if (!response.ok) {
        throw new Error(`HubSpot API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating contact:', error)
      throw error
    }
  }

  async createDeal(dealData) {
    try {
      const response = await fetch(`${this.baseURL}/crm/v3/objects/deals`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          properties: dealData
        })
      })

      if (!response.ok) {
        throw new Error(`HubSpot API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error creating deal:', error)
      throw error
    }
  }

  async associateContactWithDeal(contactId, dealId) {
    try {
      const response = await fetch(`${this.baseURL}/crm/v3/objects/deals/${dealId}/associations/contacts/${contactId}/deal_to_contact`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`HubSpot API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Error associating contact with deal:', error)
      throw error
    }
  }
}

const hubspotAPI = new HubSpotAPI(HUBSPOT_API_KEY)

export const ContactForm = ({ formType = 'consultation', onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    phone: '',
    annualRevenue: '',
    message: '',
    leadSource: 'Website',
    formType: formType
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    const required = ['firstName', 'lastName', 'email', 'company']
    return required.every(field => formData[field].trim() !== '')
  }

  const calculateLeadScore = () => {
    let score = 0
    
    // Revenue-based scoring
    const revenue = formData.annualRevenue
    if (revenue === '$15M+') score += 40
    else if (revenue === '$7M - $15M') score += 30
    else if (revenue === '$3M - $7M') score += 20
    else if (revenue === '$1M - $3M') score += 10

    // Form type scoring
    if (formType === 'platform_demo') score += 20
    else if (formType === 'consultation') score += 15
    else if (formType === 'contact') score += 10

    // Message length scoring (engagement indicator)
    if (formData.message.length > 100) score += 10
    else if (formData.message.length > 50) score += 5

    return Math.min(score, 100)
  }

  const determineLeadPriority = (score) => {
    if (score >= 70) return 'HIGH'
    if (score >= 50) return 'MEDIUM'
    if (score >= 30) return 'LOW'
    return 'VERY_LOW'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      setSubmitStatus({ type: 'error', message: 'Please fill in all required fields.' })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const leadScore = calculateLeadScore()
      const priority = determineLeadPriority(leadScore)
      
      // Create contact in HubSpot
      const contactData = {
        firstname: formData.firstName,
        lastname: formData.lastName,
        email: formData.email,
        company: formData.company,
        phone: formData.phone || '',
        website: window.location.origin,
        lifecyclestage: 'lead',
        lead_source: formData.leadSource,
        polilynx_lead_score: leadScore.toString(),
        polilynx_priority: priority,
        polilynx_form_type: formType,
        polilynx_annual_revenue: formData.annualRevenue,
        polilynx_inquiry_message: formData.message,
        polilynx_submission_date: new Date().toISOString(),
        polilynx_lead_source: 'Website Contact Form'
      }

      const contact = await hubspotAPI.createContact(contactData)
      
      // Create deal for high-priority leads
      if (priority === 'HIGH' || priority === 'MEDIUM') {
        const dealData = {
          dealname: `${formData.company} - ${formType === 'consultation' ? 'Consultation Request' : 'Platform Interest'}`,
          dealstage: 'appointmentscheduled',
          pipeline: 'default',
          amount: formType === 'consultation' ? '150000' : '75000', // Estimated deal value
          polilynx_lead_score: leadScore.toString(),
          polilynx_priority: priority,
          polilynx_deal_source: 'Website Lead',
          polilynx_form_type: formType,
          closedate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days from now
        }

        const deal = await hubspotAPI.createDeal(dealData)
        
        // Associate contact with deal
        await hubspotAPI.associateContactWithDeal(contact.id, deal.id)
      }

      // Track form submission event
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
          event_category: 'Lead Generation',
          event_label: formType,
          value: leadScore
        })
      }

      setSubmitStatus({ 
        type: 'success', 
        message: 'Thank you! We\'ll be in touch within 24 hours to discuss your transformation opportunity.',
        priority: priority,
        score: leadScore
      })
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        phone: '',
        annualRevenue: '',
        message: '',
        leadSource: 'Website',
        formType: formType
      })

      if (onSuccess) onSuccess({ contact, priority, score: leadScore })

    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus({ 
        type: 'error', 
        message: 'There was an error submitting your request. Please try again or contact us directly.' 
      })
      
      if (onError) onError(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>
          {formType === 'consultation' && 'Schedule a Consultation'}
          {formType === 'platform_demo' && 'Request Platform Demo'}
          {formType === 'contact' && 'Contact Us'}
        </CardTitle>
        <CardDescription>
          {formType === 'consultation' && 'Get a personalized assessment of your agency\'s transformation potential'}
          {formType === 'platform_demo' && 'See how PoliLynx can transform your agency operations'}
          {formType === 'contact' && 'Let\'s discuss how PoliLynx can help your agency'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submitStatus && (
          <div className={`mb-6 p-4 rounded-lg border ${
            submitStatus.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : 'bg-red-50 border-red-200 text-red-800'
          }`}>
            <div className="flex items-center space-x-2">
              {submitStatus.type === 'success' ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <div>
                <p className="font-medium">{submitStatus.message}</p>
                {submitStatus.type === 'success' && submitStatus.priority === 'HIGH' && (
                  <p className="text-sm mt-1">
                    <Badge variant="destructive" className="mr-2">High Priority Lead</Badge>
                    You'll receive priority attention from our team.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                First Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="John"
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input 
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Doe"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Email <span className="text-red-500">*</span>
            </label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="john@example.com"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Company <span className="text-red-500">*</span>
            </label>
            <input 
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Your Insurance Agency"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Phone</label>
            <input 
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Annual Revenue</label>
            <select 
              name="annualRevenue"
              value={formData.annualRevenue}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Select revenue range</option>
              <option value="$1M - $3M">$1M - $3M</option>
              <option value="$3M - $7M">$3M - $7M</option>
              <option value="$7M - $15M">$7M - $15M</option>
              <option value="$15M+">$15M+</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Message</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary h-24"
              placeholder={
                formType === 'consultation' 
                  ? 'Tell us about your transformation goals...'
                  : formType === 'platform_demo'
                  ? 'What specific features are you most interested in?'
                  : 'How can we help your agency?'
              }
            />
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                {formType === 'consultation' && 'Schedule Consultation'}
                {formType === 'platform_demo' && 'Request Demo'}
                {formType === 'contact' && 'Send Message'}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export const LeadTracking = () => {
  const [pageViews, setPageViews] = useState(0)
  const [sessionDuration, setSessionDuration] = useState(0)

  React.useEffect(() => {
    // Track page view
    setPageViews(prev => prev + 1)
    
    // Track session duration
    const startTime = Date.now()
    const interval = setInterval(() => {
      setSessionDuration(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)

    // Track scroll depth
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      )
      
      if (typeof gtag !== 'undefined') {
        gtag('event', 'scroll', {
          event_category: 'Engagement',
          event_label: 'Scroll Depth',
          value: scrollPercent
        })
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      clearInterval(interval)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return null // This is a tracking component, no UI
}

export default { ContactForm, LeadTracking }

