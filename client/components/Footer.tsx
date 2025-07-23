import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, Clock, Star } from "lucide-react";

// Same logo component as header for consistency
const AlpineMotorsLogo = () => (
  <div className="flex items-center gap-3">
    <div className="relative">
      <svg width="40" height="40" viewBox="0 0 48 48" className="relative z-10">
        <defs>
          <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="50%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#f97316" />
          </linearGradient>
          <linearGradient id="footerMountainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#166534" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
        </defs>
        
        <circle cx="24" cy="24" r="20" fill="url(#footerLogoGradient)" />
        <path d="M8 26 L16 18 L24 22 L32 16 L40 24 L40 34 L8 34 Z" fill="url(#footerMountainGradient)" opacity="0.9" />
        <path d="M8 30 Q16 28 24 30 Q32 32 40 30 L40 34 L8 34 Z" fill="#fbbf24" opacity="0.8" />
        
        <g transform="translate(20, 23) scale(0.4)">
          <rect x="0" y="4" width="16" height="6" rx="2" fill="white" opacity="0.9" />
          <rect x="2" y="2" width="12" height="4" rx="1" fill="white" opacity="0.7" />
          <circle cx="3" cy="10" r="1.5" fill="white" />
          <circle cx="13" cy="10" r="1.5" fill="white" />
        </g>
        
        <circle cx="24" cy="24" r="20" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
      </svg>
    </div>
    <div>
      <h3 className="text-xl font-bold text-white">Alpine Motors</h3>
      <p className="text-gold-300 text-sm font-medium">Where Luxury Meets Adventure</p>
    </div>
  </div>
);

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-ocean-500 rounded-full blur-3xl"></div>
        <div className="absolute top-20 right-20 w-40 h-40 bg-forest-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 left-1/3 w-36 h-36 bg-sunset-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <AlpineMotorsLogo />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your premier destination for luxury vehicles where exceptional quality meets 
              unparalleled service. Experience the perfect blend of adventure and elegance 
              with our curated collection of premium automobiles.
            </p>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                ))}
              </div>
              <span className="text-gold-300 font-semibold">5.0 Rating</span>
              <span className="text-gray-400">• 2,500+ Reviews</span>
            </div>
            <div className="flex gap-4">
              <div className="p-2 bg-gradient-to-r from-ocean-500 to-ocean-600 rounded-lg hover:from-ocean-600 hover:to-ocean-700 transition-all cursor-pointer">
                <Facebook className="h-5 w-5" />
              </div>
              <div className="p-2 bg-gradient-to-r from-forest-500 to-forest-600 rounded-lg hover:from-forest-600 hover:to-forest-700 transition-all cursor-pointer">
                <Twitter className="h-5 w-5" />
              </div>
              <div className="p-2 bg-gradient-to-r from-sunset-500 to-sunset-600 rounded-lg hover:from-sunset-600 hover:to-sunset-700 transition-all cursor-pointer">
                <Instagram className="h-5 w-5" />
              </div>
              <div className="p-2 bg-gradient-to-r from-gold-500 to-gold-600 rounded-lg hover:from-gold-600 hover:to-gold-700 transition-all cursor-pointer">
                <Youtube className="h-5 w-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-gold-300 border-b border-gold-500/30 pb-2">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-ocean-400 transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-ocean-500 rounded-full mr-3 group-hover:bg-ocean-400 transition-colors"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/inventory" className="text-gray-300 hover:text-ocean-400 transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-forest-500 rounded-full mr-3 group-hover:bg-forest-400 transition-colors"></span>
                  View Inventory
                </Link>
              </li>
              <li>
                <Link to="/financing" className="text-gray-300 hover:text-ocean-400 transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-sunset-500 rounded-full mr-3 group-hover:bg-sunset-400 transition-colors"></span>
                  Financing Options
                </Link>
              </li>
              <li>
                <Link to="/trade-in" className="text-gray-300 hover:text-ocean-400 transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-gold-500 rounded-full mr-3 group-hover:bg-gold-400 transition-colors"></span>
                  Trade-In Program
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-ocean-400 transition-colors flex items-center group">
                  <span className="w-2 h-2 bg-ocean-500 rounded-full mr-3 group-hover:bg-ocean-400 transition-colors"></span>
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Vehicle Categories */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-gold-300 border-b border-gold-500/30 pb-2">Vehicle Collection</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/category/luxury-suv" className="text-gray-300 hover:text-forest-400 transition-colors flex items-center group">
                  <span className="text-lg mr-3">🚙</span>
                  Luxury SUVs
                </Link>
              </li>
              <li>
                <Link to="/category/luxury-sedan" className="text-gray-300 hover:text-forest-400 transition-colors flex items-center group">
                  <span className="text-lg mr-3">🚗</span>
                  Premium Sedans
                </Link>
              </li>
              <li>
                <Link to="/category/sports-car" className="text-gray-300 hover:text-forest-400 transition-colors flex items-center group">
                  <span className="text-lg mr-3">🏎️</span>
                  Sports Cars
                </Link>
              </li>
              <li>
                <Link to="/category/electric" className="text-gray-300 hover:text-forest-400 transition-colors flex items-center group">
                  <span className="text-lg mr-3">⚡</span>
                  Electric Vehicles
                </Link>
              </li>
              <li>
                <Link to="/category/convertibles" className="text-gray-300 hover:text-forest-400 transition-colors flex items-center group">
                  <span className="text-lg mr-3">🏖️</span>
                  Convertibles
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-gold-300 border-b border-gold-500/30 pb-2">Contact Information</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <MapPin className="h-5 w-5 text-sunset-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">Alpine Showroom</p>
                  <p className="text-gray-300 text-sm">123 Alpine Way</p>
                  <p className="text-gray-300 text-sm">Mountain View, CA 94041</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <Phone className="h-5 w-5 text-ocean-400 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">(555) 123-4567</p>
                  <p className="text-gray-300 text-sm">24/7 Sales Hotline</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <Mail className="h-5 w-5 text-forest-400 flex-shrink-0" />
                <div>
                  <p className="text-white font-medium">info@alpinemotors.com</p>
                  <p className="text-gray-300 text-sm">Customer Service</p>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-ocean-900/50 to-forest-900/50 rounded-xl border border-gold-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-gold-400" />
                  <h5 className="font-bold text-gold-300">Business Hours</h5>
                </div>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-300"><span className="text-white font-medium">Mon-Fri:</span> 8:00 AM - 8:00 PM</p>
                  <p className="text-gray-300"><span className="text-white font-medium">Saturday:</span> 9:00 AM - 7:00 PM</p>
                  <p className="text-gray-300"><span className="text-white font-medium">Sunday:</span> 10:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-center md:text-left">
              © 2024 Alpine Motors. All rights reserved. Crafted with excellence for luxury automotive experiences.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-gray-400 hover:text-gold-300 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-gold-300 transition-colors">
                Terms of Service
              </Link>
              <Link to="/accessibility" className="text-gray-400 hover:text-gold-300 transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
