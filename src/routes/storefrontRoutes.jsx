import Checkout from "@/components/storefront/checkout/checkout";
import StorefrontLayout from "@/layouts/StorefrontLayout";
import Cart from "@/pages/storefront/Cart";
import Contact from "@/pages/storefront/Contact";
import ContentPage from "@/pages/storefront/ContentPage";
import Home from "@/pages/storefront/Home";
import Login from "@/pages/storefront/Login";
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
      element: <Checkout />,
    },
    {
      path: "signup",
      element: <Signup />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "support/customer-support",
      element: (
        <ContentPage title="Customer Support" apiEndpoint="/store/storehelp" />
      ),
    },
    {
      path: "support/return-policy",
      element: (
        <ContentPage title="Return Policy" apiEndpoint="/store/return&refund" />
      ),
    },
    {
      path: "support/terms-and-conditions",
      element: (
        <ContentPage title="Legal & Terms" apiEndpoint="/store//storeterms" />
      ),
    },
    {
      path: "support/shopping-guide",
      element: (
        <ContentPage title="Shopping Guide" apiEndpoint="/store/howtobuy" />
      ),
    },
  ],
};
