import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calculator,
  DollarSign,
  CreditCard,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle,
  Star,
  Phone,
  Mail,
  FileText,
  Percent,
  Car,
  PiggyBank,
  Banknote,
  AlertCircle,
  Users,
  Award,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Layout from "@/components/Layout";

export default function Financing() {
  const [loanAmount, setLoanAmount] = useState([75000]);
  const [downPayment, setDownPayment] = useState([15000]);
  const [loanTerm, setLoanTerm] = useState([60]);
  const [creditScore, setCreditScore] = useState("excellent");
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  // Pre-approval form state
  const [preApprovalForm, setPreApprovalForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    annualIncome: "",
    employmentType: "",
    ssn: "",
    dateOfBirth: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    housingStatus: "",
  });

  const [showResults, setShowResults] = useState(false);

  // Calculate monthly payment
  const calculatePayment = () => {
    const principal = loanAmount[0] - downPayment[0];
    const months = loanTerm[0];

    // Interest rates based on credit score
    const interestRates = {
      excellent: 0.0349, // 3.49%
      good: 0.0449, // 4.49%
      fair: 0.0649, // 6.49%
      poor: 0.0849, // 8.49%
    };

    const monthlyRate =
      interestRates[creditScore as keyof typeof interestRates] / 12;
    const payment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);

    setMonthlyPayment(Math.round(payment));
  };

  const handlePreApprovalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const financingOptions = [
    {
      title: "Traditional Auto Loan",
      description: "Competitive rates with flexible terms",
      rate: "From 3.49% APR",
      term: "24-84 months",
      icon: <Banknote className="h-8 w-8" />,
      color: "from-ocean-500 to-ocean-600",
      features: [
        "No prepayment penalties",
        "Fixed interest rates",
        "Online account management",
      ],
    },
    {
      title: "Luxury Lease Program",
      description: "Drive the latest models with lower monthly payments",
      rate: "From $599/month",
      term: "24-48 months",
      icon: <Car className="h-8 w-8" />,
      color: "from-forest-500 to-forest-600",
      features: [
        "Lower monthly payments",
        "Warranty coverage included",
        "Upgrade options available",
      ],
    },
    {
      title: "Certified Pre-Owned",
      description: "Special financing for certified vehicles",
      rate: "From 2.99% APR",
      term: "12-72 months",
      icon: <Award className="h-8 w-8" />,
      color: "from-sunset-500 to-sunset-600",
      features: [
        "Extended warranty",
        "Rigorous inspection",
        "Roadside assistance",
      ],
    },
    {
      title: "Cash Purchase Incentives",
      description: "Special discounts for cash buyers",
      rate: "Up to $5,000 off",
      term: "Immediate",
      icon: <PiggyBank className="h-8 w-8" />,
      color: "from-gold-500 to-gold-600",
      features: [
        "No financing fees",
        "Immediate ownership",
        "Negotiation advantages",
      ],
    },
  ];

  const benefits = [
    {
      icon: <Shield className="h-12 w-12 text-ocean-500" />,
      title: "Secure & Confidential",
      description: "Your information is protected with bank-level security",
    },
    {
      icon: <Clock className="h-12 w-12 text-forest-500" />,
      title: "Quick Approval",
      description: "Get pre-approved in minutes, not hours",
    },
    {
      icon: <Star className="h-12 w-12 text-sunset-500" />,
      title: "Competitive Rates",
      description: "Access to exclusive rates and special offers",
    },
    {
      icon: <Users className="h-12 w-12 text-gold-500" />,
      title: "Expert Support",
      description: "Dedicated financing specialists to guide you",
    },
  ];

  const creditScoreRanges = [
    {
      range: "Excellent (750+)",
      rate: "3.49%",
      color: "text-green-600 bg-green-50",
    },
    {
      range: "Good (700-749)",
      rate: "4.49%",
      color: "text-blue-600 bg-blue-50",
    },
    {
      range: "Fair (650-699)",
      rate: "6.49%",
      color: "text-yellow-600 bg-yellow-50",
    },
    {
      range: "Poor (Below 650)",
      rate: "8.49%",
      color: "text-red-600 bg-red-50",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative text-white py-32 overflow-hidden min-h-[700px] flex items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/7144199/pexels-photo-7144199.jpeg)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-ocean-900/70 to-forest-900/80"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40"></div>
        </div>

        {/* Enhanced floating elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-r from-gold-400 to-sunset-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-56 h-56 bg-gradient-to-r from-ocean-400 to-forest-400 rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>
          <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-gradient-to-r from-forest-400 to-gold-400 rounded-full blur-3xl animate-pulse [animation-delay:2s]"></div>
          <div className="absolute top-20 right-1/4 w-24 h-24 bg-gradient-to-r from-sunset-400 to-ocean-400 rounded-full blur-2xl animate-pulse [animation-delay:3s]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-block p-8 bg-gradient-to-r from-gold-500/20 via-sunset-500/20 to-ocean-500/20 backdrop-blur-sm rounded-full mb-8 border-2 border-white/30 shadow-2xl">
                <Calculator className="h-20 w-20 text-white mx-auto" />
              </div>
            </div>
            <Badge
              className="mb-6 bg-gradient-to-r from-gold-500/90 to-sunset-500/90 text-white border-white/40 px-8 py-4 text-xl font-bold shadow-2xl backdrop-blur-sm"
            >
              <DollarSign className="h-5 w-5 mr-2" />
              Flexible Financing Solutions
            </Badge>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="text-white drop-shadow-2xl">Drive Your Dream</span>
              <span className="bg-gradient-to-r from-gold-300 via-sunset-300 to-gold-400 bg-clip-text text-transparent block drop-shadow-lg">
                Today
              </span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-100 mb-12 max-w-5xl mx-auto leading-relaxed drop-shadow-lg">
              Transform your automotive dreams into reality with our comprehensive financing solutions.
              Whether you're seeking traditional loans, luxury leasing, or certified pre-owned financing,
              our expert team delivers personalized options with competitive rates and unmatched service.
              Get pre-approved in under 2 minutes and experience the Alpine Motors difference.
            </p>
            <div className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-12">
              <Button
                size="lg"
                className="text-xl px-12 py-6 bg-white text-ocean-600 hover:bg-gray-100 font-bold rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                <Zap className="h-6 w-6 mr-3" />
                Get Pre-Approved Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-xl px-12 py-6 border-2 border-gold-300 text-gold-300 hover:bg-gold-300 hover:text-ocean-900 font-bold rounded-3xl transition-all duration-300"
              >
                <Calculator className="h-6 w-6 mr-3" />
                Calculate Payment
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-bold text-gold-300 mb-2">
                  3.49%
                </div>
                <div className="text-ocean-100">Starting APR</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-bold text-gold-300 mb-2">
                  2 Min
                </div>
                <div className="text-ocean-100">Pre-Approval</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-4xl font-bold text-gold-300 mb-2">95%</div>
                <div className="text-ocean-100">Approval Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financing Calculator */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-ocean-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="mb-4 text-ocean-600 border-ocean-300 px-4 py-2"
            >
              Payment Calculator
            </Badge>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent mb-4">
              Calculate Your Monthly Payment
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Use our advanced calculator to estimate your monthly payments and
              find the perfect financing solution
            </p>
          </div>

          <Card className="shadow-2xl border-2 border-gray-100 rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-ocean-500 to-forest-500 text-white">
              <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-3">
                <Calculator className="h-6 w-6" />
                Financing Calculator
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Calculator Controls */}
                <div className="space-y-8">
                  <div>
                    <Label className="text-lg font-bold text-gray-700 mb-4 block">
                      Vehicle Price: ${loanAmount[0].toLocaleString()}
                    </Label>
                    <Slider
                      value={loanAmount}
                      onValueChange={(value) =>
                        setLoanAmount(value as [number])
                      }
                      max={300000}
                      min={20000}
                      step={5000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>$20,000</span>
                      <span>$300,000</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-lg font-bold text-gray-700 mb-4 block">
                      Down Payment: ${downPayment[0].toLocaleString()}
                    </Label>
                    <Slider
                      value={downPayment}
                      onValueChange={(value) =>
                        setDownPayment(value as [number])
                      }
                      max={loanAmount[0] * 0.5}
                      min={0}
                      step={1000}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>$0</span>
                      <span>
                        ${Math.round(loanAmount[0] * 0.5).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-lg font-bold text-gray-700 mb-4 block">
                      Loan Term: {loanTerm[0]} months
                    </Label>
                    <Slider
                      value={loanTerm}
                      onValueChange={(value) => setLoanTerm(value as [number])}
                      max={84}
                      min={24}
                      step={12}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                      <span>24 months</span>
                      <span>84 months</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-lg font-bold text-gray-700 mb-4 block">
                      Credit Score Range
                    </Label>
                    <Select value={creditScore} onValueChange={setCreditScore}>
                      <SelectTrigger className="border-2 border-ocean-200 rounded-xl">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">
                          Excellent (750+)
                        </SelectItem>
                        <SelectItem value="good">Good (700-749)</SelectItem>
                        <SelectItem value="fair">Fair (650-699)</SelectItem>
                        <SelectItem value="poor">Poor (Below 650)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    onClick={calculatePayment}
                    className="w-full bg-gradient-to-r from-ocean-500 to-forest-500 hover:from-ocean-600 hover:to-forest-600 text-white font-bold py-4 rounded-xl text-lg"
                  >
                    Calculate Payment
                  </Button>
                </div>

                {/* Results */}
                <div className="bg-gradient-to-br from-ocean-50 to-forest-50 rounded-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                    Payment Breakdown
                  </h3>

                  <div className="space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                      <div className="text-center">
                        <div className="text-4xl font-bold bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent mb-2">
                          ${monthlyPayment.toLocaleString()}
                        </div>
                        <div className="text-gray-600">
                          Estimated Monthly Payment
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-ocean-600">
                          ${(loanAmount[0] - downPayment[0]).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">Loan Amount</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-forest-600">
                          $
                          {(
                            monthlyPayment * loanTerm[0] -
                            (loanAmount[0] - downPayment[0])
                          ).toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                          Total Interest
                        </div>
                      </div>
                    </div>

                    <Alert className="border-gold-200 bg-gold-50">
                      <AlertCircle className="h-4 w-4 text-gold-600" />
                      <AlertDescription className="text-gold-800">
                        This is an estimate. Actual rates may vary based on
                        credit approval and vehicle selection.
                      </AlertDescription>
                    </Alert>

                    <Button className="w-full bg-gradient-to-r from-sunset-500 to-gold-500 hover:from-sunset-600 hover:to-gold-600 text-white font-bold py-3 rounded-xl">
                      Get Pre-Approved for This Amount
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Financing Options */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="mb-4 text-forest-600 border-forest-300 px-4 py-2"
            >
              Financing Solutions
            </Badge>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-forest-600 to-sunset-600 bg-clip-text text-transparent mb-4">
              Choose Your Perfect Financing Option
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We offer a variety of financing solutions to fit every budget and
              lifestyle preference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {financingOptions.map((option, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-3xl border-2 border-transparent hover:border-ocean-200"
              >
                <CardHeader
                  className={`bg-gradient-to-r ${option.color} text-white rounded-t-3xl p-6`}
                >
                  <div className="text-center">
                    <div className="mb-4 flex justify-center">
                      {option.icon}
                    </div>
                    <CardTitle className="text-xl font-bold">
                      {option.title}
                    </CardTitle>
                    <p className="text-sm opacity-90 mt-2">
                      {option.description}
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {option.rate}
                    </div>
                    <div className="text-gray-600">{option.term}</div>
                  </div>
                  <div className="space-y-3">
                    {option.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-6 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pre-Approval Form */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-sunset-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="mb-4 text-sunset-600 border-sunset-300 px-4 py-2"
            >
              Get Pre-Approved
            </Badge>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-sunset-600 to-gold-600 bg-clip-text text-transparent mb-4">
              Fast & Secure Pre-Approval
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get pre-approved in minutes and shop with confidence knowing your
              budget
            </p>
          </div>

          <Card className="shadow-2xl border-2 border-gray-100 rounded-3xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-sunset-500 to-gold-500 text-white">
              <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-3">
                <FileText className="h-6 w-6" />
                Pre-Approval Application
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {!showResults ? (
                <form onSubmit={handlePreApprovalSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={preApprovalForm.firstName}
                        onChange={(e) =>
                          setPreApprovalForm({
                            ...preApprovalForm,
                            firstName: e.target.value,
                          })
                        }
                        className="mt-2 border-2 border-sunset-200 focus:border-sunset-500 rounded-xl"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={preApprovalForm.lastName}
                        onChange={(e) =>
                          setPreApprovalForm({
                            ...preApprovalForm,
                            lastName: e.target.value,
                          })
                        }
                        className="mt-2 border-2 border-sunset-200 focus:border-sunset-500 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={preApprovalForm.email}
                        onChange={(e) =>
                          setPreApprovalForm({
                            ...preApprovalForm,
                            email: e.target.value,
                          })
                        }
                        className="mt-2 border-2 border-ocean-200 focus:border-ocean-500 rounded-xl"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={preApprovalForm.phone}
                        onChange={(e) =>
                          setPreApprovalForm({
                            ...preApprovalForm,
                            phone: e.target.value,
                          })
                        }
                        className="mt-2 border-2 border-forest-200 focus:border-forest-500 rounded-xl"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="annualIncome">Annual Income *</Label>
                      <Input
                        id="annualIncome"
                        type="number"
                        value={preApprovalForm.annualIncome}
                        onChange={(e) =>
                          setPreApprovalForm({
                            ...preApprovalForm,
                            annualIncome: e.target.value,
                          })
                        }
                        className="mt-2 border-2 border-gold-200 focus:border-gold-500 rounded-xl"
                        placeholder="$75,000"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="employmentType">Employment Type *</Label>
                      <Select
                        value={preApprovalForm.employmentType}
                        onValueChange={(value) =>
                          setPreApprovalForm({
                            ...preApprovalForm,
                            employmentType: value,
                          })
                        }
                      >
                        <SelectTrigger className="mt-2 border-2 border-sunset-200 focus:border-sunset-500 rounded-xl">
                          <SelectValue placeholder="Select employment type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="full-time">
                            Full-time Employee
                          </SelectItem>
                          <SelectItem value="part-time">
                            Part-time Employee
                          </SelectItem>
                          <SelectItem value="self-employed">
                            Self-employed
                          </SelectItem>
                          <SelectItem value="retired">Retired</SelectItem>
                          <SelectItem value="student">Student</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Alert className="border-blue-200 bg-blue-50">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <AlertDescription className="text-blue-800">
                      Your information is secure and will only be used for
                      pre-approval processing. We never share your personal
                      data.
                    </AlertDescription>
                  </Alert>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-sunset-500 to-gold-500 hover:from-sunset-600 hover:to-gold-600 text-white font-bold py-4 rounded-xl text-lg"
                  >
                    Submit Pre-Approval Application
                  </Button>
                </form>
              ) : (
                <div className="text-center space-y-6">
                  <div className="inline-block p-6 bg-green-100 rounded-full mb-6">
                    <CheckCircle className="h-16 w-16 text-green-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-green-600 mb-4">
                    Congratulations!
                  </h3>
                  <p className="text-xl text-gray-700 mb-6">
                    You've been pre-approved for up to{" "}
                    <span className="font-bold text-green-600">
                      ${loanAmount[0].toLocaleString()}
                    </span>
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          3.49%
                        </div>
                        <div className="text-sm text-gray-600">Your Rate</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          ${monthlyPayment}
                        </div>
                        <div className="text-sm text-gray-600">
                          Est. Monthly
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-600">
                          7 Days
                        </div>
                        <div className="text-sm text-gray-600">Rate Lock</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 justify-center">
                    <Link to="/inventory">
                      <Button className="bg-gradient-to-r from-ocean-500 to-forest-500 text-white px-8 py-3 rounded-xl">
                        Shop Vehicles Now
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="border-2 border-sunset-500 text-sunset-600 px-8 py-3 rounded-xl"
                    >
                      Save Pre-Approval
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-ocean-600 to-forest-600 bg-clip-text text-transparent mb-4">
              Why Choose Alpine Motors Financing?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the difference of working with a trusted luxury
              automotive financing partner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="text-center p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl border-2 border-gray-100"
              >
                <CardContent className="p-0">
                  <div className="mb-6 flex justify-center">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Credit Score Information */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-forest-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <Badge
              variant="outline"
              className="mb-4 text-forest-600 border-forest-300 px-4 py-2"
            >
              Credit Information
            </Badge>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-forest-600 to-ocean-600 bg-clip-text text-transparent mb-4">
              Know Your Credit Score Benefits
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Understanding your credit score helps you get the best possible
              financing terms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {creditScoreRanges.map((range, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-all duration-300 rounded-2xl"
              >
                <CardContent className="p-6">
                  <div
                    className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold mb-4 ${range.color}`}
                  >
                    {range.range}
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {range.rate}
                    </div>
                    <div className="text-gray-600">Starting APR</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="max-w-2xl mx-auto rounded-2xl border-2 border-blue-200 bg-blue-50">
              <CardContent className="p-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                  <h3 className="text-2xl font-bold text-blue-800">
                    Improve Your Credit Score
                  </h3>
                </div>
                <p className="text-blue-700 mb-6">
                  We can help you understand and improve your credit score for
                  better financing terms
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl">
                  Get Credit Improvement Tips
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-20 bg-gradient-to-br from-ocean-600 via-forest-600 to-sunset-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse absolute top-10 left-10"></div>
            <div className="w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse absolute bottom-10 right-10"></div>
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <div className="mb-8">
            <div className="inline-block p-6 bg-white/10 backdrop-blur-sm rounded-3xl mb-8">
              <span className="text-7xl">🤝</span>
            </div>
          </div>
          <h2 className="text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            Ready to Get
            <span className="bg-gradient-to-r from-gold-300 to-gold-400 bg-clip-text text-transparent block">
              Pre-Approved?
            </span>
          </h2>
          <p className="text-xl lg:text-2xl mb-12 leading-relaxed max-w-3xl mx-auto text-gray-100">
            Our financing specialists are standing by to help you secure the
            perfect loan for your dream vehicle. Get started today and drive
            home tomorrow.
          </p>
          <div className="flex flex-col lg:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              className="text-xl px-12 py-6 bg-white text-ocean-600 hover:bg-gray-100 font-bold rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
            >
              <Phone className="h-5 w-5 mr-3" />
              Call (555) 123-4567
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-xl px-12 py-6 border-2 border-gold-300 text-gold-300 hover:bg-gold-300 hover:text-ocean-900 font-bold rounded-3xl transition-all duration-300"
            >
              <Mail className="h-5 w-5 mr-3" />
              Email a Specialist
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
