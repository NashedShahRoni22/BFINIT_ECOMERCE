import useGetQuery from "../queries/useGetQuery";

export default function useGetCategories(storeId) {
  return useGetQuery({
    endpoint: `/category/?storeId=${storeId}`,
    queryKey: ["categories", storeId],
    enabled: !!storeId,
  });
}
