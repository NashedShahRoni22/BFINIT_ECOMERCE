import { useQuery } from "@tanstack/react-query";
import useAuth from "../auth/useAuth";
import { getApi } from "@/services/api/getApi";

export default function useGetQuery({
  endpoint,
  token = null,
  clientId = null,
  queryKey,
  enabled,
  staleTime = 0,
  newBaseUrl = false,
}) {
  const { user } = useAuth();

  return useQuery({
    queryKey,
    queryFn: () =>
      getApi(
        endpoint,
        token && user?.token,
        clientId && user?.data?.clientid,
        newBaseUrl,
      ),
    enabled,
    staleTime,
  });
}
