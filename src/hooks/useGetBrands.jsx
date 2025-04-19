import useAuth from "./useAuth";
import useGetQuery from "./useGetQuery";

export default function useGetBrands(storeId) {
  const { user } = useAuth();

  return useGetQuery({
    endpoint: `/brand/?storeId=${storeId}`,
    token: user?.token,
    queryKey: ["brands", storeId],
    enabled: !!user?.token && !!storeId,
  });
}
