import useGetQuery from "@/hooks/api/useGetQuery";
import useAuth from "@/hooks/auth/useAuth";
import useSelectedStore from "@/hooks/useSelectedStore";

export default function useGetAllMeta(storeId) {
  const { user } = useAuth();
  const { selectedStore } = useSelectedStore();

  const activeStoreId = storeId || selectedStore?.storeId;

  return useGetQuery({
    endpoint: `/meta/store/?storeId=${activeStoreId}`,
    token: user?.token,
    clientId: user?.data?.clientid,
    queryKey: ["storeMeta", activeStoreId],
    enabled: !!activeStoreId,
  });
}
