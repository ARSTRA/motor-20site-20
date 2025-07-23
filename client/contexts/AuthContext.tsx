import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  joinDate: string;
  preferences: {
    newsletter: boolean;
    notifications: boolean;
    darkMode: boolean;
  };
  paymentMethods: PaymentMethod[];
  favoriteVehicles: number[];
  inquiries: Inquiry[];
}

export interface PaymentMethod {
  id: number;
  type: 'credit' | 'debit';
  last4: string;
  brand: string;
  expiryMonth: number;
  expiryYear: number;
  isDefault: boolean;
}

export interface Inquiry {
  id: number;
  vehicleId: number;
  vehicleName: string;
  type: 'test_drive' | 'purchase' | 'financing' | 'trade_in';
  message: string;
  status: 'pending' | 'scheduled' | 'completed' | 'cancelled';
  createdAt: string;
  scheduledDate?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<boolean>;
  addPaymentMethod: (paymentMethod: Omit<PaymentMethod, 'id'>) => Promise<boolean>;
  removePaymentMethod: (id: number) => Promise<boolean>;
  addToFavorites: (vehicleId: number) => Promise<boolean>;
  removeFromFavorites: (vehicleId: number) => Promise<boolean>;
  createInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt'>) => Promise<boolean>;
  loading: boolean;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Mock user data for demonstration
const mockUser: User = {
  id: 1,
  email: 'john.doe@email.com',
  firstName: 'John',
  lastName: 'Doe',
  phone: '(555) 123-4567',
  address: '123 Alpine Drive',
  city: 'Mountain View',
  state: 'CA',
  zipCode: '94041',
  joinDate: '2023-01-15',
  preferences: {
    newsletter: true,
    notifications: true,
    darkMode: false
  },
  paymentMethods: [
    {
      id: 1,
      type: 'credit',
      last4: '4242',
      brand: 'Visa',
      expiryMonth: 12,
      expiryYear: 2027,
      isDefault: true
    },
    {
      id: 2,
      type: 'credit',
      last4: '5555',
      brand: 'Mastercard',
      expiryMonth: 6,
      expiryYear: 2026,
      isDefault: false
    }
  ],
  favoriteVehicles: [1, 3],
  inquiries: [
    {
      id: 1,
      vehicleId: 1,
      vehicleName: '2024 BMW X5 M Competition',
      type: 'test_drive',
      message: 'I would like to schedule a test drive for this weekend.',
      status: 'scheduled',
      createdAt: '2024-01-20T10:00:00Z',
      scheduledDate: '2024-01-27T14:00:00Z'
    },
    {
      id: 2,
      vehicleId: 3,
      vehicleName: '2024 Porsche 911 Turbo S',
      type: 'purchase',
      message: 'Interested in purchasing. Please provide financing options.',
      status: 'pending',
      createdAt: '2024-01-18T15:30:00Z'
    }
  ]
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('alpine_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock authentication - in real app, this would be an API call
      if (email === 'john.doe@email.com' && password === 'password') {
        setUser(mockUser);
        localStorage.setItem('alpine_user', JSON.stringify(mockUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: RegisterData): Promise<boolean> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registration
      const newUser: User = {
        id: Date.now(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        joinDate: new Date().toISOString(),
        preferences: {
          newsletter: true,
          notifications: true,
          darkMode: false
        },
        paymentMethods: [],
        favoriteVehicles: [],
        inquiries: []
      };
      
      setUser(newUser);
      localStorage.setItem('alpine_user', JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('alpine_user');
  };

  const updateProfile = async (userData: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('alpine_user', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const addPaymentMethod = async (paymentMethod: Omit<PaymentMethod, 'id'>): Promise<boolean> => {
    if (!user) return false;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newPaymentMethod = { ...paymentMethod, id: Date.now() };
      const updatedUser = {
        ...user,
        paymentMethods: [...user.paymentMethods, newPaymentMethod]
      };
      setUser(updatedUser);
      localStorage.setItem('alpine_user', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Add payment method error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removePaymentMethod = async (id: number): Promise<boolean> => {
    if (!user) return false;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedUser = {
        ...user,
        paymentMethods: user.paymentMethods.filter(pm => pm.id !== id)
      };
      setUser(updatedUser);
      localStorage.setItem('alpine_user', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Remove payment method error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (vehicleId: number): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const updatedUser = {
        ...user,
        favoriteVehicles: [...user.favoriteVehicles, vehicleId]
      };
      setUser(updatedUser);
      localStorage.setItem('alpine_user', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Add to favorites error:', error);
      return false;
    }
  };

  const removeFromFavorites = async (vehicleId: number): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const updatedUser = {
        ...user,
        favoriteVehicles: user.favoriteVehicles.filter(id => id !== vehicleId)
      };
      setUser(updatedUser);
      localStorage.setItem('alpine_user', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Remove from favorites error:', error);
      return false;
    }
  };

  const createInquiry = async (inquiry: Omit<Inquiry, 'id' | 'createdAt'>): Promise<boolean> => {
    if (!user) return false;
    
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newInquiry: Inquiry = {
        ...inquiry,
        id: Date.now(),
        createdAt: new Date().toISOString()
      };
      
      const updatedUser = {
        ...user,
        inquiries: [newInquiry, ...user.inquiries]
      };
      setUser(updatedUser);
      localStorage.setItem('alpine_user', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Create inquiry error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    updateProfile,
    addPaymentMethod,
    removePaymentMethod,
    addToFavorites,
    removeFromFavorites,
    createInquiry,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
