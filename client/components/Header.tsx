import { Link } from "react-router-dom";
import { Car, Search, Menu, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Header() {
  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top contact bar */}
      <div className="bg-automotive-700 text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>info@premiumautos.com</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>Mon-Fri: 9AM-8PM | Sat-Sun: 10AM-6PM</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-primary p-2 rounded-lg">
              <Car className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Premium Autos</h1>
              <p className="text-sm text-gray-600">Luxury Car Dealership</p>
            </div>
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex items-center gap-4 flex-1 max-w-md mx-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search cars, brands, models..."
                className="pl-10"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/inventory" className="text-gray-700 hover:text-primary transition-colors">
              Inventory
            </Link>
            <Link to="/financing" className="text-gray-700 hover:text-primary transition-colors">
              Financing
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">
              Contact
            </Link>
            <Link to="/admin" className="text-gray-700 hover:text-primary transition-colors">
              Admin
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <Button className="hidden md:flex">
              Get Quote
            </Button>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
