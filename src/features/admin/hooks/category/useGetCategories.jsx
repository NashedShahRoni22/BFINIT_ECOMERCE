import useGetQuery from "@/hooks/api/useGetQuery";
import useSelectedStore from "@/hooks/useSelectedStore";

export default function useGetCategories(storeId) {
  const { selectedStore } = useSelectedStore();

  return useGetQuery({
    endpoint: `/category/?storeId=${selectedStore?.storeId}`,
    queryKey: ["categories", selectedStore?.storeId],
    enabled: !!selectedStore?.storeId,
  });
}
