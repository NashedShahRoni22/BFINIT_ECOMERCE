import AdminLayout from "@/layouts/AdminLayout";
import PrivateRoute from "./PrivateRoute";
import Home from "@/features/admin/pages/Home";
import Themes from "@/features/admin/pages/Themes";
import Category from "@/features/admin/pages/Category";
import SubCategory from "@/features/admin/pages/SubCategory";
import Brands from "@/features/admin/pages/Brands";
import AddProduct from "@/features/admin/pages/AddProduct";
import Inventory from "@/features/admin/pages/Inventory";
import Orders from "@/features/admin/pages/Orders";
import OrderDetails from "@/features/admin/pages/OrderDetails";
import SeoForm from "@/features/admin/pages/SeoForm";
import AddBlog from "@/features/admin/pages/AddBlog";
import ManageBlog from "@/features/admin/pages/ManageBlog";
import Domains from "@/features/admin/pages/Domains";
import StripePayments from "@/features/admin/pages/StripePayments";
import HelpCenterForm from "@/features/admin/pages/HelpCenterForm";
import ReturnsRefundsForm from "@/features/admin/pages/ReturnsRefundsForm";
import TermsConditionsForm from "@/features/admin/pages/TermsConditionsForm";
import HowToBuyForm from "@/features/admin/pages/HowToBuyForm";
import Stores from "@/features/admin/pages/Stores";
import CreateStore from "@/features/admin/pages/CreateStore";
import UpdateStore from "@/features/admin/pages/UpdateStore";
import SubCategoryUpdate from "@/features/admin/pages/SubCategoryUpdate";
import UpdateProduct from "@/features/admin/pages/UpdateProduct";
import AddAbout from "@/features/admin/pages/AddAbout";
import AddFaq from "@/features/admin/pages/AddFaq";
import BankPayment from "@/features/admin/pages/BankPayment";
import AddPrivacyPolicy from "@/features/admin/pages/AddPrivacryPolicy";

export const adminRoutes = {
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
      path: "/themes",
      element: <Themes />,
    },
    {
      path: "/products/category",
      element: <Category />,
    },
    {
      path: "/products/sub-category",
      element: <SubCategory />,
      // TODO: element: <SubCategoryUpdate />, implement updated subcategory here
    },
    {
      path: "/products/brands",
      element: <Brands />,
    },
    {
      path: "/products/add-product",
      element: <AddProduct />,
    },
    {
      path: "/products/inventory",
      element: <Inventory />,
    },
    {
      path: "/orders",
      element: <Orders />,
    },
    {
      path: "/orders/:orderId",
      element: <OrderDetails />,
    },
    {
      path: "/seo-meta",
      element: <SeoForm />,
    },
    {
      path: "/blogs/add",
      element: <AddBlog />,
    },
    {
      path: "/blogs/manage",
      element: <ManageBlog />,
    },
    {
      path: "/domains",
      element: <Domains />,
    },
    {
      path: "/payments/stripe",
      element: <StripePayments />,
    },
    {
      path: "/payments/bank",
      element: <BankPayment />,
    },
    {
      path: "/support/help-center",
      element: <HelpCenterForm />,
    },
    {
      path: "/support/returns-refunds",
      element: <ReturnsRefundsForm />,
    },
    {
      path: "/support/terms-conditions",
      element: <TermsConditionsForm />,
    },
    {
      path: "/support/privacy",
      element: <AddPrivacyPolicy />,
    },
    {
      path: "/support/about",
      element: <AddAbout />,
    },
    {
      path: "/support/how-to-buy",
      element: <HowToBuyForm />,
    },
    {
      path: "/support/faq",
      element: <AddFaq />,
    },
    {
      path: "/stores",
      element: <Stores />,
    },
    {
      path: "stores/create",
      element: <CreateStore />,
    },
    {
      path: "stores/edit/:storeId",
      element: <UpdateStore />,
    },
    {
      path: "products/edit/:productId",
      element: <UpdateProduct />,
    },
  ],
};
