import { useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const localAuthInfo = localStorage.getItem("authInfo");
      return localAuthInfo ? JSON.parse(localAuthInfo) : null;
    } catch (error) {
      console.error("Error parsing authInfo from localStorage:", error);
      localStorage.removeItem("authInfo");
      return null;
    }
  });

  const token = user?.token ?? null;

  const isSuperAdmin = user?.data?.roles.find(
    (role) => role.role_name === "Super Admin",
  );

  useEffect(() => {
    if (user) {
      localStorage.setItem("authInfo", JSON.stringify(user));
    } else {
      localStorage.removeItem("authInfo");
    }
  }, [user]);

  const authInfo = {
    token,
    user,
    isSuperAdmin,
    setUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
