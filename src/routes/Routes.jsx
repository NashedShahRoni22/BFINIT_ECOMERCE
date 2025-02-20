import { createBrowserRouter } from "react-router";
import Login from "../pages/admin/Login/Login";
import Home from "../pages/admin/Home/Home";
import AdminLayout from "../layout/AdminLayout";

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
    ],
  },
]);
