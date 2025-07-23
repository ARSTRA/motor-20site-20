import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Star, 
  Calendar, 
  Gauge, 
  Fuel, 
  Heart, 
  Eye, 
  Phone, 
  Mail,
  ChevronRight,
  Filter,
  ArrowUpDown,
  Grid3X3,
  List
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Layout from "@/components/Layout";
import { Car, Category } from "@shared/api";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [cars, setCars] = useState<Car[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>(category || '');
  const [sortBy, setSortBy] = useState<string>('created-desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (activeCategory) {
      fetchCarsByCategory(activeCategory);
    }
  }, [activeCategory, sortBy]);

  useEffect(() => {
    if (category && category !== activeCategory) {
      setActiveCategory(category);
    }
  }, [category]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchCarsByCategory = async (categorySlug: string) => {
    setLoading(true);
    try {
      const [sortField, sortOrder] = sortBy.split('-');
      const response = await fetch(`/api/cars?category=${categorySlug}&sortBy=${sortField}&sortOrder=${sortOrder}&limit=20`);
      const data = await response.json();
      setCars(data.cars);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const currentCategory = categories.find(cat => cat.slug === activeCategory);

  // Enhanced vehicle card component
  const VehicleCard = ({ car, isListView = false }: { car: Car; isListView?: boolean }) => (
    <Card className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 rounded-3xl border-2 border-transparent hover:border-ocean-200 ${isListView ? 'flex' : ''}`}>
      <div className={`relative ${isListView ? 'w-96 flex-shrink-0' : ''}`}>
        {/* Enhanced image display with multiple gradients */}
        <div className={`${isListView ? 'aspect-[4/3]' : 'aspect-[4/3]'} bg-gradient-to-br from-ocean-100 via-forest-100 to-sunset-100 flex items-center justify-center relative overflow-hidden`}>
          {/* Dynamic background based on category */}
          <div className={`absolute inset-0 ${
            car.category === 'luxury-suv' ? 'bg-gradient-to-br from-ocean-500/30 via-forest-500/20 to-sunset-500/20' :
            car.category === 'sports-car' ? 'bg-gradient-to-br from-sunset-500/30 via-gold-500/20 to-ocean-500/20' :
            car.category === 'luxury-sedan' ? 'bg-gradient-to-br from-forest-500/30 via-ocean-500/20 to-gold-500/20' :
            car.category === 'electric' ? 'bg-gradient-to-br from-gold-500/30 via-forest-500/20 to-ocean-500/20' :
            'bg-gradient-to-br from-ocean-500/20 via-forest-500/20 to-sunset-500/20'
          }`}></div>
          
          {/* Premium car illustration */}
          <div className="text-8xl relative z-10 group-hover:scale-110 transition-transform duration-500 drop-shadow-lg">
            {car.category === 'luxury-suv' ? '🚙' :
             car.category === 'sports-car' ? '🏎️' :
             car.category === 'luxury-sedan' ? '🚗' :
             car.category === 'electric' ? '⚡' :
             '🚘'}
          </div>
          
          {/* Floating elements for luxury feel */}
          <div className="absolute top-2 right-2 opacity-60">
            <div className="w-6 h-6 bg-gold-400 rounded-full animate-pulse"></div>
          </div>
          <div className="absolute bottom-4 left-4 opacity-40">
            <div className="w-4 h-4 bg-ocean-400 rounded-full animate-bounce"></div>
          </div>
        </div>
        
        <div className="absolute top-6 left-6 flex gap-3">
          {car.featured && (
            <Badge className="bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold shadow-xl animate-pulse">
              ✨ Premium
            </Badge>
          )}
          <Badge variant="secondary" className="bg-gradient-to-r from-forest-100 to-forest-200 text-forest-700 font-bold shadow-lg">
            {car.status === 'available' ? '✅ Available' : car.status}
          </Badge>
        </div>
        
        <div className="absolute top-6 right-6 flex gap-3">
          <button className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl group">
            <Heart className="h-5 w-5 text-sunset-500 group-hover:fill-sunset-500 transition-all" />
          </button>
          <button className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl">
            <Eye className="h-5 w-5 text-ocean-500" />
          </button>
        </div>
      </div>
      
      <CardContent className={`${isListView ? 'flex-1' : ''} p-8`}>
        <div className="flex items-center justify-between mb-6">
          <Badge variant="secondary" className="bg-gradient-to-r from-forest-100 to-forest-200 text-forest-700 font-bold text-sm px-4 py-2">
            {currentCategory?.name || car.category}
          </Badge>
          <div className="flex items-center gap-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-gold-400 text-gold-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-gold-600 bg-gold-50 px-3 py-1 rounded-full">5.0</span>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:bg-gradient-to-r group-hover:from-ocean-600 group-hover:to-forest-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 leading-tight">
          {car.name}
        </h3>
        
        <p className="text-gray-600 mb-8 leading-relaxed text-lg">{car.description}</p>

        {/* Enhanced specifications grid */}
        <div className={`grid ${isListView ? 'grid-cols-6' : 'grid-cols-3'} gap-4 mb-8`}>
          <div className="bg-gradient-to-br from-ocean-50 to-ocean-100 p-4 rounded-2xl text-center hover:scale-105 transition-transform">
            <Calendar className="h-6 w-6 text-ocean-600 mx-auto mb-2" />
            <span className="text-xs text-ocean-600 block font-medium">Year</span>
            <span className="text-sm font-bold text-ocean-700">{car.year}</span>
          </div>
          <div className="bg-gradient-to-br from-forest-50 to-forest-100 p-4 rounded-2xl text-center hover:scale-105 transition-transform">
            <Gauge className="h-6 w-6 text-forest-600 mx-auto mb-2" />
            <span className="text-xs text-forest-600 block font-medium">Mileage</span>
            <span className="text-sm font-bold text-forest-700">{car.mileage.toLocaleString()}</span>
          </div>
          <div className="bg-gradient-to-br from-sunset-50 to-sunset-100 p-4 rounded-2xl text-center hover:scale-105 transition-transform">
            <Fuel className="h-6 w-6 text-sunset-600 mx-auto mb-2" />
            <span className="text-xs text-sunset-600 block font-medium">Fuel</span>
            <span className="text-sm font-bold text-sunset-700">{car.fuel}</span>
          </div>
          {isListView && (
            <>
              <div className="bg-gradient-to-br from-gold-50 to-gold-100 p-4 rounded-2xl text-center hover:scale-105 transition-transform">
                <span className="text-xs text-gold-600 block font-medium">Power</span>
                <span className="text-sm font-bold text-gold-700">{car.specifications.horsepower}</span>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-2xl text-center hover:scale-105 transition-transform">
                <span className="text-xs text-gray-600 block font-medium">MPG</span>
                <span className="text-sm font-bold text-gray-700">{car.specifications.mpg}</span>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-2xl text-center hover:scale-105 transition-transform">
                <span className="text-xs text-purple-600 block font-medium">Drive</span>
                <span className="text-sm font-bold text-purple-700">{car.specifications.drivetrain}</span>
              </div>
            </>
          )}
        </div>

        {isListView && (
          <div className="grid grid-cols-2 gap-6 mb-8 text-sm bg-gray-50 p-6 rounded-2xl">
            <div className="flex justify-between">
              <span className="font-bold text-gray-700">Exterior:</span> 
              <span className="text-gray-600">{car.specifications.color}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-gray-700">Interior:</span> 
              <span className="text-gray-600">{car.specifications.interior}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-gray-700">Engine:</span> 
              <span className="text-gray-600">{car.specifications.engine}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-gray-700">Transmission:</span> 
              <span className="text-gray-600">{car.transmission}</span>
            </div>
          </div>
        )}
        
        <div className={`flex ${isListView ? 'flex-col xl:flex-row' : 'flex-col sm:flex-row'} items-start justify-between gap-6`}>
          <div className="bg-gradient-to-r from-gray-50 to-ocean-50 p-6 rounded-2xl">
            <p className="text-sm text-gray-500 mb-2 font-medium">Starting from</p>
            <span className="text-4xl font-bold bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent">
              ${car.price.toLocaleString()}
            </span>
            <p className="text-xs text-gray-500 mt-1">Plus taxes and fees</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline"
              className="border-2 border-ocean-500 text-ocean-600 hover:bg-ocean-500 hover:text-white font-bold px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-105"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>
            <Button className="bg-gradient-to-r from-ocean-500 to-forest-500 hover:from-ocean-600 hover:to-forest-600 text-white font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
              View Details
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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
              <span className="text-8xl">{currentCategory?.icon || '🚗'}</span>
            </div>
            <Badge variant="outline" className="mb-6 text-gold-300 border-gold-300 px-6 py-3 text-lg">
              {currentCategory?.name || 'Vehicle Categories'}
            </Badge>
            <h1 className="text-6xl lg:text-7xl font-bold mb-8">
              {currentCategory?.name || 'Premium Vehicles'}
              <span className="bg-gradient-to-r from-gold-300 to-gold-400 bg-clip-text text-transparent block">
                Collection
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              {currentCategory?.description || 'Discover our handpicked selection of premium vehicles, each representing the pinnacle of automotive excellence and luxury.'}
            </p>
            <div className="flex items-center justify-center gap-6 text-lg">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4">
                <span className="text-5xl font-bold text-gold-300">{cars.length}</span>
                <span>Available Vehicles</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tabs Section */}
      <section className="py-8 bg-gradient-to-r from-gray-50 to-ocean-50">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
              <TabsList className="bg-white shadow-xl rounded-2xl p-2 border-2 border-gray-100 flex-wrap justify-start">
                {categories.map((cat) => (
                  <TabsTrigger 
                    key={cat.id} 
                    value={cat.slug}
                    className="flex items-center gap-3 px-6 py-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-ocean-500 data-[state=active]:to-forest-500 data-[state=active]:text-white font-bold transition-all duration-300 hover:scale-105"
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <div className="text-left">
                      <div className="font-bold">{cat.name}</div>
                      <div className="text-xs opacity-75">{cat.count} vehicles</div>
                    </div>
                  </TabsTrigger>
                ))}
              </TabsList>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-56 border-2 border-gray-200 rounded-xl bg-white shadow-lg">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="created-desc">Newest First</SelectItem>
                    <SelectItem value="created-asc">Oldest First</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                    <SelectItem value="year-desc">Year: Newest</SelectItem>
                    <SelectItem value="mileage-asc">Mileage: Low to High</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Toggle */}
                <div className="flex bg-white rounded-2xl p-2 shadow-lg border-2 border-gray-100">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={`rounded-xl ${viewMode === 'grid' ? 'bg-gradient-to-r from-ocean-500 to-forest-500 text-white shadow-lg' : 'hover:bg-gray-100'}`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={`rounded-xl ${viewMode === 'list' ? 'bg-gradient-to-r from-ocean-500 to-forest-500 text-white shadow-lg' : 'hover:bg-gray-100'}`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Vehicle Content */}
            {categories.map((cat) => (
              <TabsContent key={cat.id} value={cat.slug} className="mt-8">
                <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-gray-100">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent">
                        {cat.name} Collection
                      </h2>
                      <p className="text-gray-600 mt-2 text-lg">{cat.description}</p>
                    </div>
                    <Badge variant="outline" className="text-ocean-600 border-ocean-300 px-4 py-2 text-lg">
                      {cars.length} vehicles available
                    </Badge>
                  </div>

                  {loading ? (
                    <div className={viewMode === 'grid' 
                      ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" 
                      : "space-y-8"
                    }>
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="bg-gray-200 animate-pulse rounded-3xl h-96"></div>
                      ))}
                    </div>
                  ) : cars.length === 0 ? (
                    <div className="text-center py-16">
                      <div className="text-8xl mb-6">🔍</div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4">No vehicles in this category yet</h3>
                      <p className="text-gray-600 mb-8 text-lg">Check back soon for new additions to our {cat.name.toLowerCase()} collection</p>
                      <Link to="/inventory">
                        <Button className="bg-gradient-to-r from-ocean-500 to-forest-500 text-white px-8 py-4 rounded-2xl font-bold text-lg">
                          Browse All Vehicles
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className={viewMode === 'grid' 
                      ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8" 
                      : "space-y-8"
                    }>
                      {cars.map((car) => (
                        <VehicleCard key={car.id} car={car} isListView={viewMode === 'list'} />
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-ocean-600 via-forest-600 to-sunset-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]\"></div>
        </div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="mb-8">
            <div className="inline-block p-6 bg-white/10 backdrop-blur-sm rounded-3xl mb-8">
              <span className="text-7xl">🤝</span>
            </div>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            Found Your Perfect
            <span className="bg-gradient-to-r from-gold-300 to-gold-400 bg-clip-text text-transparent block">
              Dream Vehicle?
            </span>
          </h2>
          <p className="text-xl lg:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto text-gray-100">
            Our luxury automotive specialists are ready to help you experience the vehicle of your dreams. 
            Schedule a private viewing or get personalized recommendations.
          </p>
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
            <Button size="lg" className="text-xl px-12 py-6 bg-white text-ocean-600 hover:bg-gray-100 font-bold rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
              <Phone className="h-5 w-5 mr-3" />
              Schedule Private Viewing
            </Button>
            <Button size="lg" variant="outline" className="text-xl px-12 py-6 border-2 border-gold-300 text-gold-300 hover:bg-gold-300 hover:text-ocean-900 font-bold rounded-3xl transition-all duration-300">
              <Mail className="h-5 w-5 mr-3" />
              Get Expert Consultation
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}