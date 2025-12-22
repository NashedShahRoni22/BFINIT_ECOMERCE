import Login from "@/features/admin/pages/Login";
import DomainIntegrationGuide from "@/features/Help-Guieds/Domain/DomainIntegrationGuide";

export const publicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/help/domain-setup",
    element: <DomainIntegrationGuide />,
  },
];
