import PrivateRoute from "./PrivateRoute";
import ThemeEditorLayout from "@/layouts/ThemeEditorLayout";
import Home from "@/features/themes/pages/Home";
import ProductDetails from "@/features/themes/pages/ProductDetails";
import Cart from "@/features/themes/pages/Cart";
import CartProvider from "@/providers/CartProvider";
import Contact from "@/features/themes/pages/Contact";
import About from "@/features/themes/pages/About";
import Shop from "@/features/themes/pages/Shop";

export const themeEditorRoutes = {
  path: "/theme/customize",
  element: (
    <PrivateRoute>
      <CartProvider>
        <ThemeEditorLayout />
      </CartProvider>
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
