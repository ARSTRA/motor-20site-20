export interface DemoResponse {
  message: string;
}

// Car related types
export interface Car {
  id: number;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  description: string;
  images: string[];
  category: string;
  featured: boolean;
  status: "available" | "sold" | "pending";
  specifications: {
    engine: string;
    horsepower: string;
    mpg: string;
    drivetrain: string;
    color: string;
    interior: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  count: number;
}

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  carId?: number;
  status: "new" | "read" | "replied" | "resolved";
  createdAt: string;
}

export interface CarInquiry {
  id: number;
  carId: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  inquiryType: "test_drive" | "purchase" | "financing" | "trade_in" | "general";
  message: string;
  preferredDate?: string;
  status: "pending" | "scheduled" | "completed" | "cancelled";
  createdAt: string;
}

// API Response types
export interface CarsResponse {
  cars: Car[];
  total: number;
  page: number;
  limit: number;
  categories: Category[];
}

export interface CarResponse {
  car: Car;
  relatedCars: Car[];
}

export interface CategoriesResponse {
  categories: Category[];
}

export interface MessagesResponse {
  messages: ContactMessage[];
  total: number;
  page: number;
  limit: number;
}

export interface InquiriesResponse {
  inquiries: CarInquiry[];
  total: number;
  page: number;
  limit: number;
}

// Request types
export interface CreateCarRequest {
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuel: string;
  transmission: string;
  description: string;
  images: string[];
  category: string;
  featured: boolean;
  specifications: Car["specifications"];
}

export interface UpdateCarRequest extends Partial<CreateCarRequest> {
  id: number;
}

export interface CreateMessageRequest {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  carId?: number;
}

export interface CreateInquiryRequest {
  carId: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  inquiryType: CarInquiry["inquiryType"];
  message: string;
  preferredDate?: string;
}

export interface CarFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  fuel?: string;
  featured?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: "price" | "year" | "mileage" | "created";
  sortOrder?: "asc" | "desc";
}
