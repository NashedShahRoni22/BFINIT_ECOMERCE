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
import StorefrontAuthProvider from "@/providers/StorefrontAuthProvider";
import NotFound from "@/pages/storefront/NotFound";
import Blogs from "@/pages/storefront/Blogs";
import BlogDetails from "@/pages/storefront/BlogDetails";
import Orders from "@/pages/storefront/Orders";

export const themeEditorRoutes = {
  path: "/stores/:storeId/theme-editor",
  element: (
    <PrivateRoute>
      <ThemeEditorProvider>
        <StorefrontAuthProvider>
          <CartProvider>
            <ThemeEditorLayout />
          </CartProvider>
        </StorefrontAuthProvider>
      </ThemeEditorProvider>
    </PrivateRoute>
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
      element: <Shop />,
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
      path: "blog",
      element: <Blogs />,
    },
    {
      path: "blog/:id",
      element: <BlogDetails />,
    },
    {
      path: "checkout",
      element: (
        <PrivateRoute role="customer">
          <CheckoutPage />
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
      path: "support/faq",
      element: <ContentPage title="FAQ" apiEndpoint="/faq/public" />,
    },
    {
      path: "support/shopping-guide",
      element: (
        <ContentPage title="Shopping Guide" apiEndpoint="/store/howtobuy" />
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
      path: "support/privacy",
      element: (
        <ContentPage
          title="Privacy Policy"
          apiEndpoint="/privacypolicy/public"
        />
      ),
    },
  ],
};
