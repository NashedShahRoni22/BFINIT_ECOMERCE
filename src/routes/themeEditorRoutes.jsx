import PrivateRoute from "./PrivateRoute";
import ThemeEditorProvider from "@/providers/ThemeEditorProvider";
import CartProvider from "@/providers/CartProvider";
import ThemeEditorLayout from "@/layouts/ThemeEditorLayout";
import Home from "@/pages/storefront/Home";
import ProductDetails from "@/pages/storefront/ProductDetails";
import Cart from "@/pages/storefront/Cart";
import Contact from "@/pages/storefront/Contact";
import About from "@/pages/storefront/About";
import Shop from "@/pages/storefront/Shop";

export const themeEditorRoutes = {
  path: "/stores/:storeId/theme-editor",
  element: (
    <PrivateRoute>
      <ThemeEditorProvider>
        <CartProvider>
          <ThemeEditorLayout />
        </CartProvider>
      </ThemeEditorProvider>
    </PrivateRoute>
  ),
  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: "shop",
      element: <Shop />,
    },
    {
      path: "shop/:productId",
      element: <ProductDetails />,
    },
    {
      path: "about",
      element: <About />,
    },
    {
      path: "cart",
      element: <Cart />,
    },
    {
      path: "contact",
      element: <Contact />,
    },
  ],
};
