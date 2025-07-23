import { Link } from "react-router-dom";
import { Car, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary p-2 rounded-lg">
                <Car className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Premium Autos</h3>
                <p className="text-gray-400 text-sm">Luxury Car Dealership</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Your trusted partner for premium vehicles. We offer the finest selection 
              of luxury cars with exceptional service and competitive pricing.
            </p>
            <div className="flex gap-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Youtube className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/inventory" className="text-gray-400 hover:text-white transition-colors">View Inventory</Link></li>
              <li><Link to="/financing" className="text-gray-400 hover:text-white transition-colors">Financing</Link></li>
              <li><Link to="/trade-in" className="text-gray-400 hover:text-white transition-colors">Trade-In</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Vehicle Categories</h4>
            <ul className="space-y-2">
              <li><Link to="/category/suv" className="text-gray-400 hover:text-white transition-colors">SUVs</Link></li>
              <li><Link to="/category/sedan" className="text-gray-400 hover:text-white transition-colors">Sedans</Link></li>
              <li><Link to="/category/luxury" className="text-gray-400 hover:text-white transition-colors">Luxury Cars</Link></li>
              <li><Link to="/category/electric" className="text-gray-400 hover:text-white transition-colors">Electric Vehicles</Link></li>
              <li><Link to="/category/trucks" className="text-gray-400 hover:text-white transition-colors">Trucks</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-gray-400">123 Auto Plaza Drive</p>
                  <p className="text-gray-400">Los Angeles, CA 90210</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <p className="text-gray-400">(555) 123-4567</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <p className="text-gray-400">info@premiumautos.com</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-800 rounded-lg">
              <h5 className="font-semibold mb-1">Business Hours</h5>
              <p className="text-sm text-gray-400">Mon-Fri: 9AM-8PM</p>
              <p className="text-sm text-gray-400">Sat-Sun: 10AM-6PM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Premium Autos. All rights reserved. | 
            <Link to="/privacy" className="hover:text-white ml-1">Privacy Policy</Link> | 
            <Link to="/terms" className="hover:text-white ml-1">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
