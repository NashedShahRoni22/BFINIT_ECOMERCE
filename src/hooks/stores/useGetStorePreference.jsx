import useGetQuery from "../queries/useGetQuery";

export default function useGetStorePreference(storeId) {
  return useGetQuery({
    endpoint: `/store/preference/?storeId=${storeId}`,
    queryKey: ["storePreference", storeId],
    enabled: !!storeId,
  });
}
