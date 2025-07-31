import { useState } from "react";
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
  Navigation,
  Target,
  Trophy,
  Globe,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Layout from "@/components/Layout";

export default function Contact() {
  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    inquiryType: "",
    vehicleInterest: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setShowSuccess(true);
    setLoading(false);

    // Reset form after success
    setTimeout(() => {
      setShowSuccess(false);
      setContactForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        inquiryType: "",
        vehicleInterest: "",
        preferredDate: "",
        preferredTime: "",
        message: "",
      });
    }, 3000);
  };

  const contactMethods = [
    {
      icon: <Phone className="h-8 w-8" />,
      title: "Call Our Experts",
      description:
        "Speak directly with our certified luxury automotive specialists for immediate assistance and expert guidance",
      contact: "(555) 123-4567",
      hours: "Mon-Fri: 8AM-8PM | Sat-Sun: 9AM-7PM",
      color: "from-ocean-500 to-ocean-600",
      action: "Call Now",
      image:
        "https://images.pexels.com/photos/7689884/pexels-photo-7689884.jpeg",
      bgImage:
        "https://images.pexels.com/photos/7144177/pexels-photo-7144177.jpeg",
      features: [
        "Certified Specialists",
        "Immediate Assistance",
        "Professional Consultation",
      ],
    },
    {
      icon: <Mail className="h-8 w-8" />,
      title: "Email Support",
      description:
        "Send detailed inquiries and receive comprehensive responses from our expert automotive consultants",
      contact: "info@alpinemotors.com",
      hours: "24/7 Response Within 2 Hours",
      color: "from-forest-500 to-forest-600",
      action: "Send Email",
      image:
        "https://images.pexels.com/photos/7223036/pexels-photo-7223036.jpeg",
      bgImage:
        "https://images.pexels.com/photos/5699479/pexels-photo-5699479.jpeg",
      features: [
        "Detailed Responses",
        "Expert Analysis",
        "Personalized Recommendations",
      ],
    },
    {
      icon: <MessageSquare className="h-8 w-8" />,
      title: "Live Chat",
      description:
        "Connect instantly with our knowledgeable luxury automotive specialists for real-time assistance",
      contact: "Available Now",
      hours: "9AM-9PM Daily",
      color: "from-sunset-500 to-sunset-600",
      action: "Start Chat",
      image:
        "https://images.pexels.com/photos/7689884/pexels-photo-7689884.jpeg",
      bgImage:
        "https://images.pexels.com/photos/7144177/pexels-photo-7144177.jpeg",
      features: ["Instant Response", "Real-time Support", "Live Consultation"],
    },
    {
      icon: <MapPin className="h-8 w-8" />,
      title: "Visit Our Showroom",
      description:
        "Experience our luxury collection in our state-of-the-art Mountain View facility with expert guidance",
      contact: "123 Alpine Way, Mountain View, CA",
      hours: "Open 7 Days a Week",
      color: "from-gold-500 to-gold-600",
      action: "Get Directions",
      image:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
      bgImage:
        "https://images.pexels.com/photos/28380943/pexels-photo-28380943.jpeg",
      features: [
        "Private Consultation",
        "Test Drive Experience",
        "Luxury Environment",
      ],
    },
  ];

  const specialists = [
    {
      name: "Sarah Johnson",
      title: "Senior Luxury Vehicle Specialist",
      specialty: "Sports Cars & High-Performance Vehicles",
      image:
        "https://images.pexels.com/photos/7693223/pexels-photo-7693223.jpeg",
      phone: "(555) 123-4567 ext. 101",
      email: "sarah.johnson@alpinemotors.com",
      languages: ["English", "Spanish"],
      experience: "12+ Years",
      expertiseImage:
        "https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg",
      description:
        "Specializing in exotic sports cars and performance vehicles, Sarah helps discerning clients find their perfect high-performance machine.",
      achievements: [
        "Top Sales Performer",
        "Porsche Certified",
        "Ferrari Specialist",
      ],
    },
    {
      name: "Michael Chen",
      title: "Director of Financial Services",
      specialty: "Automotive Financing & Investment Solutions",
      image:
        "https://images.pexels.com/photos/33100454/pexels-photo-33100454.jpeg",
      phone: "(555) 123-4567 ext. 102",
      email: "michael.chen@alpinemotors.com",
      languages: ["English", "Mandarin", "Cantonese"],
      experience: "15+ Years",
      expertiseImage:
        "https://images.pexels.com/photos/1181243/pexels-photo-1181243.jpeg",
      description:
        "Expert in luxury vehicle financing with access to exclusive rates and lease programs for high-net-worth individuals.",
      achievements: [
        "Financial Services Excellence",
        "Certified Financial Planner",
        "Luxury Auto Finance Expert",
      ],
    },
    {
      name: "Amanda Rodriguez",
      title: "Luxury Experience Manager",
      specialty: "Premium SUVs & Family Luxury Vehicles",
      image:
        "https://images.pexels.com/photos/7693223/pexels-photo-7693223.jpeg",
      phone: "(555) 123-4567 ext. 103",
      email: "amanda.rodriguez@alpinemotors.com",
      languages: ["English", "Spanish", "French"],
      experience: "10+ Years",
      expertiseImage:
        "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg",
      description:
        "Curating exceptional experiences for families seeking luxury, safety, and sophistication in their vehicle choice.",
      achievements: [
        "Customer Excellence Award",
        "Range Rover Certified",
        "Family Vehicle Specialist",
      ],
    },
    {
      name: "David Thompson",
      title: "Master Service Advisor",
      specialty: "Precision Care & Maintenance Excellence",
      image:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
      phone: "(555) 123-4567 ext. 104",
      email: "david.thompson@alpinemotors.com",
      languages: ["English", "Italian"],
      experience: "18+ Years",
      expertiseImage:
        "https://images.pexels.com/photos/3806249/pexels-photo-3806249.jpeg",
      description:
        "Master technician ensuring your luxury investment receives the meticulous care and attention it deserves.",
      achievements: [
        "ASE Master Technician",
        "BMW Master Certified",
        "Mercedes-Benz Expert",
      ],
    },
  ];

  const faqs = [
    {
      question: "How can I schedule a private test drive experience?",
      answer:
        "Schedule your exclusive test drive by calling our specialists, using our online form, or visiting our showroom. We offer private, personalized sessions including evening and weekend appointments with dedicated specialists.",
    },
    {
      question: "What luxury financing options are available?",
      answer:
        "We offer premium financing solutions including competitive rates from 3.49% APR, exclusive lease programs, and cash purchase incentives. Our certified financial specialists create tailored solutions for high-net-worth clients.",
    },
    {
      question: "Do you provide comprehensive trade-in valuations?",
      answer:
        "Absolutely! We provide professional appraisals and competitive valuations for your current vehicle. Our experts can provide preliminary estimates by phone or schedule comprehensive in-person evaluations.",
    },
    {
      question: "What is your customer satisfaction guarantee?",
      answer:
        "We offer a comprehensive 7-day satisfaction guarantee. If you're not completely satisfied with your luxury vehicle purchase, you can return it within 7 days for a full refund - no questions asked.",
    },
    {
      question: "Do you provide white-glove delivery service?",
      answer:
        "Yes, we offer complimentary concierge delivery within 50 miles of our showroom. For longer distances, we arrange secure, professional transport with full insurance coverage at competitive rates.",
    },
    {
      question: "What comprehensive warranties protect my investment?",
      answer:
        "All vehicles include extensive warranty protection. New vehicles feature full manufacturer warranties plus extended coverage options, while our certified pre-owned vehicles include comprehensive extended protection plans.",
    },
  ];

  return (
    <Layout>
      {/* Hero Section with Professional Background */}
      <section className="relative text-white py-32 overflow-hidden min-h-[700px] flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/7144177/pexels-photo-7144177.jpeg)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-ocean-900/70 to-forest-900/85"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>
        </div>

        {/* Enhanced floating elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-gold-400 to-sunset-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-56 h-56 bg-gradient-to-r from-ocean-400 to-forest-400 rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-r from-forest-400 to-gold-400 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
          <div className="absolute top-20 right-1/4 w-24 h-24 bg-gradient-to-r from-sunset-400 to-ocean-400 rounded-full blur-2xl animate-pulse [animation-delay:3s]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-block p-8 bg-gradient-to-r from-gold-500/20 via-sunset-500/20 to-ocean-500/20 backdrop-blur-sm rounded-full mb-8 border-2 border-white/30 shadow-2xl">
                <Headphones className="h-20 w-20 text-white mx-auto" />
              </div>
            </div>
            <Badge className="mb-6 bg-gradient-to-r from-gold-500/90 to-sunset-500/90 text-white border-white/40 px-8 py-4 text-xl font-bold shadow-2xl backdrop-blur-sm">
              <Sparkles className="h-5 w-5 mr-2" />
              Premium Customer Service Excellence
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="text-white drop-shadow-2xl">Get in Touch</span>
              <span className="bg-gradient-to-r from-gold-300 via-sunset-300 to-gold-400 bg-clip-text text-transparent block drop-shadow-lg">
                With Our Expert Team
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 mb-12 max-w-5xl mx-auto leading-relaxed drop-shadow-lg">
              Whether you're seeking your dream luxury vehicle, require expert
              financing guidance, or need specialized service support, our
              dedicated team of certified professionals delivers personalized
              excellence at every touchpoint of your automotive journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <div className="relative group">
                <Button
                  size="lg"
                  className="text-xl px-12 py-6 bg-gradient-to-r from-gold-500 via-sunset-500 to-gold-500 hover:from-gold-600 hover:via-sunset-600 hover:to-gold-600 text-white font-bold rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden border-2 border-white/30"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                  <span className="relative flex items-center gap-3">
                    <div className="bg-white/20 p-1.5 rounded-full group-hover:bg-white/30 transition-colors duration-300">
                      <Phone className="h-6 w-6" />
                    </div>
                    Call (555) 123-4567
                  </span>
                </Button>
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full animate-pulse opacity-70"></div>
              </div>

              <div className="relative group">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-xl px-12 py-6 border-2 border-white text-white hover:bg-white hover:text-ocean-600 font-bold rounded-3xl backdrop-blur-sm transition-all duration-300 hover:scale-105 relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
                  <span className="relative flex items-center gap-3">
                    <div className="bg-white/20 p-1.5 rounded-full group-hover:bg-white/30 transition-colors duration-300 group-hover:rotate-12">
                      <Calendar className="h-6 w-6" />
                    </div>
                    Schedule Private Visit
                  </span>
                </Button>
              </div>
            </div>

            {/* Enhanced Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-gradient-to-r from-gold-400 to-sunset-400 rounded-full p-2">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gold-300 group-hover:text-gold-200 transition-colors duration-300">
                    &lt; 2hr
                  </div>
                </div>
                <div className="text-ocean-100 font-semibold">
                  Expert Response Time
                </div>
                <div className="text-xs text-white/70 mt-1">
                  Guaranteed during business hours
                </div>
              </div>

              <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-gradient-to-r from-forest-400 to-ocean-400 rounded-full p-2">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gold-300 group-hover:text-gold-200 transition-colors duration-300">
                    24/7
                  </div>
                </div>
                <div className="text-ocean-100 font-semibold">
                  Premium Support
                </div>
                <div className="text-xs text-white/70 mt-1">
                  Always available when you need us
                </div>
              </div>

              <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-gradient-to-r from-sunset-400 to-gold-400 rounded-full p-2">
                    <Star className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gold-300 group-hover:text-gold-200 transition-colors duration-300">
                    5★
                  </div>
                </div>
                <div className="text-ocean-100 font-semibold">
                  Customer Excellence
                </div>
                <div className="text-xs text-white/70 mt-1">
                  Consistently rated by clients
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Methods with Professional Images */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-ocean-500 to-forest-500 text-white px-6 py-3 text-lg font-semibold shadow-lg">
              Professional Contact Options
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-ocean-600 via-forest-600 to-sunset-600 bg-clip-text text-transparent mb-6">
              How Would You Prefer to Connect?
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Choose your preferred communication method and connect with our
              certified specialists who are ready to provide personalized
              service tailored to your luxury automotive needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {contactMethods.map((method, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 rounded-3xl border-2 border-transparent hover:border-ocean-200 overflow-hidden bg-white/95 backdrop-blur-sm"
              >
                {/* Professional Background Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={method.bgImage}
                    alt={`${method.title} background`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                  {/* Professional Portrait */}
                  <div className="absolute top-4 right-4 w-16 h-16 rounded-full overflow-hidden border-4 border-white/80 shadow-lg">
                    <img
                      src={method.image}
                      alt={`${method.title} specialist`}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Contact Method Icon */}
                  <div className="absolute top-4 left-4">
                    <div
                      className={`bg-gradient-to-r ${method.color} rounded-full p-3 shadow-lg`}
                    >
                      {method.icon}
                    </div>
                  </div>

                  {/* Method Title Overlay */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                      {method.title}
                    </h3>
                  </div>
                </div>

                <CardContent className="p-8">
                  <p className="text-gray-700 mb-6 leading-relaxed text-lg">
                    {method.description}
                  </p>

                  <div className="space-y-4 mb-6">
                    <div className="bg-gradient-to-r from-gray-50 to-ocean-50 rounded-xl p-4">
                      <div className="text-xl font-bold text-gray-900 mb-1">
                        {method.contact}
                      </div>
                      <div className="text-sm text-gray-600 font-medium mb-3">
                        {method.hours}
                      </div>

                      {/* Expert Features */}
                      <div className="space-y-2">
                        <div className="text-sm font-semibold text-gray-800 mb-2">
                          Expert Services:
                        </div>
                        {method.features.map((feature, featureIndex) => (
                          <div
                            key={featureIndex}
                            className="flex items-center gap-2"
                          >
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm text-gray-600 font-medium">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      if (method.action === "Call Now") {
                        window.open("tel:+15551234567", "_self");
                      } else if (method.action === "Send Email") {
                        window.open("mailto:info@alpinemotors.com", "_self");
                      } else if (method.action === "Get Directions") {
                        window.open(
                          "https://maps.google.com/maps?q=123+Alpine+Drive,+Mountain+View,+CA",
                          "_blank",
                        );
                      } else {
                        // For live chat or other actions
                        alert(
                          `${method.action} feature will be available soon. Please call us at (555) 123-4567 for immediate assistance.`,
                        );
                      }
                    }}
                    className={`w-full bg-gradient-to-r ${method.color} hover:shadow-xl text-white font-bold py-4 rounded-xl text-lg transform hover:scale-105 transition-all duration-300`}
                  >
                    <span className="flex items-center justify-center gap-2">
                      {method.icon}
                      {method.action}
                    </span>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Team Specialists Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-ocean-50 to-forest-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-sunset-500 to-gold-500 text-white px-6 py-3 text-lg font-semibold shadow-lg">
              Meet Our Expert Team
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-sunset-600 via-gold-600 to-ocean-600 bg-clip-text text-transparent mb-6">
              Your Dedicated Automotive Professionals
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Our certified specialists bring decades of combined experience in
              luxury automotive sales, financing, and service excellence. Each
              team member is committed to delivering personalized attention and
              expert guidance throughout your journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {specialists.map((specialist, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 rounded-3xl border-2 border-transparent hover:border-sunset-200 overflow-hidden bg-white/95 backdrop-blur-sm"
              >
                <div className="relative">
                  {/* Professional Background */}
                  <div className="h-64 relative overflow-hidden">
                    <img
                      src={specialist.expertiseImage}
                      alt={`${specialist.name} expertise`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                    {/* Professional Portrait */}
                    <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl">
                      <img
                        src={specialist.image}
                        alt={specialist.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg";
                        }}
                      />
                    </div>

                    {/* Experience Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-gold-500 to-sunset-500 text-white font-bold shadow-lg">
                        {specialist.experience}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-8">
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-sunset-600 transition-colors duration-300">
                        {specialist.name}
                      </h3>
                      <Badge className="mb-3 bg-gradient-to-r from-ocean-500 to-forest-500 text-white px-4 py-2 text-sm font-semibold">
                        {specialist.title}
                      </Badge>
                      <p className="text-sunset-600 font-semibold text-lg mb-3">
                        {specialist.specialty}
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        {specialist.description}
                      </p>
                    </div>

                    {/* Achievements */}
                    <div className="mb-6">
                      <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-gold-500" />
                        Achievements & Certifications
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {specialist.achievements.map(
                          (achievement, achIndex) => (
                            <Badge
                              key={achIndex}
                              variant="secondary"
                              className="text-xs bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700"
                            >
                              {achievement}
                            </Badge>
                          ),
                        )}
                      </div>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-ocean-500" />
                        <span className="text-gray-700 font-medium">
                          {specialist.phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-forest-500" />
                        <span className="text-gray-700 text-sm">
                          {specialist.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Globe className="h-4 w-4 text-sunset-500" />
                        <div className="flex gap-2">
                          {specialist.languages.map((lang, langIndex) => (
                            <Badge
                              key={langIndex}
                              variant="outline"
                              className="text-xs border-sunset-300 text-sunset-600"
                            >
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        const specialistEmail =
                          specialist.name.toLowerCase().replace(" ", ".") +
                          "@alpinemotors.com";
                        window.open(
                          `mailto:${specialistEmail}?subject=Consultation Request&body=Hi ${specialist.name.split(" ")[0]}, I would like to schedule a consultation regarding luxury automotive services.`,
                          "_self",
                        );
                      }}
                      className="w-full bg-gradient-to-r from-sunset-500 via-gold-500 to-sunset-500 hover:from-sunset-600 hover:via-gold-600 hover:to-sunset-600 text-white font-bold py-3 rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <span className="flex items-center justify-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        Connect with {specialist.name.split(" ")[0]}
                      </span>
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Form */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-forest-500 to-ocean-500 text-white px-6 py-3 text-lg font-semibold shadow-lg">
              Professional Consultation
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-forest-600 via-ocean-600 to-sunset-600 bg-clip-text text-transparent mb-6">
              Tell Us How We Can Serve You
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Share your automotive goals and preferences with our expert team.
              We'll respond within 2 hours during business hours with
              personalized recommendations and next steps tailored to your
              specific needs.
            </p>
          </div>

          <Card className="shadow-2xl border-2 border-gray-100 rounded-3xl overflow-hidden">
            <CardHeader
              className="relative bg-gradient-to-r from-forest-500 to-ocean-500 text-white py-12"
              style={{
                backgroundImage: `url(https://images.pexels.com/photos/7144177/pexels-photo-7144177.jpeg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-forest-900/80 to-ocean-900/80"></div>
              <CardTitle className="relative z-10 text-3xl font-bold text-center flex items-center justify-center gap-3">
                <MessageSquare className="h-8 w-8" />
                Professional Consultation Request
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {showSuccess ? (
                <div className="text-center space-y-6">
                  <div className="inline-block p-8 bg-green-100 rounded-full shadow-lg">
                    <CheckCircle className="h-20 w-20 text-green-600" />
                  </div>
                  <h3 className="text-4xl font-bold text-green-600">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
                    Thank you for contacting Alpine Motors. Our expert team will
                    review your inquiry and respond with personalized
                    recommendations within 2 hours during business hours.
                  </p>
                  <Button
                    onClick={() => setShowSuccess(false)}
                    className="bg-gradient-to-r from-ocean-500 to-forest-500 text-white px-8 py-4 rounded-xl text-lg"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label
                        htmlFor="firstName"
                        className="text-lg font-semibold text-gray-700"
                      >
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        value={contactForm.firstName}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            firstName: e.target.value,
                          })
                        }
                        className="mt-3 border-2 border-forest-200 focus:border-forest-500 rounded-xl h-12 text-lg"
                        required
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="lastName"
                        className="text-lg font-semibold text-gray-700"
                      >
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        value={contactForm.lastName}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            lastName: e.target.value,
                          })
                        }
                        className="mt-3 border-2 border-forest-200 focus:border-forest-500 rounded-xl h-12 text-lg"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label
                        htmlFor="email"
                        className="text-lg font-semibold text-gray-700"
                      >
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            email: e.target.value,
                          })
                        }
                        className="mt-3 border-2 border-ocean-200 focus:border-ocean-500 rounded-xl h-12 text-lg"
                        required
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="phone"
                        className="text-lg font-semibold text-gray-700"
                      >
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={contactForm.phone}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            phone: e.target.value,
                          })
                        }
                        className="mt-3 border-2 border-sunset-200 focus:border-sunset-500 rounded-xl h-12 text-lg"
                      />
                    </div>
                  </div>

                  {/* Inquiry Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label
                        htmlFor="inquiryType"
                        className="text-lg font-semibold text-gray-700"
                      >
                        Type of Inquiry *
                      </Label>
                      <Select
                        value={contactForm.inquiryType}
                        onValueChange={(value) =>
                          setContactForm({ ...contactForm, inquiryType: value })
                        }
                      >
                        <SelectTrigger className="mt-3 border-2 border-gold-200 focus:border-gold-500 rounded-xl h-12">
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="test-drive">
                            Schedule Private Test Drive
                          </SelectItem>
                          <SelectItem value="purchase">
                            Luxury Vehicle Purchase Inquiry
                          </SelectItem>
                          <SelectItem value="financing">
                            Premium Financing Consultation
                          </SelectItem>
                          <SelectItem value="trade-in">
                            Professional Trade-In Valuation
                          </SelectItem>
                          <SelectItem value="service">
                            Service & Maintenance Excellence
                          </SelectItem>
                          <SelectItem value="general">
                            General Information Request
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label
                        htmlFor="vehicleInterest"
                        className="text-lg font-semibold text-gray-700"
                      >
                        Vehicle of Interest
                      </Label>
                      <Input
                        id="vehicleInterest"
                        value={contactForm.vehicleInterest}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            vehicleInterest: e.target.value,
                          })
                        }
                        placeholder="e.g., BMW X5 M, Mercedes S-Class, Porsche 911"
                        className="mt-3 border-2 border-ocean-200 focus:border-ocean-500 rounded-xl h-12 text-lg"
                      />
                    </div>
                  </div>

                  {/* Preferred Contact Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label
                        htmlFor="preferredDate"
                        className="text-lg font-semibold text-gray-700"
                      >
                        Preferred Date
                      </Label>
                      <Input
                        id="preferredDate"
                        type="date"
                        value={contactForm.preferredDate}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            preferredDate: e.target.value,
                          })
                        }
                        className="mt-3 border-2 border-forest-200 focus:border-forest-500 rounded-xl h-12 text-lg"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="preferredTime"
                        className="text-lg font-semibold text-gray-700"
                      >
                        Preferred Time
                      </Label>
                      <Select
                        value={contactForm.preferredTime}
                        onValueChange={(value) =>
                          setContactForm({
                            ...contactForm,
                            preferredTime: value,
                          })
                        }
                      >
                        <SelectTrigger className="mt-3 border-2 border-sunset-200 focus:border-sunset-500 rounded-xl h-12">
                          <SelectValue placeholder="Select preferred time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">
                            Morning (9AM - 12PM)
                          </SelectItem>
                          <SelectItem value="afternoon">
                            Afternoon (12PM - 5PM)
                          </SelectItem>
                          <SelectItem value="evening">
                            Evening (5PM - 8PM)
                          </SelectItem>
                          <SelectItem value="weekend">Weekend</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <Label
                      htmlFor="message"
                      className="text-lg font-semibold text-gray-700"
                    >
                      Detailed Message *
                    </Label>
                    <Textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          message: e.target.value,
                        })
                      }
                      placeholder="Please share your specific automotive goals, preferences, budget range, timeline, and any questions you have. The more details you provide, the better we can tailor our recommendations to your needs..."
                      className="mt-3 border-2 border-gray-200 focus:border-ocean-500 rounded-xl min-h-[150px] text-lg"
                      required
                    />
                  </div>

                  <Alert className="border-blue-200 bg-blue-50 p-6">
                    <Shield className="h-6 w-6 text-blue-600" />
                    <AlertDescription className="text-blue-800 text-lg ml-2">
                      Your information is protected with bank-level security and
                      will only be used to provide personalized service. We
                      respect your privacy and never share your details with
                      third parties.
                    </AlertDescription>
                  </Alert>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-forest-500 via-ocean-500 to-sunset-500 hover:from-forest-600 hover:via-ocean-600 hover:to-sunset-600 text-white font-bold py-6 rounded-xl text-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                        Sending Your Message...
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <Send className="h-6 w-6" />
                        Send Professional Consultation Request
                      </div>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Enhanced FAQ Section with Professional Styling */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-forest-50 to-ocean-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-6 bg-gradient-to-r from-forest-500 to-ocean-500 text-white px-6 py-3 text-lg font-semibold shadow-lg">
              Expert Knowledge Base
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-forest-600 via-ocean-600 to-sunset-600 bg-clip-text text-transparent mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Find expert answers to the most common questions about our luxury
              automotive services, financing options, and vehicle care programs.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 rounded-2xl border-2 border-gray-100 hover:border-ocean-200 bg-white/95 backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-forest-500 to-ocean-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {index + 1}
                    </div>
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 leading-relaxed ml-14 text-lg">
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <p className="text-gray-600 mb-6 text-lg">
              Have additional questions? Our expert team is here to help.
            </p>
            <Button className="bg-gradient-to-r from-forest-500 to-ocean-500 text-white px-10 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <MessageSquare className="h-5 w-5 mr-3" />
              Speak with Our Specialists
            </Button>
          </div>
        </div>
      </section>

      {/* Premium Emergency Support Section */}
      <section className="py-20 relative text-white overflow-hidden min-h-[500px] flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/8424993/pexels-photo-8424993.jpeg)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-ocean-900/70 to-forest-900/85"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-32 h-32 bg-gradient-to-r from-gold-400 to-sunset-400 rounded-full blur-3xl animate-pulse absolute top-10 left-10"></div>
          <div className="w-40 h-40 bg-gradient-to-r from-ocean-400 to-forest-400 rounded-full blur-3xl animate-pulse absolute bottom-10 right-10 [animation-delay:1s]"></div>
          <div className="w-24 h-24 bg-gradient-to-r from-forest-400 to-gold-400 rounded-full blur-2xl animate-pulse absolute top-1/2 right-1/4 [animation-delay:2s]"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-8">
            <div className="inline-block p-8 bg-gradient-to-r from-gold-500/20 via-sunset-500/20 to-ocean-500/20 backdrop-blur-sm rounded-full mb-8 border-2 border-white/30 shadow-2xl">
              <div className="text-6xl">🚨</div>
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="text-white drop-shadow-2xl">Need Immediate</span>
            <span className="bg-gradient-to-r from-gold-300 via-sunset-300 to-gold-400 bg-clip-text text-transparent block drop-shadow-lg">
              Premium Assistance?
            </span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl mb-12 leading-relaxed max-w-4xl mx-auto text-gray-100 drop-shadow-lg">
            For urgent matters, premium roadside assistance, or after-hours
            luxury service needs, our dedicated emergency support team is
            available 24/7 to ensure your complete peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="relative group">
              <Button
                size="lg"
                className="text-xl px-12 py-6 bg-red-600 hover:bg-red-700 text-white font-bold rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden border-2 border-white/30"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/20 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                <span className="relative flex items-center gap-3">
                  <div className="bg-white/20 p-1.5 rounded-full group-hover:bg-white/30 transition-colors duration-300">
                    <Phone className="h-6 w-6" />
                  </div>
                  Emergency: (555) 911-HELP
                </span>
              </Button>
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-white rounded-full animate-pulse opacity-70"></div>
            </div>

            <div className="relative group">
              <Button
                size="lg"
                variant="outline"
                className="text-xl px-12 py-6 border-2 border-gold-300 text-gold-300 hover:bg-gold-300 hover:text-ocean-900 font-bold rounded-3xl backdrop-blur-sm transition-all duration-300 hover:scale-105 relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-500"></span>
                <span className="relative flex items-center gap-3">
                  <div className="bg-white/20 p-1.5 rounded-full group-hover:bg-white/30 transition-colors duration-300 group-hover:rotate-12">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  24/7 Premium Chat
                </span>
              </Button>
            </div>
          </div>

          {/* Additional premium support features */}
          <div className="mt-12 flex flex-col sm:flex-row gap-8 justify-center items-center text-gray-200">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-gold-300" />
              <span>Premium Protection</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-gold-300" />
              <span>24/7 Availability</span>
            </div>
            <div className="flex items-center gap-3">
              <Award className="h-5 w-5 text-gold-300" />
              <span>Expert Specialists</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
