import useGetQuery from "../queries/useGetQuery";
import useSelectedStore from "../stores/useSelectedStore";

export default function useGetBrands(storeId) {
  const { selectedStore } = useSelectedStore();

  return useGetQuery({
    endpoint: `/brand/?storeId=${selectedStore?.storeId}`,
    queryKey: ["brands", selectedStore?.storeId],
    enabled: !!selectedStore?.storeId,
  });
}
