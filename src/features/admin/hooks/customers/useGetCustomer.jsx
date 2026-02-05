import useGetQuery from "@/hooks/api/useGetQuery";
import useAuth from "@/hooks/auth/useAuth";
import useSelectedStore from "@/hooks/useSelectedStore";

export default function useGetCustomer() {
  const { user } = useAuth();
  const { selectedStore } = useSelectedStore();

  return useGetQuery({
    endpoint: `/store/customers/all/${selectedStore?.storeId}`,
    token: user?.token,
    clientId: user?.data?.clientid,
    queryKey: ["customers", selectedStore?.storeId],
    enabled: !!selectedStore?.storeId && !!user?.token,
    staleTime: Infinity,
  });
}
