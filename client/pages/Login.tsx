import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Car,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/Layout";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const success = await login(email, password);
    if (success) {
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => navigate(from, { replace: true }), 1000);
    } else {
      setError("Invalid email or password. Try: john.doe@email.com / password");
    }
  };

  return (
    <Layout>
      <section className="min-h-screen bg-gradient-to-br from-ocean-50 via-forest-50 to-sunset-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-gradient-to-r from-ocean-500 to-forest-500 rounded-3xl mb-6 shadow-xl">
              <Car className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-lg">
              Sign in to your Alpine Motors account
            </p>
          </div>

          <Card className="shadow-2xl border-2 border-gray-100 rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-ocean-500 to-forest-500 text-white pb-8">
              <CardTitle className="text-2xl font-bold text-center">
                Sign In
              </CardTitle>
              <p className="text-center text-ocean-100 mt-2">
                Access your premium account
              </p>
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
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-ocean-500" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="pl-12 h-14 border-2 border-ocean-200 focus:border-ocean-500 rounded-xl text-lg"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-forest-500" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="pl-12 pr-12 h-14 border-2 border-forest-200 focus:border-forest-500 rounded-xl text-lg"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-ocean-600 focus:ring-ocean-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700 font-medium"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-ocean-600 hover:text-ocean-800 transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 bg-gradient-to-r from-ocean-500 to-forest-500 hover:from-ocean-600 hover:to-forest-600 text-white font-bold text-lg rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  {loading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Signing In...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-center text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="font-bold text-ocean-600 hover:text-ocean-800 transition-colors"
                  >
                    Create Account
                  </Link>
                </p>
              </div>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-gradient-to-r from-gold-50 to-sunset-50 rounded-xl border border-gold-200">
                <h4 className="font-bold text-gold-700 mb-2">
                  Demo Credentials:
                </h4>
                <p className="text-sm text-gold-600">
                  <strong>Email:</strong> john.doe@email.com
                  <br />
                  <strong>Password:</strong> password
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-white rounded-2xl shadow-lg border border-ocean-100">
              <div className="text-2xl mb-2">🚗</div>
              <p className="text-sm font-semibold text-gray-700">
                Vehicle Access
              </p>
            </div>
            <div className="p-4 bg-white rounded-2xl shadow-lg border border-forest-100">
              <div className="text-2xl mb-2">💳</div>
              <p className="text-sm font-semibold text-gray-700">
                Saved Payments
              </p>
            </div>
            <div className="p-4 bg-white rounded-2xl shadow-lg border border-sunset-100">
              <div className="text-2xl mb-2">⭐</div>
              <p className="text-sm font-semibold text-gray-700">Favorites</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
