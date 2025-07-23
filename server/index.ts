import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import {
  handleGetCars,
  handleGetCar,
  handleCreateCar,
  handleUpdateCar,
  handleDeleteCar,
  handleGetFeaturedCars
} from "./routes/cars";
import { handleGetCategories, handleGetCategory } from "./routes/categories";
import {
  handleGetMessages,
  handleGetMessage,
  handleCreateMessage,
  handleUpdateMessageStatus,
  handleDeleteMessage,
  handleGetMessageStats
} from "./routes/messages";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    res.json({ message: "Hello from Express server v2!" });
  });

  app.get("/api/demo", handleDemo);

  // Cars API routes
  app.get("/api/cars", handleGetCars);
  app.get("/api/cars/featured", handleGetFeaturedCars);
  app.get("/api/cars/:id", handleGetCar);
  app.post("/api/cars", handleCreateCar);
  app.put("/api/cars/:id", handleUpdateCar);
  app.delete("/api/cars/:id", handleDeleteCar);

  // Categories API routes
  app.get("/api/categories", handleGetCategories);
  app.get("/api/categories/:slug", handleGetCategory);

  // Messages API routes
  app.get("/api/messages", handleGetMessages);
  app.get("/api/messages/stats", handleGetMessageStats);
  app.get("/api/messages/:id", handleGetMessage);
  app.post("/api/messages", handleCreateMessage);
  app.put("/api/messages/:id/status", handleUpdateMessageStatus);
  app.delete("/api/messages/:id", handleDeleteMessage);

  return app;
}
