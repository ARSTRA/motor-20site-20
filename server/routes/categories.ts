import { RequestHandler } from "express";
import { Category, CategoriesResponse } from "@shared/api";

const categories: Category[] = [
  {
    id: 1,
    name: "Luxury SUVs",
    slug: "luxury-suv",
    description: "Premium SUVs with luxury features and advanced technology",
    icon: "🚙",
    color: "bg-blue-500",
    count: 15,
  },
  {
    id: 2,
    name: "Luxury Sedans",
    slug: "luxury-sedan",
    description: "Premium sedans with comfort, style, and performance",
    icon: "🚗",
    color: "bg-green-500",
    count: 24,
  },
  {
    id: 3,
    name: "Sports Cars",
    slug: "sports-car",
    description: "High-performance sports vehicles for driving enthusiasts",
    icon: "🏎️",
    color: "bg-red-500",
    count: 12,
  },
  {
    id: 4,
    name: "Electric Vehicles",
    slug: "electric",
    description: "Eco-friendly electric cars with cutting-edge technology",
    icon: "⚡",
    color: "bg-yellow-500",
    count: 8,
  },
  {
    id: 5,
    name: "Trucks",
    slug: "trucks",
    description: "Powerful pickup trucks for work and adventure",
    icon: "🚚",
    color: "bg-gray-500",
    count: 15,
  },
  {
    id: 6,
    name: "Convertibles",
    slug: "convertibles",
    description: "Open-top driving experience with style and freedom",
    icon: "🏖️",
    color: "bg-purple-500",
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
