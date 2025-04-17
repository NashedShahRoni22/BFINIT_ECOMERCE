import useAuth from "./useAuth";
import useGetQuery from "./useGetQuery";

export default function useGetCategories(storeId) {
  const { user } = useAuth();

  return useGetQuery({
    endpoint: `/category/?storeId=${storeId}`,
    token: user?.token,
    queryKey: ["categories", storeId],
    enabled: !!storeId && !!user?.token,
  });
}
