import useGetQuery from "@/hooks/api/useGetQuery";
import useSelectedStore from "@/hooks/useSelectedStore";

export default function useGetStorePreference(storeId) {
  const { selectedStore } = useSelectedStore();

  const activeStoreId = storeId || selectedStore?.storeId;
  console.log("active store id", activeStoreId);

  return useGetQuery({
    endpoint: `/store/preference/?storeId=${activeStoreId}`,
    queryKey: ["storePreference", activeStoreId],
    enabled: !!activeStoreId,
  });
}
