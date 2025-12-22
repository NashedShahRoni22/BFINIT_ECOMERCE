import { useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const localAuthInfo = localStorage.getItem("authInfo");

    if (localAuthInfo) {
      try {
        const parsedUser = JSON.parse(localAuthInfo);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing authInfo from localStorage:", error);
        localStorage.removeItem("authInfo");
      }
    }
  }, [setUser]);

  const authInfo = {
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
