import useGetQuery from "../queries/useGetQuery";
import useSelectedStore from "./useSelectedStore";

export default function useGetStorePreference(storeId) {
  const { selectedStore } = useSelectedStore();

  return useGetQuery({
    endpoint: `/store/preference/?storeId=${storeId || selectedStore?.storeId}`,
    queryKey: ["storePreference", storeId || selectedStore?.storeId],
    enabled: !!storeId || !!selectedStore?.storeId,
  });
}
