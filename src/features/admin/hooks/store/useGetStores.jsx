import useGetQuery from "@/hooks/api/useGetQuery";
import useAuth from "@/hooks/auth/useAuth";

export default function useGetStores() {
  const { user } = useAuth();

  return useGetQuery({
    endpoint: `/store/names/${user?.data?.clientid}`,
    token: user?.token,
    clientId: user?.data?.clientid,
    queryKey: ["admin", "stores", user?.data?.clientid],
    enabled: !!user?.data?.clientid && !!user?.token,
  });
}
