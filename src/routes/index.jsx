import { createBrowserRouter } from "react-router";
import { publicRoutes } from "./publicRoutes";
import { adminRoutes } from "./adminRoutes";
import { themeEditorRoutes } from "./themeEditorRoutes";

export const router = createBrowserRouter([
  ...publicRoutes,
  adminRoutes,
  themeEditorRoutes,
]);
