import { createBrowserRouter } from "react-router";
import { publicRoutes } from "./publicRoutes";
import { adminRoutes } from "./adminRoutes";
import { themeEditorRoutes } from "./themeEditorRoutes";
import { storeFrontRoutes } from "./storefrontRoutes";
import { superAdminRoutes } from "./superAdminRoutes";

export const router = createBrowserRouter([
  ...publicRoutes,
  superAdminRoutes,
  adminRoutes,
  themeEditorRoutes,
  storeFrontRoutes,
]);
