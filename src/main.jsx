import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import { router } from "./routes/Routes.jsx";
import CartProvider from "./Providers/CartProvider.jsx";
import CategoryProvider from "./Providers/CategoryProvider.jsx";
import "./index.css";
import ThemeProvider from "./Providers/ThemeProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CategoryProvider>
      <CartProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </CartProvider>
    </CategoryProvider>
  </StrictMode>,
);
