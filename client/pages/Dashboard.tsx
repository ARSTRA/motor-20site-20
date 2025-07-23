import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Settings, 
  CreditCard, 
  Heart, 
  Car, 
  MessageSquare, 
  Calendar,
  Shield,
  Bell,
  Star,
  Eye,
  Phone,
  Mail,
  Edit3,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth, PaymentMethod } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';

export default function Dashboard() {
  const { user, updateProfile, addPaymentMethod, removePaymentMethod, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: user?.zipCode || ''
  });
  const [preferences, setPreferences] = useState(user?.preferences || {
    newsletter: true,
    notifications: true,
    darkMode: false
  });
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    type: 'credit' as 'credit' | 'debit',
    last4: '',
    brand: '',
    expiryMonth: 1,
    expiryYear: 2025,
    isDefault: false
  });
  const [showAddPayment, setShowAddPayment] = useState(false);

  if (!user) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in to access your dashboard</h1>
            <Link to="/login">
              <Button className="bg-gradient-to-r from-ocean-500 to-forest-500 text-white">
                Go to Login
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const handleProfileUpdate = async () => {
    const success = await updateProfile(profileData);
    if (success) {
      setEditingProfile(false);
    }
  };

  const handlePreferencesUpdate = async () => {
    await updateProfile({ preferences });
  };

  const handleAddPaymentMethod = async () => {
    const success = await addPaymentMethod(newPaymentMethod);
    if (success) {
      setShowAddPayment(false);
      setNewPaymentMethod({
        type: 'credit',
        last4: '',
        brand: '',
        expiryMonth: 1,
        expiryYear: 2025,
        isDefault: false
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'scheduled':
        return <Calendar className="h-4 w-4 text-blue-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Layout>
      <section className="min-h-screen bg-gradient-to-br from-gray-50 to-ocean-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-ocean-600 via-forest-600 to-sunset-600 text-white rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-4xl font-bold mb-2">
                    Welcome back, {user.firstName}!
                  </h1>
                  <p className="text-ocean-100 text-lg">
                    Manage your Alpine Motors experience
                  </p>
                </div>
                <div className="hidden md:block">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                    <User className="h-12 w-12 text-white mb-2" />
                    <p className="text-sm text-ocean-100">Member since</p>
                    <p className="font-bold">
                      {new Date(user.joinDate).toLocaleDateString('en-US', { 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-ocean-50 to-ocean-100 border-ocean-200 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-ocean-600 font-medium">Favorite Vehicles</p>
                    <p className="text-3xl font-bold text-ocean-700">{user.favoriteVehicles.length}</p>
                  </div>
                  <Heart className="h-10 w-10 text-ocean-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-forest-50 to-forest-100 border-forest-200 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-forest-600 font-medium">Active Inquiries</p>
                    <p className="text-3xl font-bold text-forest-700">
                      {user.inquiries.filter(i => i.status !== 'completed' && i.status !== 'cancelled').length}
                    </p>
                  </div>
                  <MessageSquare className="h-10 w-10 text-forest-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-sunset-50 to-sunset-100 border-sunset-200 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-sunset-600 font-medium">Payment Methods</p>
                    <p className="text-3xl font-bold text-sunset-700">{user.paymentMethods.length}</p>
                  </div>
                  <CreditCard className="h-10 w-10 text-sunset-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-gold-50 to-gold-100 border-gold-200 rounded-2xl shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gold-600 font-medium">Test Drives</p>
                    <p className="text-3xl font-bold text-gold-700">
                      {user.inquiries.filter(i => i.type === 'test_drive').length}
                    </p>
                  </div>
                  <Car className="h-10 w-10 text-gold-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-white shadow-xl rounded-2xl p-2 border-2 border-gray-100 mb-8 grid grid-cols-2 md:grid-cols-5">
              <TabsTrigger 
                value="overview" 
                className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-ocean-500 data-[state=active]:to-forest-500 data-[state=active]:text-white font-bold"
              >
                <User className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="profile" 
                className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-ocean-500 data-[state=active]:to-forest-500 data-[state=active]:text-white font-bold"
              >
                <Settings className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger 
                value="payments" 
                className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-ocean-500 data-[state=active]:to-forest-500 data-[state=active]:text-white font-bold"
              >
                <CreditCard className="h-4 w-4" />
                Payments
              </TabsTrigger>
              <TabsTrigger 
                value="vehicles" 
                className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-ocean-500 data-[state=active]:to-forest-500 data-[state=active]:text-white font-bold"
              >
                <Car className="h-4 w-4" />
                Vehicles
              </TabsTrigger>
              <TabsTrigger 
                value="inquiries" 
                className="flex items-center gap-2 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-ocean-500 data-[state=active]:to-forest-500 data-[state=active]:text-white font-bold"
              >
                <MessageSquare className="h-4 w-4" />
                Inquiries
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <Card className="rounded-2xl shadow-xl border-2 border-gray-100">
                  <CardHeader className="bg-gradient-to-r from-ocean-500 to-forest-500 text-white rounded-t-2xl">
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {user.inquiries.slice(0, 3).map((inquiry) => (
                        <div key={inquiry.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                          {getStatusIcon(inquiry.status)}
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{inquiry.vehicleName}</p>
                            <p className="text-sm text-gray-600">{inquiry.type.replace('_', ' ')} inquiry</p>
                            <p className="text-xs text-gray-500">
                              {new Date(inquiry.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge className={getStatusColor(inquiry.status)}>
                            {inquiry.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                    <Link to="/dashboard" onClick={() => setActiveTab('inquiries')}>
                      <Button variant="outline" className="w-full mt-4">
                        View All Activity
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="rounded-2xl shadow-xl border-2 border-gray-100">
                  <CardHeader className="bg-gradient-to-r from-forest-500 to-sunset-500 text-white rounded-t-2xl">
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-2 gap-4">
                      <Link to="/inventory">
                        <Button className="w-full h-20 bg-gradient-to-r from-ocean-500 to-ocean-600 hover:from-ocean-600 hover:to-ocean-700 text-white rounded-xl flex flex-col items-center justify-center gap-2">
                          <Car className="h-6 w-6" />
                          <span className="text-sm font-bold">Browse Cars</span>
                        </Button>
                      </Link>
                      <Button 
                        onClick={() => setActiveTab('payments')}
                        className="w-full h-20 bg-gradient-to-r from-forest-500 to-forest-600 hover:from-forest-600 hover:to-forest-700 text-white rounded-xl flex flex-col items-center justify-center gap-2"
                      >
                        <CreditCard className="h-6 w-6" />
                        <span className="text-sm font-bold">Add Payment</span>
                      </Button>
                      <Button 
                        onClick={() => setActiveTab('vehicles')}
                        className="w-full h-20 bg-gradient-to-r from-sunset-500 to-sunset-600 hover:from-sunset-600 hover:to-sunset-700 text-white rounded-xl flex flex-col items-center justify-center gap-2"
                      >
                        <Heart className="h-6 w-6" />
                        <span className="text-sm font-bold">Favorites</span>
                      </Button>
                      <Link to="/contact">
                        <Button className="w-full h-20 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white rounded-xl flex flex-col items-center justify-center gap-2">
                          <Phone className="h-6 w-6" />
                          <span className="text-sm font-bold">Contact Us</span>
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <Card className="rounded-2xl shadow-xl border-2 border-gray-100">
                  <CardHeader className="bg-gradient-to-r from-ocean-500 to-forest-500 text-white rounded-t-2xl">
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Personal Information
                      </div>
                      <Button
                        onClick={() => setEditingProfile(!editingProfile)}
                        variant="ghost"
                        size="sm"
                        className="text-white hover:bg-white/20"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={profileData.firstName}
                            onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
                            disabled={!editingProfile}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={profileData.lastName}
                            onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
                            disabled={!editingProfile}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          disabled={!editingProfile}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={profileData.address}
                          onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                          disabled={!editingProfile}
                          className="mt-1"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={profileData.city}
                            onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                            disabled={!editingProfile}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={profileData.state}
                            onChange={(e) => setProfileData({...profileData, state: e.target.value})}
                            disabled={!editingProfile}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          <Input
                            id="zipCode"
                            value={profileData.zipCode}
                            onChange={(e) => setProfileData({...profileData, zipCode: e.target.value})}
                            disabled={!editingProfile}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      {editingProfile && (
                        <div className="flex gap-2 pt-4">
                          <Button
                            onClick={handleProfileUpdate}
                            disabled={loading}
                            className="bg-gradient-to-r from-ocean-500 to-forest-500"
                          >
                            Save Changes
                          </Button>
                          <Button
                            onClick={() => setEditingProfile(false)}
                            variant="outline"
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Preferences */}
                <Card className="rounded-2xl shadow-xl border-2 border-gray-100">
                  <CardHeader className="bg-gradient-to-r from-forest-500 to-sunset-500 text-white rounded-t-2xl">
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="newsletter">Newsletter</Label>
                          <p className="text-sm text-gray-500">Receive our latest offers and news</p>
                        </div>
                        <Switch
                          id="newsletter"
                          checked={preferences.newsletter}
                          onCheckedChange={(checked) => {
                            const newPrefs = {...preferences, newsletter: checked};
                            setPreferences(newPrefs);
                            updateProfile({ preferences: newPrefs });
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="notifications">Notifications</Label>
                          <p className="text-sm text-gray-500">Get notified about your inquiries</p>
                        </div>
                        <Switch
                          id="notifications"
                          checked={preferences.notifications}
                          onCheckedChange={(checked) => {
                            const newPrefs = {...preferences, notifications: checked};
                            setPreferences(newPrefs);
                            updateProfile({ preferences: newPrefs });
                          }}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="darkMode">Dark Mode</Label>
                          <p className="text-sm text-gray-500">Switch to dark theme</p>
                        </div>
                        <Switch
                          id="darkMode"
                          checked={preferences.darkMode}
                          onCheckedChange={(checked) => {
                            const newPrefs = {...preferences, darkMode: checked};
                            setPreferences(newPrefs);
                            updateProfile({ preferences: newPrefs });
                          }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Payment Methods Tab */}
            <TabsContent value="payments" className="space-y-6">
              <Card className="rounded-2xl shadow-xl border-2 border-gray-100">
                <CardHeader className="bg-gradient-to-r from-sunset-500 to-gold-500 text-white rounded-t-2xl">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Methods
                    </div>
                    <Dialog open={showAddPayment} onOpenChange={setShowAddPayment}>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Payment
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Add Payment Method</DialogTitle>
                          <DialogDescription>
                            Add a new credit or debit card to your account
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label htmlFor="cardType">Card Type</Label>
                            <Select 
                              value={newPaymentMethod.type} 
                              onValueChange={(value: 'credit' | 'debit') => 
                                setNewPaymentMethod({...newPaymentMethod, type: value})
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="credit">Credit Card</SelectItem>
                                <SelectItem value="debit">Debit Card</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="brand">Card Brand</Label>
                            <Select 
                              value={newPaymentMethod.brand} 
                              onValueChange={(value) => 
                                setNewPaymentMethod({...newPaymentMethod, brand: value})
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select brand" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Visa">Visa</SelectItem>
                                <SelectItem value="Mastercard">Mastercard</SelectItem>
                                <SelectItem value="American Express">American Express</SelectItem>
                                <SelectItem value="Discover">Discover</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="last4">Last 4 Digits</Label>
                            <Input
                              id="last4"
                              value={newPaymentMethod.last4}
                              onChange={(e) => setNewPaymentMethod({...newPaymentMethod, last4: e.target.value})}
                              placeholder="1234"
                              maxLength={4}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiryMonth">Expiry Month</Label>
                              <Select 
                                value={newPaymentMethod.expiryMonth.toString()} 
                                onValueChange={(value) => 
                                  setNewPaymentMethod({...newPaymentMethod, expiryMonth: parseInt(value)})
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({length: 12}, (_, i) => (
                                    <SelectItem key={i+1} value={(i+1).toString()}>
                                      {(i+1).toString().padStart(2, '0')}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="expiryYear">Expiry Year</Label>
                              <Select 
                                value={newPaymentMethod.expiryYear.toString()} 
                                onValueChange={(value) => 
                                  setNewPaymentMethod({...newPaymentMethod, expiryYear: parseInt(value)})
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {Array.from({length: 10}, (_, i) => (
                                    <SelectItem key={2024+i} value={(2024+i).toString()}>
                                      {2024+i}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <Button
                            onClick={handleAddPaymentMethod}
                            disabled={loading}
                            className="bg-gradient-to-r from-sunset-500 to-gold-500"
                          >
                            Add Payment Method
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {user.paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-sunset-50 rounded-xl border border-sunset-200">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-8 bg-gradient-to-r from-sunset-500 to-gold-500 rounded flex items-center justify-center">
                            <CreditCard className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {method.brand} •••• {method.last4}
                            </p>
                            <p className="text-sm text-gray-600">
                              Expires {method.expiryMonth.toString().padStart(2, '0')}/{method.expiryYear}
                            </p>
                          </div>
                          {method.isDefault && (
                            <Badge className="bg-gradient-to-r from-ocean-500 to-forest-500 text-white">
                              Default
                            </Badge>
                          )}
                        </div>
                        <Button
                          onClick={() => removePaymentMethod(method.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {user.paymentMethods.length === 0 && (
                      <div className="text-center py-8">
                        <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">No payment methods added yet</p>
                        <Button
                          onClick={() => setShowAddPayment(true)}
                          className="mt-4 bg-gradient-to-r from-sunset-500 to-gold-500"
                        >
                          Add Your First Payment Method
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Vehicles Tab */}
            <TabsContent value="vehicles" className="space-y-6">
              <Card className="rounded-2xl shadow-xl border-2 border-gray-100">
                <CardHeader className="bg-gradient-to-r from-ocean-500 to-forest-500 text-white rounded-t-2xl">
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Favorite Vehicles ({user.favoriteVehicles.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {user.favoriteVehicles.length === 0 ? (
                    <div className="text-center py-8">
                      <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">No favorite vehicles yet</p>
                      <Link to="/inventory">
                        <Button className="bg-gradient-to-r from-ocean-500 to-forest-500">
                          Browse Our Inventory
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {user.favoriteVehicles.map((vehicleId) => (
                        <div key={vehicleId} className="p-4 bg-gradient-to-r from-ocean-50 to-forest-50 rounded-xl border border-ocean-200">
                          <div className="flex items-center justify-between mb-4">
                            <Badge className="bg-gradient-to-r from-ocean-500 to-forest-500 text-white">
                              Favorite
                            </Badge>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-800">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="aspect-video bg-gradient-to-r from-ocean-100 to-forest-100 rounded-lg mb-4 flex items-center justify-center">
                            <Car className="h-12 w-12 text-ocean-600" />
                          </div>
                          <h3 className="font-bold text-gray-900 mb-2">Vehicle #{vehicleId}</h3>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" className="flex-1">
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </Button>
                            <Button size="sm" className="bg-gradient-to-r from-ocean-500 to-forest-500 text-white">
                              <Phone className="h-4 w-4 mr-2" />
                              Inquire
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Inquiries Tab */}
            <TabsContent value="inquiries" className="space-y-6">
              <Card className="rounded-2xl shadow-xl border-2 border-gray-100">
                <CardHeader className="bg-gradient-to-r from-forest-500 to-sunset-500 text-white rounded-t-2xl">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Your Inquiries ({user.inquiries.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {user.inquiries.length === 0 ? (
                    <div className="text-center py-8">
                      <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">No inquiries yet</p>
                      <Link to="/inventory">
                        <Button className="bg-gradient-to-r from-forest-500 to-sunset-500">
                          Start Your Car Search
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {user.inquiries.map((inquiry) => (
                        <div key={inquiry.id} className="p-6 bg-gradient-to-r from-gray-50 to-forest-50 rounded-xl border border-forest-200">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="font-bold text-gray-900 text-lg mb-2">{inquiry.vehicleName}</h3>
                              <Badge className={getStatusColor(inquiry.status)}>
                                {getStatusIcon(inquiry.status)}
                                <span className="ml-2">{inquiry.status}</span>
                              </Badge>
                            </div>
                            <Badge variant="outline" className="capitalize">
                              {inquiry.type.replace('_', ' ')}
                            </Badge>
                          </div>
                          <p className="text-gray-600 mb-4">{inquiry.message}</p>
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <span>Created: {new Date(inquiry.createdAt).toLocaleDateString()}</span>
                            {inquiry.scheduledDate && (
                              <span>Scheduled: {new Date(inquiry.scheduledDate).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}
