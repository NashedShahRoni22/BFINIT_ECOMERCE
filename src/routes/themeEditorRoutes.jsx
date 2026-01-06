import PrivateRoute from "./PrivateRoute";
import ThemeEditorProvider from "@/providers/ThemeEditorProvider";
import CartProvider from "@/providers/CartProvider";
import ThemeEditorLayout from "@/layouts/ThemeEditorLayout";
import Home from "@/pages/storefront/Home";
import ProductDetails from "@/pages/storefront/ProductDetails";
import Cart from "@/pages/storefront/Cart";
import Contact from "@/pages/storefront/Contact";
import Shop from "@/pages/storefront/Shop";
import Signup from "@/pages/storefront/Signup";
import CheckoutPage from "@/components/storefront/checkout/checkout";
import Login from "@/pages/storefront/Login";
import ContentPage from "@/pages/storefront/ContentPage";

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
      element: <ContentPage title="About Us" />,
    },
    {
      path: "cart",
      element: <Cart />,
    },
    {
      path: "contact",
      element: <Contact />,
    },
    {
      path: "checkout",
      element: <CheckoutPage />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
    {
      path: "login",
      element: <Login />,
    },
  ],
};
