import useGetQuery from "../queries/useGetQuery";
import useAuth from "../auth/useAuth";

export default function useGetStorePreference(storeId) {
  const { user } = useAuth();

  return useGetQuery({
    endpoint: `/store/preference/?storeId=${storeId}`,
    token: user?.token,
    queryKey: ["storePreference", storeId],
    enabled: !!storeId && !!user?.token,
  });
}
