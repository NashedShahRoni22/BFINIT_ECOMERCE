import { createBrowserRouter } from "react-router";
import Login from "../pages/admin/Login/Login";
import PrivateRoute from "./PrivateRoute";
import AdminLayout from "../layout/AdminLayout";
import Home from "../pages/admin/Home/Home";
import CreateStore from "../pages/admin/CreateStore/CreateStore";
import AddProduct from "../pages/admin/AddProduct/AddProduct";
import Category from "../pages/admin/Category/Category";
import SubCategory from "../pages/admin/SubCategory/SubCategory";
import Brands from "../pages/admin/Brands/Brands";
import ManageProduct from "../pages/admin/ManageProduct/ManageProduct";
import StoreCustomizeLayout from "../layout/StoreCustomizeLayout";
import Stores from "../pages/admin/Stores/Stores";
import Orders from "../pages/admin/Orders/Orders";
import Preview from "../pages/admin/Preview/Preview";
import Customers from "../pages/admin/Customers/Customers";
import ManageBlog from "../pages/admin/ManageBlog/ManageBlog";
import AddBlog from "../pages/admin/AddBlog/AddBlog";
import Cart from "../pages/store/Cart";
import PreviewLayout from "../layout/PreviewLayout";
import StoreThemeInitializer from "../components/admin/StoreThemeInitializer";
import Checkout from "../pages/store/Checkout/Checkout";
import OrderDetails from "../pages/admin/OrderDetails/OrderDetails";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
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
        element: <CreateStore />,
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
        path: "/products/manage-product",
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
    ],
  },
  {
    path: "/customize-store/:storeId",
    element: (
      <PrivateRoute>
        <StoreCustomizeLayout />
      </PrivateRoute>
    ),
  },
  {
    path: "/preview/:storeId",
    element: (
      <PrivateRoute>
        <StoreThemeInitializer>
          <PreviewLayout />
        </StoreThemeInitializer>
      </PrivateRoute>
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
    ],
  },
]);
