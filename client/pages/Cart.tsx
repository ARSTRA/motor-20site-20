import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  Truck,
  Shield,
  Star,
  ArrowLeft,
  CheckCircle,
  Calculator,
  DollarSign,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Car,
  Heart,
  Gift,
  Zap,
} from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  addedAt: string;
  quantity?: number;
  description?: string;
}

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      // Add quantity and description to existing items
      const enhancedCart = cart.map((item: CartItem) => ({
        ...item,
        quantity: item.quantity || 1,
        description:
          item.description ||
          `Premium luxury vehicle with all features included`,
      }));
      setCartItems(enhancedCart);
    } catch (error) {
      console.error("Error loading cart:", error);
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item,
    );
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const removeItem = (id: string) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  const applyPromoCode = () => {
    const validCodes: { [key: string]: number } = {
      LUXURY10: 0.1,
      VIP15: 0.15,
      ALPINE20: 0.2,
      WELCOME5: 0.05,
    };

    if (validCodes[promoCode.toUpperCase()]) {
      setDiscount(validCodes[promoCode.toUpperCase()]);
      alert(
        `Promo code applied! ${validCodes[promoCode.toUpperCase()] * 100}% discount added.`,
      );
    } else {
      alert("Invalid promo code. Try: LUXURY10, VIP15, ALPINE20, or WELCOME5");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0,
  );
  const discountAmount = subtotal * discount;
  const tax = (subtotal - discountAmount) * 0.0875; // 8.75% tax
  const shipping = subtotal > 100000 ? 0 : 2500; // Free shipping over $100k
  const total = subtotal - discountAmount + tax + shipping;

  const handleCheckout = () => {
    alert(
      `🎉 Thank you for your purchase!\n\nTotal: $${total.toLocaleString()}\n\nYour luxury vehicles will be prepared for delivery. Our team will contact you within 24 hours to arrange the details.`,
    );
    clearCart();
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-ocean-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-ocean-50/30 to-forest-50/30">
        {/* Header Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-ocean-600 via-forest-600 to-sunset-600"></div>
          <div className="absolute inset-0 bg-black/20"></div>

          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-gold-400 to-sunset-400 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-ocean-400 to-forest-400 rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4">
            <div className="text-center text-white">
              <Badge className="mb-6 bg-white/20 text-white border-white/30 px-6 py-3 text-lg backdrop-blur-sm">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Shopping Cart
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-gold-300 via-white to-gold-300 bg-clip-text text-transparent">
                  Your Luxury Collection
                </span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 max-w-3xl mx-auto">
                Review your selected premium vehicles and proceed to secure
                checkout
              </p>

              <Button
                onClick={() => navigate("/inventory")}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-ocean-600 px-6 py-3 rounded-xl transition-all duration-300"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            {cartItems.length === 0 ? (
              // Empty Cart State
              <div className="text-center py-20">
                <div className="w-32 h-32 bg-gradient-to-r from-ocean-500 to-forest-500 rounded-full flex items-center justify-center mx-auto mb-8">
                  <ShoppingCart className="h-16 w-16 text-white" />
                </div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent mb-4">
                  Your Cart is Empty
                </h2>
                <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
                  Discover our premium collection of luxury vehicles and add
                  your favorites to cart
                </p>
                <Link to="/inventory">
                  <Button className="bg-gradient-to-r from-ocean-500 to-forest-500 hover:from-ocean-600 hover:to-forest-600 text-white px-8 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                    <Car className="h-5 w-5 mr-2" />
                    Browse Vehicles
                  </Button>
                </Link>
              </div>
            ) : (
              // Cart with Items
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                  <Card className="shadow-xl border-none">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3 text-2xl">
                        <div className="w-10 h-10 bg-gradient-to-r from-ocean-500 to-forest-500 rounded-full flex items-center justify-center">
                          <ShoppingCart className="h-5 w-5 text-white" />
                        </div>
                        <span className="bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent">
                          Cart Items ({cartItems.length})
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {cartItems.map((item) => (
                        <Card
                          key={item.id}
                          className="bg-gradient-to-r from-white to-gray-50 border-2 border-gray-100 hover:border-ocean-200 transition-all duration-300"
                        >
                          <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row gap-6">
                              {/* Vehicle Image */}
                              <div className="relative">
                                <div className="w-full md:w-48 h-32 bg-gradient-to-br from-ocean-100 to-forest-100 rounded-xl overflow-hidden">
                                  {item.image ? (
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-full h-full object-cover"
                                      onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                        e.currentTarget.nextElementSibling?.classList.remove(
                                          "hidden",
                                        );
                                      }}
                                    />
                                  ) : null}
                                  <div className="hidden w-full h-full flex items-center justify-center">
                                    <Car className="h-12 w-12 text-ocean-500" />
                                  </div>
                                </div>
                                <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-gold-500 to-sunset-500 text-white">
                                  Premium
                                </Badge>
                              </div>

                              {/* Vehicle Details */}
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-4">
                                  <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                      {item.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-3">
                                      {item.description}
                                    </p>
                                    <div className="flex items-center gap-2 mb-2">
                                      <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                          <Star
                                            key={i}
                                            className="h-4 w-4 fill-gold-400 text-gold-400"
                                          />
                                        ))}
                                      </div>
                                      <span className="text-sm font-medium text-gold-600">
                                        5.0 Premium
                                      </span>
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeItem(item.id)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>

                                {/* Quantity and Price */}
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <Label className="text-sm font-medium">
                                      Quantity:
                                    </Label>
                                    <div className="flex items-center gap-2">
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                          updateQuantity(
                                            item.id,
                                            (item.quantity || 1) - 1,
                                          )
                                        }
                                        disabled={(item.quantity || 1) <= 1}
                                        className="w-8 h-8 p-0"
                                      >
                                        <Minus className="h-3 w-3" />
                                      </Button>
                                      <span className="w-8 text-center font-medium">
                                        {item.quantity || 1}
                                      </span>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() =>
                                          updateQuantity(
                                            item.id,
                                            (item.quantity || 1) + 1,
                                          )
                                        }
                                        className="w-8 h-8 p-0"
                                      >
                                        <Plus className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-2xl font-bold bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent">
                                      $
                                      {(
                                        item.price * (item.quantity || 1)
                                      ).toLocaleString()}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      ${item.price.toLocaleString()} each
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      {/* Action Buttons */}
                      <div className="flex gap-4 pt-4">
                        <Button
                          variant="outline"
                          onClick={clearCart}
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Clear Cart
                        </Button>
                        <Link to="/inventory">
                          <Button
                            variant="outline"
                            className="border-ocean-300 text-ocean-600 hover:bg-ocean-50"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add More Vehicles
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Order Summary */}
                <div className="space-y-6">
                  {/* Promo Code */}
                  <Card className="shadow-xl border-none">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Gift className="h-5 w-5 text-sunset-500" />
                        Promo Code
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter promo code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          onClick={applyPromoCode}
                          className="bg-gradient-to-r from-sunset-500 to-gold-500 hover:from-sunset-600 hover:to-gold-600 text-white"
                        >
                          Apply
                        </Button>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p>
                          Available codes: LUXURY10, VIP15, ALPINE20, WELCOME5
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Order Summary */}
                  <Card className="shadow-xl border-none">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Calculator className="h-5 w-5 text-ocean-500" />
                        Order Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Subtotal ({cartItems.length} items)</span>
                          <span className="font-medium">
                            ${subtotal.toLocaleString()}
                          </span>
                        </div>

                        {discount > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount ({discount * 100}%)</span>
                            <span className="font-medium">
                              -${discountAmount.toLocaleString()}
                            </span>
                          </div>
                        )}

                        <div className="flex justify-between">
                          <span>Tax (8.75%)</span>
                          <span className="font-medium">
                            ${tax.toLocaleString()}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <span>Shipping & Handling</span>
                          <span className="font-medium">
                            {shipping === 0 ? (
                              <span className="text-green-600">FREE</span>
                            ) : (
                              `$${shipping.toLocaleString()}`
                            )}
                          </span>
                        </div>

                        <Separator />

                        <div className="flex justify-between text-lg font-bold">
                          <span>Total</span>
                          <span className="text-2xl bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent">
                            ${total.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Financing Option */}
                      <div className="bg-gradient-to-r from-gold-50 to-sunset-50 p-4 rounded-xl">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-gold-600" />
                          <span className="font-medium text-gold-700">
                            Financing Available
                          </span>
                        </div>
                        <p className="text-sm text-gold-600">
                          As low as ${Math.round(total / 60).toLocaleString()}
                          /month
                        </p>
                        <Link to="/financing">
                          <Button
                            variant="link"
                            className="text-gold-600 p-0 h-auto"
                          >
                            Learn more →
                          </Button>
                        </Link>
                      </div>

                      {/* Trust Badges */}
                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="bg-green-50 p-2 rounded-lg">
                          <Shield className="h-4 w-4 text-green-600 mx-auto mb-1" />
                          <span className="text-green-700">Secure</span>
                        </div>
                        <div className="bg-blue-50 p-2 rounded-lg">
                          <Truck className="h-4 w-4 text-blue-600 mx-auto mb-1" />
                          <span className="text-blue-700">Delivery</span>
                        </div>
                        <div className="bg-purple-50 p-2 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-purple-600 mx-auto mb-1" />
                          <span className="text-purple-700">Warranty</span>
                        </div>
                      </div>

                      {/* Checkout Button */}
                      <Button
                        onClick={handleCheckout}
                        className="w-full bg-gradient-to-r from-ocean-500 to-forest-500 hover:from-ocean-600 hover:to-forest-600 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                      >
                        <CreditCard className="h-5 w-5 mr-2" />
                        Proceed to Checkout
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Contact Support */}
                  <Card className="shadow-xl border-none bg-gradient-to-br from-gray-50 to-ocean-50">
                    <CardContent className="p-6 text-center">
                      <h3 className="font-bold text-gray-900 mb-2">
                        Need Assistance?
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Our luxury vehicle specialists are here to help
                      </p>
                      <div className="space-y-2">
                        <a href="tel:+15551234567">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            <Phone className="h-4 w-4 mr-2" />
                            Call (555) 123-4567
                          </Button>
                        </a>
                        <a href="mailto:sales@alpinemotors.com">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Email Support
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}
