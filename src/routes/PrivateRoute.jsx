import { Navigate, useLocation } from "react-router";

export default function PrivateRoute({ children }) {
  const accessToken = localStorage.getItem("authInfo");
  const location = useLocation();

  return accessToken ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  );
}
