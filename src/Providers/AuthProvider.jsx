import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

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
        localStorage.removeItem("authInfo"); // Remove invalid data
      }
    }
  }, [setUser]);

  const authInfo = {
    user,
    setUser,
  };

  console.log("user", user);

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
}
