import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { 
  ArrowRight, 
  Shield, 
  TrendingUp, 
  Zap, 
  Users, 
  Award, 
  CheckCircle, 
  BarChart3,
  Lock,
  Coins,
  Building,
  Target,
  Star,
  Phone,
  Mail,
  MapPin,
  Menu,
  X
} from 'lucide-react'
import './App.css'
import polilynxLogo from './assets/polilynx-logo-actual.png'
import heroBackground from './assets/hero-background.png'
import blockchainVisualization from './assets/blockchain-visualization.png'
import { ContactForm, LeadTracking } from './components/HubSpotIntegration.jsx'
import { 
  PoliLynxChatbot, 
  ROICalculator, 
  SmartNotifications, 
  ExitIntentModal 
} from './components/AutomatedInteractions.jsx'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'platform', 'services', 'results', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'platform', label: 'Platform' },
    { id: 'services', label: 'Services' },
    { id: 'results', label: 'Results' },
    { id: 'contact', label: 'Contact' }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src={polilynxLogo} alt="PoliLynx" className="h-16 w-auto" />
              <span className="text-xs text-muted-foreground hidden sm:block">Blockchain Insurance Solutions</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Button onClick={() => scrollToSection('contact')}>
                Get Started
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block px-3 py-2 text-base font-medium transition-colors hover:text-primary ${
                    activeSection === item.id ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="px-3 py-2">
                <Button onClick={() => scrollToSection('contact')} className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        >
          <div className="absolute inset-0 bg-background/80" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 text-sm">
              Proven Seven-Figure Insurance Industry Veteran
            </Badge>
            
            <div className="mb-6 flex justify-center">
              <img src={polilynxLogo} alt="PoliLynx" className="h-20 md:h-24 lg:h-28 w-auto" />
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Transform Your Insurance Agency with{' '}
              <span className="text-primary">Blockchain Technology</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Achieve 30-40% EBITDA margins through AI-powered automation and proven operational expertise. 
              Built by a veteran who's generated $30K+ monthly for over a decade.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" onClick={() => scrollToSection('platform')} className="text-lg px-8 py-6">
                Explore Platform
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => scrollToSection('results')} className="text-lg px-8 py-6">
                View Results
              </Button>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">30-40%</div>
                <div className="text-muted-foreground">EBITDA Margins</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">$30K+</div>
                <div className="text-muted-foreground">Monthly Production</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">10+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">About PoliLynx</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Proven Expertise Meets Revolutionary Technology
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Led by Clyde Mead, who has built multiple seven-figure insurance companies and maintained 
              $30K+ monthly production for over a decade. Now revolutionizing the industry with blockchain technology.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">Why PoliLynx is Different</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Award className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Proven Track Record</h4>
                    <p className="text-muted-foreground">Multiple seven-figure insurance companies built and operated successfully</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <TrendingUp className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Sustained Performance</h4>
                    <p className="text-muted-foreground">$30K+ monthly personal production maintained for over a decade</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Zap className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Revolutionary Technology</h4>
                    <p className="text-muted-foreground">Blockchain-powered platform that transforms archaic operations into AI-enabled enterprises</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Target className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold mb-2">Performance-Based Approach</h4>
                    <p className="text-muted-foreground">Our success is directly tied to your results - guaranteed improvements or no ongoing fees</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={blockchainVisualization} 
                alt="Blockchain Technology Visualization" 
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Platform Section */}
      <section id="platform" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">PoliLynx Platform</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Blockchain-Powered Insurance Transformation
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive platform transforms every aspect of your agency operations through 
              AI automation, blockchain security, and proven operational methodologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Policy Tokenization</CardTitle>
                <CardDescription>
                  Transform insurance policies into secure, tradeable NFTs on the blockchain
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Enhanced security and transparency</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Automated compliance tracking</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Streamlined transfers and claims</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-4" />
                <CardTitle>AI-Powered Automation</CardTitle>
                <CardDescription>
                  Eliminate manual processes with intelligent automation systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Automated underwriting and quotes</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Smart contract execution</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Predictive analytics and insights</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Coins className="h-12 w-12 text-primary mb-4" />
                <CardTitle>XRP Integration</CardTitle>
                <CardDescription>
                  Leverage XRP for fast, secure, and cost-effective transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Instant premium payments</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Reduced transaction costs</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Global payment capabilities</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <BarChart3 className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Advanced Analytics</CardTitle>
                <CardDescription>
                  Real-time insights and performance optimization tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Performance dashboards</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Predictive modeling</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />ROI optimization</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Lock className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Enhanced Security</CardTitle>
                <CardDescription>
                  Military-grade security with blockchain immutability
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Immutable record keeping</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Advanced encryption</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Fraud prevention</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Client Experience</CardTitle>
                <CardDescription>
                  Revolutionary client portal and self-service capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Self-service portal</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Mobile-first design</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />24/7 AI assistance</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Our Services</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Multiple Revenue Streams, Maximum Value
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We offer flexible partnership models designed to align our success with yours, 
              whether through direct ownership, facilitation, or technology licensing.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <Building className="h-16 w-16 text-primary mx-auto mb-4" />
                <CardTitle className="text-2xl">Direct Ownership</CardTitle>
                <CardDescription className="text-lg">
                  Partner with us for agency acquisition and transformation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">51-70%</div>
                  <div className="text-sm text-muted-foreground">Your Ownership Stake</div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Proven operational expertise</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Blockchain transformation</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Ongoing management support</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Performance guarantees</li>
                </ul>
                <Button className="w-full" onClick={() => scrollToSection('contact')}>
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg border-primary">
              <CardHeader className="text-center">
                <Star className="h-16 w-16 text-primary mx-auto mb-4" />
                <CardTitle className="text-2xl">Platform Licensing</CardTitle>
                <CardDescription className="text-lg">
                  Transform your existing agency with our blockchain platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">15-25%</div>
                  <div className="text-sm text-muted-foreground">Performance-Based Fees</div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Complete platform access</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Implementation support</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Ongoing optimization</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Results guarantee</li>
                </ul>
                <Button className="w-full" onClick={() => scrollToSection('contact')}>
                  Get Started
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center">
                <TrendingUp className="h-16 w-16 text-primary mx-auto mb-4" />
                <CardTitle className="text-2xl">Transaction Facilitation</CardTitle>
                <CardDescription className="text-lg">
                  Connect agencies with qualified investors and buyers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">1-3%</div>
                  <div className="text-sm text-muted-foreground">Finder's Fee</div>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Qualified investor network</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Due diligence support</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Transaction management</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Post-closing integration</li>
                </ul>
                <Button className="w-full" onClick={() => scrollToSection('contact')}>
                  Explore Options
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Proven Results</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Transformation That Delivers
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform consistently delivers measurable improvements in efficiency, 
              profitability, and client satisfaction across all implementations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">30-40%</div>
              <div className="text-lg font-semibold mb-2">EBITDA Margins</div>
              <div className="text-muted-foreground">vs. industry 15-20%</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50-75%</div>
              <div className="text-lg font-semibold mb-2">Cost Reduction</div>
              <div className="text-muted-foreground">through automation</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">95%+</div>
              <div className="text-lg font-semibold mb-2">Client Satisfaction</div>
              <div className="text-muted-foreground">improved experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">3-6x</div>
              <div className="text-lg font-semibold mb-2">ROI</div>
              <div className="text-muted-foreground">within first year</div>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-center mb-8">Transformation Case Study</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4 text-destructive">Before PoliLynx</h4>
                <ul className="space-y-3">
                  <li className="flex items-center"><X className="h-4 w-4 text-destructive mr-2" />18% EBITDA margins</li>
                  <li className="flex items-center"><X className="h-4 w-4 text-destructive mr-2" />Manual, paper-based processes</li>
                  <li className="flex items-center"><X className="h-4 w-4 text-destructive mr-2" />High operational costs</li>
                  <li className="flex items-center"><X className="h-4 w-4 text-destructive mr-2" />Limited client self-service</li>
                  <li className="flex items-center"><X className="h-4 w-4 text-destructive mr-2" />Compliance challenges</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-4 text-primary">After PoliLynx</h4>
                <ul className="space-y-3">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />35% EBITDA margins</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Fully automated workflows</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />60% cost reduction</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />24/7 client portal</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Automated compliance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Get Started</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Agency?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Join the insurance industry revolution. Contact us today to learn how PoliLynx 
              can transform your agency with proven expertise and blockchain technology.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-primary" />
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-muted-foreground">contact@polilynx.com</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-primary" />
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-muted-foreground">+1 (555) 123-4567</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="h-6 w-6 text-primary" />
                  <div>
                    <div className="font-semibold">Address</div>
                    <div className="text-muted-foreground">
                      10436 S Kestrel Rise Rd<br />
                      South Jordan, UT 84009
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Why Choose PoliLynx?</h4>
                <ul className="space-y-3">
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Proven seven-figure track record</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Performance-based pricing</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Revolutionary blockchain technology</li>
                  <li className="flex items-center"><CheckCircle className="h-4 w-4 text-primary mr-2" />Guaranteed results</li>
                </ul>
              </div>
            </div>

            <Card className="w-full max-w-2xl">
              <CardHeader>
                <CardTitle>Schedule a Consultation</CardTitle>
                <CardDescription>
                  Get a personalized assessment of your agency's transformation potential
                </CardDescription>
              </CardHeader>
              <ContactForm 
                formType="consultation"
                onSuccess={(data) => {
                  console.log('Lead captured:', data)
                  // Additional success handling
                }}
                onError={(error) => {
                  console.error('Form error:', error)
                  // Additional error handling
                }}
              />
            </Card> </div>
        </div>
      </section>

      {/* Automated Interactions */}
      <PoliLynxChatbot />
      <ROICalculator />
      <SmartNotifications />
      <ExitIntentModal />
      <LeadTracking />

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <img src={polilynxLogo} alt="PoliLynx" className="h-12 w-auto" />
                <span className="text-xs text-muted-foreground">Blockchain Insurance Solutions</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Transforming insurance agencies through proven expertise and revolutionary blockchain technology. 
                Built by industry veterans for industry leaders.
              </p>
              <div className="text-sm text-muted-foreground">
                © 2025 PoliLynx Holdings dba PoliLynx. All rights reserved.
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => scrollToSection('platform')}>Features</button></li>
                <li><button onClick={() => scrollToSection('services')}>Services</button></li>
                <li><button onClick={() => scrollToSection('results')}>Results</button></li>
                <li>Security</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => scrollToSection('about')}>About</button></li>
                <li><button onClick={() => scrollToSection('contact')}>Contact</button></li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

