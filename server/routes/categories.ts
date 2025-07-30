import { RequestHandler } from "express";
import { Category, CategoriesResponse } from "@shared/api";

const categories: Category[] = [
  {
    id: 1,
    name: "Luxury SUVs",
    slug: "luxury-suv",
    description: "Premium SUVs with luxury features and advanced technology",
    icon: "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg",
    color: "from-ocean-500 to-ocean-600",
    count: 15,
  },
  {
    id: 2,
    name: "Luxury Sedans",
    slug: "luxury-sedan",
    description: "Premium sedans with comfort, style, and performance",
    icon: "https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg",
    color: "from-forest-500 to-forest-600",
    count: 24,
  },
  {
    id: 3,
    name: "Sports Cars",
    slug: "sports-car",
    description: "High-performance sports vehicles for driving enthusiasts",
    icon: "https://images.pexels.com/photos/2127039/pexels-photo-2127039.jpeg",
    color: "from-sunset-500 to-sunset-600",
    count: 12,
  },
  {
    id: 4,
    name: "Electric Vehicles",
    slug: "electric",
    description: "Eco-friendly electric cars with cutting-edge technology",
    icon: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg",
    color: "from-gold-500 to-gold-600",
    count: 8,
  },
  {
    id: 5,
    name: "Trucks",
    slug: "trucks",
    description: "Powerful pickup trucks for work and adventure",
    icon: "https://images.pexels.com/photos/1335077/pexels-photo-1335077.jpeg",
    color: "from-gray-600 to-gray-700",
    count: 15,
  },
  {
    id: 6,
    name: "Convertibles",
    slug: "convertibles",
    description: "Open-top driving experience with style and freedom",
    icon: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg",
    color: "from-purple-500 to-purple-600",
    count: 6,
  },
];

// Get all categories
export const handleGetCategories: RequestHandler = (req, res) => {
  const response: CategoriesResponse = {
    categories,
  };
  res.json(response);
};

// Get category by slug
export const handleGetCategory: RequestHandler = (req, res) => {
  const slug = req.params.slug;
  const category = categories.find((c) => c.slug === slug);

  if (!category) {
    return res.status(404).json({ error: "Category not found" });
  }

  res.json(category);
};
