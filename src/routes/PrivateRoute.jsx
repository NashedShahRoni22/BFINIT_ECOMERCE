import { Navigate, useLocation } from "react-router";
import useAuth from "@/hooks/auth/useAuth";
import useBasePath from "@/hooks/useBasePath";

export default function PrivateRoute({ children, role = "" }) {
  const { user } = useAuth();
  const customerAccessToken = localStorage.getItem("customerAuthInfo");
  const location = useLocation();
  const basePath = useBasePath();

  // customer authentication
  if (role === "customer") {
    return customerAccessToken ? (
      children
    ) : (
      <Navigate
        to={`${basePath}/login`}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  if (!user?.token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  if (user?.data?.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
