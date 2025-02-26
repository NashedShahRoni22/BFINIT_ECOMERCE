import { createBrowserRouter } from "react-router";
import Login from "../pages/admin/Login/Login";
import Home from "../pages/admin/Home/Home";
import AdminLayout from "../layout/AdminLayout";
import CreateStore from "../pages/admin/CreateStore/CreateStore";
import AddProduct from "../pages/admin/AddProduct/AddProduct";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <AdminLayout />,
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
        path: "/add-product",
        element: <AddProduct />,
      },
    ],
  },
]);
