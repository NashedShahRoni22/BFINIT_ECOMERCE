import useAuth from "../../auth/useAuth";
import useGetQuery from "../../queries/useGetQuery";

export default function useGetSubCategories(storeId, categoryId) {
  const { user } = useAuth();

  return useGetQuery({
    endpoint: `/subcategory/?storeId=${storeId}&categoryId=${categoryId}`,
    token: user?.token,
    queryKey: ["subCategories", storeId, categoryId],
    enabled: !!storeId && !!categoryId,
  });
}
