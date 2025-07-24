import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  Search,
  Filter,
  Grid3X3,
  List,
  Star,
  Calendar,
  Gauge,
  Fuel,
  Heart,
  Eye,
  ChevronDown,
  SlidersHorizontal,
  MapPin,
  Phone,
  Mail,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Layout from "@/components/Layout";
import { Car, Category, CarFilters } from "@shared/api";

type ViewMode = "grid" | "list";

export default function Inventory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState<Car[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBrand, setSelectedBrand] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [yearRange, setYearRange] = useState<[number, number]>([2020, 2024]);
  const [selectedFuel, setSelectedFuel] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("created");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const itemsPerPage = 12;

  useEffect(() => {
    fetchCategories();
    fetchCars();
  }, []);

  useEffect(() => {
    fetchCars();
  }, [
    searchTerm,
    selectedCategory,
    selectedBrand,
    priceRange,
    yearRange,
    selectedFuel,
    sortBy,
    sortOrder,
    showFeaturedOnly,
    currentPage,
  ]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      setCategories(data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchCars = async () => {
    setLoading(true);
    try {
      const filters: CarFilters = {
        search: searchTerm || undefined,
        category: selectedCategory !== "all" ? selectedCategory : undefined,
        brand: selectedBrand !== "all" ? selectedBrand : undefined,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        minYear: yearRange[0],
        maxYear: yearRange[1],
        fuel: selectedFuel !== "all" ? selectedFuel : undefined,
        featured: showFeaturedOnly || undefined,
        sortBy: sortBy as any,
        sortOrder,
        page: currentPage,
        limit: itemsPerPage,
      };

      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });

      const response = await fetch(`/api/cars?${queryParams}`);
      const data = await response.json();
      setCars(data.cars);
      setTotalCount(data.total);
    } catch (error) {
      console.error("Error fetching cars:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedBrand("all");
    setPriceRange([0, 500000]);
    setYearRange([2020, 2024]);
    setSelectedFuel("all");
    setShowFeaturedOnly(false);
    setCurrentPage(1);
  };

  const uniqueBrands = [...new Set(cars.map((car) => car.brand))];
  const totalPages = Math.ceil(totalCount / itemsPerPage);

  // Filter sidebar component
  const FilterSidebar = ({ mobile = false }) => (
    <div className={`space-y-6 ${mobile ? "p-4" : ""}`}>
      {/* Search */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3">
          Search Vehicles
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-ocean-500" />
          <Input
            placeholder="Search by make, model, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-2 border-ocean-200 focus:border-ocean-500 rounded-xl"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3">
          Category
        </label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="border-2 border-forest-200 focus:border-forest-500 rounded-xl">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.slug}>
                {category.icon} {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Brand Filter */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3">
          Brand
        </label>
        <Select value={selectedBrand} onValueChange={setSelectedBrand}>
          <SelectTrigger className="border-2 border-sunset-200 focus:border-sunset-500 rounded-xl">
            <SelectValue placeholder="All Brands" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Brands</SelectItem>
            {uniqueBrands.map((brand) => (
              <SelectItem key={brand} value={brand}>
                {brand}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3">
          Price Range: ${priceRange[0].toLocaleString()} - $
          {priceRange[1].toLocaleString()}
        </label>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            max={500000}
            min={0}
            step={5000}
            className="w-full"
          />
        </div>
      </div>

      {/* Year Range */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3">
          Year: {yearRange[0]} - {yearRange[1]}
        </label>
        <div className="px-2">
          <Slider
            value={yearRange}
            onValueChange={(value) => setYearRange(value as [number, number])}
            max={2024}
            min={2015}
            step={1}
            className="w-full"
          />
        </div>
      </div>

      {/* Fuel Type */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-3">
          Fuel Type
        </label>
        <Select value={selectedFuel} onValueChange={setSelectedFuel}>
          <SelectTrigger className="border-2 border-gold-200 focus:border-gold-500 rounded-xl">
            <SelectValue placeholder="All Fuel Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Fuel Types</SelectItem>
            <SelectItem value="Gas">Gasoline</SelectItem>
            <SelectItem value="Electric">Electric</SelectItem>
            <SelectItem value="Hybrid">Hybrid</SelectItem>
            <SelectItem value="Diesel">Diesel</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Featured Only */}
      <div className="flex items-center space-x-3">
        <Checkbox
          id="featured"
          checked={showFeaturedOnly}
          onCheckedChange={(checked) => setShowFeaturedOnly(checked === true)}
        />
        <label htmlFor="featured" className="text-sm font-bold text-gray-700">
          Show Featured Only
        </label>
      </div>

      {/* Clear Filters */}
      <Button
        variant="outline"
        onClick={clearFilters}
        className="w-full border-2 border-gray-300 hover:bg-gray-50"
      >
        <X className="h-4 w-4 mr-2" />
        Clear All Filters
      </Button>
    </div>
  );

  // Vehicle card component
  const VehicleCard = ({
    car,
    isListView = false,
  }: {
    car: Car;
    isListView?: boolean;
  }) => (
    <Card
      className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 rounded-2xl border-2 border-transparent hover:border-ocean-200 hover:shadow-ocean-500/10 ${isListView ? "flex flex-col lg:flex-row" : ""}`}
    >
      <div className={`relative ${isListView ? "w-80 flex-shrink-0" : ""}`}>
        <div
          className={`${isListView ? "aspect-[4/3]" : "aspect-[4/3]"} relative overflow-hidden rounded-t-2xl`}
        >
          {car.images && car.images.length > 0 ? (
            <>
              <img
                src={car.images[0]}
                alt={car.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  // Fallback to gradient if image fails to load
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              {/* Fallback gradient background (hidden by default) */}
              <div className="hidden absolute inset-0 bg-gradient-to-br from-ocean-100 via-forest-100 to-sunset-100 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-ocean-500/20 via-forest-500/20 to-sunset-500/20"></div>
                <div className="text-6xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                  🚗
                </div>
              </div>
            </>
          ) : (
            // Fallback when no images available
            <div className="absolute inset-0 bg-gradient-to-br from-ocean-100 via-forest-100 to-sunset-100 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-ocean-500/20 via-forest-500/20 to-sunset-500/20"></div>
              <div className="text-6xl relative z-10 group-hover:scale-110 transition-transform duration-300">
                🚗
              </div>
            </div>
          )}
        </div>
        <div className="absolute top-4 left-4 flex gap-2">
          {car.featured && (
            <Badge className="bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold shadow-lg">
              Premium
            </Badge>
          )}
          <Badge
            variant="secondary"
            className="bg-gradient-to-r from-forest-100 to-forest-200 text-forest-700 font-semibold"
          >
            {car.status === "available" ? "Available" : car.status}
          </Badge>
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => alert('Added to favorites!')}
            className="bg-white/95 p-3 rounded-xl hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg group/heart"
          >
            <Heart className="h-4 w-4 text-sunset-500 group-hover/heart:fill-sunset-500 transition-all duration-300" />
          </button>
          <Link to={`/vehicle/${car.id}`}>
            <button className="bg-white/95 p-3 rounded-xl hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg group/eye">
              <Eye className="h-4 w-4 text-ocean-500 group-hover/eye:text-ocean-600 transition-colors duration-300" />
            </button>
          </Link>
        </div>
      </div>

      <CardContent className={`${isListView ? "flex-1" : ""} p-8`}>
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
                <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
              ))}
            </div>
            <span className="text-sm font-bold text-gold-600">5.0</span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-ocean-600 group-hover:to-forest-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
          {car.name}
        </h3>

        <p className="text-gray-600 mb-6 leading-relaxed">{car.description}</p>

        <div
          className={`grid ${isListView ? "grid-cols-5" : "grid-cols-3"} gap-4 mb-6`}
        >
          <div className="bg-gradient-to-r from-ocean-50 to-ocean-100 p-3 rounded-xl text-center">
            <Calendar className="h-5 w-5 text-ocean-600 mx-auto mb-1" />
            <span className="text-sm font-bold text-ocean-700">{car.year}</span>
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
          {isListView && (
            <>
              <div className="bg-gradient-to-r from-gold-50 to-gold-100 p-3 rounded-xl text-center">
                <span className="text-xs text-gold-600 block">Engine</span>
                <span className="text-sm font-bold text-gold-700">
                  {car.specifications.horsepower}
                </span>
              </div>
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 rounded-xl text-center">
                <span className="text-xs text-gray-600 block">MPG</span>
                <span className="text-sm font-bold text-gray-700">
                  {car.specifications.mpg}
                </span>
              </div>
            </>
          )}
        </div>

        {isListView && (
          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div>
              <span className="font-bold">Color:</span>{" "}
              {car.specifications.color}
            </div>
            <div>
              <span className="font-bold">Interior:</span>{" "}
              {car.specifications.interior}
            </div>
            <div>
              <span className="font-bold">Drivetrain:</span>{" "}
              {car.specifications.drivetrain}
            </div>
            <div>
              <span className="font-bold">Transmission:</span>{" "}
              {car.transmission}
            </div>
          </div>
        )}

        <div
          className={`flex ${isListView ? "flex-col lg:flex-row" : "flex-col sm:flex-row"} items-start justify-between gap-4`}
        >
          <div>
            <p className="text-sm text-gray-500 mb-1">Starting from</p>
            <span className="text-3xl font-bold bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent">
              ${car.price.toLocaleString()}
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="border-2 border-ocean-500 text-ocean-600 hover:bg-ocean-500 hover:text-white font-bold px-4 py-2 rounded-xl transition-all duration-300"
            >
              <Phone className="h-4 w-4 mr-2" />
              Call
            </Button>
            <Link to={`/vehicle/${car.id}`}>
              <Button className="bg-gradient-to-r from-ocean-500 to-forest-500 hover:from-ocean-600 hover:to-forest-600 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative text-white py-20 overflow-hidden min-h-[500px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-32 h-32 bg-gold-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-ocean-400 rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-forest-400 rounded-full blur-2xl animate-pulse [animation-delay:2s]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <Badge
              className="mb-6 bg-gradient-to-r from-gold-500/90 to-sunset-500/90 text-white border-white/30 px-6 py-3 text-lg font-semibold shadow-xl backdrop-blur-sm"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                Premium Collection
              </span>
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white drop-shadow-2xl">Luxury Vehicle</span>
              <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-sunset-400 bg-clip-text text-transparent block drop-shadow-lg">
                Inventory
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 mb-8 max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
              Discover our complete collection of premium vehicles. Each car is
              meticulously inspected and comes with our guarantee of quality and
              excellence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-lg">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-gold-500 to-sunset-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">{totalCount}</span>
                </div>
                <div className="text-left">
                  <div className="text-gold-300 font-bold">Premium</div>
                  <div className="text-white">Vehicles</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-xl">
                <div className="w-12 h-12 bg-gradient-to-r from-ocean-500 to-forest-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl font-bold text-white">{categories.length}</span>
                </div>
                <div className="text-left">
                  <div className="text-ocean-300 font-bold">Luxury</div>
                  <div className="text-white">Categories</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filter Bar */}
          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border-2 border-gray-100">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent">
                  Vehicle Collection
                </h2>
                <Badge
                  variant="outline"
                  className="text-ocean-600 border-ocean-300"
                >
                  {totalCount} vehicles found
                </Badge>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <Select
                  value={`${sortBy}-${sortOrder}`}
                  onValueChange={(value) => {
                    const [newSortBy, newSortOrder] = value.split("-");
                    setSortBy(newSortBy);
                    setSortOrder(newSortOrder as "asc" | "desc");
                  }}
                >
                  <SelectTrigger className="w-48 border-2 border-gray-200 rounded-xl">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="created-desc">Newest First</SelectItem>
                    <SelectItem value="created-asc">Oldest First</SelectItem>
                    <SelectItem value="price-asc">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-desc">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="year-desc">Year: Newest</SelectItem>
                    <SelectItem value="year-asc">Year: Oldest</SelectItem>
                    <SelectItem value="mileage-asc">
                      Mileage: Low to High
                    </SelectItem>
                  </SelectContent>
                </Select>

                {/* View Toggle */}
                <div className="flex bg-gray-100 rounded-xl p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`rounded-lg ${viewMode === "grid" ? "bg-gradient-to-r from-ocean-500 to-forest-500 text-white" : ""}`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`rounded-lg ${viewMode === "list" ? "bg-gradient-to-r from-ocean-500 to-forest-500 text-white" : ""}`}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="lg:hidden border-2 border-ocean-500 text-ocean-600"
                    >
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80">
                    <SheetHeader>
                      <SheetTitle>Filter Vehicles</SheetTitle>
                      <SheetDescription>
                        Refine your search to find the perfect vehicle
                      </SheetDescription>
                    </SheetHeader>
                    <FilterSidebar mobile />
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-8 bg-white rounded-2xl shadow-xl p-6 border-2 border-gray-100">
                <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent">
                  Filter & Search
                </h3>
                <FilterSidebar />
              </div>
            </div>

            {/* Vehicle Grid/List */}
            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse rounded-2xl h-96 relative overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full animate-shimmer"></div>
                    </div>
                  ))}
                </div>
              ) : cars.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-24 h-24 bg-gradient-to-r from-ocean-500 to-forest-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="text-4xl">🔍</div>
                  </div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent mb-4">
                    No Vehicles Found
                  </h3>
                  <p className="text-gray-600 mb-8 text-lg max-w-md mx-auto">
                    We couldn't find any vehicles matching your criteria. Try adjusting your filters or search terms.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={clearFilters}
                      className="bg-gradient-to-r from-ocean-500 to-forest-500 hover:from-ocean-600 hover:to-forest-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    >
                      Clear All Filters
                    </Button>
                    <Link to="/contact">
                      <Button
                        variant="outline"
                        className="border-2 border-sunset-500 text-sunset-600 hover:bg-sunset-500 hover:text-white font-bold px-8 py-3 rounded-xl transition-all duration-300"
                      >
                        Contact Expert
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8"
                        : "space-y-6"
                    }
                  >
                    {cars.map((car) => (
                      <VehicleCard
                        key={car.id}
                        car={car}
                        isListView={viewMode === "list"}
                      />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-4 mt-12">
                      <Button
                        variant="outline"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="border-2 border-ocean-500 text-ocean-600 hover:bg-ocean-500 hover:text-white"
                      >
                        Previous
                      </Button>

                      <div className="flex gap-2">
                        {[...Array(Math.min(5, totalPages))].map((_, i) => {
                          const page = i + 1;
                          return (
                            <Button
                              key={page}
                              variant={
                                currentPage === page ? "default" : "outline"
                              }
                              onClick={() => setCurrentPage(page)}
                              className={
                                currentPage === page
                                  ? "bg-gradient-to-r from-ocean-500 to-forest-500 text-white"
                                  : "border-2 border-gray-300"
                              }
                            >
                              {page}
                            </Button>
                          );
                        })}
                      </div>

                      <Button
                        variant="outline"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="border-2 border-ocean-500 text-ocean-600 hover:bg-ocean-500 hover:text-white"
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-ocean-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent">
            Need Help Finding Your Perfect Vehicle?
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Our expert team is here to help you find exactly what you're looking
            for
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-ocean-500 to-forest-500 hover:from-ocean-600 hover:to-forest-600 text-white font-bold px-8 py-3 rounded-xl">
              <Phone className="h-4 w-4 mr-2" />
              Call (555) 123-4567
            </Button>
            <Button
              variant="outline"
              className="border-2 border-sunset-500 text-sunset-600 hover:bg-sunset-500 hover:text-white font-bold px-8 py-3 rounded-xl"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email Us
            </Button>
            <Button
              variant="outline"
              className="border-2 border-forest-500 text-forest-600 hover:bg-forest-500 hover:text-white font-bold px-8 py-3 rounded-xl"
            >
              <MapPin className="h-4 w-4 mr-2" />
              Visit Showroom
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
