import useAuth from "../auth/useAuth";
import useGetQuery from "../queries/useGetQuery";

export default function useGetProductsByStoreId(storeId) {
  const { user } = useAuth();

  return useGetQuery({
    endpoint: `/product/all/?storeId=${storeId}`,
    token: user?.token,
    queryKey: ["products", storeId, user?.token],
    enabled: !!user?.token && !!storeId,
  });
}
