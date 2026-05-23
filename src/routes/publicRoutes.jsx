import Login from "@/features/auth/pages/Login";
import DomainIntegrationGuide from "@/features/Help-Guieds/Domain/DomainIntegrationGuide";
import Unauthorized from "@/pages/Unauthorized";

export const publicRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/help/domain-setup",
    element: <DomainIntegrationGuide />,
  },
];
