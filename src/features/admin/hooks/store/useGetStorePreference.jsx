import useGetQuery from "@/hooks/api/useGetQuery";
import useSelectedStore from "@/hooks/useSelectedStore";

export default function useGetStorePreference(storeId) {
  const { selectedStore } = useSelectedStore();

  return useGetQuery({
    endpoint: `/store/preference/?storeId=${storeId || selectedStore?.storeId}`,
    queryKey: ["storePreference", storeId || selectedStore?.storeId],
    enabled: !!storeId || !!selectedStore?.storeId,
  });
}
