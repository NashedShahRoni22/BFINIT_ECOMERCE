import useAuth from "../auth/useAuth";
import useGetQuery from "../queries/useGetQuery";

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
