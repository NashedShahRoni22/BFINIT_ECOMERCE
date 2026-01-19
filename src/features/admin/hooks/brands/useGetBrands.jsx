import useGetQuery from "@/hooks/api/useGetQuery";
import useSelectedStore from "@/hooks/useSelectedStore";

export default function useGetBrands(storeId) {
  const { selectedStore } = useSelectedStore();

  const activeStoreId = storeId || selectedStore?.storeId;

  return useGetQuery({
    endpoint: `/brand/?storeId=${activeStoreId}`,
    queryKey: ["brands", activeStoreId],
    enabled: !!activeStoreId,
  });
}
