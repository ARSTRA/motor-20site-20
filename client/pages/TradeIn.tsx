import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calculator,
  Star,
  CheckCircle,
  TrendingUp,
  Shield,
  Clock,
  DollarSign,
  FileText,
  Award,
  Users,
  ArrowRight,
  Car,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";

const benefits = [
  {
    icon: DollarSign,
    title: "Maximum Value Guarantee",
    description: "We offer competitive market prices and beat most competitor offers by up to 15%",
    color: "from-gold-500 to-sunset-500"
  },
  {
    icon: Shield,
    title: "Transparent Process",
    description: "No hidden fees, clear documentation, and honest evaluations every time",
    color: "from-ocean-500 to-forest-500"
  },
  {
    icon: Clock,
    title: "Quick 30-Minute Appraisal",
    description: "Professional evaluation completed in just 30 minutes with instant cash offer",
    color: "from-forest-500 to-gold-500"
  },
  {
    icon: Award,
    title: "Expert Evaluators",
    description: "ASE-certified technicians with 15+ years experience in luxury vehicle assessment",
    color: "from-sunset-500 to-ocean-500"
  }
];

const process = [
  {
    step: "01",
    title: "Get Instant Quote",
    description: "Fill out our online form with your vehicle details for an immediate estimate",
    icon: Calculator,
    image: "https://images.pexels.com/photos/7144207/pexels-photo-7144207.jpeg"
  },
  {
    step: "02",
    title: "Professional Inspection",
    description: "Schedule a comprehensive evaluation with our certified automotive experts",
    icon: FileText,
    image: "https://images.pexels.com/photos/5622308/pexels-photo-5622308.jpeg"
  },
  {
    step: "03",
    title: "Receive Your Offer",
    description: "Get a competitive cash offer based on current market value and vehicle condition",
    icon: TrendingUp,
    image: "https://images.pexels.com/photos/10400713/pexels-photo-10400713.jpeg"
  },
  {
    step: "04",
    title: "Complete the Deal",
    description: "Accept our offer and drive away with cash or apply credit toward your next vehicle",
    icon: CheckCircle,
    image: "https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg"
  }
];

const testimonials = [
  {
    name: "Sarah Mitchell",
    location: "Beverly Hills, CA",
    rating: 5,
    comment: "They offered $3,000 more than the other dealership! The process was seamless and professional.",
    vehicle: "2019 BMW X5",
    image: "https://images.pexels.com/photos/9052276/pexels-photo-9052276.jpeg",
    role: "Business Executive",
    gradient: "from-ocean-500 to-forest-500",
    accent: "ocean"
  },
  {
    name: "Michael Chen",
    location: "Manhattan, NY",
    rating: 5,
    comment: "Incredible service. Got my appraisal in 25 minutes and walked out with cash the same day.",
    vehicle: "2020 Mercedes S-Class",
    image: "https://images.pexels.com/photos/12437056/pexels-photo-12437056.jpeg",
    role: "Investment Manager",
    gradient: "from-forest-500 to-gold-500",
    accent: "forest"
  },
  {
    name: "Jennifer Rodriguez",
    location: "Miami, FL",
    rating: 5,
    comment: "Fair pricing, no pressure, and they handled all the paperwork. Highly recommend!",
    vehicle: "2021 Tesla Model S",
    image: "https://images.pexels.com/photos/33227416/pexels-photo-33227416.jpeg",
    role: "Marketing Director",
    gradient: "from-gold-500 to-sunset-500",
    accent: "sunset"
  }
];

export default function TradeIn() {
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    mileage: "",
    condition: "",
    contact: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/70"></div>
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-4xl text-center mx-auto">
              <Badge className="mb-6 bg-gradient-to-r from-gold-500 to-sunset-500 text-white px-6 py-2 text-lg font-semibold">
                Trade-In Program
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Get 
                <span className="bg-gradient-to-r from-gold-400 via-sunset-400 to-gold-400 bg-clip-text text-transparent"> Top Value </span>
                for Your Current Vehicle
              </h1>
              <p className="text-xl lg:text-2xl text-gray-100 mb-8 leading-relaxed max-w-3xl mx-auto">
                Experience our premium trade-in program designed to maximize your vehicle's value. 
                Professional evaluation, transparent pricing, and instant cash offers.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-gold-500 via-sunset-500 to-gold-500 hover:from-gold-600 hover:via-sunset-600 hover:to-gold-600 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Get Instant Quote
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 font-bold px-8 py-4 rounded-2xl transition-all duration-300"
                >
                  <Car className="h-5 w-5 mr-2" />
                  Schedule Appraisal
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-ocean-50 to-forest-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-ocean-700 via-forest-700 to-sunset-700 bg-clip-text text-transparent mb-6">
              Why Choose Our Trade-In Program?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the difference with our industry-leading trade-in service that puts your satisfaction first
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-2 border-transparent hover:border-ocean-200 rounded-2xl overflow-hidden">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-ocean-600 transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-forest-500 to-ocean-500 text-white px-4 py-2">
              Simple Process
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-ocean-700 via-forest-700 to-sunset-700 bg-clip-text text-transparent mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our streamlined 4-step process makes trading in your vehicle quick, easy, and profitable
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {process.map((step, index) => (
              <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}>
                <div className="flex-1 relative group">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={step.image} 
                      alt={step.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-gold-500 to-sunset-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-xl">
                    {step.step}
                  </div>
                </div>
                
                <div className="flex-1 text-center lg:text-left">
                  <div className="mb-6">
                    <div className={`inline-flex w-16 h-16 bg-gradient-to-r from-ocean-500 to-forest-500 rounded-2xl items-center justify-center mb-4 shadow-lg`}>
                      <step.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    {step.description}
                  </p>
                  {index < process.length - 1 && (
                    <div className="flex justify-center lg:justify-start">
                      <ArrowRight className="h-6 w-6 text-ocean-500" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-20 bg-gradient-to-br from-ocean-600 via-forest-600 to-sunset-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Get Your Instant Quote</h2>
            <p className="text-xl text-gray-200">
              Fill out the form below and receive an immediate estimate for your vehicle
            </p>
          </div>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label className="text-white mb-2 block">Vehicle Make</Label>
                  <Select onValueChange={(value) => handleInputChange('make', value)}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white">
                      <SelectValue placeholder="Select make" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bmw">BMW</SelectItem>
                      <SelectItem value="mercedes">Mercedes-Benz</SelectItem>
                      <SelectItem value="porsche">Porsche</SelectItem>
                      <SelectItem value="audi">Audi</SelectItem>
                      <SelectItem value="tesla">Tesla</SelectItem>
                      <SelectItem value="landrover">Land Rover</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-white mb-2 block">Model</Label>
                  <Input 
                    placeholder="Enter model" 
                    className="bg-white/10 border-white/30 text-white placeholder:text-gray-300"
                    onChange={(e) => handleInputChange('model', e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-white mb-2 block">Year</Label>
                  <Select onValueChange={(value) => handleInputChange('year', value)}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 15 }, (_, i) => 2024 - i).map(year => (
                        <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-white mb-2 block">Mileage</Label>
                  <Input 
                    placeholder="Enter mileage" 
                    className="bg-white/10 border-white/30 text-white placeholder:text-gray-300"
                    onChange={(e) => handleInputChange('mileage', e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-white mb-2 block">Condition</Label>
                  <Select onValueChange={(value) => handleInputChange('condition', value)}>
                    <SelectTrigger className="bg-white/10 border-white/30 text-white">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-white mb-2 block">Contact Info</Label>
                  <Input 
                    placeholder="Phone or email" 
                    className="bg-white/10 border-white/30 text-white placeholder:text-gray-300"
                    onChange={(e) => handleInputChange('contact', e.target.value)}
                  />
                </div>
              </div>
              
              <Button className="w-full bg-gradient-to-r from-gold-500 to-sunset-500 hover:from-gold-600 hover:to-sunset-600 text-white font-bold py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                <Calculator className="h-5 w-5 mr-2" />
                Get My Instant Quote
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Enhanced Professional Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-ocean-50 to-forest-50 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-ocean-400/20 to-forest-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-gold-400/20 to-sunset-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-forest-400/10 to-ocean-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-6 text-ocean-600 border-ocean-300 px-6 py-2 text-sm font-bold">
              Customer Success Stories
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-ocean-700 via-forest-700 to-sunset-700 bg-clip-text text-transparent mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Real experiences from satisfied customers who discovered exceptional value and service through our trade-in program
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="group relative">
                <Card className="overflow-hidden bg-white/80 backdrop-blur-lg border-2 border-white/50 hover:border-white/80 transition-all duration-500 hover:scale-105 hover:shadow-2xl rounded-3xl relative">
                  {/* Professional Customer Image Header */}
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.pexels.com/photos/3831645/pexels-photo-3831645.jpeg';
                      }}
                    />
                    {/* Professional Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent`}></div>

                    {/* Rating Badge */}
                    <div className="absolute top-6 left-6">
                      <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-4 py-2 shadow-xl border border-white/30">
                        <div className="flex items-center gap-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                          ))}
                          <span className="text-sm font-bold text-gray-800 ml-1">5.0</span>
                        </div>
                      </div>
                    </div>

                    {/* Customer Info Overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-gold-300 transition-colors duration-300">
                          {testimonial.name}
                        </h3>
                        <p className="text-white/80 text-sm font-medium">{testimonial.role}</p>
                        <p className="text-white/60 text-sm">{testimonial.location}</p>
                      </div>
                    </div>

                    {/* Decorative Corner Elements */}
                    <div className={`absolute top-6 right-6 w-8 h-8 bg-gradient-to-r ${testimonial.gradient} rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    <div className={`absolute bottom-6 right-6 w-4 h-4 bg-gradient-to-r ${testimonial.gradient} rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300`}></div>
                  </div>

                  {/* Enhanced Content Section */}
                  <CardContent className="p-8 bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-sm">
                    {/* Quote Content */}
                    <div className="mb-6">
                      <div className={`w-12 h-12 bg-gradient-to-r ${testimonial.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        <span className="text-2xl text-white font-bold">"</span>
                      </div>
                      <p className="text-gray-700 text-lg leading-relaxed italic font-medium group-hover:text-gray-800 transition-colors duration-300">
                        {testimonial.comment}
                      </p>
                    </div>

                    {/* Vehicle and Achievement Info */}
                    <div className="border-t border-gray-200 pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Vehicle Traded</p>
                          <p className={`font-bold text-${testimonial.accent}-600 text-lg`}>{testimonial.vehicle}</p>
                        </div>
                        <div className={`w-16 h-16 bg-gradient-to-r ${testimonial.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <CheckCircle className="h-8 w-8 text-white" />
                        </div>
                      </div>

                      {/* Professional Indicators */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="text-center">
                          <div className={`w-10 h-10 bg-gradient-to-r ${testimonial.gradient} rounded-xl flex items-center justify-center mx-auto mb-2 opacity-20 group-hover:opacity-30 transition-opacity duration-300`}>
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                          <span className="text-xs text-gray-500 font-medium">Premium</span>
                        </div>
                        <div className="text-center">
                          <div className={`w-10 h-10 bg-gradient-to-r ${testimonial.gradient} rounded-xl flex items-center justify-center mx-auto mb-2 opacity-20 group-hover:opacity-30 transition-opacity duration-300`}>
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                          <span className="text-xs text-gray-500 font-medium">Service</span>
                        </div>
                        <div className="text-center">
                          <div className={`w-10 h-10 bg-gradient-to-r ${testimonial.gradient} rounded-xl flex items-center justify-center mx-auto mb-2 opacity-20 group-hover:opacity-30 transition-opacity duration-300`}>
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                          <span className="text-xs text-gray-500 font-medium">Value</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  {/* Subtle Border Glow Effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${testimonial.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none`}></div>
                </Card>
              </div>
            ))}
          </div>

          {/* Additional Trust Indicators */}
          <div className="mt-20 text-center">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent mb-2">2,500+</div>
                <p className="text-gray-600 font-medium">Happy Customers</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-forest-600 to-gold-600 bg-clip-text text-transparent mb-2">$2.8M+</div>
                <p className="text-gray-600 font-medium">Total Value Paid</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-gold-600 to-sunset-600 bg-clip-text text-transparent mb-2">4.9/5</div>
                <p className="text-gray-600 font-medium">Average Rating</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-sunset-600 to-ocean-600 bg-clip-text text-transparent mb-2">25 Min</div>
                <p className="text-gray-600 font-medium">Avg. Appraisal Time</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-ocean-700 via-forest-700 to-sunset-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to Get Top Value for Your Vehicle?
          </h2>
          <p className="text-xl mb-8 text-gray-200 leading-relaxed">
            Join thousands of satisfied customers who chose our trade-in program for maximum value and exceptional service.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-white text-ocean-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Users className="h-5 w-5 mr-2" />
                Schedule Appointment
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-ocean-600 font-bold px-8 py-4 rounded-2xl transition-all duration-300"
            >
              <Calculator className="h-5 w-5 mr-2" />
              Get Online Quote
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
