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
import StorefrontAuthProvider from "@/providers/StorefrontAuthProvider";
import StorefrontThemeProvider from "@/providers/StorefrontThemeProvider";
import PrivateRoute from "./PrivateRoute";
import NotFound from "@/pages/storefront/NotFound";
import Orders from "@/pages/storefront/Orders";

export const storeFrontRoutes = {
  path: "/stores/:storeId",
  element: (
    <StorefrontThemeProvider>
      <StorefrontAuthProvider>
        <CartProvider>
          <StorefrontLayout />
        </CartProvider>
      </StorefrontAuthProvider>
    </StorefrontThemeProvider>
  ),
  children: [
    {
      path: "*",
      element: <NotFound />,
    },
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
      element: (
        <ContentPage title="About Us" apiEndpoint="/store/publicAboutData" />
      ),
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
    {
      path: "support/faq",
      element: <ContentPage title="FAQ" apiEndpoint="/faq/public" />,
    },
    {
      path: "checkout",
      element: (
        <PrivateRoute role="customer">
          <Checkout />
        </PrivateRoute>
      ),
    },
    {
      path: "orders",
      element: (
        <PrivateRoute role="customer">
          <Orders />
        </PrivateRoute>
      ),
    },
  ],
};
