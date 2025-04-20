import useAuth from "../auth/useAuth";
import useGetQuery from "../queries/useGetQuery";

export default function useGetStores() {
  const { user } = useAuth();

  return useGetQuery({
    endpoint: `/store/names/${user?.data?.clientid}`,
    token: user?.token,
    queryKey: ["stores", user?.data?.clientid],
    enabled: !!user?.data?.clientid && !!user?.token,
  });
}
