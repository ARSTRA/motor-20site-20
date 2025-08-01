import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  ArrowLeft,
  CreditCard,
  Shield,
  Truck,
  Award,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/CartContext";
import OptimizedImage, {
  HIGH_QUALITY_AUTOMOTIVE_IMAGES,
} from "@/components/OptimizedImage";
import Layout from "@/components/Layout";

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();
  const tax = totalPrice * 0.0875; // 8.75% tax
  const shipping = totalPrice > 50000 ? 0 : 2500; // Free shipping over $50k
  const finalTotal = totalPrice + tax + shipping;

  if (cartItems.length === 0) {
    return (
      <Layout>
        <section className="py-24 bg-gradient-to-br from-gray-50 via-ocean-50 to-forest-50 min-h-screen flex items-center">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <div className="mb-8">
              <div className="w-32 h-32 bg-gradient-to-r from-ocean-500 to-forest-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                <ShoppingCart className="h-16 w-16 text-white" />
              </div>
            </div>

            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent">
              Your Cart is Empty
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover our premium collection of luxury vehicles and add your
              favorites to start building your dream garage.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/inventory">
                <Button className="bg-gradient-to-r from-ocean-500 to-forest-500 hover:from-ocean-600 hover:to-forest-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg">
                  Explore Vehicles
                </Button>
              </Link>
              <Link to="/">
                <Button
                  variant="outline"
                  className="border-2 border-sunset-500 text-sunset-600 hover:bg-sunset-500 hover:text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 text-lg"
                >
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative text-white py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-ocean-900/60 to-forest-900/70"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <Badge className="mb-6 bg-gradient-to-r from-gold-500/90 to-sunset-500/90 text-white border-white/30 px-6 py-3 text-lg font-semibold shadow-xl">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Premium Selection
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-white drop-shadow-2xl">Your Dream</span>
              <span className="bg-gradient-to-r from-gold-300 via-gold-400 to-sunset-400 bg-clip-text text-transparent block drop-shadow-lg">
                Collection
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              Review your selected premium vehicles and proceed to secure your
              luxury automotive experience.
            </p>

            <div className="flex items-center justify-center gap-8 text-lg">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4">
                <div className="w-12 h-12 bg-gradient-to-r from-gold-500 to-sunset-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">
                    {totalItems}
                  </span>
                </div>
                <div className="text-left">
                  <div className="text-gold-300 font-bold">Selected</div>
                  <div className="text-white">Vehicles</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Cart Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent">
                  Selected Vehicles ({totalItems})
                </h2>

                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="border-2 border-red-500 text-red-600 hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              </div>

              {cartItems.map((item) => (
                <Card
                  key={item.car.id}
                  className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-ocean-200"
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      {/* Vehicle Image */}
                      <div className="md:w-80 h-64 md:h-48 relative overflow-hidden">
                        <OptimizedImage
                          src={item.car.images[0]}
                          alt={item.car.name}
                          className="w-full h-full hover:scale-105 transition-transform duration-300"
                          width={600}
                          height={400}
                          fallback={
                            HIGH_QUALITY_AUTOMOTIVE_IMAGES.backgrounds.fallback
                          }
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                        {item.car.featured && (
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-gradient-to-r from-gold-500 to-gold-600 text-white font-bold">
                              Premium
                            </Badge>
                          </div>
                        )}
                      </div>

                      {/* Vehicle Details */}
                      <div className="flex-1 p-6">
                        <div className="flex flex-col h-full">
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                  {item.car.name}
                                </h3>
                                <Badge
                                  variant="secondary"
                                  className="bg-gradient-to-r from-forest-100 to-forest-200 text-forest-700 font-semibold mb-2"
                                >
                                  {item.car.category}
                                </Badge>
                                <p className="text-gray-600 text-sm">
                                  {item.car.year} • {item.car.fuel} •{" "}
                                  {item.car.mileage.toLocaleString()} miles
                                </p>
                              </div>

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.car.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center bg-gray-100 rounded-xl">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      updateQuantity(
                                        item.car.id,
                                        item.quantity - 1,
                                      )
                                    }
                                    className="p-2 hover:bg-gray-200 rounded-l-xl"
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <span className="px-4 py-2 font-bold text-lg">
                                    {item.quantity}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      updateQuantity(
                                        item.car.id,
                                        item.quantity + 1,
                                      )
                                    }
                                    className="p-2 hover:bg-gray-200 rounded-r-xl"
                                  >
                                    <Plus className="h-4 w-4" />
                                  </Button>
                                </div>

                                <div className="text-right">
                                  <div className="text-sm text-gray-500 mb-1">
                                    Price per unit
                                  </div>
                                  <div className="text-2xl font-bold bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent">
                                    ${item.car.price.toLocaleString()}
                                  </div>
                                </div>
                              </div>

                              <div className="text-right">
                                <div className="text-sm text-gray-500 mb-1">
                                  Subtotal
                                </div>
                                <div className="text-3xl font-bold bg-gradient-to-r from-sunset-600 to-gold-600 bg-clip-text text-transparent">
                                  $
                                  {(
                                    item.car.price * item.quantity
                                  ).toLocaleString()}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <Card className="overflow-hidden border-2 border-ocean-200 shadow-xl">
                  <CardContent className="p-0">
                    <div className="bg-gradient-to-r from-ocean-600 to-forest-600 text-white p-6">
                      <h3 className="text-2xl font-bold mb-2">Order Summary</h3>
                      <p className="text-ocean-100">Review your selection</p>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">
                          Subtotal ({totalItems} items)
                        </span>
                        <span className="font-bold text-lg">
                          ${totalPrice.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-gray-600">Tax (8.75%)</span>
                        <span className="font-bold text-lg">
                          ${tax.toLocaleString()}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-2 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">Delivery</span>
                          {shipping === 0 && (
                            <Badge className="bg-green-100 text-green-700 text-xs">
                              FREE
                            </Badge>
                          )}
                        </div>
                        <span className="font-bold text-lg">
                          {shipping === 0
                            ? "FREE"
                            : `$${shipping.toLocaleString()}`}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-4 border-t-2 border-ocean-200">
                        <span className="text-xl font-bold text-gray-900">
                          Total
                        </span>
                        <span className="text-3xl font-bold bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent">
                          ${finalTotal.toLocaleString()}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <Button className="w-full bg-gradient-to-r from-ocean-500 to-forest-500 hover:from-ocean-600 hover:to-forest-600 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg">
                          <CreditCard className="h-5 w-5 mr-2" />
                          Proceed to Checkout
                        </Button>

                        <Link to="/inventory">
                          <Button
                            variant="outline"
                            className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-bold py-3 rounded-xl transition-all duration-300"
                          >
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Continue Shopping
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Trust Indicators */}
                <div className="mt-6 space-y-4">
                  <Card className="p-4 border border-green-200 bg-green-50">
                    <div className="flex items-center gap-3">
                      <Shield className="h-6 w-6 text-green-600" />
                      <div>
                        <div className="font-bold text-green-800">
                          Secure Payment
                        </div>
                        <div className="text-sm text-green-600">
                          SSL encrypted transactions
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 border border-blue-200 bg-blue-50">
                    <div className="flex items-center gap-3">
                      <Truck className="h-6 w-6 text-blue-600" />
                      <div>
                        <div className="font-bold text-blue-800">
                          Professional Delivery
                        </div>
                        <div className="text-sm text-blue-600">
                          White-glove vehicle delivery
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 border border-purple-200 bg-purple-50">
                    <div className="flex items-center gap-3">
                      <Award className="h-6 w-6 text-purple-600" />
                      <div>
                        <div className="font-bold text-purple-800">
                          Quality Guarantee
                        </div>
                        <div className="text-sm text-purple-600">
                          Certified pre-owned vehicles
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
