import Checkout from "@/components/storefront/checkout/checkout";
import StorefrontLayout from "@/layouts/StorefrontLayout";
import About from "@/pages/storefront/About";
import Cart from "@/pages/storefront/Cart";
import Contact from "@/pages/storefront/Contact";
import Home from "@/pages/storefront/Home";
import ProductDetails from "@/pages/storefront/ProductDetails";
import ShopPage from "@/pages/storefront/Shop";
import Signup from "@/pages/storefront/Signup";
import CartProvider from "@/providers/CartProvider";
import StorefrontThemeProvider from "@/providers/StorefrontThemeProvider";

export const storeFrontRoutes = {
  path: "/stores/:storeId",
  element: (
    <StorefrontThemeProvider>
      <CartProvider>
        <StorefrontLayout />
      </CartProvider>
    </StorefrontThemeProvider>
  ),
  children: [
    {
      index: true,
      element: <Home />,
    },
    {
      path: "shop",
      element: <ShopPage />,
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
    {
      path: "checkout",
      element: <Checkout />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
  ],
};
