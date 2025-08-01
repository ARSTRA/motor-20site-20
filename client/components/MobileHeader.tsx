import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Menu,
  X,
  Phone,
  Mail,
  User,
  LogOut,
  Settings,
  Car,
  ShoppingCart,
  Home,
  Package,
  Info,
  CreditCard,
  MessageSquare,
  ArrowRightLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

// Compact Mobile Logo
const MobileLogo = () => (
  <div className="flex items-center gap-3 group">
    <div className="relative">
      <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl overflow-hidden shadow-lg border border-white/20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-ocean-600/80 via-forest-600/70 to-sunset-600/80"></div>
        </div>

        <svg
          width="100%"
          height="100%"
          viewBox="0 0 64 64"
          className="relative z-10"
        >
          <defs>
            <linearGradient
              id="alpineMobileGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="50%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
          </defs>

          {/* Mountain silhouette */}
          <path
            d="M8 40 L16 28 L24 32 L32 24 L40 30 L48 22 L56 28 L56 48 L8 48 Z"
            fill="url(#alpineMobileGradient)"
            opacity="0.9"
          />

          {/* Road */}
          <path
            d="M8 42 Q24 40 40 42 Q48 44 56 42"
            stroke="#ffffff"
            strokeWidth="2"
            fill="none"
            opacity="0.8"
          />

          {/* Simple "A" */}
          <path
            d="M28 18 L36 18 L38 24 L34 24 L33 22 L31 22 L30 24 L26 24 Z M30.5 20 L33.5 20 L32 18.5 Z"
            fill="#ffffff"
            opacity="0.9"
          />
        </svg>
      </div>
    </div>

    <div className="flex flex-col">
      <h1 className="text-lg md:text-2xl font-bold leading-tight">
        <span className="bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent">
          Alpine
        </span>
        <span className="ml-1 bg-gradient-to-r from-sunset-600 to-gold-600 bg-clip-text text-transparent">
          Motors
        </span>
      </h1>
      <p className="text-xs text-gray-600 font-medium hidden sm:block">
        Luxury & Adventure
      </p>
    </div>
  </div>
);

// Mobile Navigation Menu
const MobileNav = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { user, logout } = useAuth();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Package, label: "Inventory", path: "/inventory" },
    { icon: Info, label: "About", path: "/about" },
    { icon: CreditCard, label: "Financing", path: "/financing" },
    { icon: MessageSquare, label: "Contact", path: "/contact" },
    { icon: ArrowRightLeft, label: "Trade-In", path: "/trade-in" },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-ocean-600 via-forest-600 to-sunset-600 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Menu</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {user ? (
            <div className="flex items-center gap-3 bg-white/10 rounded-xl p-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <User className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold">
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-xs opacity-80">{user.email}</div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Navigation Items */}
        <div className="p-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-ocean-100 to-forest-100 rounded-xl flex items-center justify-center group-hover:from-ocean-200 group-hover:to-forest-200 transition-colors">
                <item.icon className="h-5 w-5 text-ocean-600" />
              </div>
              <span className="font-medium text-gray-700 group-hover:text-ocean-600">
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        {/* User Actions */}
        {user ? (
          <div className="border-t border-gray-100 p-6 space-y-2">
            <Link
              to="/dashboard"
              onClick={onClose}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Settings className="h-5 w-5 text-gray-500" />
              <span className="font-medium text-gray-700">Dashboard</span>
            </Link>
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="flex items-center gap-4 p-4 rounded-xl hover:bg-red-50 transition-colors w-full text-left"
            >
              <LogOut className="h-5 w-5 text-red-500" />
              <span className="font-medium text-red-600">Sign Out</span>
            </button>
          </div>
        ) : (
          <div className="border-t border-gray-100 p-6 space-y-3">
            <Link to="/login" onClick={onClose}>
              <Button className="w-full bg-gradient-to-r from-ocean-500 to-forest-500 hover:from-ocean-600 hover:to-forest-600 text-white font-semibold rounded-xl">
                Sign In
              </Button>
            </Link>
            <Link to="/register" onClick={onClose}>
              <Button
                variant="outline"
                className="w-full border-2 border-ocean-500 text-ocean-600 hover:bg-ocean-50 font-semibold rounded-xl"
              >
                Get Started
              </Button>
            </Link>
          </div>
        )}

        {/* Contact Info */}
        <div className="border-t border-gray-100 p-6 bg-gray-50">
          <h3 className="font-semibold text-gray-800 mb-3">Contact Us</h3>
          <div className="space-y-2 text-sm">
            <a
              href="tel:+15551234567"
              className="flex items-center gap-3 text-gray-600 hover:text-ocean-600"
            >
              <Phone className="h-4 w-4" />
              (555) 123-4567
            </a>
            <a
              href="mailto:info@alpinemotors.com"
              className="flex items-center gap-3 text-gray-600 hover:text-ocean-600"
            >
              <Mail className="h-4 w-4" />
              info@alpinemotors.com
            </a>
          </div>
          <div className="mt-4 text-xs text-gray-500">
            Mon-Fri: 8AM-8PM | Sat-Sun: 9AM-7PM
          </div>
        </div>
      </div>
    </div>
  );
};

export default function MobileHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user } = useAuth();
  const { getTotalItems } = useCart();

  return (
    <>
      {/* Compact Mobile Header */}
      <header className="bg-white shadow-lg sticky top-0 z-40 border-b border-gray-200">
        {/* Top contact bar - only on desktop */}
        <div className="hidden md:block bg-gradient-to-r from-ocean-700 via-forest-700 to-sunset-700 text-white py-2 px-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <a
                href="tel:+15551234567"
                className="flex items-center gap-2 hover:text-gold-300 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>(555) 123-4567</span>
              </a>
              <a
                href="mailto:info@alpinemotors.com"
                className="flex items-center gap-2 hover:text-gold-300 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>info@alpinemotors.com</span>
              </a>
            </div>
            <div className="text-xs">Mon-Fri: 8AM-8PM | Sat-Sun: 9AM-7PM</div>
          </div>
        </div>

        {/* Main header */}
        <div className="px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <MobileLogo />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <Link
                to="/"
                className="text-gray-700 hover:text-ocean-600 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/inventory"
                className="text-gray-700 hover:text-ocean-600 font-medium transition-colors"
              >
                Inventory
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-ocean-600 font-medium transition-colors"
              >
                About
              </Link>
              <Link
                to="/financing"
                className="text-gray-700 hover:text-ocean-600 font-medium transition-colors"
              >
                Financing
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-ocean-600 font-medium transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Search Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hover:bg-ocean-50 rounded-xl md:hidden"
              >
                <Search className="h-5 w-5 text-ocean-600" />
              </Button>

              {/* Desktop Search */}
              <div className="hidden md:flex items-center relative">
                <Search className="absolute left-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search vehicles..."
                  className="pl-10 w-64 lg:w-80 border-gray-200 focus:border-ocean-500 rounded-xl"
                />
              </div>

              {/* Cart */}
              <Link to="/cart" className="relative">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-sunset-500 text-sunset-600 hover:bg-sunset-50 rounded-xl relative"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-gold-500 to-sunset-500 text-white text-xs flex items-center justify-center p-0 animate-pulse">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* User/Menu Button */}
              {user ? (
                <Button
                  variant="outline"
                  className="hidden md:flex items-center gap-2 border-ocean-500 text-ocean-600 hover:bg-ocean-50 rounded-xl"
                >
                  <User className="h-4 w-4" />
                  <span className="font-medium">{user.firstName}</span>
                </Button>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="border-ocean-500 text-ocean-600 hover:bg-ocean-50 rounded-xl"
                    >
                      Sign In
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(true)}
                className="lg:hidden hover:bg-ocean-50 rounded-xl"
              >
                <Menu className="h-6 w-6 text-ocean-600" />
              </Button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="mt-3 md:hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search luxury vehicles, brands, models..."
                  className="pl-10 pr-10 h-12 border-2 border-ocean-200 focus:border-ocean-500 rounded-xl bg-gray-50"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-lg"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}
