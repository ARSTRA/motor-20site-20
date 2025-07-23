import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Users,
  Calendar,
  MapPin,
  Star,
  Shield,
  Sparkles,
  Trophy,
  Heart,
  CheckCircle,
  Car,
  Wrench,
  UserCheck,
  Globe,
  Target,
  TrendingUp,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function About() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    {
      url: "https://images.pexels.com/photos/28380943/pexels-photo-28380943.jpeg",
      alt: "Luxury car showroom with premium vehicles",
    },
    {
      url: "https://images.pexels.com/photos/9764732/pexels-photo-9764732.jpeg",
      alt: "Modern luxury sports car in showroom",
    },
    {
      url: "https://images.pexels.com/photos/7144177/pexels-photo-7144177.jpeg",
      alt: "Professional automotive service center team",
    },
  ];

  const stats = [
    {
      icon: Calendar,
      label: "Years of Excellence",
      value: "25+",
      color: "ocean",
    },
    {
      icon: Users,
      label: "Happy Customers",
      value: "50,000+",
      color: "forest",
    },
    { icon: Car, label: "Vehicles Sold", value: "75,000+", color: "sunset" },
    { icon: Award, label: "Industry Awards", value: "100+", color: "gold" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Integrity First",
      description:
        "We believe in transparent, honest dealings with every customer, building trust through reliability and ethical business practices.",
      image:
        "https://images.pexels.com/photos/7144177/pexels-photo-7144177.jpeg",
    },
    {
      icon: Sparkles,
      title: "Luxury Redefined",
      description:
        "Every vehicle in our collection represents the pinnacle of automotive excellence, carefully curated for the discerning driver.",
      image:
        "https://images.pexels.com/photos/9764732/pexels-photo-9764732.jpeg",
    },
    {
      icon: Heart,
      title: "Customer Devotion",
      description:
        "Your satisfaction drives our passion. We're dedicated to creating extraordinary experiences that exceed expectations.",
      image:
        "https://images.pexels.com/photos/28380943/pexels-photo-28380943.jpeg",
    },
  ];

  const milestones = [
    {
      year: "1998",
      title: "Alpine Motors Founded",
      description:
        "Started as a small family business with a vision for luxury automotive excellence",
    },
    {
      year: "2005",
      title: "Expansion Era",
      description:
        "Opened our flagship showroom and expanded to premium vehicle brands",
    },
    {
      year: "2012",
      title: "Innovation Leader",
      description:
        "Introduced cutting-edge digital customer experience and virtual showrooms",
    },
    {
      year: "2018",
      title: "Sustainability Focus",
      description:
        "Launched eco-friendly initiatives and electric vehicle specialization",
    },
    {
      year: "2023",
      title: "AI-Powered Service",
      description:
        "Integrated advanced technology for personalized customer experiences",
    },
  ];

  const team = [
    {
      name: "Michael Rodriguez",
      position: "Founder & CEO",
      image:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg",
      bio: "25+ years automotive industry veteran with a passion for luxury vehicles and exceptional customer service.",
    },
    {
      name: "Sarah Chen",
      position: "VP of Operations",
      image:
        "https://images.pexels.com/photos/7693223/pexels-photo-7693223.jpeg",
      bio: "Expert in operational excellence and customer experience optimization with extensive luxury retail background.",
    },
    {
      name: "David Johnson",
      position: "Head of Sales",
      image:
        "https://images.pexels.com/photos/33100454/pexels-photo-33100454.jpeg",
      bio: "Award-winning sales professional specializing in luxury automotive with a track record of customer satisfaction.",
    },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length,
    );
  };

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section with Image Carousel */}
        <section className="relative h-screen overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroImages[currentImageIndex].url}
              alt={heroImages[currentImageIndex].alt}
              className="w-full h-full object-cover transition-opacity duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevImage}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-10"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 z-10"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Hero Content */}
          <div className="relative z-10 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
              <div className="max-w-4xl">
                <Badge className="mb-6 bg-gradient-to-r from-ocean-500 to-forest-500 text-white px-4 py-2 text-lg shadow-lg">
                  <Sparkles className="h-5 w-5 mr-2" />
                  Where Luxury Meets Adventure
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-white via-gold-200 to-white bg-clip-text text-transparent">
                  About Alpine Motors
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl font-light mb-8 text-gray-200 leading-relaxed max-w-3xl">
                  For over 25 years, we've been redefining the luxury automotive
                  experience, where exceptional vehicles meet unparalleled
                  service in the heart of the mountains.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    asChild
                    className="bg-gradient-to-r from-ocean-500 to-forest-500 hover:from-ocean-600 hover:to-forest-600 text-white px-8 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                  >
                    <Link to="/contact">Our Story</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg rounded-xl backdrop-blur-sm transition-all duration-300"
                  >
                    <Link to="/contact">Meet the Team</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Image Indicators */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/75"
                }`}
              />
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 sm:py-24 bg-gradient-to-r from-ocean-50 via-forest-50 to-sunset-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent mb-4">
                Our Achievement Numbers
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Decades of excellence reflected in the trust of our customers
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className="text-center border-none shadow-xl bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group"
                >
                  <CardContent className="p-6 sm:p-8">
                    <div
                      className={`inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br ${
                        stat.color === 'ocean' ? 'from-ocean-500 to-ocean-600' :
                        stat.color === 'forest' ? 'from-forest-500 to-forest-600' :
                        stat.color === 'sunset' ? 'from-sunset-500 to-sunset-600' :
                        'from-gold-500 to-gold-600'
                      } mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <stat.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <h3 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2 group-hover:text-ocean-600 transition-colors duration-300">
                      {stat.value}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-600 font-medium">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-gradient-to-r from-sunset-500 to-gold-500 text-white px-4 py-2">
                Our Journey
              </Badge>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                A Legacy of
                <span className="bg-gradient-to-r from-ocean-600 via-forest-600 to-sunset-600 bg-clip-text text-transparent">
                  {" "}
                  Excellence
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Founded in the scenic mountains of California, Alpine Motors
                began as a dream to create an automotive experience that
                combines luxury, adventure, and uncompromising quality.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
              <div className="relative group">
                <img
                  src="https://images.pexels.com/photos/331988/pexels-photo-331988.jpeg"
                  alt="Alpine Motors historical founding"
                  className="w-full h-96 object-cover rounded-3xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  The Alpine Motors Story
                </h3>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  What started as a small family dealership has evolved into a
                  premier destination for luxury vehicle enthusiasts. Our
                  founder, Michael Rodriguez, envisioned a place where customers
                  could experience the finest automobiles against the backdrop
                  of nature's grandeur.
                </p>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Today, we're proud to represent the world's most prestigious
                  automotive brands, offering not just vehicles, but gateways to
                  extraordinary adventures. Every car we sell comes with our
                  promise of excellence and a commitment to your driving dreams.
                </p>
                <div className="flex gap-4">
                  <CheckCircle className="h-6 w-6 text-forest-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">
                    25+ years of automotive excellence and innovation
                  </span>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative">
              <h3 className="text-3xl font-bold text-center text-gray-900 mb-16">
                Our Milestones
              </h3>
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-ocean-500 via-forest-500 to-sunset-500"></div>
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center mb-16 ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                  >
                    <div
                      className={`w-1/2 ${index % 2 === 0 ? "pr-8" : "pl-8"}`}
                    >
                      <Card className="bg-white border-none shadow-xl hover:shadow-2xl transition-all duration-300">
                        <CardContent className="p-6">
                          <Badge className="mb-3 bg-gradient-to-r from-ocean-500 to-forest-500 text-white">
                            {milestone.year}
                          </Badge>
                          <h4 className="text-xl font-bold text-gray-900 mb-2">
                            {milestone.title}
                          </h4>
                          <p className="text-gray-600">
                            {milestone.description}
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-sunset-500 to-gold-500 rounded-full border-4 border-white shadow-lg"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-gradient-to-br from-gray-50 to-ocean-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-gradient-to-r from-forest-500 to-ocean-500 text-white px-4 py-2">
                Our Values
              </Badge>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                What Drives
                <span className="bg-gradient-to-r from-forest-600 via-ocean-600 to-sunset-600 bg-clip-text text-transparent">
                  {" "}
                  Us Forward
                </span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-500 border-none overflow-hidden hover:-translate-y-2"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={value.image}
                      alt={value.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm mb-3">
                        <value.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-gradient-to-r from-gold-500 to-sunset-500 text-white px-4 py-2">
                Leadership Team
              </Badge>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">
                Meet the Visionaries Behind
                <span className="bg-gradient-to-r from-gold-600 via-sunset-600 to-ocean-600 bg-clip-text text-transparent">
                  {" "}
                  Alpine Motors
                </span>
              </h2>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card
                  key={index}
                  className="group hover:shadow-2xl transition-all duration-500 border-none overflow-hidden hover:-translate-y-2"
                >
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <Badge className="mb-4 bg-gradient-to-r from-ocean-500 to-forest-500 text-white">
                      {member.position}
                    </Badge>
                    <p className="text-gray-600 leading-relaxed">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-ocean-600 via-forest-600 to-sunset-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
            <Trophy className="h-16 w-16 mx-auto mb-6 text-gold-300" />
            <h2 className="text-5xl font-bold mb-6">
              Ready to Experience Alpine Motors?
            </h2>
            <p className="text-xl mb-12 max-w-3xl mx-auto text-gray-200 leading-relaxed">
              Join thousands of satisfied customers who have discovered the
              perfect blend of luxury, performance, and personalized service.
              Your adventure awaits.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button
                asChild
                className="bg-white text-ocean-600 hover:bg-gray-100 px-8 py-4 text-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <Link to="/inventory">
                  <Car className="h-5 w-5 mr-2" />
                  Browse Inventory
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-ocean-600 px-8 py-4 text-lg rounded-xl backdrop-blur-sm"
              >
                <Link to="/contact">
                  <MapPin className="h-5 w-5 mr-2" />
                  Visit Our Showroom
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
