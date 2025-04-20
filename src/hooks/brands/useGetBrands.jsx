import useAuth from "../auth/useAuth";
import useGetQuery from "../queries/useGetQuery";

export default function useGetBrands(storeId) {
  const { user } = useAuth();

  return useGetQuery({
    endpoint: `/brand/?storeId=${storeId}`,
    token: user?.token,
    queryKey: ["brands", storeId],
    enabled: !!user?.token && !!storeId,
  });
}
