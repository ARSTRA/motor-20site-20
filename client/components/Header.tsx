import { Link } from "react-router-dom";
import { Search, Menu, Phone, Mail, MapPin, Clock, User, LogOut, Settings, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

// SVG Logo Component with Natural Mountain & Road Theme
const PremiumAutoLogo = () => (
  <div className="flex items-center gap-3">
    <div className="relative">
      {/* Mountain and road inspired logo */}
      <svg width="48" height="48" viewBox="0 0 48 48" className="relative z-10">
        {/* Background circle with gradient */}
        <defs>
          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#166534" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
        </defs>
        
        {/* Main background circle */}
        <circle cx="24" cy="24" r="22" fill="url(#logoGradient)" />
        
        {/* Mountain silhouette */}
        <path d="M8 28 L16 18 L24 22 L32 16 L40 26 L40 36 L8 36 Z" fill="url(#mountainGradient)" opacity="0.9" />
        
        {/* Road/path */}
        <path d="M8 32 Q16 30 24 32 Q32 34 40 32 L40 36 L8 36 Z" fill="#fbbf24" opacity="0.8" />
        
        {/* Car silhouette */}
        <g transform="translate(20, 25) scale(0.5)">
          <rect x="0" y="4" width="16" height="6" rx="2" fill="white" opacity="0.9" />
          <rect x="2" y="2" width="12" height="4" rx="1" fill="white" opacity="0.7" />
          <circle cx="3" cy="10" r="1.5" fill="white" />
          <circle cx="13" cy="10" r="1.5" fill="white" />
        </g>
        
        {/* Shine effect */}
        <circle cx="24" cy="24" r="22" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
      </svg>
    </div>
    <div>
      <h1 className="text-2xl font-bold bg-gradient-to-r from-ocean-600 via-forest-600 to-sunset-600 bg-clip-text text-transparent">
        Alpine Motors
      </h1>
      <p className="text-sm text-forest-600 font-medium">Where Luxury Meets Adventure</p>
    </div>
  </div>
);

export default function Header() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-xl sticky top-0 z-50 border-b-4 border-gradient-to-r from-ocean-500 via-forest-500 to-sunset-500">
      {/* Top contact bar with gradient */}
      <div className="bg-gradient-to-r from-ocean-700 via-forest-700 to-sunset-700 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 hover:text-gold-300 transition-colors">
              <Phone className="h-4 w-4" />
              <span className="font-medium">(555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2 hover:text-gold-300 transition-colors">
              <Mail className="h-4 w-4" />
              <span className="font-medium">info@alpinemotors.com</span>
            </div>
            <div className="hidden lg:flex items-center gap-2 hover:text-gold-300 transition-colors">
              <MapPin className="h-4 w-4" />
              <span className="font-medium">123 Alpine Way, Mountain View, CA</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="font-medium">Mon-Fri: 8AM-8PM | Sat-Sun: 9AM-7PM</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="hover:scale-105 transition-transform duration-300">
            <PremiumAutoLogo />
          </Link>

          {/* Search bar with enhanced styling */}
          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-forest-500" />
              <Input 
                placeholder="Search luxury vehicles, brands, models..."
                className="pl-12 h-12 border-2 border-ocean-200 focus:border-forest-500 focus:ring-forest-500 rounded-xl bg-gradient-to-r from-white to-ocean-50"
              />
            </div>
          </div>

          {/* Navigation with enhanced styling */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-ocean-600 transition-colors font-medium relative group"
            >
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-ocean-500 to-forest-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/inventory" 
              className="text-gray-700 hover:text-ocean-600 transition-colors font-medium relative group"
            >
              Inventory
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-ocean-500 to-forest-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/financing" 
              className="text-gray-700 hover:text-ocean-600 transition-colors font-medium relative group"
            >
              Financing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-ocean-500 to-forest-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/contact" 
              className="text-gray-700 hover:text-ocean-600 transition-colors font-medium relative group"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-ocean-500 to-forest-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              to="/admin" 
              className="text-gray-700 hover:text-ocean-600 transition-colors font-medium relative group"
            >
              Admin
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-ocean-500 to-forest-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* CTA Buttons with gradient styling */}
          <div className="flex items-center gap-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-3 border-2 border-ocean-500 text-ocean-600 hover:bg-ocean-500 hover:text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300"
                  >
                    <User className="h-5 w-5" />
                    <span className="hidden md:block">{user.firstName}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-white shadow-xl border-2 border-gray-100 rounded-2xl p-2">
                  <div className="px-3 py-2 border-b border-gray-100 mb-2">
                    <p className="font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-ocean-50 cursor-pointer">
                      <User className="h-4 w-4 text-ocean-600" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-forest-50 cursor-pointer">
                      <Settings className="h-4 w-4 text-forest-600" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/inventory" className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-sunset-50 cursor-pointer">
                      <Car className="h-4 w-4 text-sunset-600" />
                      My Vehicles
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50 cursor-pointer text-red-600"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="outline"
                    className="hidden sm:flex border-2 border-ocean-500 text-ocean-600 hover:bg-ocean-500 hover:text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    className="hidden md:flex bg-gradient-to-r from-ocean-500 to-forest-500 hover:from-ocean-600 hover:to-forest-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    Get Started
                  </Button>
                </Link>
              </>
            )}
            <Button variant="ghost" size="icon" className="lg:hidden hover:bg-ocean-100 rounded-xl">
              <Menu className="h-6 w-6 text-ocean-600" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
