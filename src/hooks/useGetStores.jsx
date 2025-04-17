import useAuth from "./useAuth";
import useGetQuery from "./useGetQuery";

export default function useGetStores() {
  const { user } = useAuth();

  return useGetQuery({
    endpoint: `/store/names/${user?.data?.clientid}`,
    token: user?.token,
    queryKey: ["stores", user?.data?.clientid],
    enabled: !!user?.data?.clientid && !!user?.token,
  });
}
