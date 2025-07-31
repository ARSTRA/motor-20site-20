import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Calendar,
  Gauge,
  Fuel,
  Heart,
  Share2,
  Phone,
  Mail,
  MessageSquare,
  Car,
  Shield,
  Award,
  Zap,
  DollarSign,
  CheckCircle,
  Settings,
  Users,
  Crown,
  Sparkles,
  TrendingUp,
  Camera,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Layout from "@/components/Layout";
import { Car as CarType, CarResponse } from "@shared/api";

export default function VehicleDetail() {
  const { id } = useParams<{ id: string }>();
  const [vehicle, setVehicle] = useState<CarType | null>(null);
  const [relatedVehicles, setRelatedVehicles] = useState<CarType[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      fetchVehicleDetails(parseInt(id));
      // Check if vehicle is in favorites
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      setIsFavorite(favorites.includes(parseInt(id)));
    }
  }, [id]);

  const fetchVehicleDetails = async (vehicleId: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/cars/${vehicleId}`);
      const data: CarResponse = await response.json();
      setVehicle(data.car);
      setRelatedVehicles(data.relatedCars);
    } catch (error) {
      console.error("Error fetching vehicle details:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = () => {
    if (!vehicle) return;
    
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    let newFavorites;
    
    if (isFavorite) {
      newFavorites = favorites.filter((fav: number) => fav !== vehicle.id);
    } else {
      newFavorites = [...favorites, vehicle.id];
    }
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const nextImage = () => {
    if (vehicle) {
      setCurrentImageIndex((prev) => (prev + 1) % vehicle.images.length);
    }
  };

  const prevImage = () => {
    if (vehicle) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + vehicle.images.length) % vehicle.images.length
      );
    }
  };

  const getEnhancedDescription = (vehicle: CarType) => {
    const descriptions = {
      "2024 BMW X5 M Competition": {
        overview: "The BMW X5 M Competition represents the pinnacle of luxury SUV performance, where Bavarian engineering excellence meets uncompromising power. This exceptional vehicle combines the practicality of a luxury SUV with the heart of a high-performance sports car, delivering an unparalleled driving experience that defies conventional boundaries.",
        performance: "Under the hood lies a meticulously crafted 4.4-liter twin-turbocharged V8 engine, producing an astounding 617 horsepower and 553 lb-ft of torque. The M xDrive intelligent all-wheel-drive system ensures optimal traction and stability, while the 8-speed M Steptronic transmission delivers lightning-fast gear changes. Accelerating from 0-60 mph in just 3.7 seconds, this SUV redefines what's possible in the luxury performance segment.",
        luxury: "Step inside to discover a cabin that exemplifies German luxury craftsmanship. Premium Merino leather adorns every surface, while the BMW Individual audio system delivers concert-hall acoustics. The panoramic sky lounge LED roof creates an ambiance of sophistication, while heated and ventilated M multifunction seats provide ultimate comfort during spirited drives.",
        technology: "The latest BMW iDrive 8 infotainment system takes center stage, featuring a curved display with intuitive gesture control. Advanced driver assistance systems including Active Driving Assistant Pro ensure safety without compromising performance. The M-specific driving modes allow you to customize every aspect of the driving experience.",
        exclusivity: "This particular X5 M Competition features exclusive Alpine White metallic paint, creating a commanding presence that demands attention. The M-specific exterior elements, including the distinctive kidney grille and aggressive body kit, announce its performance credentials before you even start the engine."
      },
      "2023 Mercedes-Benz S-Class": {
        overview: "The Mercedes-Benz S-Class has long been regarded as the gold standard of luxury sedans, and this 2023 model continues that prestigious legacy. Representing over a century of automotive innovation, the S-Class combines cutting-edge technology with traditional luxury, creating a sanctuary of comfort and sophistication.",
        performance: "The advanced hybrid powertrain combines a refined 3.0-liter turbocharged inline-six engine with an intelligent electric motor, producing a combined 429 horsepower. The seamless integration of electric assistance provides both exceptional fuel economy and effortless acceleration, while the 9G-TRONIC automatic transmission ensures whisper-quiet operation.",
        luxury: "The interior represents the finest in German luxury, featuring hand-fitted leather upholstery and real wood trim sourced from sustainable forests. The executive rear seating package transforms the cabin into a first-class lounge, complete with massage functions, climate control, and individual entertainment screens.",
        technology: "The MBUX Hyperscreen stretches across the entire dashboard, creating an immersive digital environment. Advanced AI learns your preferences and anticipates your needs, while the Burmester 4D surround sound system creates an audio experience that rivals the finest concert halls.",
        exclusivity: "Finished in elegant Obsidian Black metallic with luxurious beige leather interior, this S-Class exemplifies understated elegance. The attention to detail is evident in every surface, from the hand-stitched leather to the precision-crafted controls."
      },
      "2024 Porsche 911 Turbo S": {
        overview: "The Porsche 911 Turbo S represents the ultimate expression of the iconic 911 lineage. For over five decades, the 911 has defined what a sports car should be, and this latest Turbo S iteration pushes those boundaries even further. It's not just a car; it's a statement of engineering excellence and driving purity.",
        performance: "The heart of this machine is a meticulously engineered 3.8-liter twin-turbocharged flat-six engine, producing an explosive 640 horsepower and 590 lb-ft of torque. The sophisticated all-wheel-drive system and 8-speed PDK transmission work in perfect harmony to deliver devastating acceleration, reaching 60 mph in just 2.6 seconds while maintaining the composure and precision that defines Porsche.",
        luxury: "Despite its racing pedigree, the interior offers surprising luxury and comfort. The sport seats are upholstered in premium leather with contrasting stitching, while carbon fiber accents remind you of the car's performance focus. The Porsche Communication Management system integrates seamlessly with the driver-focused cockpit design.",
        technology: "Advanced traction management systems, including Porsche Torque Vectoring Plus and active suspension management, ensure optimal performance in any condition. The Sport Chrono package includes dynamic engine mounts and performance-oriented driving modes that transform the character of the vehicle instantly.",
        exclusivity: "This particular Turbo S is finished in the iconic Guards Red, a color that has become synonymous with Porsche performance. Every detail, from the distinctive whale tail spoiler to the center-lock wheels, speaks to the car's racing heritage and exclusive nature."
      },
      "2024 Tesla Model S Plaid": {
        overview: "The Tesla Model S Plaid represents a revolutionary leap in automotive technology, redefining what an electric vehicle can achieve. This isn't just about sustainable transportation; it's about delivering mind-bending performance while pioneering the future of automotive innovation.",
        performance: "Three independent electric motors produce a combined 1,020 horsepower, delivering acceleration that defies physics. The tri-motor setup with torque vectoring enables 0-60 mph in just 1.99 seconds, making it one of the quickest production cars ever built. With over 400 miles of range, it proves that performance and efficiency can coexist.",
        luxury: "The minimalist interior features premium vegan leather and a 17-inch landscape touchscreen that controls virtually every vehicle function. The glass roof extends from front to back, creating an airy cabin atmosphere, while the premium audio system delivers exceptional sound quality through strategically placed speakers.",
        technology: "The Full Self-Driving capability represents the cutting edge of autonomous technology, while over-the-air updates continuously improve the vehicle's capabilities. The onboard gaming computer rivals high-end consoles, and the advanced air filtration system creates a biohazard defense mode.",
        exclusivity: "This Model S Plaid features the stunning Pearl White multi-coat finish with black premium interior. The unique design elements, including the distinctive light bar and aerodynamic wheels, make it instantly recognizable as the flagship of electric performance."
      },
      "2023 Range Rover Sport": {
        overview: "The Range Rover Sport embodies the perfect balance between luxury and capability, representing British automotive excellence at its finest. This vehicle is equally at home navigating city streets in supreme comfort or conquering challenging off-road terrain with confidence and sophistication.",
        performance: "The refined 3.0-liter turbocharged inline-six engine produces 395 horsepower, providing effortless acceleration and impressive towing capability. The sophisticated Terrain Response 2 system automatically adapts to various driving conditions, while the air suspension provides both comfort and capability.",
        luxury: "The cabin showcases the finest British craftsmanship, with Windsor leather seating and genuine wood veneers creating an atmosphere of refined elegance. Heated and cooled seats with massage functions ensure comfort during long journeys, while the premium Meridian sound system delivers audiophile-quality sound reproduction.",
        technology: "The latest Pivi Pro infotainment system features intuitive operation and lightning-fast response times. Advanced off-road technologies including Wade Sensing and All-Terrain Progress Control ensure capability in the most challenging conditions.",
        exclusivity: "Presented in sophisticated Santorini Black with luxurious tan leather interior, this Range Rover Sport exemplifies British luxury. The attention to detail is evident throughout, from the illuminated treadplates to the configurable ambient lighting system."
      }
    };

    return descriptions[vehicle.name as keyof typeof descriptions] || {
      overview: vehicle.description,
      performance: "Exceptional engineering and performance characteristics define this remarkable vehicle.",
      luxury: "Premium materials and meticulous attention to detail create an unparalleled luxury experience.",
      technology: "Advanced technology systems ensure safety, convenience, and entertainment.",
      exclusivity: "This vehicle represents the pinnacle of automotive excellence and exclusivity."
    };
  };

  const getVehicleFeatures = (vehicle: CarType) => {
    const baseFeatures = [
      "Premium Sound System",
      "Advanced Safety Package",
      "Navigation System",
      "Heated Seats",
      "Leather Interior",
      "Keyless Entry",
      "Bluetooth Connectivity",
      "Backup Camera"
    ];

    const brandSpecificFeatures = {
      "BMW": ["M Performance Package", "BMW ConnectedDrive", "Gesture Control", "Driving Assistant Plus"],
      "Mercedes-Benz": ["MBUX System", "Air Body Control", "Burmester Audio", "Magic Vision Control"],
      "Porsche": ["Sport Chrono Package", "Porsche Communication Management", "Active Suspension", "Ceramic Brakes"],
      "Tesla": ["Autopilot", "Supercharging", "Over-the-Air Updates", "Dog Mode"],
      "Land Rover": ["Terrain Response", "Wade Sensing", "Air Suspension", "Meridian Audio"]
    };

    return [...baseFeatures, ...(brandSpecificFeatures[vehicle.brand as keyof typeof brandSpecificFeatures] || [])];
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-ocean-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading vehicle details...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!vehicle) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Vehicle Not Found</h1>
            <p className="text-gray-600 mb-6">The requested vehicle could not be found.</p>
            <Link to="/inventory">
              <Button className="bg-gradient-to-r from-ocean-500 to-forest-500">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Inventory
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const enhancedDesc = getEnhancedDescription(vehicle);
  const features = getVehicleFeatures(vehicle);

  return (
    <Layout>
      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-ocean-600 hover:text-ocean-700">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/inventory" className="text-ocean-600 hover:text-ocean-700">Inventory</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{vehicle.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section with Image Gallery */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative group">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100">
                  <img
                    src={vehicle.images[currentImageIndex]}
                    alt={vehicle.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg';
                    }}
                  />
                  
                  {/* Image Navigation */}
                  {vehicle.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                      >
                        <ChevronLeft className="h-5 w-5 text-gray-800" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
                      >
                        <ChevronRight className="h-5 w-5 text-gray-800" />
                      </button>
                    </>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-6 left-6">
                    <Badge className={`${
                      vehicle.status === 'available' 
                        ? 'bg-green-500 hover:bg-green-600' 
                        : vehicle.status === 'pending'
                        ? 'bg-yellow-500 hover:bg-yellow-600'
                        : 'bg-red-500 hover:bg-red-600'
                    } text-white font-bold px-4 py-2 text-sm`}>
                      {vehicle.status === 'available' ? 'Available Now' : 
                       vehicle.status === 'pending' ? 'Sale Pending' : 'Sold'}
                    </Badge>
                  </div>

                  {/* Action Buttons */}
                  <div className="absolute top-6 right-6 flex gap-2">
                    <button
                      onClick={toggleFavorite}
                      className={`bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 ${
                        isFavorite ? 'text-red-500' : 'text-gray-600'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                    </button>
                    <button className="bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all duration-300 text-gray-600">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Image Counter */}
                  {vehicle.images.length > 1 && (
                    <div className="absolute bottom-6 right-6 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                      {currentImageIndex + 1} / {vehicle.images.length}
                    </div>
                  )}
                </div>

                {/* Thumbnail Navigation */}
                {vehicle.images.length > 1 && (
                  <div className="flex gap-2 mt-4">
                    {vehicle.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'border-ocean-500 opacity-100' 
                            : 'border-gray-200 opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${vehicle.name} view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Vehicle Information */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <Badge className="bg-gradient-to-r from-gold-500 to-sunset-500 text-white font-bold px-3 py-1">
                    {vehicle.featured ? 'Featured' : 'Premium'}
                  </Badge>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                    ))}
                    <span className="text-sm text-gray-600 ml-2">(4.9/5 rating)</span>
                  </div>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  {vehicle.name}
                </h1>
                
                <div className="flex items-center justify-between">
                  <div className="text-4xl font-bold bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent">
                    ${vehicle.price.toLocaleString()}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {vehicle.year}
                    </div>
                    <div className="flex items-center gap-1">
                      <Gauge className="h-4 w-4" />
                      {vehicle.mileage.toLocaleString()} miles
                    </div>
                    <div className="flex items-center gap-1">
                      <Fuel className="h-4 w-4" />
                      {vehicle.fuel}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Specs */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gradient-to-br from-ocean-50 to-ocean-100 border-ocean-200">
                  <CardContent className="p-4 text-center">
                    <Zap className="h-8 w-8 text-ocean-600 mx-auto mb-2" />
                    <div className="font-bold text-lg text-ocean-700">{vehicle.specifications.horsepower}</div>
                    <div className="text-sm text-ocean-600">Power Output</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-forest-50 to-forest-100 border-forest-200">
                  <CardContent className="p-4 text-center">
                    <Settings className="h-8 w-8 text-forest-600 mx-auto mb-2" />
                    <div className="font-bold text-lg text-forest-700">{vehicle.specifications.engine}</div>
                    <div className="text-sm text-forest-600">Engine Type</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-sunset-50 to-sunset-100 border-sunset-200">
                  <CardContent className="p-4 text-center">
                    <Fuel className="h-8 w-8 text-sunset-600 mx-auto mb-2" />
                    <div className="font-bold text-lg text-sunset-700">{vehicle.specifications.mpg}</div>
                    <div className="text-sm text-sunset-600">Fuel Economy</div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-gold-50 to-gold-100 border-gold-200">
                  <CardContent className="p-4 text-center">
                    <Car className="h-8 w-8 text-gold-600 mx-auto mb-2" />
                    <div className="font-bold text-lg text-gold-700">{vehicle.specifications.drivetrain}</div>
                    <div className="text-sm text-gold-600">Drivetrain</div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link to="/contact">
                  <Button className="w-full bg-gradient-to-r from-ocean-500 to-forest-500 hover:from-ocean-600 hover:to-forest-600 text-white font-bold py-4 rounded-xl text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <MessageSquare className="h-5 w-5 mr-2" />
                    Schedule Test Drive
                  </Button>
                </Link>
                
                <Link to="/financing">
                  <Button 
                    variant="outline"
                    className="w-full border-2 border-sunset-500 text-sunset-600 hover:bg-sunset-500 hover:text-white font-bold py-4 rounded-xl text-lg transition-all duration-300"
                  >
                    <DollarSign className="h-5 w-5 mr-2" />
                    Get Financing
                  </Button>
                </Link>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-to-r from-gray-50 to-ocean-50 rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-800">Need More Information?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <a href="tel:+15551234567" className="flex items-center gap-3 text-ocean-600 hover:text-ocean-700 transition-colors">
                    <Phone className="h-5 w-5" />
                    <span className="font-medium">(555) 123-4567</span>
                  </a>
                  <a href="mailto:info@alpinemotors.com" className="flex items-center gap-3 text-ocean-600 hover:text-ocean-700 transition-colors">
                    <Mail className="h-5 w-5" />
                    <span className="font-medium">Email Specialist</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Information Tabs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-5 bg-white rounded-2xl p-2 shadow-lg">
              <TabsTrigger value="overview" className="rounded-xl">Overview</TabsTrigger>
              <TabsTrigger value="performance" className="rounded-xl">Performance</TabsTrigger>
              <TabsTrigger value="luxury" className="rounded-xl">Luxury</TabsTrigger>
              <TabsTrigger value="technology" className="rounded-xl">Technology</TabsTrigger>
              <TabsTrigger value="specifications" className="rounded-xl">Specifications</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="bg-white shadow-xl rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Crown className="h-8 w-8 text-gold-500" />
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent">
                      Vehicle Overview
                    </h2>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    {enhancedDesc.overview}
                  </p>
                  <div className="bg-gradient-to-r from-ocean-50 to-forest-50 rounded-2xl p-6">
                    <h3 className="font-bold text-xl mb-4 text-gray-800">Exclusivity Statement</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {enhancedDesc.exclusivity}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <Card className="bg-white shadow-xl rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp className="h-8 w-8 text-sunset-500" />
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-sunset-600 to-gold-600 bg-clip-text text-transparent">
                      Performance Excellence
                    </h2>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    {enhancedDesc.performance}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-sunset-50 to-sunset-100 rounded-2xl p-6 text-center">
                      <Zap className="h-12 w-12 text-sunset-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-sunset-700 mb-1">{vehicle.specifications.horsepower}</div>
                      <div className="text-sunset-600 font-medium">Maximum Power</div>
                    </div>
                    <div className="bg-gradient-to-br from-gold-50 to-gold-100 rounded-2xl p-6 text-center">
                      <Gauge className="h-12 w-12 text-gold-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-gold-700 mb-1">{vehicle.specifications.drivetrain}</div>
                      <div className="text-gold-600 font-medium">Drive System</div>
                    </div>
                    <div className="bg-gradient-to-br from-forest-50 to-forest-100 rounded-2xl p-6 text-center">
                      <Fuel className="h-12 w-12 text-forest-600 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-forest-700 mb-1">{vehicle.specifications.mpg}</div>
                      <div className="text-forest-600 font-medium">Efficiency</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="luxury" className="space-y-6">
              <Card className="bg-white shadow-xl rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="h-8 w-8 text-gold-500" />
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-gold-600 to-sunset-600 bg-clip-text text-transparent">
                      Luxury & Comfort
                    </h2>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    {enhancedDesc.luxury}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-bold text-xl text-gray-800 mb-4">Interior Features</h3>
                      <div className="space-y-3">
                        {features.slice(0, 6).map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gold-50 to-sunset-50 rounded-2xl p-6">
                      <h4 className="font-bold text-lg text-gray-800 mb-4">Color Combination</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">Exterior</span>
                          <span className="font-medium text-gray-800">{vehicle.specifications.color}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-700">Interior</span>
                          <span className="font-medium text-gray-800">{vehicle.specifications.interior}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="technology" className="space-y-6">
              <Card className="bg-white shadow-xl rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Shield className="h-8 w-8 text-ocean-500" />
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent">
                      Advanced Technology
                    </h2>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed mb-8">
                    {enhancedDesc.technology}
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-bold text-xl text-gray-800 mb-4">Technology Features</h3>
                      <div className="space-y-3">
                        {features.slice(6).map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle className="h-5 w-5 text-blue-500" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-ocean-50 to-forest-50 rounded-2xl p-6">
                      <h4 className="font-bold text-lg text-gray-800 mb-4">Safety Rating</h4>
                      <div className="flex items-center gap-2 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-6 w-6 fill-gold-400 text-gold-400" />
                        ))}
                        <span className="font-bold text-xl text-gray-800 ml-2">5.0</span>
                      </div>
                      <p className="text-gray-600 text-sm">NHTSA Overall Safety Rating</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="space-y-6">
              <Card className="bg-white shadow-xl rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <Settings className="h-8 w-8 text-forest-500" />
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-forest-600 to-ocean-600 bg-clip-text text-transparent">
                      Technical Specifications
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-bold text-xl text-gray-800 mb-4">Engine & Performance</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600">Engine</span>
                            <span className="font-medium text-gray-800">{vehicle.specifications.engine}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600">Horsepower</span>
                            <span className="font-medium text-gray-800">{vehicle.specifications.horsepower}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600">Drivetrain</span>
                            <span className="font-medium text-gray-800">{vehicle.specifications.drivetrain}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600">Transmission</span>
                            <span className="font-medium text-gray-800">{vehicle.transmission}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600">Fuel Economy</span>
                            <span className="font-medium text-gray-800">{vehicle.specifications.mpg}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-bold text-xl text-gray-800 mb-4">Vehicle Details</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600">Year</span>
                            <span className="font-medium text-gray-800">{vehicle.year}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600">Mileage</span>
                            <span className="font-medium text-gray-800">{vehicle.mileage.toLocaleString()} miles</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600">Exterior Color</span>
                            <span className="font-medium text-gray-800">{vehicle.specifications.color}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600">Interior</span>
                            <span className="font-medium text-gray-800">{vehicle.specifications.interior}</span>
                          </div>
                          <div className="flex justify-between border-b border-gray-200 pb-2">
                            <span className="text-gray-600">Fuel Type</span>
                            <span className="font-medium text-gray-800">{vehicle.fuel}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Related Vehicles */}
      {relatedVehicles.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent mb-4">
                Similar Vehicles
              </h2>
              <p className="text-xl text-gray-600">
                Explore other exceptional vehicles in this category
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedVehicles.map((relatedVehicle) => (
                <Link key={relatedVehicle.id} to={`/vehicle/${relatedVehicle.id}`}>
                  <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white rounded-2xl">
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img
                        src={relatedVehicle.images[0]}
                        alt={relatedVehicle.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-ocean-600 transition-colors">
                        {relatedVehicle.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-ocean-600">
                          ${relatedVehicle.price.toLocaleString()}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          {relatedVehicle.year}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-ocean-600 via-forest-600 to-sunset-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience This Vehicle?
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Contact our expert team to schedule a test drive or get more information about financing options.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-white text-ocean-600 hover:bg-gray-100 font-bold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Schedule Test Drive
              </Button>
            </Link>
            <Link to="/financing">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-ocean-600 font-bold px-8 py-4 rounded-2xl transition-all duration-300"
              >
                <DollarSign className="h-5 w-5 mr-2" />
                Get Financing Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
