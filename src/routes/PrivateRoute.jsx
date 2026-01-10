import { Navigate, useLocation } from "react-router";
import useBasePath from "@/hooks/useBasePath";

export default function PrivateRoute({ children, role = "admin" }) {
  const accessToken = localStorage.getItem("authInfo");
  const customerAccessToken = localStorage.getItem("customerAuthInfo");
  const location = useLocation();
  const basePath = useBasePath();

  // Customer authentication
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

  // Admin authentication (default)
  return accessToken ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  );
}
