import React, { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  FileText, 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Building,
  Briefcase,
  Globe,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react'

const DocumentRequestForm = ({ documentType, onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    company: '',
    title: '',
    website: '',
    document_type: documentType || 'saas_nda',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const documentTypes = {
    'saas_nda': {
      name: 'SaaS Platform NDA',
      description: 'Non-disclosure agreement for platform evaluation',
      icon: FileText,
      badge: 'SaaS Evaluation'
    },
    'acquisition_nda': {
      name: 'Business Acquisition NDA',
      description: 'Mutual NDA for business acquisition discussions',
      icon: Building2,
      badge: 'Acquisition'
    },
    'service_agreement': {
      name: 'SaaS Service Agreement',
      description: 'Comprehensive SaaS platform service agreement',
      icon: FileText,
      badge: 'Implementation'
    },
    'acquisition_loi': {
      name: 'Acquisition Letter of Intent',
      description: 'Template LOI for business acquisition opportunities',
      icon: Building2,
      badge: 'Investment'
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Validate required fields
      const requiredFields = ['first_name', 'last_name', 'email', 'company', 'document_type']
      const missingFields = requiredFields.filter(field => !formData[field])
      
      if (missingFields.length > 0) {
        throw new Error(`Please fill in all required fields: ${missingFields.join(', ')}`)
      }

      // Submit to integration API
      const response = await fetch('/api/document-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus('success')
        if (onSuccess) {
          onSuccess(result)
        }
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            company: '',
            title: '',
            website: '',
            document_type: documentType || 'saas_nda',
            message: ''
          })
          setSubmitStatus(null)
        }, 3000)
      } else {
        throw new Error(result.error || 'Failed to process document request')
      }
    } catch (error) {
      console.error('Document request error:', error)
      setSubmitStatus('error')
      if (onError) {
        onError(error)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const currentDocType = documentTypes[formData.document_type]
  const IconComponent = currentDocType?.icon || FileText

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <IconComponent className="h-6 w-6 text-primary" />
            <div>
              <CardTitle>Request Legal Document</CardTitle>
              <CardDescription>
                Get professional legal documents for your business needs
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary">{currentDocType?.badge}</Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Document Type Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Document Type *</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(documentTypes).map(([key, doc]) => {
                const DocIcon = doc.icon
                return (
                  <div
                    key={key}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      formData.document_type === key
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, document_type: key }))}
                  >
                    <div className="flex items-start space-x-3">
                      <DocIcon className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h4 className="font-medium text-sm">{doc.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{doc.description}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="John"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name *</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Doe"
                  required
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="john@company.com"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Company Name *</label>
              <div className="relative">
                <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Your Company Inc."
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Job Title</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="CEO, CTO, etc."
                />
              </div>
            </div>
          </div>

          {/* Website */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Company Website</label>
            <div className="relative">
              <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://yourcompany.com"
              />
            </div>
          </div>

          {/* Additional Message */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Additional Information</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              placeholder="Any specific requirements or questions about the document..."
            />
          </div>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="flex items-center space-x-2 p-4 bg-green-50 border border-green-200 rounded-md">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-800">Document Request Submitted Successfully!</p>
                <p className="text-xs text-green-600 mt-1">
                  You'll receive the document via DocuSign within 24 hours. Check your email for signing instructions.
                </p>
              </div>
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-md">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm font-medium text-red-800">Error Processing Request</p>
                <p className="text-xs text-red-600 mt-1">
                  Please try again or contact us at (801) 803-4384 for assistance.
                </p>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing Request...
              </>
            ) : (
              <>
                <FileText className="h-4 w-4 mr-2" />
                Request Document
              </>
            )}
          </Button>

          {/* Legal Notice */}
          <div className="text-xs text-muted-foreground text-center space-y-1">
            <p>
              By submitting this request, you agree to receive the requested legal document via DocuSign 
              and acknowledge that PoliLynx™ will process your information according to our privacy policy.
            </p>
            <p>
              All documents are legally binding once signed. Please review carefully before signing.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default DocumentRequestForm

