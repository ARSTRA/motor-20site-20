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
import OptimizedImage, {
  HIGH_QUALITY_AUTOMOTIVE_IMAGES,
} from "@/components/OptimizedImage";
import { Car, Category } from "@shared/api";

const stats = [
  {
    label: "Premium Vehicles in Stock",
    value: "150+",
    image: HIGH_QUALITY_AUTOMOTIVE_IMAGES.services.carInspection,
    description:
      "Meticulously curated collection of luxury and performance vehicles, each inspected and certified to our highest standards.",
    feature: "Certified Quality",
  },
  {
    label: "Satisfied Members",
    value: "2.5K+",
    image: HIGH_QUALITY_AUTOMOTIVE_IMAGES.services.customerService,
    description:
      "Trusted by thousands of discerning customers who've discovered their perfect vehicle through our personalized service experience.",
    feature: "5-Star Service",
  },
  {
    label: "Years of Excellence",
    value: "25+",
    image: HIGH_QUALITY_AUTOMOTIVE_IMAGES.services.expertTeam,
    description:
      "A quarter-century of automotive expertise, building lasting relationships and delivering exceptional luxury car experiences.",
    feature: "Proven Heritage",
  },
  {
    label: "Professional Service Centers",
    value: "8",
    image: HIGH_QUALITY_AUTOMOTIVE_IMAGES.services.mechanics,
    description:
      "State-of-the-art service facilities staffed by certified technicians, ensuring your vehicle receives the finest care and maintenance.",
    feature: "Expert Care",
  },
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
      <section className="relative h-[75vh] md:h-[80vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 md:bg-gradient-to-r md:from-black/60 md:via-black/30 md:to-black/60 z-10" />

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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:bg-black/40"></div>
                <div className="absolute inset-0 flex items-end md:items-center justify-center pb-6 md:pb-0">
                  <div className="w-80 md:w-96 h-auto md:h-64 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 flex items-center justify-center p-4 md:p-6">
                    <div className="text-white text-center">
                      <h3 className="text-lg md:text-2xl font-bold mb-2">
                        {car.name}
                      </h3>
                      <p className="text-sm md:text-lg opacity-90 mb-2 hidden md:block">
                        {car.description}
                      </p>
                      <p className="text-lg md:text-xl font-bold text-gold-300">
                        ${car.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://images.pexels.com/photos/2127039/pexels-photo-2127039.jpeg)`,
            }}
          >
            <div className="absolute inset-0 bg-black/50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-6xl mb-4">🚗</div>
                <p className="text-lg opacity-75">
                  Loading featured vehicles...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Hero Content */}
        <div className="relative z-20 h-full flex items-end md:items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-4xl mb-12 md:mb-0">
              <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-3 md:mb-6 leading-tight">
                Discover Your
                <span className="bg-gradient-to-r from-gold-400 via-sunset-400 to-gold-400 bg-clip-text text-transparent block">
                  Perfect Journey
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-100 mb-4 md:mb-8 leading-relaxed max-w-2xl">
                Where luxury meets adventure. Experience our curated collection
                of premium vehicles designed for those who demand excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-6 max-w-md sm:max-w-none items-center sm:items-start">
                <Link to="/inventory" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-ocean-500 to-forest-500 hover:from-ocean-600 hover:to-forest-600 text-white font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 rounded-xl"
                  >
                    Explore Collection
                  </Button>
                </Link>

                {/* Enhanced Book Experience Button with decorative elements */}
                <div className="relative w-full sm:w-auto">
                  {/* Floating decorative elements */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-gold-400 to-sunset-400 rounded-full animate-bounce [animation-delay:0.5s] opacity-70"></div>
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-gradient-to-r from-forest-400 to-ocean-400 rounded-full animate-bounce [animation-delay:1s] opacity-70"></div>

                  <Link to="/contact" className="w-full sm:w-auto block">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto text-base md:text-lg px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-sunset-500 via-gold-500 to-forest-500 hover:from-sunset-600 hover:via-gold-600 hover:to-forest-600 text-white font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group border-2 border-white/30 hover:border-white/50 rounded-xl"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-gold-300/30 via-sunset-300/30 to-forest-300/30 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                      <span className="absolute inset-0 bg-gradient-to-45deg from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></span>
                      <span className="relative flex items-center gap-3 z-10 justify-center sm:justify-start">
                        <div className="bg-white/20 p-1.5 rounded-full group-hover:bg-white/30 transition-colors duration-300 group-hover:rotate-12">
                          <Calendar className="h-5 w-5" />
                        </div>
                        <span className="tracking-wide">Book Experience</span>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse group-hover:bg-white/80"></div>
                      </span>
                    </Button>
                  </Link>

                  {/* Glow effect */}
                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-sunset-500/20 via-gold-500/20 to-forest-500/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
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
      <section className="bg-white shadow-2xl -mt-16 md:-mt-20 relative z-30 mx-2 md:mx-4 lg:mx-8 rounded-xl md:rounded-2xl border-t-4 border-gradient-to-r from-ocean-500 via-forest-500 to-sunset-500">
        <div className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
          <div className="text-center mb-4 md:mb-6">
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent mb-2">
              Find Your Perfect Match
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              Advanced search to discover your ideal luxury vehicle
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
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
      <section
        id="categories"
        className="py-20 bg-gradient-to-br from-gray-50 via-ocean-50 to-forest-50"
      >
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="group"
              >
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-3 bg-white rounded-3xl border-2 border-transparent hover:border-ocean-200 relative">
                  <CardContent className="p-0">
                    {/* Professional Car Image Background */}
                    <div className="relative h-56 overflow-hidden rounded-t-3xl">
                      <img
                        src={category.icon}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          // Fallback to default luxury car image if specific image fails
                          e.currentTarget.src =
                            "https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg";
                        }}
                      />
                      {/* Gradient Overlay */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent`}
                      ></div>

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge
                          className={`bg-gradient-to-r ${category.color} text-white font-bold shadow-lg px-3 py-1`}
                        >
                          Premium
                        </Badge>
                      </div>

                      {/* Vehicle Count Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold text-gray-800 shadow-lg">
                          {category.count} Vehicles
                        </div>
                      </div>

                      {/* Category Title Overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 drop-shadow-lg group-hover:text-gold-300 transition-colors duration-300">
                          {category.name}
                        </h3>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-sm text-white/90 bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                            Explore Collection →
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Content Section */}
                    <div className="p-6">
                      <p className="text-gray-600 leading-relaxed mb-4 text-sm sm:text-base">
                        {category.description}
                      </p>

                      {/* Professional CTA Button */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent">
                            {category.count}
                          </span>
                          <span className="text-sm text-gray-500">
                            Available
                          </span>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                          <Button
                            size="sm"
                            className={`bg-gradient-to-r ${category.color} text-white rounded-xl shadow-lg hover:shadow-xl`}
                          >
                            View All
                          </Button>
                        </div>
                      </div>

                      {/* Professional Features Indicator */}
                      <div className="mt-4 grid grid-cols-3 gap-2 opacity-75 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-ocean-100 to-ocean-200 rounded-full flex items-center justify-center mx-auto mb-1">
                            <div className="w-2 h-2 bg-gradient-to-r from-ocean-500 to-ocean-600 rounded-full"></div>
                          </div>
                          <span className="text-xs text-gray-500">Luxury</span>
                        </div>
                        <div className="text-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-forest-100 to-forest-200 rounded-full flex items-center justify-center mx-auto mb-1">
                            <div className="w-2 h-2 bg-gradient-to-r from-forest-500 to-forest-600 rounded-full"></div>
                          </div>
                          <span className="text-xs text-gray-500">Quality</span>
                        </div>
                        <div className="text-center">
                          <div className="w-8 h-8 bg-gradient-to-r from-sunset-100 to-sunset-200 rounded-full flex items-center justify-center mx-auto mb-1">
                            <div className="w-2 h-2 bg-gradient-to-r from-sunset-500 to-sunset-600 rounded-full"></div>
                          </div>
                          <span className="text-xs text-gray-500">Premium</span>
                        </div>
                      </div>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredCars.map((car) => (
              <Card
                key={car.id}
                className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-transparent hover:border-ocean-200"
              >
                <div className="relative">
                  <div className="aspect-[4/3] relative overflow-hidden rounded-t-2xl">
                    <img
                      src={car.images[0]}
                      alt={car.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold shadow-lg">
                      Premium
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={() => {
                        // Add to favorites functionality
                        const favorites = JSON.parse(
                          localStorage.getItem("favorites") || "[]",
                        );
                        if (!favorites.includes(car.id)) {
                          favorites.push(car.id);
                          localStorage.setItem(
                            "favorites",
                            JSON.stringify(favorites),
                          );
                          alert(`${car.name} added to favorites!`);
                        } else {
                          alert(`${car.name} is already in your favorites!`);
                        }
                      }}
                      className="bg-white/95 p-3 rounded-xl hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
                    >
                      <Heart className="h-4 w-4 text-sunset-500" />
                    </button>
                    <Link to={`/vehicle/${car.id}`}>
                      <button className="bg-white/95 p-3 rounded-xl hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg">
                        <Eye className="h-4 w-4 text-ocean-500" />
                      </button>
                    </Link>
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
                    <Link to={`/vehicle/${car.id}`}>
                      <Button className="bg-gradient-to-r from-ocean-500 to-forest-500 hover:from-ocean-600 hover:to-forest-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/inventory">
              <Button
                size="lg"
                className="bg-gradient-to-r from-ocean-500 via-forest-500 to-sunset-500 hover:from-ocean-600 hover:via-forest-600 hover:to-sunset-600 text-white font-bold px-12 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
              >
                Explore Complete Collection
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Professional Stats Section */}
      <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-ocean-500 to-forest-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-gold-500 to-sunset-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-forest-500 to-ocean-500 rounded-full blur-3xl opacity-50"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-20">
            <Badge
              variant="outline"
              className="mb-6 text-gold-400 border-gold-400 px-6 py-2 text-sm font-bold"
            >
              Our Proven Track Record
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gold-200 to-white bg-clip-text text-transparent">
              Excellence in Numbers
            </h2>
            <p className="text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Every statistic tells a story of dedication, quality, and the
              trust our customers place in Alpine Motors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="group relative">
                <Card className="overflow-hidden bg-gradient-to-br from-white/8 to-white/12 backdrop-blur-lg border-2 border-white/30 hover:border-gold-400/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-gold-500/20 rounded-3xl">
                  <div className="relative">
                    {/* Enhanced Professional Image Header */}
                    <div className="relative h-72 overflow-hidden">
                      <OptimizedImage
                        src={stat.image}
                        alt={stat.label}
                        className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                        width={800}
                        height={600}
                        fallback={
                          HIGH_QUALITY_AUTOMOTIVE_IMAGES.backgrounds.fallback
                        }
                      />
                      {/* Enhanced Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"></div>

                      {/* Large Prominent Feature Theme Badge */}
                      <div className="absolute top-6 left-6 right-6">
                        <div className="bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-black px-6 py-3 rounded-2xl shadow-2xl border-2 border-white/30 backdrop-blur-sm">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                <div className="w-4 h-4 bg-gradient-to-r from-black/60 to-black/80 rounded-full"></div>
                              </div>
                              <div>
                                <div className="text-lg font-black tracking-wide">
                                  {stat.feature}
                                </div>
                                <div className="text-xs font-semibold opacity-80">
                                  Premium Standard
                                </div>
                              </div>
                            </div>
                            <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className="w-2 h-2 bg-black/60 rounded-full"
                                ></div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Large Number Display with Theme Context */}
                      <div className="absolute bottom-6 left-6 right-6">
                        <div className="bg-gradient-to-r from-black/60 to-black/80 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                          <div className="flex items-end justify-between">
                            <div>
                              <div className="text-6xl lg:text-8xl font-black text-white drop-shadow-2xl group-hover:text-gold-300 transition-colors duration-300 leading-none">
                                {stat.value}
                              </div>
                              <div className="text-white/80 text-lg font-bold mt-2 group-hover:text-gold-200 transition-colors duration-300">
                                {stat.label}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="w-16 h-16 bg-gradient-to-r from-gold-400/30 to-gold-600/30 rounded-2xl flex items-center justify-center mb-2 group-hover:from-gold-300/40 group-hover:to-gold-500/40 transition-all duration-300">
                                <div className="w-6 h-6 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                              </div>
                              <div className="text-white/60 text-sm font-semibold">
                                Verified
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Enhanced Floating Animation Elements */}
                      <div className="absolute top-20 right-8 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 bg-gradient-to-r from-ocean-400/30 to-forest-400/30 rounded-2xl animate-pulse backdrop-blur-sm border border-white/20 flex items-center justify-center">
                          <div className="w-4 h-4 bg-gradient-to-r from-ocean-400 to-forest-400 rounded-full"></div>
                        </div>
                      </div>
                      <div className="absolute bottom-20 right-8 opacity-40 group-hover:opacity-80 transition-opacity duration-300">
                        <div className="w-8 h-8 bg-gradient-to-r from-gold-400/40 to-sunset-400/40 rounded-xl animate-bounce [animation-delay:0.5s] backdrop-blur-sm border border-white/20 flex items-center justify-center">
                          <div className="w-3 h-3 bg-gradient-to-r from-gold-400 to-sunset-400 rounded-full"></div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Content Section with Theme Integration */}
                    <CardContent className="p-8 bg-gradient-to-br from-gray-900/60 to-black/60 backdrop-blur-sm">
                      {/* Theme Reinforcement Section */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-gradient-to-r from-gold-500/20 to-gold-600/20 rounded-2xl flex items-center justify-center border border-gold-400/30">
                            <div className="w-6 h-6 bg-gradient-to-r from-gold-400 to-gold-600 rounded-lg"></div>
                          </div>
                          <div>
                            <div className="text-xl font-black text-white mb-1">
                              {stat.feature}
                            </div>
                            <div className="text-gold-400 text-sm font-semibold">
                              Industry Standard
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-gold-400 text-3xl font-black">
                            {stat.value}
                          </div>
                          <div className="text-white/60 text-sm">
                            Achievement
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-200 leading-relaxed text-lg mb-8 group-hover:text-white transition-colors duration-300">
                        {stat.description}
                      </p>

                      {/* Enhanced Professional Theme Indicators */}
                      <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-6">
                        <div className="text-center group/indicator">
                          <div className="w-16 h-16 bg-gradient-to-r from-ocean-500/20 to-ocean-600/20 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover/indicator:from-ocean-400/30 group-hover/indicator:to-ocean-500/30 transition-all duration-300 border border-ocean-400/20">
                            <div className="w-6 h-6 bg-gradient-to-r from-ocean-400 to-ocean-500 rounded-xl group-hover/indicator:scale-110 transition-transform duration-300"></div>
                          </div>
                          <div className="text-white font-bold text-sm mb-1">
                            Premium
                          </div>
                          <div className="text-ocean-400 text-xs font-medium">
                            Quality
                          </div>
                        </div>
                        <div className="text-center group/indicator">
                          <div className="w-16 h-16 bg-gradient-to-r from-forest-500/20 to-forest-600/20 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover/indicator:from-forest-400/30 group-hover/indicator:to-forest-500/30 transition-all duration-300 border border-forest-400/20">
                            <div className="w-6 h-6 bg-gradient-to-r from-forest-400 to-forest-500 rounded-xl group-hover/indicator:scale-110 transition-transform duration-300"></div>
                          </div>
                          <div className="text-white font-bold text-sm mb-1">
                            Trusted
                          </div>
                          <div className="text-forest-400 text-xs font-medium">
                            Service
                          </div>
                        </div>
                        <div className="text-center group/indicator">
                          <div className="w-16 h-16 bg-gradient-to-r from-gold-500/20 to-gold-600/20 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover/indicator:from-gold-400/30 group-hover/indicator:to-gold-500/30 transition-all duration-300 border border-gold-400/20">
                            <div className="w-6 h-6 bg-gradient-to-r from-gold-400 to-gold-500 rounded-xl group-hover/indicator:scale-110 transition-transform duration-300"></div>
                          </div>
                          <div className="text-white font-bold text-sm mb-1">
                            Elite
                          </div>
                          <div className="text-gold-400 text-xs font-medium">
                            Excellence
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </div>

                  {/* Enhanced Border Glow Effect with Theme Colors */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-gold-500/20 via-ocean-500/10 to-forest-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                  {/* Corner Accent Elements */}
                  <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-r from-gold-400 to-gold-600 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-4 left-4 w-4 h-4 bg-gradient-to-r from-ocean-400 to-forest-400 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300"></div>
                </Card>
              </div>
            ))}
          </div>

          {/* Additional Trust Indicators */}
          <div className="mt-20 text-center">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-400 mb-2">
                  A+ Rating
                </div>
                <p className="text-gray-300">Better Business Bureau</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-400 mb-2">
                  98% Satisfaction
                </div>
                <p className="text-gray-300">Customer Reviews</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gold-400 mb-2">
                  Industry Leader
                </div>
                <p className="text-gray-300">Luxury Vehicle Sales</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced "Ready to Experience" Section */}
      <section className="py-24 bg-gradient-to-br from-white via-gray-50 to-ocean-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className={
              'absolute top-0 left-0 w-full h-full bg-[url(\'data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="0.4"%3E%3Ccircle cx="20" cy="20" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')]'
            }
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <Badge
              variant="outline"
              className="mb-6 text-ocean-600 border-ocean-300 px-6 py-2 text-sm font-bold"
            >
              The Alpine Motors Experience
            </Badge>
            <h2 className="text-5xl lg:text-6xl font-bold mb-8 bg-gradient-to-r from-ocean-700 via-forest-700 to-sunset-700 bg-clip-text text-transparent leading-tight">
              Ready to Experience
              <span className="block bg-gradient-to-r from-gold-600 to-sunset-600 bg-clip-text text-transparent">
                Automotive Excellence?
              </span>
            </h2>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              From the moment you step into our showroom to long after you drive
              away, we're committed to delivering an unparalleled luxury
              automotive experience that exceeds expectations.
            </p>
          </div>

          {/* Experience Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-20">
            {/* Premium Showroom Experience */}
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 md:hover:-translate-y-2 bg-white rounded-2xl md:rounded-3xl border-2 border-transparent hover:border-ocean-200">
              <div className="relative h-48 md:h-64 overflow-hidden rounded-t-2xl md:rounded-t-3xl">
                <OptimizedImage
                  src={HIGH_QUALITY_AUTOMOTIVE_IMAGES.showroom.main}
                  alt="Luxury automotive showroom with premium lighting and sophisticated design"
                  className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                  width={800}
                  height={600}
                  priority={true}
                />
                <div className="absolute top-6 left-6">
                  <Badge className="bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold shadow-lg px-4 py-2">
                    Premium Showroom
                  </Badge>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                    Immersive Showroom Experience
                  </h3>
                </div>
              </div>
              <CardContent className="p-8">
                <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                  Step into our meticulously designed showroom where luxury
                  meets innovation. Every detail is crafted to showcase our
                  vehicles in the most sophisticated environment, allowing you
                  to envision your perfect driving experience.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-ocean-100 to-ocean-200 rounded-2xl flex items-center justify-center">
                      <div className="w-6 h-6 bg-gradient-to-r from-ocean-500 to-ocean-600 rounded-lg"></div>
                    </div>
                    <div>
                      <div className="font-bold text-ocean-700">
                        World-Class Facility
                      </div>
                      <div className="text-sm text-gray-500">
                        Premium Environment
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personalized Service */}
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white rounded-3xl border-2 border-transparent hover:border-forest-200">
              <div className="relative h-64 overflow-hidden rounded-t-3xl">
                <OptimizedImage
                  src={HIGH_QUALITY_AUTOMOTIVE_IMAGES.showroom.consultation}
                  alt="Professional automotive consultant providing personalized service with car keys"
                  className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                  width={800}
                  height={600}
                  priority={true}
                />
                <div className="absolute top-6 left-6">
                  <Badge className="bg-gradient-to-r from-forest-500 to-forest-600 text-white font-bold shadow-lg px-4 py-2">
                    Expert Guidance
                  </Badge>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                    Personalized Consultation
                  </h3>
                </div>
              </div>
              <CardContent className="p-8">
                <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                  Our certified automotive specialists provide personalized
                  guidance tailored to your lifestyle and preferences. From
                  initial consultation to final delivery, experience service
                  that's as exceptional as our vehicles.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-forest-100 to-forest-200 rounded-2xl flex items-center justify-center">
                      <div className="w-6 h-6 bg-gradient-to-r from-forest-500 to-forest-600 rounded-lg"></div>
                    </div>
                    <div>
                      <div className="font-bold text-forest-700">
                        Dedicated Specialists
                      </div>
                      <div className="text-sm text-gray-500">
                        Personal Attention
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Concierge Service */}
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white rounded-3xl border-2 border-transparent hover:border-sunset-200">
              <div className="relative h-64 overflow-hidden rounded-t-3xl">
                <OptimizedImage
                  src={HIGH_QUALITY_AUTOMOTIVE_IMAGES.showroom.teamConsult}
                  alt="Professional team consulting with clients in luxury automotive environment"
                  className="w-full h-full group-hover:scale-110 transition-transform duration-700"
                  width={800}
                  height={600}
                  priority={true}
                />
                <div className="absolute top-6 left-6">
                  <Badge className="bg-gradient-to-r from-sunset-500 to-sunset-600 text-white font-bold shadow-lg px-4 py-2">
                    Concierge Service
                  </Badge>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                    White-Glove Service
                  </h3>
                </div>
              </div>
              <CardContent className="p-8">
                <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                  Experience the ultimate in automotive luxury with our
                  comprehensive concierge service. From financing arrangements
                  to vehicle delivery, we handle every detail so you can focus
                  on enjoying your new luxury vehicle.
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-sunset-100 to-sunset-200 rounded-2xl flex items-center justify-center">
                      <div className="w-6 h-6 bg-gradient-to-r from-sunset-500 to-sunset-600 rounded-lg"></div>
                    </div>
                    <div>
                      <div className="font-bold text-sunset-700">
                        Full-Service Experience
                      </div>
                      <div className="text-sm text-gray-500">
                        End-to-End Care
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call-to-Action Section */}
          <div className="bg-gradient-to-br from-ocean-600 via-forest-600 to-sunset-600 rounded-3xl p-12 text-white text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div
                className={
                  'absolute top-0 left-0 w-full h-full bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.3"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')]'
                }
              ></div>
            </div>

            <div className="relative z-10">
              <div className="mb-8">
                <div className="inline-block p-4 bg-white/15 backdrop-blur-sm rounded-2xl mb-6">
                  <span className="text-6xl">🏆</span>
                </div>
              </div>

              <h3 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Begin Your Luxury Journey Today
              </h3>

              <p className="text-xl lg:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto text-gray-100">
                Join the exclusive community of Alpine Motors clients who
                experience the pinnacle of automotive luxury and service
                excellence.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center flex-wrap max-w-4xl mx-auto">
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="text-lg px-10 py-4 bg-white text-ocean-600 hover:bg-gray-100 font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
                  >
                    Schedule Private Viewing
                  </Button>
                </Link>

                <Link to="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-10 py-4 border-2 border-gold-300 text-gold-300 hover:bg-gold-300 hover:text-ocean-900 font-bold rounded-2xl transition-all duration-300"
                  >
                    Get Instant Quote
                  </Button>
                </Link>

                <div className="relative group">
                  <div className="absolute -top-3 -left-3 w-6 h-6 bg-gradient-to-r from-ocean-400 to-forest-400 rounded-full animate-pulse opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute -bottom-3 -right-3 w-4 h-4 bg-gradient-to-r from-gold-400 to-sunset-400 rounded-full animate-bounce [animation-delay:0.7s] opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>

                  <Link to="/financing">
                    <Button
                      size="lg"
                      className="text-lg px-10 py-4 bg-gradient-to-r from-ocean-600 via-forest-600 to-gold-600 hover:from-ocean-500 hover:via-forest-500 hover:to-gold-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden group border-2 border-white/40 hover:border-white/70"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></span>

                      <span className="relative flex items-center gap-3 z-10">
                        <div className="bg-white/20 p-2 rounded-full group-hover:bg-white/30 transition-all duration-300 group-hover:rotate-12">
                          <svg
                            className="h-5 w-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="tracking-wide">Financing Options</span>
                      </span>
                    </Button>
                  </Link>

                  <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ocean-500/30 via-forest-500/30 to-gold-500/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-110"></div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-300 mb-2">
                    25+ Years
                  </div>
                  <p className="text-gray-200">Automotive Excellence</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-300 mb-2">
                    2,500+
                  </div>
                  <p className="text-gray-200">Satisfied Clients</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-300 mb-2">
                    A+ Rating
                  </div>
                  <p className="text-gray-200">Better Business Bureau</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
