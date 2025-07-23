import { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Car, 
  Calendar, 
  DollarSign,
  User,
  Send,
  CheckCircle,
  AlertCircle,
  Star,
  Award,
  Shield,
  Zap,
  Heart,
  Users,
  Headphones,
  Navigation
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Layout from '@/components/Layout';

export default function Contact() {
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    inquiryType: '',
    vehicleInterest: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setShowSuccess(true);
    setLoading(false);
    
    // Reset form after success
    setTimeout(() => {
      setShowSuccess(false);
      setContactForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        inquiryType: '',
        vehicleInterest: '',
        preferredDate: '',
        preferredTime: '',
        message: ''
      });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: <Phone className="h-8 w-8" />,
      title: "Call Us",
      description: "Speak directly with our luxury automotive specialists",
      contact: "(555) 123-4567",
      hours: "Mon-Fri: 8AM-8PM | Sat-Sun: 9AM-7PM",
      color: "from-ocean-500 to-ocean-600",
      action: "Call Now"
    },
    {
      icon: <Mail className="h-8 w-8" />,
      title: "Email Us",
      description: "Send us your questions and we'll respond within 2 hours",
      contact: "info@alpinemotors.com",
      hours: "24/7 Response",
      color: "from-forest-500 to-forest-600",
      action: "Send Email"
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Live Chat",
      description: "Chat with our team for instant assistance",
      contact: "Available Now",
      hours: "9AM-9PM Daily",
      color: "from-sunset-500 to-sunset-600",
      action: "Start Chat"
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Visit Showroom",
      description: "Experience our luxury vehicles in person",
      contact: "123 Alpine Way, Mountain View, CA",
      hours: "Open 7 Days",
      color: "from-gold-500 to-gold-600",
      action: "Get Directions"
    }
  ];

  const specialists = [
    {
      name: "Sarah Johnson",
      title: "Luxury Vehicle Specialist",
      specialty: "Sports Cars & Performance Vehicles",
      image: "👩‍💼",
      phone: "(555) 123-4567 ext. 101",
      email: "sarah.johnson@alpinemotors.com",
      languages: ["English", "Spanish"]
    },
    {
      name: "Michael Chen",
      title: "Financing Director",
      specialty: "Automotive Financing & Leasing",
      image: "👨‍💼",
      phone: "(555) 123-4567 ext. 102",
      email: "michael.chen@alpinemotors.com",
      languages: ["English", "Mandarin"]
    },
    {
      name: "Amanda Rodriguez",
      title: "Customer Experience Manager",
      specialty: "Luxury SUVs & Family Vehicles",
      image: "👩‍💼",
      phone: "(555) 123-4567 ext. 103",
      email: "amanda.rodriguez@alpinemotors.com",
      languages: ["English", "Spanish", "French"]
    },
    {
      name: "David Thompson",
      title: "Service Advisor",
      specialty: "Vehicle Maintenance & Care",
      image: "👨‍💼",
      phone: "(555) 123-4567 ext. 104",
      email: "david.thompson@alpinemotors.com",
      languages: ["English"]
    }
  ];

  const faqs = [
    {
      question: "How can I schedule a test drive?",
      answer: "You can schedule a test drive by calling us, filling out our contact form, or visiting our showroom. We offer flexible scheduling including evenings and weekends."
    },
    {
      question: "What financing options are available?",
      answer: "We offer competitive financing rates starting at 3.49% APR, lease programs, and cash purchase incentives. Our financing specialists can help you find the perfect solution."
    },
    {
      question: "Do you accept trade-ins?",
      answer: "Yes! We accept trade-ins and offer competitive valuations. Our team can provide an estimate over the phone or schedule an in-person appraisal."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 7-day satisfaction guarantee. If you're not completely satisfied with your purchase, you can return it within 7 days for a full refund."
    },
    {
      question: "Do you provide vehicle delivery?",
      answer: "Yes, we offer complimentary delivery within 50 miles of our showroom. For longer distances, we can arrange transport for a reasonable fee."
    },
    {
      question: "What warranty comes with the vehicles?",
      answer: "All our vehicles come with comprehensive warranties. New vehicles include manufacturer warranties, and our certified pre-owned vehicles include extended coverage."
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-ocean-600 via-forest-600 to-sunset-600 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-40 h-40 bg-gold-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-56 h-56 bg-ocean-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-forest-400 rounded-full blur-3xl animate-pulse"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-block p-6 bg-white/10 backdrop-blur-sm rounded-3xl mb-8">
                <Headphones className="h-16 w-16 text-white mx-auto" />
              </div>
            </div>
            <Badge variant="outline" className="mb-6 text-gold-300 border-gold-300 px-6 py-3 text-lg">
              Premium Customer Service
            </Badge>
            <h1 className="text-6xl lg:text-7xl font-bold mb-8">
              Get in Touch
              <span className="bg-gradient-to-r from-gold-300 to-gold-400 bg-clip-text text-transparent block">
                With Our Team
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              Whether you're ready for a test drive, need financing assistance, or have questions about our luxury vehicles, 
              our dedicated team is here to provide personalized service every step of the way.
            </p>
            <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-12">
              <Button size="lg" className="text-xl px-12 py-6 bg-white text-ocean-600 hover:bg-gray-100 font-bold rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
                <Phone className="h-6 w-6 mr-3" />
                Call (555) 123-4567
              </Button>
              <Button size="lg" variant="outline" className="text-xl px-12 py-6 border-2 border-gold-300 text-gold-300 hover:bg-gold-300 hover:text-ocean-900 font-bold rounded-3xl transition-all duration-300">
                <Calendar className="h-6 w-6 mr-3" />
                Schedule Visit
              </Button>
            </div>
            
            {/* Quick Contact Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-bold text-gold-300 mb-2">< 2hr</div>
                <div className="text-ocean-100">Response Time</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-bold text-gold-300 mb-2">7 Days</div>
                <div className="text-ocean-100">Weekly Service</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-bold text-gold-300 mb-2">5★</div>
                <div className="text-ocean-100">Customer Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-ocean-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-ocean-600 border-ocean-300 px-4 py-2">
              Contact Options
            </Badge>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent mb-4">
              How Would You Like to Connect?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the contact method that works best for you. We're here to help every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-3xl border-2 border-transparent hover:border-ocean-200">
                <CardHeader className={`bg-gradient-to-r ${method.color} text-white rounded-t-3xl p-6`}>
                  <div className="text-center">
                    <div className="mb-4 flex justify-center">
                      {method.icon}
                    </div>
                    <CardTitle className="text-xl font-bold">{method.title}</CardTitle>
                    <p className="text-sm opacity-90 mt-2">{method.description}</p>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-lg font-bold text-gray-900 mb-2">{method.contact}</div>
                    <div className="text-sm text-gray-600">{method.hours}</div>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl">
                    {method.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Forms */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-forest-600 border-forest-300 px-4 py-2">
              Send Us a Message
            </Badge>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-forest-600 to-sunset-600 bg-clip-text text-transparent mb-4">
              Tell Us How We Can Help
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Fill out our contact form and we'll get back to you within 2 hours during business hours
            </p>
          </div>

          <Card className="shadow-2xl border-2 border-gray-100 rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-forest-500 to-sunset-500 text-white">
              <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-3">
                <MessageSquare className="h-6 w-6" />
                Contact Form
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {showSuccess ? (
                <div className="text-center space-y-6">
                  <div className="inline-block p-6 bg-green-100 rounded-full">
                    <CheckCircle className="h-16 w-16 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-green-600">Message Sent Successfully!</h3>
                  <p className="text-xl text-gray-700">
                    Thank you for contacting Alpine Motors. We'll respond to your inquiry within 2 hours during business hours.
                  </p>
                  <Button 
                    onClick={() => setShowSuccess(false)}
                    className="bg-gradient-to-r from-ocean-500 to-forest-500"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={contactForm.firstName}
                        onChange={(e) => setContactForm({...contactForm, firstName: e.target.value})}
                        className="mt-2 border-2 border-forest-200 focus:border-forest-500 rounded-xl"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={contactForm.lastName}
                        onChange={(e) => setContactForm({...contactForm, lastName: e.target.value})}
                        className="mt-2 border-2 border-forest-200 focus:border-forest-500 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        className="mt-2 border-2 border-ocean-200 focus:border-ocean-500 rounded-xl"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                        className="mt-2 border-2 border-sunset-200 focus:border-sunset-500 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Inquiry Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="inquiryType">Type of Inquiry *</Label>
                      <Select 
                        value={contactForm.inquiryType} 
                        onValueChange={(value) => setContactForm({...contactForm, inquiryType: value})}
                      >
                        <SelectTrigger className="mt-2 border-2 border-gold-200 focus:border-gold-500 rounded-xl">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="test-drive">Schedule Test Drive</SelectItem>
                          <SelectItem value="purchase">Vehicle Purchase Inquiry</SelectItem>
                          <SelectItem value="financing">Financing Questions</SelectItem>
                          <SelectItem value="trade-in">Trade-In Valuation</SelectItem>
                          <SelectItem value="service">Service & Maintenance</SelectItem>
                          <SelectItem value="general">General Information</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="vehicleInterest">Vehicle of Interest</Label>
                      <Input
                        id="vehicleInterest"
                        value={contactForm.vehicleInterest}
                        onChange={(e) => setContactForm({...contactForm, vehicleInterest: e.target.value})}
                        placeholder="e.g., BMW X5, Mercedes S-Class"
                        className="mt-2 border-2 border-ocean-200 focus:border-ocean-500 rounded-xl"
                      />
                    </div>
                  </div>

                  {/* Preferred Contact Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="preferredDate">Preferred Date</Label>
                      <Input
                        id="preferredDate"
                        type="date"
                        value={contactForm.preferredDate}
                        onChange={(e) => setContactForm({...contactForm, preferredDate: e.target.value})}
                        className="mt-2 border-2 border-forest-200 focus:border-forest-500 rounded-xl"
                      />
                    </div>
                    <div>
                      <Label htmlFor="preferredTime">Preferred Time</Label>
                      <Select 
                        value={contactForm.preferredTime} 
                        onValueChange={(value) => setContactForm({...contactForm, preferredTime: value})}
                      >
                        <SelectTrigger className="mt-2 border-2 border-sunset-200 focus:border-sunset-500 rounded-xl">
                          <SelectValue placeholder="Select preferred time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                          <SelectItem value="evening">Evening (5PM - 8PM)</SelectItem>
                          <SelectItem value="weekend">Weekend</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      placeholder="Tell us more about your inquiry, specific questions, or how we can help you..."
                      className="mt-2 border-2 border-gray-200 focus:border-ocean-500 rounded-xl min-h-[120px]"
                      required
                    />
                  </div>

                  <Alert className="border-blue-200 bg-blue-50">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      Your information is secure and will only be used to respond to your inquiry. We respect your privacy.
                    </AlertDescription>
                  </Alert>

                  <Button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-forest-500 to-sunset-500 hover:from-forest-600 hover:to-sunset-600 text-white font-bold py-4 rounded-xl text-lg"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                        Sending Message...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <Send className="h-5 w-5 mr-3" />
                        Send Message
                      </div>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Team Specialists */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-sunset-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-sunset-600 border-sunset-300 px-4 py-2">
              Our Team
            </Badge>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-sunset-600 to-gold-600 bg-clip-text text-transparent mb-4">
              Meet Your Automotive Specialists
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced team is dedicated to providing personalized service and expert guidance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialists.map((specialist, index) => (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl border-2 border-gray-100">
                <CardContent className="p-6">
                  <div className="text-6xl mb-4">{specialist.image}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{specialist.name}</h3>
                  <Badge variant="outline" className="mb-4 text-sunset-600 border-sunset-300">
                    {specialist.title}
                  </Badge>
                  <p className="text-gray-600 mb-4 text-sm">{specialist.specialty}</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <Phone className="h-4 w-4 text-ocean-500" />
                      <span className="text-gray-600">{specialist.phone}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Mail className="h-4 w-4 text-forest-500" />
                      <span className="text-gray-600 text-xs">{specialist.email}</span>
                    </div>
                    <div className="flex justify-center gap-1 mt-3">
                      {specialist.languages.map((lang, langIndex) => (
                        <Badge key={langIndex} variant="secondary" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-gradient-to-r from-sunset-500 to-gold-500 text-white rounded-xl">
                    Contact {specialist.name.split(' ')[0]}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Location Info */}
            <Card className="shadow-2xl border-2 border-gray-100 rounded-3xl">
              <CardHeader className="bg-gradient-to-r from-ocean-500 to-forest-500 text-white rounded-t-3xl">
                <CardTitle className="text-2xl font-bold flex items-center gap-3">
                  <MapPin className="h-6 w-6" />
                  Visit Our Showroom
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">Alpine Motors Luxury Showroom</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="h-5 w-5 text-ocean-500 mt-1" />
                        <div>
                          <p className="font-semibold text-gray-900">123 Alpine Way</p>
                          <p className="text-gray-600">Mountain View, CA 94041</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-forest-500" />
                        <p className="text-gray-700">(555) 123-4567</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-sunset-500" />
                        <p className="text-gray-700">info@alpinemotors.com</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-gold-500" />
                      Business Hours
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="font-semibold text-gray-800">Monday - Friday</p>
                        <p className="text-gray-600">8:00 AM - 8:00 PM</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Saturday</p>
                        <p className="text-gray-600">9:00 AM - 7:00 PM</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Sunday</p>
                        <p className="text-gray-600">10:00 AM - 6:00 PM</p>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Holidays</p>
                        <p className="text-gray-600">By Appointment</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-gradient-to-r from-ocean-500 to-forest-500 text-white rounded-xl">
                      <Navigation className="h-4 w-4 mr-2" />
                      Get Directions
                    </Button>
                    <Button variant="outline" className="flex-1 border-2 border-sunset-500 text-sunset-600 rounded-xl">
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule Visit
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="shadow-2xl border-2 border-gray-100 rounded-3xl">
              <CardHeader className="bg-gradient-to-r from-sunset-500 to-gold-500 text-white rounded-t-3xl">
                <CardTitle className="text-2xl font-bold">Location Map</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="aspect-[4/3] bg-gradient-to-br from-ocean-100 via-forest-100 to-sunset-100 rounded-b-3xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-ocean-500/20 via-forest-500/20 to-sunset-500/20"></div>
                  <div className="text-center relative z-10">
                    <MapPin className="h-16 w-16 text-ocean-600 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Interactive Map</h3>
                    <p className="text-gray-600 mb-6">Located in the heart of Mountain View</p>
                    <Button className="bg-gradient-to-r from-ocean-500 to-forest-500 text-white rounded-xl">
                      Open in Maps
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-forest-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-forest-600 border-forest-300 px-4 py-2">
              Frequently Asked Questions
            </Badge>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-forest-600 to-ocean-600 bg-clip-text text-transparent mb-4">
              Quick Answers to Common Questions
            </h2>
            <p className="text-xl text-gray-600">
              Find answers to the most common questions about our services and vehicles
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow rounded-2xl border-2 border-gray-100">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-forest-500 to-ocean-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed ml-11">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-6">Don't see your question answered?</p>
            <Button className="bg-gradient-to-r from-forest-500 to-ocean-500 text-white px-8 py-3 rounded-xl">
              <MessageSquare className="h-4 w-4 mr-2" />
              Ask Our Team
            </Button>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 text-gold-600 border-gold-300 px-4 py-2">
              Customer Reviews
            </Badge>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-gold-600 to-sunset-600 bg-clip-text text-transparent mb-4">
              What Our Customers Say
            </h2>
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <span className="text-2xl font-bold text-gold-600">5.0</span>
              <span className="text-gray-600">• 2,500+ Reviews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Jennifer Martinez",
                location: "Palo Alto, CA",
                rating: 5,
                review: "Exceptional service from start to finish. The team helped me find the perfect BMW X5 and made the entire process seamless. Highly recommend!"
              },
              {
                name: "Robert Chen",
                location: "San Francisco, CA", 
                rating: 5,
                review: "Outstanding customer service and expertise. They found me exactly what I was looking for and provided excellent financing options."
              },
              {
                name: "Emily Thompson",
                location: "San Jose, CA",
                rating: 5,
                review: "Professional, knowledgeable, and genuinely caring team. They made my luxury car purchase experience truly memorable."
              }
            ].map((review, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 rounded-2xl border-2 border-gray-100">
                <CardContent className="p-6">
                  <div className="flex mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{review.review}"</p>
                  <div className="border-t pt-4">
                    <p className="font-bold text-gray-900">{review.name}</p>
                    <p className="text-sm text-gray-600">{review.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-16 bg-gradient-to-br from-ocean-600 via-forest-600 to-sunset-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse absolute top-10 left-10"></div>
            <div className="w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse absolute bottom-10 right-10"></div>
          </div>
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <div className="mb-8">
            <div className="inline-block p-6 bg-white/10 backdrop-blur-sm rounded-3xl mb-8">
              <span className="text-7xl">🚨</span>
            </div>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Need Immediate
            <span className="bg-gradient-to-r from-gold-300 to-gold-400 bg-clip-text text-transparent block">
              Assistance?
            </span>
          </h2>
          <p className="text-xl lg:text-2xl mb-8 leading-relaxed max-w-2xl mx-auto text-gray-100">
            For urgent matters, roadside assistance, or after-hours service needs, 
            our emergency support team is available 24/7.
          </p>
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
            <Button size="lg" className="text-xl px-12 py-6 bg-red-600 hover:bg-red-700 font-bold rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
              <Phone className="h-5 w-5 mr-3" />
              Emergency: (555) 911-HELP
            </Button>
            <Button size="lg" variant="outline" className="text-xl px-12 py-6 border-2 border-gold-300 text-gold-300 hover:bg-gold-300 hover:text-ocean-900 font-bold rounded-3xl transition-all duration-300">
              <MessageSquare className="h-5 w-5 mr-3" />
              24/7 Live Chat
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}