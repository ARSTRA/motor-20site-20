import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Star, Calendar, Gauge, Fuel, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";

// Mock data for featured cars
const featuredCars = [
  {
    id: 1,
    name: "2024 BMW X5 M Competition",
    price: 125000,
    image: "/api/placeholder/800/600",
    category: "Luxury SUV",
    year: 2024,
    mileage: 0,
    fuel: "Gas",
    rating: 4.9,
    featured: true,
    description: "Ultimate luxury SUV with unmatched performance"
  },
  {
    id: 2,
    name: "2023 Mercedes-Benz S-Class",
    price: 110000,
    image: "/api/placeholder/800/600",
    category: "Luxury Sedan",
    year: 2023,
    mileage: 5200,
    fuel: "Hybrid",
    rating: 4.8,
    featured: true,
    description: "The pinnacle of luxury and technology"
  },
  {
    id: 3,
    name: "2024 Porsche 911 Turbo S",
    price: 230000,
    image: "/api/placeholder/800/600",
    category: "Sports Car",
    year: 2024,
    mileage: 1200,
    fuel: "Gas",
    rating: 5.0,
    featured: true,
    description: "Legendary sports car performance"
  }
];

const categories = [
  { name: "Luxury Sedans", count: 24, icon: "🚗", color: "bg-blue-500" },
  { name: "SUVs", count: 18, icon: "🚙", color: "bg-green-500" },
  { name: "Sports Cars", count: 12, icon: "🏎️", color: "bg-red-500" },
  { name: "Electric", count: 8, icon: "⚡", color: "bg-yellow-500" },
  { name: "Trucks", count: 15, icon: "🚚", color: "bg-gray-500" },
  { name: "Convertibles", count: 6, icon: "🏖️", color: "bg-purple-500" }
];

const stats = [
  { label: "Vehicles in Stock", value: "150+", icon: "🚗" },
  { label: "Happy Customers", value: "2.5K+", icon: "😊" },
  { label: "Years Experience", value: "25+", icon: "🏆" },
  { label: "Service Centers", value: "8", icon: "🔧" }
];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredCars.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredCars.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredCars.length) % featuredCars.length);
  };

  return (
    <Layout>
      {/* Hero Section with Slideshow */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30 z-10" />
        
        {featuredCars.map((car, index) => (
          <div
            key={car.id}
            className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <div 
              className="w-full h-full bg-cover bg-center bg-automotive-500"
              style={{ 
                background: `linear-gradient(135deg, #0ea5e9 0%, #0284c7 50%, #0369a1 100%)`
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-96 h-64 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-6xl mb-4">🚗</div>
                    <p className="text-lg opacity-75">{car.name}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative z-20 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-2xl">
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
                Find Your
                <span className="text-primary block">Dream Car</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8">
                Discover our premium collection of luxury vehicles. 
                From sports cars to family SUVs, we have the perfect car for every lifestyle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8">
                  Browse Inventory
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 text-white border-white hover:bg-white hover:text-gray-900">
                  Schedule Test Drive
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {featuredCars.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Quick Search Bar */}
      <section className="bg-white shadow-lg -mt-16 relative z-30 mx-4 lg:mx-8 rounded-lg">
        <div className="max-w-6xl mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option>Any Make</option>
                <option>BMW</option>
                <option>Mercedes-Benz</option>
                <option>Porsche</option>
                <option>Audi</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option>Any Model</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
              <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                <option>Any Price</option>
                <option>Under $50k</option>
                <option>$50k - $100k</option>
                <option>$100k - $200k</option>
                <option>Over $200k</option>
              </select>
            </div>
            <div className="flex items-end">
              <Button className="w-full">Search Cars</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Browse by Category</h2>
            <p className="text-xl text-gray-600">Find the perfect vehicle type for your needs</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                to={`/category/${category.name.toLowerCase().replace(' ', '-')}`}
                className="group"
              >
                <Card className="text-center p-6 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                  <CardContent className="p-0">
                    <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <span className="text-2xl">{category.icon}</span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count} vehicles</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Vehicles */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">Featured Collection</Badge>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Premium Vehicles</h2>
            <p className="text-xl text-gray-600">Hand-picked luxury cars from our showroom</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <Card key={car.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative">
                  <div className="aspect-[4/3] bg-gradient-to-br from-automotive-100 to-automotive-200 flex items-center justify-center">
                    <div className="text-automotive-600 text-6xl">🚗</div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-luxury-500">Featured</Badge>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
                      <Heart className="h-4 w-4" />
                    </button>
                    <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{car.category}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{car.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors">
                    {car.name}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">{car.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{car.year}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Gauge className="h-4 w-4" />
                      <span>{car.mileage.toLocaleString()} mi</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Fuel className="h-4 w-4" />
                      <span>{car.fuel}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-primary">
                        ${car.price.toLocaleString()}
                      </span>
                    </div>
                    <Button>View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline">
              View All Vehicles
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-automotive-700 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-automotive-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-accent text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Find Your Perfect Car?</h2>
          <p className="text-xl mb-8">
            Our expert team is here to help you find the vehicle of your dreams. 
            Get personalized recommendations and exclusive offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Schedule Appointment
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary">
              Get Pre-Approved
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
