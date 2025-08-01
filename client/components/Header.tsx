import { Link } from "react-router-dom";
import {
  Search,
  Menu,
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  LogOut,
  Settings,
  Car,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";

// Professional Alpine Motors Logo with Luxury Automotive Theme
const PremiumAutoLogo = () => (
  <div className="flex items-center gap-4 group hover:scale-105 transition-all duration-300">
    <div className="relative">
      {/* Professional Logo Container with Background Image */}
      <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 hover:border-white/40 transition-all duration-300">
        {/* Luxury Car Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-ocean-600/80 via-forest-600/70 to-sunset-600/80"></div>
        </div>

        {/* Professional Alpine Motors Logo SVG */}
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          className="relative z-10"
        >
          <defs>
            <linearGradient
              id="alpineGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="30%" stopColor="#22c55e" />
              <stop offset="60%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#facc15" />
            </linearGradient>
            <linearGradient
              id="mountainGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#1f2937" />
              <stop offset="50%" stopColor="#374151" />
              <stop offset="100%" stopColor="#4b5563" />
            </linearGradient>
            <linearGradient
              id="carGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#f8fafc" />
              <stop offset="100%" stopColor="#e2e8f0" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Alpine Mountain Range - Enhanced */}
          <path
            d="M4 36 L12 24 L20 28 L28 20 L36 26 L44 18 L52 24 L60 32 L60 48 L4 48 Z"
            fill="url(#mountainGradient)"
            opacity="0.9"
            filter="url(#glow)"
          />

          {/* Second Mountain Layer for Depth */}
          <path
            d="M8 40 L16 32 L24 36 L32 28 L40 34 L48 26 L56 32 L60 38 L60 48 L8 48 Z"
            fill="url(#mountainGradient)"
            opacity="0.6"
          />

          {/* Luxury Road/Path - Enhanced */}
          <path
            d="M4 42 Q16 40 32 42 Q48 44 60 42 L60 48 L4 48 Z"
            fill="url(#alpineGradient)"
            opacity="0.9"
          />

          {/* Road Center Line */}
          <path
            d="M4 45 Q16 43 32 45 Q48 47 60 45"
            stroke="#ffffff"
            strokeWidth="1"
            fill="none"
            opacity="0.8"
            strokeDasharray="3,2"
          />

          {/* Premium Luxury Car Silhouette - Enhanced */}
          <g transform="translate(24, 30) scale(0.8)" filter="url(#glow)">
            {/* Car Body */}
            <path
              d="M2 8 L4 6 L12 6 L14 8 L18 8 L18 12 L16 12 L16 14 L14 14 L14 12 L4 12 L4 14 L2 14 L2 12 L0 12 L0 8 Z"
              fill="url(#carGradient)"
            />
            {/* Car Windows */}
            <path
              d="M5 6 L6 5 L10 5 L11 6 L11 8 L5 8 Z"
              fill="#1e293b"
              opacity="0.7"
            />
            {/* Car Wheels */}
            <circle cx="4" cy="12" r="2" fill="#1f2937" />
            <circle cx="14" cy="12" r="2" fill="#1f2937" />
            <circle cx="4" cy="12" r="1" fill="#6b7280" />
            <circle cx="14" cy="12" r="1" fill="#6b7280" />
            {/* Car Details */}
            <rect
              x="7"
              y="9"
              width="4"
              height="1"
              fill="#1e293b"
              opacity="0.5"
            />
          </g>

          {/* Alpine "A" Monogram in Center */}
          <g transform="translate(28, 20)" filter="url(#glow)">
            <path
              d="M4 0 L8 12 L6 12 L5.5 10 L2.5 10 L2 12 L0 12 L4 0 Z M3.5 8 L4.5 8 L4 6 Z"
              fill="#ffffff"
              opacity="0.9"
            />
          </g>

          {/* Luxury Brand Elements - Decorative Corners */}
          <g opacity="0.6">
            <path
              d="M8 8 L12 8 L12 10 L10 10 L10 12 L8 12 Z"
              fill="url(#alpineGradient)"
            />
            <path
              d="M52 8 L56 8 L56 12 L54 12 L54 10 L52 10 Z"
              fill="url(#alpineGradient)"
            />
          </g>

          {/* Professional Shine Effects */}
          <circle
            cx="32"
            cy="32"
            r="30"
            fill="none"
            stroke="url(#alpineGradient)"
            strokeWidth="1"
            opacity="0.4"
          />
          <circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke="#ffffff"
            strokeWidth="0.5"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Floating Animation Elements */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-gold-400 to-sunset-400 rounded-full animate-pulse opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-r from-ocean-400 to-forest-400 rounded-full animate-pulse [animation-delay:0.5s] opacity-60 group-hover:opacity-90 transition-opacity duration-300"></div>
    </div>

    <div className="flex flex-col">
      {/* Brand Name with Professional Typography */}
      <h1 className="text-2xl sm:text-3xl font-bold leading-tight tracking-tight">
        <span className="bg-gradient-to-r from-ocean-600 via-forest-600 to-sunset-600 bg-clip-text text-transparent hover:from-ocean-500 hover:via-forest-500 hover:to-sunset-500 transition-all duration-300">
          Alpine
        </span>
        <span className="ml-1 bg-gradient-to-r from-sunset-600 via-gold-600 to-ocean-600 bg-clip-text text-transparent hover:from-sunset-500 hover:via-gold-500 hover:to-ocean-500 transition-all duration-300">
          Motors
        </span>
      </h1>

      {/* Professional Tagline with Enhanced Styling */}
      <p className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-forest-600 transition-colors duration-300 tracking-wide">
        <span className="inline-flex items-center gap-1">
          <span className="w-1.5 h-1.5 bg-gradient-to-r from-gold-400 to-sunset-400 rounded-full animate-pulse"></span>
          Where Luxury Meets Adventure
          <span className="w-1.5 h-1.5 bg-gradient-to-r from-ocean-400 to-forest-400 rounded-full animate-pulse [animation-delay:0.5s]"></span>
        </span>
      </p>

      {/* Subtle Brand Accent Line */}
      <div className="mt-1 h-0.5 w-full bg-gradient-to-r from-ocean-300 via-forest-300 to-sunset-300 rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-300"></div>
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
              <span className="font-medium">
                123 Alpine Way, Mountain View, CA
              </span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span className="font-medium">
              Mon-Fri: 8AM-8PM | Sat-Sun: 9AM-7PM
            </span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="hover:scale-105 transition-transform duration-300"
          >
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
              to="/about"
              className="text-gray-700 hover:text-ocean-600 transition-colors font-medium relative group"
            >
              About
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
              to="/trade-in"
              className="text-gray-700 hover:text-ocean-600 transition-colors font-medium relative group"
            >
              Trade-In
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
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-white shadow-xl border-2 border-gray-100 rounded-2xl p-2"
                >
                  <div className="px-3 py-2 border-b border-gray-100 mb-2">
                    <p className="font-semibold text-gray-900">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-ocean-50 cursor-pointer"
                    >
                      <User className="h-4 w-4 text-ocean-600" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-forest-50 cursor-pointer"
                    >
                      <Settings className="h-4 w-4 text-forest-600" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/inventory"
                      className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-sunset-50 cursor-pointer"
                    >
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
                  <Button className="hidden md:flex bg-gradient-to-r from-ocean-500 to-forest-500 hover:from-ocean-600 hover:to-forest-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    Get Started
                  </Button>
                </Link>

              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden hover:bg-ocean-100 rounded-xl"
            >
              <Menu className="h-6 w-6 text-ocean-600" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
