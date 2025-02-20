import { createBrowserRouter } from "react-router";
import Login from "../pages/Login/Login";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
