import { useEffect, useState } from "react";
import { StorefrontAuthContext } from "@/context/StorefrontAuthContext";

export default function StorefrontAuthProvider({ children }) {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const customerAuthInfo = localStorage.getItem("customerAuthInfo");

    if (customerAuthInfo) {
      try {
        const parsedCustomer = JSON.parse(customerAuthInfo);
        setCustomer(parsedCustomer);
      } catch (error) {
        console.error("Error parsing customerAuthInfo:", error);
        localStorage.removeItem("customerAuthInfo");
      }
    }
  }, []);

  const saveAuthInfo = (data) => {
    const authInfo = { token: data.token, data: data.data };
    setCustomer(authInfo);
    localStorage.setItem("customerAuthInfo", JSON.stringify(authInfo));
  };

  const handleLogout = () => {
    setCustomer(null);
    localStorage.removeItem("customerAuthInfo");
  };

  const authInfo = {
    customer,
    saveAuthInfo,
    handleLogout,
  };

  return (
    <StorefrontAuthContext.Provider value={authInfo}>
      {children}
    </StorefrontAuthContext.Provider>
  );
}
