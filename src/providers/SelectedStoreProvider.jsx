import { StoreContext } from "@/context/StoreContext";
import useAuth from "@/hooks/auth/useAuth";
import { useEffect, useState } from "react";

export default function SelectedStoreProvider({ children }) {
  const [selectedStore, setSelectedStore] = useState(null);
  const { user } = useAuth();

  const handleSetStore = (store) => {
    setSelectedStore(store);
    if (store) {
      // Store with user identifier
      const storeData = {
        store,
        clientId: user?.data?.clientid,
      };
      localStorage.setItem("store", JSON.stringify(storeData));
    } else {
      localStorage.removeItem("store");
    }
  };

  useEffect(() => {
    // Only run when user data is available
    if (!user?.data?.clientid) {
      setSelectedStore(null);
      return;
    }

    const storedData = localStorage.getItem("store");
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);

        // Check if store belongs to current user
        if (parsed.clientId === user.data.clientid) {
          setSelectedStore(parsed.store);
        } else {
          // Clear store if it belongs to different user
          localStorage.removeItem("store");
          setSelectedStore(null);
        }
      } catch (error) {
        // Handle parse errors
        localStorage.removeItem("store");
        setSelectedStore(null);
      }
    }
  }, [user?.data?.clientid]);

  const value = {
    selectedStore,
    handleSetStore,
    storeId: selectedStore?.storeId,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
