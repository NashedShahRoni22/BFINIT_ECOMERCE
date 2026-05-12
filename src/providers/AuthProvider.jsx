import { useState } from "react";
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

  const [isSuperAdmin, setIsSuperAdmin] = useState(
    () => user?.data?.clientid === "67e4421bb493fa950c961b74",
  );

  const authInfo = {
    user,
    setUser,
    isSuperAdmin,
    setIsSuperAdmin,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
