import { RequestHandler } from "express";
import { Car, CarsResponse, CarResponse, CreateCarRequest, UpdateCarRequest, CarFilters } from "@shared/api";

// Mock database - in a real app, this would be a database
const mockCars: Car[] = [
  {
    id: 1,
    name: "2024 BMW X5 M Competition",
    brand: "BMW",
    model: "X5 M Competition",
    year: 2024,
    price: 125000,
    mileage: 0,
    fuel: "Gas",
    transmission: "Automatic",
    description: "Ultimate luxury SUV with unmatched performance and cutting-edge technology. Perfect blend of comfort and power.",
    images: ["/api/placeholder/800/600", "/api/placeholder/800/600", "/api/placeholder/800/600"],
    category: "luxury-suv",
    featured: true,
    status: "available",
    specifications: {
      engine: "4.4L Twin-Turbo V8",
      horsepower: "617 HP",
      mpg: "15/21 MPG",
      drivetrain: "AWD",
      color: "Alpine White",
      interior: "Black Leather"
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 2,
    name: "2023 Mercedes-Benz S-Class",
    brand: "Mercedes-Benz",
    model: "S-Class",
    year: 2023,
    price: 110000,
    mileage: 5200,
    fuel: "Hybrid",
    transmission: "Automatic",
    description: "The pinnacle of luxury and technology. Exceptional comfort with innovative features.",
    images: ["/api/placeholder/800/600", "/api/placeholder/800/600"],
    category: "luxury-sedan",
    featured: true,
    status: "available",
    specifications: {
      engine: "3.0L Turbo I6 + Electric",
      horsepower: "429 HP",
      mpg: "25/35 MPG",
      drivetrain: "RWD",
      color: "Obsidian Black",
      interior: "Beige Leather"
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 3,
    name: "2024 Porsche 911 Turbo S",
    brand: "Porsche",
    model: "911 Turbo S",
    year: 2024,
    price: 230000,
    mileage: 1200,
    fuel: "Gas",
    transmission: "Automatic",
    description: "Legendary sports car performance with timeless design and incredible engineering.",
    images: ["/api/placeholder/800/600", "/api/placeholder/800/600", "/api/placeholder/800/600", "/api/placeholder/800/600"],
    category: "sports-car",
    featured: true,
    status: "available",
    specifications: {
      engine: "3.8L Twin-Turbo H6",
      horsepower: "640 HP",
      mpg: "18/24 MPG",
      drivetrain: "AWD",
      color: "Guards Red",
      interior: "Black Leather"
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 4,
    name: "2024 Tesla Model S Plaid",
    brand: "Tesla",
    model: "Model S Plaid",
    year: 2024,
    price: 89990,
    mileage: 2100,
    fuel: "Electric",
    transmission: "Automatic",
    description: "Revolutionary electric performance sedan with incredible acceleration and range.",
    images: ["/api/placeholder/800/600", "/api/placeholder/800/600"],
    category: "electric",
    featured: false,
    status: "available",
    specifications: {
      engine: "Tri Motor Electric",
      horsepower: "1020 HP",
      mpg: "120 MPGe",
      drivetrain: "AWD",
      color: "Pearl White",
      interior: "Black Premium"
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: 5,
    name: "2023 Range Rover Sport",
    brand: "Land Rover",
    model: "Range Rover Sport",
    year: 2023,
    price: 95000,
    mileage: 8500,
    fuel: "Gas",
    transmission: "Automatic",
    description: "Luxury SUV with exceptional off-road capability and refined on-road manners.",
    images: ["/api/placeholder/800/600", "/api/placeholder/800/600", "/api/placeholder/800/600"],
    category: "luxury-suv",
    featured: false,
    status: "available",
    specifications: {
      engine: "3.0L Turbo I6",
      horsepower: "395 HP",
      mpg: "19/25 MPG",
      drivetrain: "AWD",
      color: "Santorini Black",
      interior: "Tan Leather"
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

const categories = [
  { id: 1, name: "Luxury SUVs", slug: "luxury-suv", description: "Premium SUVs with luxury features", icon: "🚙", color: "bg-blue-500", count: 2 },
  { id: 2, name: "Luxury Sedans", slug: "luxury-sedan", description: "Premium sedans with comfort and style", icon: "🚗", color: "bg-green-500", count: 1 },
  { id: 3, name: "Sports Cars", slug: "sports-car", description: "High-performance sports vehicles", icon: "🏎️", color: "bg-red-500", count: 1 },
  { id: 4, name: "Electric Vehicles", slug: "electric", description: "Eco-friendly electric cars", icon: "⚡", color: "bg-yellow-500", count: 1 },
  { id: 5, name: "Trucks", slug: "trucks", description: "Powerful pickup trucks", icon: "🚚", color: "bg-gray-500", count: 0 },
  { id: 6, name: "Convertibles", slug: "convertibles", description: "Open-top driving experience", icon: "🏖️", color: "bg-purple-500", count: 0 }
];

// Get all cars with filtering
export const handleGetCars: RequestHandler = (req, res) => {
  const filters: CarFilters = req.query;
  let filteredCars = [...mockCars];

  // Apply filters
  if (filters.category) {
    filteredCars = filteredCars.filter(car => car.category === filters.category);
  }
  if (filters.brand) {
    filteredCars = filteredCars.filter(car => car.brand.toLowerCase() === filters.brand.toLowerCase());
  }
  if (filters.minPrice) {
    filteredCars = filteredCars.filter(car => car.price >= Number(filters.minPrice));
  }
  if (filters.maxPrice) {
    filteredCars = filteredCars.filter(car => car.price <= Number(filters.maxPrice));
  }
  if (filters.minYear) {
    filteredCars = filteredCars.filter(car => car.year >= Number(filters.minYear));
  }
  if (filters.maxYear) {
    filteredCars = filteredCars.filter(car => car.year <= Number(filters.maxYear));
  }
  if (filters.fuel) {
    filteredCars = filteredCars.filter(car => car.fuel.toLowerCase() === filters.fuel.toLowerCase());
  }
  if (filters.featured !== undefined) {
    filteredCars = filteredCars.filter(car => car.featured === (filters.featured === 'true'));
  }
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filteredCars = filteredCars.filter(car => 
      car.name.toLowerCase().includes(searchTerm) ||
      car.brand.toLowerCase().includes(searchTerm) ||
      car.model.toLowerCase().includes(searchTerm) ||
      car.description.toLowerCase().includes(searchTerm)
    );
  }

  // Apply sorting
  if (filters.sortBy) {
    filteredCars.sort((a, b) => {
      const order = filters.sortOrder === 'desc' ? -1 : 1;
      switch (filters.sortBy) {
        case 'price':
          return (a.price - b.price) * order;
        case 'year':
          return (a.year - b.year) * order;
        case 'mileage':
          return (a.mileage - b.mileage) * order;
        case 'created':
          return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * order;
        default:
          return 0;
      }
    });
  }

  // Apply pagination
  const page = Number(filters.page) || 1;
  const limit = Number(filters.limit) || 12;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedCars = filteredCars.slice(startIndex, endIndex);

  const response: CarsResponse = {
    cars: paginatedCars,
    total: filteredCars.length,
    page,
    limit,
    categories
  };

  res.json(response);
};

// Get single car by ID
export const handleGetCar: RequestHandler = (req, res) => {
  const carId = Number(req.params.id);
  const car = mockCars.find(c => c.id === carId);
  
  if (!car) {
    return res.status(404).json({ error: "Car not found" });
  }

  // Get related cars (same category, excluding current car)
  const relatedCars = mockCars
    .filter(c => c.id !== carId && c.category === car.category)
    .slice(0, 3);

  const response: CarResponse = {
    car,
    relatedCars
  };

  res.json(response);
};

// Create new car (Admin only)
export const handleCreateCar: RequestHandler = (req, res) => {
  const carData: CreateCarRequest = req.body;
  
  const newCar: Car = {
    ...carData,
    id: Math.max(...mockCars.map(c => c.id)) + 1,
    status: 'available',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  mockCars.push(newCar);
  res.status(201).json(newCar);
};

// Update car (Admin only)
export const handleUpdateCar: RequestHandler = (req, res) => {
  const carId = Number(req.params.id);
  const updates: UpdateCarRequest = req.body;
  
  const carIndex = mockCars.findIndex(c => c.id === carId);
  if (carIndex === -1) {
    return res.status(404).json({ error: "Car not found" });
  }

  mockCars[carIndex] = {
    ...mockCars[carIndex],
    ...updates,
    id: carId, // Ensure ID doesn't change
    updatedAt: new Date().toISOString()
  };

  res.json(mockCars[carIndex]);
};

// Delete car (Admin only)
export const handleDeleteCar: RequestHandler = (req, res) => {
  const carId = Number(req.params.id);
  const carIndex = mockCars.findIndex(c => c.id === carId);
  
  if (carIndex === -1) {
    return res.status(404).json({ error: "Car not found" });
  }

  mockCars.splice(carIndex, 1);
  res.status(204).send();
};

// Get featured cars
export const handleGetFeaturedCars: RequestHandler = (req, res) => {
  const featuredCars = mockCars.filter(car => car.featured);
  res.json({ cars: featuredCars });
};
