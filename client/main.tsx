import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const rootElement = document.getElementById("root")!;

// Prevent multiple root creation during development hot reloading
if (!rootElement.hasAttribute("data-root-created")) {
  rootElement.setAttribute("data-root-created", "true");
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
