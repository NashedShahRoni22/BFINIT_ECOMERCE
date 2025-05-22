import useGetQuery from "../../queries/useGetQuery";

export default function useGetSubCategories(storeId, categoryId) {
  return useGetQuery({
    endpoint: `/subcategory/?storeId=${storeId}&categoryId=${categoryId}`,
    queryKey: ["subCategories", storeId, categoryId],
    enabled: !!storeId && !!categoryId,
  });
}
