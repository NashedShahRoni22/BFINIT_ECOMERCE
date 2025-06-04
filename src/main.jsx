import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { router } from "./routes/Routes.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TourProvider } from "@reactour/tour";
import { Toaster } from "react-hot-toast";
import CartProvider from "./Providers/CartProvider.jsx";
import CategoryProvider from "./Providers/CategoryProvider.jsx";
import ThemeProvider from "./Providers/ThemeProvider.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
import "./index.css";

const queryClient = new QueryClient();

const steps = [
  {
    selector: '[data-tour-element="create-store-button"]',
    content: (
      <div>
        <h1 className="text-dashboard-primary text-lg font-semibold">
          Welcome to BFINIT Ecommerce Tour
        </h1>
      </div>
    ),
  },
];

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CategoryProvider>
          <CartProvider>
            <ThemeProvider>
              <TourProvider steps={steps}>
                <RouterProvider router={router} />
              </TourProvider>
            </ThemeProvider>
          </CartProvider>
        </CategoryProvider>
      </AuthProvider>
      <Toaster position="top-center" />
    </QueryClientProvider>
  </StrictMode>,
);
