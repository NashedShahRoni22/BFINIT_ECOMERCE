import useGetQuery from "../queries/useGetQuery";

export default function useGetBrands(storeId) {
  return useGetQuery({
    endpoint: `/brand/?storeId=${storeId}`,
    queryKey: ["brands", storeId],
    enabled: !!storeId,
  });
}
