import useGetQuery from "../queries/useGetQuery";

export default function useGetProductsByStoreId(storeId) {
  return useGetQuery({
    endpoint: `/product/all/?storeId=${storeId}`,
    queryKey: ["products", storeId],
    enabled: !!storeId,
  });
}
