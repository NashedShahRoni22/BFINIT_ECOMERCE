import { createBrowserRouter } from "react-router";
import Login from "../pages/admin/Login/Login";
import Home from "../pages/admin/Home/Home";
import AdminLayout from "../layout/AdminLayout";
import CreateStore from "../pages/admin/CreateStore/CreateStore";
import AddProduct from "../pages/admin/AddProduct/AddProduct";
import Category from "../pages/admin/Category/Category";
import SubCategory from "../pages/admin/SubCategory/SubCategory";
import Brands from "../pages/admin/Brands/Brands";
import ManageProduct from "../pages/admin/ManageProduct/ManageProduct";
import StoreCustomizeLayout from "../layout/StoreCustomizeLayout";
import Stores from "../pages/admin/Stores/Stores";
import Orders from "../pages/admin/Orders/Orders";
import PrivateRoute from "./PrivateRoute";
import Preview from "../pages/admin/Preview/Preview";

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
    ],
  },
  {
    path: "/customize-store",
    element: (
      <PrivateRoute>
        <StoreCustomizeLayout />
      </PrivateRoute>
    ),
  },
  {
    path: "/preview/:id",
    element: (
      <PrivateRoute>
        <Preview />
      </PrivateRoute>
    ),
  },
]);
