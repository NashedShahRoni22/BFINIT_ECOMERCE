import { createBrowserRouter } from "react-router";
import Login from "../pages/admin/Login/Login";
import PrivateRoute from "./PrivateRoute";
import AdminLayout from "../layout/AdminLayout";
import Home from "../pages/admin/Home/Home";
import AddProduct from "../pages/admin/AddProduct/AddProduct";
import Category from "../pages/admin/Category/Category";
import SubCategory from "../pages/admin/SubCategory/SubCategory";
import Brands from "../pages/admin/Brands/Brands";
import ManageProduct from "../pages/admin/ManageProduct/ManageProduct";
import StoreCustomizeLayout from "../layout/StoreCustomizeLayout";
import Stores from "../pages/admin/Stores/Stores";
import Orders from "../pages/admin/Orders/Orders";
import Preview from "../pages/store/Preview/Preview";
import Customers from "../pages/admin/Customers/Customers";
import ManageBlog from "../pages/admin/ManageBlog/ManageBlog";
import AddBlog from "../pages/admin/AddBlog/AddBlog";
import Cart from "../pages/store/Cart";
import PreviewLayout from "../layout/PreviewLayout";
import StoreThemeInitializer from "../components/admin/StoreThemeInitializer";
import Checkout from "../pages/store/Checkout/Checkout";
import OrderDetails from "../pages/admin/OrderDetails/OrderDetails";
import ProductDetails from "../pages/store/ProductDetails/ProductDetails";
import Categories from "../pages/store/Categories/Categories";
import { OrderSuccess } from "../pages/store/OrderSuccess/OrderSuccess";
import Payments from "../pages/admin/Payments/Payments";
import NotFound from "../pages/admin/NotFound/NotFound";
import Blog from "../pages/store/Blog/Blog";
import BlogDetails from "../pages/store/BlogDetails/BlogDetails";
import StoreForm from "../components/admin/stores/StoreForm";
import AddSeo from "../pages/admin/AddSeo/AddSeo";
import Contact from "../pages/store/Contact/Contact";
import ComingSoon from "../pages/store/ComingSoon/ComingSoon";
import ReturnPolicy from "../pages/admin/support/ReturnPolicy/ReturnPolicy";
import TermsConditions from "../pages/admin/support/TermsConditions/TermsConditions";
import BuyingGuide from "../pages/admin/support/BuyingGuide/BuyingGuide";
import AddHelpCenter from "../pages/admin/support/HelpCenter/AddHelpCenter";
import HelpCenter from "../pages/store/HelpCenter/HelpCenter";
import ReturnPolicyPreview from "../pages/store/ReturnPolicyPreview/ReturnPolicyPreview";
import TermsPreview from "../pages/store/TermsPreview/TermsPreview";
import BuyGuidePreview from "../pages/store/BuyGuidePreview/BuyGuidePreview";
import ProductSearchPage from "../pages/store/ProductSearchPage/ProductSearchPage";
import EcommerceLogin from "../pages/store/UserLogin/UserLogin";
import EcommerceSignup from "../pages/store/UserSignup/UserSignup";
import CustomerPanelLayout from "../layout/CustomerPanelLayout";
import CustomerProfile from "../pages/store/CustomerProfile/CustomerProfile";
import CustomerOrders from "../pages/store/CustomerOrders/CustomerOrders";
import Domains from "@/pages/admin/Domains/Domains";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  // admin routes
  {
    path: "/",
    element: (
      <PrivateRoute>
        <AdminLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/create-store",
        element: <StoreForm />,
      },
      {
        path: "/update-store/:storeId",
        element: <StoreForm isUpdateMode />,
      },
      {
        path: "/all-stores",
        element: <Stores />,
      },
      {
        path: "/orders",
        element: <Orders />,
      },
      {
        path: "/seo-meta",
        element: <AddSeo />,
      },
      {
        path: "/orders/:orderId",
        element: <OrderDetails />,
      },
      {
        path: "/customers",
        element: <Customers />,
      },
      {
        path: "/products/add-product",
        element: <AddProduct />,
      },
      {
        path: "/products/category",
        element: <Category />,
      },
      {
        path: "/products/sub-category",
        element: <SubCategory />,
      },
      {
        path: "/products/brands",
        element: <Brands />,
      },
      {
        path: "/products/inventory",
        element: <ManageProduct />,
      },
      {
        path: "/products/customers",
        element: <Customers />,
      },
      {
        path: "/blogs/manage",
        element: <ManageBlog />,
      },
      {
        path: "/blogs/add",
        element: <AddBlog />,
      },
      {
        path: "/domains",
        element: <Domains />,
      },
      {
        path: "/payments",
        element: <Payments />,
      },
      {
        path: "/support/help-center",
        element: <AddHelpCenter />,
      },
      {
        path: "/support/returns-refunds",
        element: <ReturnPolicy />,
      },
      {
        path: "/support/terms-conditions",
        element: <TermsConditions />,
      },
      {
        path: "/support/how-to-buy",
        element: <BuyingGuide />,
      },
    ],
  },
  // store customize
  {
    path: "/customize-store/:storeId",
    element: (
      <PrivateRoute>
        <StoreCustomizeLayout />
      </PrivateRoute>
    ),
  },
  // preview routes
  {
    path: "/preview/:storeId",
    element: (
      <StoreThemeInitializer>
        <PreviewLayout />
      </StoreThemeInitializer>
    ),
    children: [
      {
        index: true,
        element: <Preview />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "products/:productId",
        element: <ProductDetails />,
      },
      {
        path: "products/categories/:categoryName",
        element: <Categories />,
      },
      {
        path: "products/search/:keyword",
        element: <ProductSearchPage />,
      },
      {
        path: "order-success",
        element: <OrderSuccess />,
      },
      {
        path: "blogs",
        element: <Blog />,
      },
      {
        path: "blogs/:blogId",
        element: <BlogDetails />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "help-center",
        element: <HelpCenter />,
      },
      {
        path: "returns-refunds",
        element: <ReturnPolicyPreview />,
      },
      {
        path: "terms-conditions",
        element: <TermsPreview />,
      },
      {
        path: "how-to-buy",
        element: <BuyGuidePreview />,
      },
      {
        path: "coming-soon",
        element: <ComingSoon />,
      },
      {
        path: "login",
        element: <EcommerceLogin />,
      },
      {
        path: "signup",
        element: <EcommerceSignup />,
      },
      {
        path: "account",
        element: <CustomerPanelLayout />,
        children: [
          {
            index: true,
            element: <CustomerProfile />,
          },
          {
            path: "orders",
            element: <CustomerOrders />,
          },
        ],
      },
    ],
  },
]);
