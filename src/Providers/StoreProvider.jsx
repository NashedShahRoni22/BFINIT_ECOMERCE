import { useEffect, useState } from "react";
import { StoreContext } from "@/context/StoreContext";

export default function StoreProvider({ children }) {
  const [selectedStore, setSelectedStore] = useState(null);

  const handleSetStore = (store) => {
    setSelectedStore(store);
    localStorage.setItem("store", JSON.stringify(store));
  };

  useEffect(() => {
    const store = localStorage.getItem("store");
    if (store) {
      setSelectedStore(JSON.parse(store));
    }
  }, []);

  const value = {
    selectedStore,
    handleSetStore,
  };

  return (
    <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
  );
}
