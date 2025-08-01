import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Car } from "@shared/api";

interface CartItem {
  car: Car;
  quantity: number;
  addedAt: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (car: Car) => void;
  removeFromCart: (carId: number) => void;
  updateQuantity: (carId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isInCart: (carId: number) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("alpineMotorsCart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("alpineMotorsCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (car: Car) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.car.id === car.id);
      
      if (existingItem) {
        // If item already exists, increase quantity
        return prevItems.map((item) =>
          item.car.id === car.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Add new item to cart
        return [
          ...prevItems,
          {
            car,
            quantity: 1,
            addedAt: new Date().toISOString(),
          },
        ];
      }
    });
  };

  const removeFromCart = (carId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.car.id !== carId));
  };

  const updateQuantity = (carId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(carId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.car.id === carId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.car.price * item.quantity, 0);
  };

  const isInCart = (carId: number) => {
    return cartItems.some((item) => item.car.id === carId);
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
