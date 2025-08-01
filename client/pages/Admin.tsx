import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  Car,
  CreditCard,
  Settings,
  DollarSign,
  BarChart3,
  Shield,
  Eye,
  Edit,
  Trash2,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  Clock,
  Star,
  MessageSquare,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Globe,
  Activity,
  Target,
  Zap,
  Award,
  Briefcase,
  Lock,
  Unlock,
  UserPlus,
  UserMinus,
  FileText,
  PieChart,
  LineChart,
  Wallet,
  Banknote,
  Building2,
  Smartphone,
  QrCode,
  CreditCard as CreditCardIcon,
  Landmark,
  Receipt,
  RefreshCw,
} from "lucide-react";

// Admin Authentication
const ADMIN_CREDENTIALS = [
  {
    username: "admin@alpinemotors.com",
    password: "admin123",
    role: "super_admin",
    name: "Michael Rodriguez",
  },
  {
    username: "manager@alpinemotors.com",
    password: "manager123",
    role: "manager",
    name: "Sarah Chen",
  },
  {
    username: "sales@alpinemotors.com",
    password: "sales123",
    role: "sales_admin",
    name: "David Johnson",
  },
];

interface AdminUser {
  username: string;
  role: string;
  name: string;
}

interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  category: string;
  status: "available" | "sold" | "reserved" | "maintenance";
  featured: boolean;
  mileage: number;
  color: string;
  transmission: string;
  fuelType: string;
  images: string[];
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  joinDate: string;
  status: "active" | "inactive" | "vip";
  totalPurchases: number;
  favoriteVehicles: number;
  inquiries: number;
  lastActivity: string;
}

interface Payment {
  id: number;
  customerId: number;
  customerName: string;
  amount: number;
  currency: "USD" | "NGN" | "EUR" | "GBP";
  type: "purchase" | "financing" | "deposit" | "refund";
  status: "completed" | "pending" | "failed" | "refunded";
  method: "credit_card" | "bank_transfer" | "check" | "cash" | "digital_wallet" | "crypto" | "mobile_money";
  vehicleId?: number;
  vehicleName?: string;
  paymentMethodId?: number;
  transactionRef?: string;
  exchangeRate?: number;
  fees?: number;
  createdAt: string;
}

interface PaymentMethod {
  id: number;
  name: string;
  type: "credit_card" | "bank_transfer" | "digital_wallet" | "mobile_money" | "crypto" | "cash";
  provider: string;
  accountDetails: string;
  currency: "USD" | "NGN" | "EUR" | "GBP";
  isActive: boolean;
  processingFee: number;
  minAmount: number;
  maxAmount: number;
  processingTime: string;
  description: string;
  icon: string;
  settings: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

interface ExchangeRate {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  lastUpdated: string;
}

interface DashboardStats {
  totalRevenue: number;
  totalVehicles: number;
  totalCustomers: number;
  pendingInquiries: number;
  monthlyGrowth: number;
  avgSalePrice: number;
  conversionRate: number;
  customerSatisfaction: number;
}

export default function Admin() {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const [stats] = useState<DashboardStats>({
    totalRevenue: 2450000,
    totalVehicles: 156,
    totalCustomers: 1247,
    pendingInquiries: 23,
    monthlyGrowth: 12.5,
    avgSalePrice: 85000,
    conversionRate: 23.8,
    customerSatisfaction: 4.8,
  });

  const [vehicles, setVehicles] = useState<Vehicle[]>([
    {
      id: 1,
      make: "BMW",
      model: "X5 M Competition",
      year: 2024,
      price: 108000,
      category: "luxury-suv",
      status: "available",
      featured: true,
      mileage: 120,
      color: "Alpine White",
      transmission: "Automatic",
      fuelType: "Gasoline",
      images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e"],
      description: "Ultimate performance SUV with M TwinPower Turbo engine",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-20T14:30:00Z",
    },
    {
      id: 2,
      make: "Mercedes-Benz",
      model: "S-Class S580",
      year: 2024,
      price: 125000,
      category: "luxury-sedan",
      status: "sold",
      featured: true,
      mileage: 85,
      color: "Obsidian Black",
      transmission: "Automatic",
      fuelType: "Gasoline",
      images: ["https://images.unsplash.com/photo-1563720223520-8b5e0ab96d0e"],
      description: "Flagship luxury sedan with advanced technology",
      createdAt: "2024-01-10T09:00:00Z",
      updatedAt: "2024-01-22T11:15:00Z",
    },
  ]);

  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      firstName: "John",
      lastName: "Smith",
      email: "john.smith@email.com",
      phone: "(555) 123-4567",
      joinDate: "2023-01-15",
      status: "vip",
      totalPurchases: 2,
      favoriteVehicles: 5,
      inquiries: 8,
      lastActivity: "2024-01-22T10:30:00Z",
    },
    {
      id: 2,
      firstName: "Sarah",
      lastName: "Johnson",
      email: "sarah.johnson@email.com",
      phone: "(555) 987-6543",
      joinDate: "2023-06-20",
      status: "active",
      totalPurchases: 1,
      favoriteVehicles: 3,
      inquiries: 2,
      lastActivity: "2024-01-21T15:45:00Z",
    },
  ]);

  const [payments, setPayments] = useState<Payment[]>([
    {
      id: 1,
      customerId: 1,
      customerName: "John Smith",
      amount: 125000,
      currency: "USD",
      type: "purchase",
      status: "completed",
      method: "bank_transfer",
      vehicleId: 2,
      vehicleName: "2024 Mercedes-Benz S-Class S580",
      paymentMethodId: 1,
      transactionRef: "TXN-USD-001",
      fees: 2500,
      createdAt: "2024-01-22T11:15:00Z",
    },
    {
      id: 2,
      customerId: 2,
      customerName: "Sarah Johnson",
      amount: 5000,
      currency: "USD",
      type: "deposit",
      status: "pending",
      method: "credit_card",
      vehicleId: 1,
      vehicleName: "2024 BMW X5 M Competition",
      paymentMethodId: 2,
      transactionRef: "TXN-USD-002",
      fees: 150,
      createdAt: "2024-01-21T16:30:00Z",
    },
    {
      id: 3,
      customerId: 3,
      customerName: "Adebayo Okafor",
      amount: 45000000,
      currency: "NGN",
      type: "purchase",
      status: "completed",
      method: "bank_transfer",
      vehicleId: 1,
      vehicleName: "2024 BMW X5 M Competition",
      paymentMethodId: 5,
      transactionRef: "TXN-NGN-001",
      exchangeRate: 750,
      fees: 450000,
      createdAt: "2024-01-20T14:30:00Z",
    },
  ]);

  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: 1,
      name: "Chase Bank Wire Transfer",
      type: "bank_transfer",
      provider: "Chase Bank",
      accountDetails: "Alpine Motors - Account: ****1234",
      currency: "USD",
      isActive: true,
      processingFee: 2.0,
      minAmount: 1000,
      maxAmount: 1000000,
      processingTime: "1-3 business days",
      description: "Secure wire transfer for large transactions",
      icon: "🏦",
      settings: { swift: "CHASUS33", routing: "021000021" },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-20T10:00:00Z",
    },
    {
      id: 2,
      name: "Visa/Mastercard",
      type: "credit_card",
      provider: "Stripe",
      accountDetails: "Stripe Payment Gateway",
      currency: "USD",
      isActive: true,
      processingFee: 2.9,
      minAmount: 100,
      maxAmount: 50000,
      processingTime: "Instant",
      description: "Accept major credit and debit cards",
      icon: "💳",
      settings: {
        supportedCards: ["visa", "mastercard", "amex"],
        threeDSecure: true
      },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-20T10:00:00Z",
    },
    {
      id: 3,
      name: "PayPal",
      type: "digital_wallet",
      provider: "PayPal",
      accountDetails: "business@alpinemotors.com",
      currency: "USD",
      isActive: true,
      processingFee: 3.5,
      minAmount: 50,
      maxAmount: 25000,
      processingTime: "Instant",
      description: "Popular digital wallet payment",
      icon: "🔵",
      settings: { merchantId: "ALPINE_MOTORS_123" },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-20T10:00:00Z",
    },
    {
      id: 4,
      name: "Bitcoin",
      type: "crypto",
      provider: "Coinbase Commerce",
      accountDetails: "Coinbase Commerce Gateway",
      currency: "USD",
      isActive: false,
      processingFee: 1.0,
      minAmount: 1000,
      maxAmount: 100000,
      processingTime: "10-60 minutes",
      description: "Cryptocurrency payments via Bitcoin",
      icon: "₿",
      settings: { walletAddress: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh" },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-20T10:00:00Z",
    },
    {
      id: 5,
      name: "GTBank Transfer (NGN)",
      type: "bank_transfer",
      provider: "GTBank Nigeria",
      accountDetails: "Alpine Motors Nigeria - Account: ****5678",
      currency: "NGN",
      isActive: true,
      processingFee: 1.5,
      minAmount: 50000,
      maxAmount: 500000000,
      processingTime: "Same day",
      description: "Nigerian Naira bank transfers via GTBank",
      icon: "🏦",
      settings: {
        accountNumber: "0123456789",
        bankCode: "058",
        sortCode: "058152036"
      },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-20T10:00:00Z",
    },
    {
      id: 6,
      name: "Flutterwave (NGN)",
      type: "digital_wallet",
      provider: "Flutterwave",
      accountDetails: "Flutterwave Payment Gateway",
      currency: "NGN",
      isActive: true,
      processingFee: 1.4,
      minAmount: 1000,
      maxAmount: 10000000,
      processingTime: "Instant",
      description: "Nigerian digital payments via Flutterwave",
      icon: "💳",
      settings: {
        publicKey: "FLWPUBK_TEST-xxx",
        supportedBanks: ["gtbank", "zenith", "access", "uba"]
      },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-20T10:00:00Z",
    },
    {
      id: 7,
      name: "Paystack (NGN)",
      type: "mobile_money",
      provider: "Paystack",
      accountDetails: "Paystack Payment Gateway",
      currency: "NGN",
      isActive: true,
      processingFee: 1.5,
      minAmount: 500,
      maxAmount: 5000000,
      processingTime: "Instant",
      description: "Nigerian mobile money and card payments",
      icon: "📱",
      settings: {
        publicKey: "pk_test_xxx",
        secretKey: "sk_test_xxx",
        supportedChannels: ["card", "bank", "ussd", "qr"]
      },
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-20T10:00:00Z",
    },
  ]);

  const [exchangeRates, setExchangeRates] = useState<ExchangeRate[]>([
    { fromCurrency: "USD", toCurrency: "NGN", rate: 750.50, lastUpdated: "2024-01-22T15:30:00Z" },
    { fromCurrency: "NGN", toCurrency: "USD", rate: 0.00133, lastUpdated: "2024-01-22T15:30:00Z" },
    { fromCurrency: "USD", toCurrency: "EUR", rate: 0.92, lastUpdated: "2024-01-22T15:30:00Z" },
    { fromCurrency: "USD", toCurrency: "GBP", rate: 0.79, lastUpdated: "2024-01-22T15:30:00Z" },
  ]);

  // Check if admin is already logged in
  useEffect(() => {
    const storedAdmin = localStorage.getItem("alpine_admin");
    if (storedAdmin) {
      setAdminUser(JSON.parse(storedAdmin));
    }
  }, []);

  const handleAdminLogin = async () => {
    setIsLoading(true);
    setLoginError("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      const admin = ADMIN_CREDENTIALS.find(
        (cred) =>
          cred.username === loginForm.username &&
          cred.password === loginForm.password,
      );

      if (admin) {
        const adminUser = {
          username: admin.username,
          role: admin.role,
          name: admin.name,
        };
        setAdminUser(adminUser);
        localStorage.setItem("alpine_admin", JSON.stringify(adminUser));
        setLoginForm({ username: "", password: "" });
      } else {
        setLoginError("Invalid credentials. Please try again.");
      }
    } catch (error) {
      setLoginError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminLogout = () => {
    setAdminUser(null);
    localStorage.removeItem("alpine_admin");
    setLoginForm({ username: "", password: "" });
    setActiveTab("dashboard");
  };

  // Vehicle management functions
  const handleDeleteVehicle = (id: number) => {
    setVehicles(vehicles.filter((v) => v.id !== id));
  };

  const handleToggleVehicleStatus = (id: number) => {
    setVehicles(
      vehicles.map((v) =>
        v.id === id
          ? { ...v, status: v.status === "available" ? "sold" : "available" }
          : v,
      ),
    );
  };

  const handleToggleFeatured = (id: number) => {
    setVehicles(
      vehicles.map((v) => (v.id === id ? { ...v, featured: !v.featured } : v)),
    );
  };

  // Customer management functions
  const handleToggleCustomerStatus = (id: number) => {
    setCustomers(
      customers.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "active" ? "inactive" : "active" }
          : c,
      ),
    );
  };

  const handleDeleteCustomer = (id: number) => {
    setCustomers(customers.filter((c) => c.id !== id));
  };

  // Payment management functions
  const handleUpdatePaymentStatus = (id: number, status: Payment["status"]) => {
    setPayments(payments.map((p) => (p.id === id ? { ...p, status } : p)));
  };

  // Admin Login Form
  if (!adminUser) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-ocean-50 via-forest-50 to-sunset-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md shadow-2xl border-none">
            <CardHeader className="text-center pb-8">
              <div className="mx-auto w-20 h-20 bg-gradient-to-r from-ocean-500 to-forest-500 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent">
                Admin Portal
              </CardTitle>
              <p className="text-gray-600 mt-2">
                Secure access to Alpine Motors management
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              {loginError && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    {loginError}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="username">Admin Username</Label>
                  <Input
                    id="username"
                    type="email"
                    placeholder="admin@alpinemotors.com"
                    value={loginForm.username}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, username: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter admin password"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    className="mt-1"
                    onKeyPress={(e) => e.key === "Enter" && handleAdminLogin()}
                  />
                </div>
              </div>

              <Button
                onClick={handleAdminLogin}
                disabled={
                  isLoading || !loginForm.username || !loginForm.password
                }
                className="w-full bg-gradient-to-r from-ocean-500 to-forest-500 hover:from-ocean-600 hover:to-forest-600 text-white py-3 rounded-xl font-semibold"
              >
                {isLoading ? "Authenticating..." : "Access Admin Portal"}
              </Button>

              <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Demo Credentials:
                </p>
                <div className="space-y-1 text-xs text-gray-600">
                  <p>
                    <strong>Super Admin:</strong> admin@alpinemotors.com /
                    admin123
                  </p>
                  <p>
                    <strong>Manager:</strong> manager@alpinemotors.com /
                    manager123
                  </p>
                  <p>
                    <strong>Sales Admin:</strong> sales@alpinemotors.com /
                    sales123
                  </p>
                </div>
              </div>

              {/* Customer Portal Links */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm font-semibold text-gray-700 mb-4 text-center">
                  Customer Portal Access
                </p>
                <div className="flex flex-col gap-3">
                  <Button
                    variant="outline"
                    onClick={() => navigate("/login")}
                    className="w-full border-ocean-200 text-ocean-600 hover:bg-ocean-50 hover:text-ocean-700 transition-all duration-300"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Customer Login
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => navigate("/register")}
                    className="w-full border-forest-200 text-forest-600 hover:bg-forest-50 hover:text-forest-700 transition-all duration-300"
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Create Customer Account
                  </Button>
                </div>
                <div className="mt-3 text-center">
                  <Button
                    variant="ghost"
                    onClick={() => navigate("/")}
                    className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    ← Back to Main Website
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  // Main Admin Dashboard
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-ocean-50">
        {/* Admin Header */}
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-ocean-500 to-forest-500 rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">
                    Admin Dashboard
                  </h1>
                  <p className="text-gray-600">
                    Welcome back, {adminUser.name}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge className="bg-gradient-to-r from-ocean-500 to-forest-500 text-white px-3 py-1">
                  {adminUser.role.replace("_", " ").toUpperCase()}
                </Badge>
                <Button variant="outline" onClick={handleAdminLogout}>
                  <Lock className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-8"
          >
            <TabsList className="grid w-full grid-cols-7 bg-white p-1 rounded-xl shadow-lg">
              <TabsTrigger
                value="dashboard"
                className="flex items-center gap-2"
              >
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Users
              </TabsTrigger>
              <TabsTrigger value="vehicles" className="flex items-center gap-2">
                <Car className="h-4 w-4" />
                Vehicles
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payments
              </TabsTrigger>
              <TabsTrigger value="payment-methods" className="flex items-center gap-2">
                <Wallet className="h-4 w-4" />
                Methods
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="flex items-center gap-2"
              >
                <TrendingUp className="h-4 w-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-8">
              {/* Key Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gradient-to-br from-ocean-500 to-ocean-600 text-white border-none">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-ocean-100">Total Revenue</p>
                        <p className="text-3xl font-bold">
                          ${stats.totalRevenue.toLocaleString()}
                        </p>
                        <div className="flex items-center gap-1 mt-2">
                          <TrendingUp className="h-4 w-4" />
                          <span className="text-sm">
                            +{stats.monthlyGrowth}% this month
                          </span>
                        </div>
                      </div>
                      <DollarSign className="h-12 w-12 text-ocean-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-forest-500 to-forest-600 text-white border-none">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-forest-100">Total Vehicles</p>
                        <p className="text-3xl font-bold">
                          {stats.totalVehicles}
                        </p>
                        <div className="flex items-center gap-1 mt-2">
                          <Car className="h-4 w-4" />
                          <span className="text-sm">Active inventory</span>
                        </div>
                      </div>
                      <Car className="h-12 w-12 text-forest-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-sunset-500 to-sunset-600 text-white border-none">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sunset-100">Total Customers</p>
                        <p className="text-3xl font-bold">
                          {stats.totalCustomers}
                        </p>
                        <div className="flex items-center gap-1 mt-2">
                          <Users className="h-4 w-4" />
                          <span className="text-sm">Registered users</span>
                        </div>
                      </div>
                      <Users className="h-12 w-12 text-sunset-200" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-gold-500 to-gold-600 text-white border-none">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gold-100">Pending Inquiries</p>
                        <p className="text-3xl font-bold">
                          {stats.pendingInquiries}
                        </p>
                        <div className="flex items-center gap-1 mt-2">
                          <Clock className="h-4 w-4" />
                          <span className="text-sm">Needs attention</span>
                        </div>
                      </div>
                      <MessageSquare className="h-12 w-12 text-gold-200" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-ocean-600" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Average Sale Price</span>
                        <span className="text-xl font-bold text-green-600">
                          ${stats.avgSalePrice.toLocaleString()}
                        </span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Conversion Rate</span>
                        <span className="text-xl font-bold text-blue-600">
                          {stats.conversionRate}%
                        </span>
                      </div>
                      <Progress value={stats.conversionRate} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">
                          Customer Satisfaction
                        </span>
                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          <span className="text-xl font-bold text-yellow-600">
                            {stats.customerSatisfaction}/5.0
                          </span>
                        </div>
                      </div>
                      <Progress
                        value={(stats.customerSatisfaction / 5) * 100}
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-forest-600" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <div className="flex-1">
                          <p className="font-medium">Vehicle Sale Completed</p>
                          <p className="text-sm text-gray-600">
                            2024 Mercedes S-Class sold to John Smith
                          </p>
                        </div>
                        <span className="text-xs text-gray-500">2h ago</span>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <UserPlus className="h-5 w-5 text-blue-600" />
                        <div className="flex-1">
                          <p className="font-medium">
                            New Customer Registration
                          </p>
                          <p className="text-sm text-gray-600">
                            Sarah Johnson joined today
                          </p>
                        </div>
                        <span className="text-xs text-gray-500">4h ago</span>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                        <AlertCircle className="h-5 w-5 text-yellow-600" />
                        <div className="flex-1">
                          <p className="font-medium">Payment Pending</p>
                          <p className="text-sm text-gray-600">
                            $5,000 deposit for BMW X5
                          </p>
                        </div>
                        <span className="text-xs text-gray-500">6h ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Users Management Tab */}
            <TabsContent value="users" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Customer Management
                </h2>
                <div className="flex gap-3">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-ocean-500 to-forest-500 hover:from-ocean-600 hover:to-forest-600">
                        <UserPlus className="h-4 w-4 mr-2" />
                        Add Customer
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Customer</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="firstName">First Name</Label>
                            <Input id="firstName" placeholder="John" />
                          </div>
                          <div>
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input id="lastName" placeholder="Doe" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john.doe@email.com"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone</Label>
                          <Input id="phone" placeholder="(555) 123-4567" />
                        </div>
                        <Button className="w-full">Add Customer</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Purchases</TableHead>
                        <TableHead>Join Date</TableHead>
                        <TableHead>Last Activity</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">
                                {customer.firstName} {customer.lastName}
                              </p>
                              <p className="text-sm text-gray-600">
                                ID: {customer.id}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="flex items-center gap-1">
                                <Mail className="h-3 w-3 text-gray-400" />
                                <span className="text-sm">
                                  {customer.email}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Phone className="h-3 w-3 text-gray-400" />
                                <span className="text-sm">
                                  {customer.phone}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                customer.status === "vip"
                                  ? "bg-gold-100 text-gold-800"
                                  : customer.status === "active"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-gray-100 text-gray-800"
                              }
                            >
                              {customer.status.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-center">
                              <p className="font-medium">
                                {customer.totalPurchases}
                              </p>
                              <p className="text-xs text-gray-600">
                                {customer.inquiries} inquiries
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(customer.joinDate).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {new Date(
                              customer.lastActivity,
                            ).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleToggleCustomerStatus(customer.id)
                                }
                              >
                                {customer.status === "active" ? (
                                  <Lock className="h-3 w-3" />
                                ) : (
                                  <Unlock className="h-3 w-3" />
                                )}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleDeleteCustomer(customer.id)
                                }
                              >
                                <Trash2 className="h-3 w-3 text-red-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Vehicle Management Tab */}
            <TabsContent value="vehicles" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Vehicle Inventory
                </h2>
                <div className="flex gap-3">
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-forest-500 to-sunset-500 hover:from-forest-600 hover:to-sunset-600">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Vehicle
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Vehicle</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="make">Make</Label>
                            <Input id="make" placeholder="BMW" />
                          </div>
                          <div>
                            <Label htmlFor="model">Model</Label>
                            <Input id="model" placeholder="X5 M Competition" />
                          </div>
                          <div>
                            <Label htmlFor="year">Year</Label>
                            <Input id="year" type="number" placeholder="2024" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="price">Price</Label>
                            <Input
                              id="price"
                              type="number"
                              placeholder="108000"
                            />
                          </div>
                          <div>
                            <Label htmlFor="category">Category</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="luxury-suv">
                                  Luxury SUV
                                </SelectItem>
                                <SelectItem value="luxury-sedan">
                                  Luxury Sedan
                                </SelectItem>
                                <SelectItem value="sports-car">
                                  Sports Car
                                </SelectItem>
                                <SelectItem value="electric">
                                  Electric
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            placeholder="Vehicle description..."
                          />
                        </div>
                        <Button className="w-full">Add Vehicle</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Vehicle</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead>Updated</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {vehicles.map((vehicle) => (
                        <TableRow key={vehicle.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <img
                                src={vehicle.images[0]}
                                alt={`${vehicle.make} ${vehicle.model}`}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div>
                                <p className="font-medium">
                                  {vehicle.year} {vehicle.make} {vehicle.model}
                                </p>
                                <p className="text-sm text-gray-600">
                                  {vehicle.color} • {vehicle.mileage} miles
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="font-bold text-green-600">
                              ${vehicle.price.toLocaleString()}
                            </p>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                vehicle.status === "available"
                                  ? "bg-green-100 text-green-800"
                                  : vehicle.status === "sold"
                                    ? "bg-red-100 text-red-800"
                                    : vehicle.status === "reserved"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-gray-100 text-gray-800"
                              }
                            >
                              {vehicle.status.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {vehicle.category.replace("-", " ").toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={vehicle.featured}
                              onCheckedChange={() =>
                                handleToggleFeatured(vehicle.id)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            {new Date(vehicle.updatedAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  handleToggleVehicleStatus(vehicle.id)
                                }
                              >
                                {vehicle.status === "available"
                                  ? "Mark Sold"
                                  : "Mark Available"}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteVehicle(vehicle.id)}
                              >
                                <Trash2 className="h-3 w-3 text-red-600" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payments Management Tab */}
            <TabsContent value="payments" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Payment Management
                </h2>
                <div className="flex gap-3">
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                  <Button className="bg-gradient-to-r from-sunset-500 to-gold-500 hover:from-sunset-600 hover:to-gold-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Record Payment
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                      <div>
                        <p className="text-sm text-gray-600">Completed</p>
                        <p className="text-2xl font-bold text-green-600">
                          $125,000
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <Clock className="h-8 w-8 text-yellow-600" />
                      <div>
                        <p className="text-sm text-gray-600">Pending</p>
                        <p className="text-2xl font-bold text-yellow-600">
                          $5,000
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="h-8 w-8 text-red-600" />
                      <div>
                        <p className="text-sm text-gray-600">Failed</p>
                        <p className="text-2xl font-bold text-red-600">$0</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Payment ID</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Currency</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Fees</TableHead>
                        <TableHead>Vehicle</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>
                            <div>
                              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                                PAY-{payment.id.toString().padStart(4, "0")}
                              </code>
                              {payment.transactionRef && (
                                <p className="text-xs text-gray-500 mt-1">
                                  {payment.transactionRef}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <p className="font-medium">
                              {payment.customerName}
                            </p>
                            <p className="text-sm text-gray-600">
                              ID: {payment.customerId}
                            </p>
                          </TableCell>
                          <TableCell>
                            <p className="font-bold text-green-600">
                              {payment.currency === "NGN" ? "₦" : "$"}{payment.amount.toLocaleString()}
                            </p>
                            {payment.exchangeRate && (
                              <p className="text-xs text-gray-500">
                                Rate: {payment.exchangeRate}
                              </p>
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge className={`${
                              payment.currency === "NGN"
                                ? "bg-green-100 text-green-800"
                                : payment.currency === "USD"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}>
                              {payment.currency}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {payment.type.replace("_", " ").toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">
                              {payment.method.replace("_", " ")}
                            </span>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={
                                payment.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : payment.status === "pending"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : payment.status === "failed"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-gray-100 text-gray-800"
                              }
                            >
                              {payment.status.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {payment.fees ? (
                              <p className="text-sm text-gray-600">
                                {payment.currency === "NGN" ? "₦" : "$"}{payment.fees.toLocaleString()}
                              </p>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {payment.vehicleName ? (
                              <p className="text-sm">{payment.vehicleName}</p>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {new Date(payment.createdAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3" />
                              </Button>
                              {payment.status === "pending" && (
                                <Select
                                  onValueChange={(value) =>
                                    handleUpdatePaymentStatus(
                                      payment.id,
                                      value as Payment["status"],
                                    )
                                  }
                                >
                                  <SelectTrigger className="w-24 h-8">
                                    <SelectValue placeholder="Update" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="completed">
                                      Complete
                                    </SelectItem>
                                    <SelectItem value="failed">
                                      Mark Failed
                                    </SelectItem>
                                    <SelectItem value="refunded">
                                      Refund
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Payment Methods Management Tab */}
            <TabsContent value="payment-methods" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Payment Methods Management
                </h2>
                <div className="flex gap-3">
                  <Button variant="outline">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Sync Rates
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Payment Method
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add New Payment Method</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="methodName">Method Name</Label>
                            <Input id="methodName" placeholder="e.g., GTBank Transfer" />
                          </div>
                          <div>
                            <Label htmlFor="methodType">Type</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="credit_card">Credit Card</SelectItem>
                                <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                <SelectItem value="digital_wallet">Digital Wallet</SelectItem>
                                <SelectItem value="mobile_money">Mobile Money</SelectItem>
                                <SelectItem value="crypto">Cryptocurrency</SelectItem>
                                <SelectItem value="cash">Cash</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="provider">Provider</Label>
                            <Input id="provider" placeholder="e.g., Flutterwave" />
                          </div>
                          <div>
                            <Label htmlFor="currency">Currency</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="Select currency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="USD">USD ($)</SelectItem>
                                <SelectItem value="NGN">NGN (₦)</SelectItem>
                                <SelectItem value="EUR">EUR (€)</SelectItem>
                                <SelectItem value="GBP">GBP (£)</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="processingFee">Processing Fee (%)</Label>
                            <Input id="processingFee" type="number" placeholder="2.5" />
                          </div>
                          <div>
                            <Label htmlFor="minAmount">Min Amount</Label>
                            <Input id="minAmount" type="number" placeholder="100" />
                          </div>
                          <div>
                            <Label htmlFor="maxAmount">Max Amount</Label>
                            <Input id="maxAmount" type="number" placeholder="100000" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="accountDetails">Account Details</Label>
                          <Input id="accountDetails" placeholder="Account number or identifier" />
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          <Textarea id="description" placeholder="Brief description of this payment method" />
                        </div>
                        <Button className="w-full">Add Payment Method</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>

              {/* Exchange Rates Card */}
              <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Banknote className="h-5 w-5 text-emerald-600" />
                    Current Exchange Rates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {exchangeRates.map((rate, index) => (
                      <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-emerald-100">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">
                            {rate.fromCurrency} → {rate.toCurrency}
                          </span>
                          <Badge className="bg-emerald-100 text-emerald-700 text-xs">Live</Badge>
                        </div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">
                          {rate.fromCurrency === "NGN" ? "₦" : rate.fromCurrency === "USD" ? "$" : ""}
                          {rate.rate.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          Updated: {new Date(rate.lastUpdated).toLocaleTimeString()}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paymentMethods.map((method) => (
                  <Card key={method.id} className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${
                    method.isActive
                      ? "border-emerald-200 bg-gradient-to-br from-white to-emerald-50"
                      : "border-gray-200 bg-gradient-to-br from-white to-gray-50 opacity-75"
                  }`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{method.icon}</div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{method.name}</h3>
                            <p className="text-sm text-gray-600">{method.provider}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${
                            method.currency === "NGN"
                              ? "bg-green-100 text-green-800"
                              : method.currency === "USD"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-gray-100 text-gray-800"
                          }`}>
                            {method.currency}
                          </Badge>
                          <Switch
                            checked={method.isActive}
                            onCheckedChange={(checked) => {
                              setPaymentMethods(paymentMethods.map(m =>
                                m.id === method.id ? { ...m, isActive: checked } : m
                              ));
                            }}
                          />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2 text-sm">
                        <p className="text-gray-600">{method.description}</p>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="flex items-center gap-1">
                            <Receipt className="h-3 w-3" />
                            {method.processingFee}% fee
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {method.processingTime}
                          </span>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-600 mb-1">Limits</div>
                        <div className="text-sm font-medium">
                          {method.currency === "NGN" ? "₦" : "$"}{method.minAmount.toLocaleString()} - {method.currency === "NGN" ? "₦" : "$"}{method.maxAmount.toLocaleString()}
                        </div>
                      </div>

                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="text-xs text-gray-600 mb-1">Account Details</div>
                        <div className="text-sm font-mono text-gray-800">{method.accountDetails}</div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Edit className="h-3 w-3 mr-1" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Payment Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-600" />
                      USD Transactions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-green-600">$130,000</div>
                      <div className="text-sm text-gray-600">This month</div>
                      <div className="flex items-center gap-1 text-sm">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="text-green-600">+12.5%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Banknote className="h-5 w-5 text-emerald-600" />
                      NGN Transactions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-emerald-600">₦45M</div>
                      <div className="text-sm text-gray-600">This month</div>
                      <div className="flex items-center gap-1 text-sm">
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                        <span className="text-emerald-600">+18.3%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-600" />
                      Success Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-blue-600">98.7%</div>
                      <div className="text-sm text-gray-600">Payment success</div>
                      <Progress value={98.7} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Business Analytics
                </h2>
                <div className="flex gap-3">
                  <Select defaultValue="30days">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7days">Last 7 days</SelectItem>
                      <SelectItem value="30days">Last 30 days</SelectItem>
                      <SelectItem value="90days">Last 90 days</SelectItem>
                      <SelectItem value="1year">Last year</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LineChart className="h-5 w-5 text-ocean-600" />
                      Revenue Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center bg-gradient-to-br from-ocean-50 to-forest-50 rounded-lg">
                      <div className="text-center">
                        <TrendingUp className="h-16 w-16 text-ocean-400 mx-auto mb-4" />
                        <p className="text-gray-600">
                          Revenue chart visualization would go here
                        </p>
                        <p className="text-sm text-gray-500">
                          Integration with charting library needed
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PieChart className="h-5 w-5 text-forest-600" />
                      Sales by Category
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Luxury SUVs</span>
                        <div className="flex items-center gap-2">
                          <Progress value={45} className="w-24 h-2" />
                          <span className="text-sm font-medium">45%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Luxury Sedans</span>
                        <div className="flex items-center gap-2">
                          <Progress value={30} className="w-24 h-2" />
                          <span className="text-sm font-medium">30%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Sports Cars</span>
                        <div className="flex items-center gap-2">
                          <Progress value={15} className="w-24 h-2" />
                          <span className="text-sm font-medium">15%</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Electric Vehicles</span>
                        <div className="flex items-center gap-2">
                          <Progress value={10} className="w-24 h-2" />
                          <span className="text-sm font-medium">10%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Top Selling Models
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">BMW X5 M Competition</span>
                        <Badge>12 sold</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Mercedes S-Class</span>
                        <Badge>8 sold</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Porsche 911 Turbo S</span>
                        <Badge>6 sold</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Customer Segments</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">VIP Customers</span>
                        <Badge className="bg-gold-100 text-gold-800">125</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Active Customers</span>
                        <Badge className="bg-green-100 text-green-800">
                          892
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">New This Month</span>
                        <Badge className="bg-blue-100 text-blue-800">230</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Conversion Funnel</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Website Visitors</span>
                        <span className="font-medium">12,450</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Inquiries</span>
                        <span className="font-medium">1,245</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Test Drives</span>
                        <span className="font-medium">432</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Sales</span>
                        <span className="font-medium text-green-600">89</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">
                System Settings
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      General Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notifications">
                          Email Notifications
                        </Label>
                        <p className="text-sm text-gray-600">
                          Receive email alerts for new inquiries
                        </p>
                      </div>
                      <Switch id="notifications" defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="autoApproval">
                          Auto-approve Reviews
                        </Label>
                        <p className="text-sm text-gray-600">
                          Automatically approve customer reviews
                        </p>
                      </div>
                      <Switch id="autoApproval" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="maintenance">Maintenance Mode</Label>
                        <p className="text-sm text-gray-600">
                          Enable maintenance mode for updates
                        </p>
                      </div>
                      <Switch id="maintenance" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Security Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Lock className="h-4 w-4 mr-2" />
                      Change Admin Password
                    </Button>

                    <Button variant="outline" className="w-full justify-start">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Manage Admin Users
                    </Button>

                    <Button variant="outline" className="w-full justify-start">
                      <Activity className="h-4 w-4 mr-2" />
                      View Activity Logs
                    </Button>

                    <Button variant="outline" className="w-full justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Export System Data
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5" />
                      Website Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="siteTitle">Site Title</Label>
                      <Input id="siteTitle" defaultValue="Alpine Motors" />
                    </div>

                    <div>
                      <Label htmlFor="siteDescription">Site Description</Label>
                      <Textarea
                        id="siteDescription"
                        defaultValue="Where Luxury Meets Adventure"
                      />
                    </div>

                    <div>
                      <Label htmlFor="contactEmail">Contact Email</Label>
                      <Input
                        id="contactEmail"
                        defaultValue="info@alpinemotors.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="contactPhone">Contact Phone</Label>
                      <Input id="contactPhone" defaultValue="(555) 123-4567" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5" />
                      Business Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="businessHours">Business Hours</Label>
                      <Select defaultValue="standard">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="standard">
                            Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-7PM
                          </SelectItem>
                          <SelectItem value="extended">
                            Mon-Sun: 8AM-10PM
                          </SelectItem>
                          <SelectItem value="custom">Custom Hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="currency">Default Currency</Label>
                      <Select defaultValue="usd">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD ($)</SelectItem>
                          <SelectItem value="ngn">NGN (₦)</SelectItem>
                          <SelectItem value="eur">EUR (€)</SelectItem>
                          <SelectItem value="gbp">GBP (£)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="taxRate">Tax Rate (%)</Label>
                      <Input id="taxRate" type="number" defaultValue="8.25" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
}
