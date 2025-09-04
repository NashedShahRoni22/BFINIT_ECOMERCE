import { createContext, useEffect, useState } from "react";

export const CustomerContext = createContext(null);

export const CustomerProvider = ({ children }) => {
  const [customer, setCustomer] = useState(null);

  // get localstorage customer info
  useEffect(() => {
    const stored = localStorage.getItem("customerInfo");
    if (stored) {
      try {
        setCustomer(JSON.parse(stored));
      } catch {
        localStorage.removeItem("customerInfo");
      }
    }
  }, []);

  // handle set customer
  const handleSetCustomer = (data) => {
    setCustomer(data);
    localStorage.setItem("customerInfo", JSON.stringify(data));
  };

  // handle logout
  const handleLogout = () => {
    setCustomer(null);
    localStorage.removeItem("customerInfo");
  };

  const authInfo = {
    customer,
    handleSetCustomer,
    handleLogout,
  };

  return (
    <CustomerContext.Provider value={authInfo}>
      {children}
    </CustomerContext.Provider>
  );
};
