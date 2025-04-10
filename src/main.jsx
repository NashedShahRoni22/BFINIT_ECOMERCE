import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { router } from "./routes/Routes.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import CartProvider from "./Providers/CartProvider.jsx";
import CategoryProvider from "./Providers/CategoryProvider.jsx";
import ThemeProvider from "./Providers/ThemeProvider.jsx";
import AuthProvider from "./Providers/AuthProvider.jsx";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CategoryProvider>
          <CartProvider>
            <ThemeProvider>
              <RouterProvider router={router} />
            </ThemeProvider>
          </CartProvider>
        </CategoryProvider>
      </AuthProvider>
      <Toaster />
    </QueryClientProvider>
  </StrictMode>,
);
