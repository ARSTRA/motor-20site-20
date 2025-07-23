import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Calendar,
  Gauge,
  Fuel,
  Eye,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/Layout";
import { Car, Category } from "@shared/api";

const stats = [
  { label: "Vehicles in Stock", value: "150+", icon: "🚗" },
  { label: "Happy Customers", value: "2.5K+", icon: "😊" },
  { label: "Years Experience", value: "25+", icon: "🏆" },
  { label: "Service Centers", value: "8", icon: "��" },
];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedCars();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (featuredCars.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % featuredCars.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [featuredCars]);

  const fetchFeaturedCars = async () => {
    try {
      const response = await fetch("/api/cars/featured");
      const data = await response.json();
      setFeaturedCars(data.cars);
    } catch (error) {
      console.error("Error fetching featured cars:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data.categories);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredCars.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredCars.length) % featuredCars.length,
    );
  };

  return (
    <Layout>
      {/* Hero Section with Slideshow */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/60 z-10" />

        {featuredCars.length > 0 ? (
          featuredCars.map((car, index) => (
            <div
              key={car.id}
              className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
                index === currentSlide
                  ? "translate-x-0"
                  : index < currentSlide
                    ? "-translate-x-full"
                    : "translate-x-full"
              }`}
            >
              <div
                className="w-full h-full bg-cover bg-center relative"
                style={{
                  backgroundImage: `url(${car.images[0]})`,
                }}
              >
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-96 h-64 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 flex items-center justify-center">
                    <div className="text-white text-center">
                      <h3 className="text-2xl font-bold mb-2">{car.name}</h3>
                      <p className="text-lg opacity-90 mb-2">{car.description}</p>
                      <p className="text-xl font-bold text-gold-300">${car.price.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="absolute inset-0 bg-gradient-to-r from-automotive-500 to-automotive-600 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="text-6xl mb-4">🚗</div>
              <p className="text-lg opacity-75">Loading featured vehicles...</p>
            </div>
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-20 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="max-w-2xl">
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Discover Your
                <span className="bg-gradient-to-r from-gold-400 via-sunset-400 to-gold-400 bg-clip-text text-transparent block">
                  Perfect Journey
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-100 mb-8 leading-relaxed max-w-2xl">
                Where luxury meets adventure. Experience our curated collection
                of premium vehicles designed for those who demand excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/inventory">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-4 bg-gradient-to-r from-ocean-500 to-forest-500 hover:from-ocean-600 hover:to-forest-600 text-white font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                  >
                    Explore Collection
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-4 text-white border-2 border-gold-400 hover:bg-gold-400 hover:text-gray-900 font-bold shadow-xl transition-all duration-300 relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-gold-400/20 to-sunset-400/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    <span className="relative flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Book Experience
                    </span>
                  </Button>
                </Link>
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
        {featuredCars.length > 0 && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {featuredCars.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Enhanced Quick Search Bar */}
      <section className="bg-white shadow-2xl -mt-20 relative z-30 mx-4 lg:mx-8 rounded-2xl border-t-4 border-gradient-to-r from-ocean-500 via-forest-500 to-sunset-500">
        <div className="max-w-6xl mx-auto p-8">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent mb-2">
              Find Your Perfect Match
            </h3>
            <p className="text-gray-600">
              Advanced search to discover your ideal luxury vehicle
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Make
              </label>
              <select className="w-full border-2 border-ocean-200 focus:border-ocean-500 rounded-xl px-4 py-3 bg-gradient-to-r from-white to-ocean-50 focus:ring-2 focus:ring-ocean-200 transition-all">
                <option>Any Make</option>
                <option>BMW</option>
                <option>Mercedes-Benz</option>
                <option>Porsche</option>
                <option>Audi</option>
                <option>Tesla</option>
                <option>Land Rover</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Category
              </label>
              <select className="w-full border-2 border-forest-200 focus:border-forest-500 rounded-xl px-4 py-3 bg-gradient-to-r from-white to-forest-50 focus:ring-2 focus:ring-forest-200 transition-all">
                <option>All Categories</option>
                <option>Luxury SUV</option>
                <option>Sports Car</option>
                <option>Luxury Sedan</option>
                <option>Electric</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-3">
                Price Range
              </label>
              <select className="w-full border-2 border-sunset-200 focus:border-sunset-500 rounded-xl px-4 py-3 bg-gradient-to-r from-white to-sunset-50 focus:ring-2 focus:ring-sunset-200 transition-all">
                <option>Any Price</option>
                <option>Under $50k</option>
                <option>$50k - $100k</option>
                <option>$100k - $200k</option>
                <option>Over $200k</option>
              </select>
            </div>
            <div className="flex items-end">
              <Link to="/inventory" className="w-full">
                <Button className="w-full h-12 bg-gradient-to-r from-ocean-500 via-forest-500 to-sunset-500 hover:from-ocean-600 hover:via-forest-600 hover:to-sunset-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                  Search Vehicles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Categories Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-ocean-50 to-forest-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 text-ocean-600 border-ocean-300"
            >
              Vehicle Categories
            </Badge>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-ocean-700 via-forest-700 to-sunset-700 bg-clip-text text-transparent mb-6">
              Browse by Category
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover your perfect vehicle from our carefully curated
              categories, each offering unique experiences and luxury
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="group"
              >
                <Card className="text-center p-8 hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 border-2 border-transparent hover:border-ocean-200 rounded-2xl">
                  <CardContent className="p-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-ocean-400 via-forest-400 to-sunset-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <span className="text-3xl">{category.icon}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-3 text-lg group-hover:text-ocean-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium">
                      <span className="text-ocean-600 font-bold">
                        {category.count}
                      </span>{" "}
                      premium vehicles
                    </p>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-xs text-forest-600 font-semibold">
                        Explore Collection →
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Featured Vehicles */}
      <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-6 text-gold-600 border-gold-300 px-4 py-2"
            >
              Premium Collection
            </Badge>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-ocean-700 via-forest-700 to-sunset-700 bg-clip-text text-transparent mb-6">
              Featured Luxury Vehicles
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Handpicked masterpieces from the world's most prestigious
              manufacturers, each offering uncompromising luxury and performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <Card
                key={car.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-transparent hover:border-ocean-200"
              >
                <div className="relative">
                  <div className="aspect-[4/3] bg-gradient-to-br from-ocean-100 via-forest-100 to-sunset-100 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-ocean-500/20 via-forest-500/20 to-sunset-500/20"></div>
                    <div className="text-6xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                      🚗
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold shadow-lg">
                      Premium
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="bg-white/95 p-3 rounded-xl hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg">
                      <Heart className="h-4 w-4 text-sunset-500" />
                    </button>
                    <button className="bg-white/95 p-3 rounded-xl hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg">
                      <Eye className="h-4 w-4 text-ocean-500" />
                    </button>
                  </div>
                </div>

                <CardContent className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <Badge
                      variant="secondary"
                      className="bg-gradient-to-r from-forest-100 to-forest-200 text-forest-700 font-semibold"
                    >
                      {car.category}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-gold-400 text-gold-400"
                          />
                        ))}
                      </div>
                      <span className="text-sm font-bold text-gold-600">
                        5.0
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-ocean-600 group-hover:to-forest-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                    {car.name}
                  </h3>

                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {car.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-r from-ocean-50 to-ocean-100 p-3 rounded-xl text-center">
                      <Calendar className="h-5 w-5 text-ocean-600 mx-auto mb-1" />
                      <span className="text-sm font-bold text-ocean-700">
                        {car.year}
                      </span>
                    </div>
                    <div className="bg-gradient-to-r from-forest-50 to-forest-100 p-3 rounded-xl text-center">
                      <Gauge className="h-5 w-5 text-forest-600 mx-auto mb-1" />
                      <span className="text-sm font-bold text-forest-700">
                        {car.mileage.toLocaleString()}
                      </span>
                    </div>
                    <div className="bg-gradient-to-r from-sunset-50 to-sunset-100 p-3 rounded-xl text-center">
                      <Fuel className="h-5 w-5 text-sunset-600 mx-auto mb-1" />
                      <span className="text-sm font-bold text-sunset-700">
                        {car.fuel}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">
                        Starting from
                      </p>
                      <span className="text-3xl font-bold bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent">
                        ${car.price.toLocaleString()}
                      </span>
                    </div>
                    <Button className="bg-gradient-to-r from-ocean-500 to-forest-500 hover:from-ocean-600 hover:to-forest-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <Button
              size="lg"
              className="bg-gradient-to-r from-ocean-500 via-forest-500 to-sunset-500 hover:from-ocean-600 hover:via-forest-600 hover:to-sunset-600 text-white font-bold px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
            >
              Explore Complete Collection
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 bg-gradient-to-r from-ocean-700 via-forest-700 to-sunset-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gold-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-ocean-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Excellence in Numbers
            </h2>
            <p className="text-xl text-gray-200">
              Trusted by thousands of satisfied customers
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold mb-3 text-gold-300">
                    {stat.value}
                  </div>
                  <div className="text-gray-200 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-br from-ocean-600 via-forest-600 to-sunset-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div
            className={
              'absolute top-0 left-0 w-full h-full bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')]'
            }
          ></div>
        </div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="mb-8">
            <div className="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-6">
              <span className="text-6xl">🏆</span>
            </div>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Ready to Experience
            <span className="bg-gradient-to-r from-gold-300 to-gold-400 bg-clip-text text-transparent block">
              Automotive Excellence?
            </span>
          </h2>
          <p className="text-xl lg:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto text-gray-100">
            Join thousands of satisfied customers who've discovered their
            perfect vehicle with Alpine Motors. Experience personalized service,
            exclusive offers, and the luxury you deserve.
          </p>
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="text-lg px-10 py-4 bg-white text-ocean-600 hover:bg-gray-100 font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              Schedule Private Viewing
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-4 border-2 border-gold-300 text-gold-300 hover:bg-gold-300 hover:text-ocean-900 font-bold rounded-2xl transition-all duration-300"
            >
              Get Instant Quote
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-ocean-600 font-bold rounded-2xl transition-all duration-300"
            >
              Financing Options
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
