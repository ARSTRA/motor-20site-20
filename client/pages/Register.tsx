import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone, Car, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';

export default function Register() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [agreeToNewsletter, setAgreeToNewsletter] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (!agreeToTerms) {
      setError('Please agree to the Terms and Conditions');
      return;
    }

    const success = await register({
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone
    });

    if (success) {
      setSuccess('Account created successfully! Redirecting to dashboard...');
      setTimeout(() => navigate('/dashboard', { replace: true }), 1500);
    } else {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <Layout>
      <section className="min-h-screen bg-gradient-to-br from-ocean-50 via-forest-50 to-sunset-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-lg w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-r from-forest-500 to-sunset-500 rounded-3xl mb-6 shadow-xl">
              <Car className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-forest-600 to-sunset-600 bg-clip-text text-transparent mb-2">
              Join Alpine Motors
            </h1>
            <p className="text-gray-600 text-lg">
              Create your premium account and unlock exclusive benefits
            </p>
          </div>

          <Card className="shadow-2xl border-2 border-gray-100 rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-forest-500 to-sunset-500 text-white pb-8">
              <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
              <p className="text-center text-forest-100 mt-2">Join our exclusive community</p>
            </CardHeader>
            
            <CardContent className="p-8">
              {error && (
                <Alert className="mb-6 border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800 font-medium">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-6 border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800 font-medium">
                    {success}
                  </AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      First Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-forest-500" />
                      <Input
                        type="text"
                        value={formData.firstName}
                        onChange={handleChange('firstName')}
                        placeholder="John"
                        className="pl-12 h-12 border-2 border-forest-200 focus:border-forest-500 rounded-xl"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Last Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-forest-500" />
                      <Input
                        type="text"
                        value={formData.lastName}
                        onChange={handleChange('lastName')}
                        placeholder="Doe"
                        className="pl-12 h-12 border-2 border-forest-200 focus:border-forest-500 rounded-xl"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-ocean-500" />
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={handleChange('email')}
                      placeholder="john.doe@email.com"
                      className="pl-12 h-12 border-2 border-ocean-200 focus:border-ocean-500 rounded-xl"
                      required
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-sunset-500" />
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange('phone')}
                      placeholder="(555) 123-4567"
                      className="pl-12 h-12 border-2 border-sunset-200 focus:border-sunset-500 rounded-xl"
                    />
                  </div>
                </div>

                {/* Password Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gold-500" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange('password')}
                        placeholder="Create password"
                        className="pl-12 pr-12 h-12 border-2 border-gold-200 focus:border-gold-500 rounded-xl"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gold-500" />
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={formData.confirmPassword}
                        onChange={handleChange('confirmPassword')}
                        placeholder="Confirm password"
                        className="pl-12 pr-12 h-12 border-2 border-gold-200 focus:border-gold-500 rounded-xl"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Terms and Newsletter */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="terms"
                      checked={agreeToTerms}
                      onCheckedChange={(checked) => setAgreeToTerms(checked === true)}
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700 leading-relaxed">
                      I agree to the{' '}
                      <Link to="/terms" className="text-ocean-600 hover:text-ocean-800 font-semibold">
                        Terms and Conditions
                      </Link>{' '}
                      and{' '}
                      <Link to="/privacy" className="text-ocean-600 hover:text-ocean-800 font-semibold">
                        Privacy Policy
                      </Link>
                    </label>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="newsletter"
                      checked={agreeToNewsletter}
                      onCheckedChange={(checked) => setAgreeToNewsletter(checked === true)}
                    />
                    <label htmlFor="newsletter" className="text-sm text-gray-700">
                      Send me exclusive offers and automotive news
                    </label>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-gradient-to-r from-forest-500 to-sunset-500 hover:from-forest-600 hover:to-sunset-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Creating Account...
                    </div>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-center text-gray-600">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-bold text-forest-600 hover:text-forest-800 transition-colors"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="p-6 bg-white rounded-2xl shadow-lg border border-forest-100">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-bold text-gray-800 mb-2">Personalized Experience</h3>
              <p className="text-sm text-gray-600">Get vehicle recommendations tailored to your preferences</p>
            </div>
            <div className="p-6 bg-white rounded-2xl shadow-lg border border-sunset-100">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-bold text-gray-800 mb-2">Priority Access</h3>
              <p className="text-sm text-gray-600">Early access to new arrivals and exclusive deals</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
