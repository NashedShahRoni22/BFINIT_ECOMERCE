import useGetQuery from "../queries/useGetQuery";
import useSelectedStore from "../stores/useSelectedStore";

export default function useGetCategories(storeId) {
  const { selectedStore } = useSelectedStore();

  return useGetQuery({
    endpoint: `/category/?storeId=${selectedStore?.storeId}`,
    queryKey: ["categories", selectedStore?.storeId],
    enabled: !!selectedStore?.storeId,
  });
}
