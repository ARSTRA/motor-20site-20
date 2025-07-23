import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Inventory from "./pages/Inventory";
import Contact from "./pages/Contact";
import Admin from "./pages/Admin";
import CategoryPage from "./pages/CategoryPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/financing" element={<PlaceholderPage title="Financing Options" description="Explore our flexible financing solutions and get pre-approved today." />} />
          <Route path="/trade-in" element={<PlaceholderPage title="Trade-In Services" description="Get top value for your current vehicle with our trade-in program." />} />
          <Route path="/category/:category" element={<PlaceholderPage title="Vehicle Category" description="Browse vehicles in this specific category." />} />
          <Route path="/car/:id" element={<PlaceholderPage title="Vehicle Details" description="Detailed information about this specific vehicle." />} />
          <Route path="/privacy" element={<PlaceholderPage title="Privacy Policy" description="Our commitment to protecting your privacy and data." />} />
          <Route path="/terms" element={<PlaceholderPage title="Terms of Service" description="Terms and conditions for using our services." />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
