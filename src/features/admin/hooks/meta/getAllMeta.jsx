import useGetQuery from "@/hooks/api/useGetQuery";
import useAuth from "@/hooks/auth/useAuth";

export default function useGetAllMeta(storeId) {
  const { user } = useAuth();

  return useGetQuery({
    endpoint: `/meta/store/?storeId=${storeId}`,
    token: user?.token,
    clientId: user?.data?.clientid,
    queryKey: ["storeMeta", storeId],
    enabled: !!storeId,
  });
}
