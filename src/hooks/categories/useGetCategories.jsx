import useAuth from "../auth/useAuth";
import useGetQuery from "../queries/useGetQuery";

export default function useGetCategories(storeId) {
  const { user } = useAuth();

  return useGetQuery({
    endpoint: `/category/?storeId=${storeId}`,
    token: user?.token,
    queryKey: ["categories", storeId],
    enabled: !!storeId && !!user?.token,
  });
}
