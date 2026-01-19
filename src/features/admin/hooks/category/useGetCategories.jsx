import useGetQuery from "@/hooks/api/useGetQuery";
import useSelectedStore from "@/hooks/useSelectedStore";

export default function useGetCategories(storeId) {
  const { selectedStore } = useSelectedStore();

  const activeStoreId = storeId || selectedStore?.storeId;

  return useGetQuery({
    endpoint: `/category/?storeId=${activeStoreId}`,
    queryKey: ["categories", activeStoreId],
    enabled: !!activeStoreId,
  });
}
