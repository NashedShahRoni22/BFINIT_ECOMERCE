import { createBrowserRouter } from "react-router";
import Login from "../pages/Login/Login";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
]);
