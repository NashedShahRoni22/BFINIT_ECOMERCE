import { useSearchParams } from "react-router";
import useGetStores from "./useGetStores";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useStoreSelector() {
  const { data: stores } = useGetStores();
  const [searchParams, setSearchParams] = useSearchParams();

  const storeIdFromUrl = searchParams.get("storeId") || "";

  const [selectedStore, setSelectedStore] = useState({
    storeId: storeIdFromUrl,
    storeName: "",
  });

  const handleStoreChange = (e) => {
    const selectedIndex = e.target.selectedIndex;
    const selectedOption = e.target.options[selectedIndex];
    const newStoreId = e.target.value;

    setSearchParams({ storeId: newStoreId });

    setSelectedStore({
      storeId: newStoreId,
      storeName: selectedOption.text,
    });
  };

  useEffect(() => {
    if (!storeIdFromUrl || !stores?.data) return;

    const matchedStore = stores.data.find(
      (store) => store.storeId === storeIdFromUrl,
    );

    if (!matchedStore) {
      toast.error("Selected store not found");
      setSearchParams({});
      return;
    }

    setSelectedStore({
      storeId: storeIdFromUrl,
      storeName: matchedStore.storeName,
    });
  }, [stores?.data, setSearchParams, storeIdFromUrl]);

  return {
    stores,
    selectedStore,
    handleStoreChange,
  };
}
