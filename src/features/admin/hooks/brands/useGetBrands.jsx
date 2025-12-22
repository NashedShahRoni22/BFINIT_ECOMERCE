import useGetQuery from "@/hooks/api/useGetQuery";
import useSelectedStore from "@/hooks/useSelectedStore";

export default function useGetBrands(storeId) {
  const { selectedStore } = useSelectedStore();

  return useGetQuery({
    endpoint: `/brand/?storeId=${selectedStore?.storeId}`,
    queryKey: ["brands", selectedStore?.storeId],
    enabled: !!selectedStore?.storeId,
  });
}
