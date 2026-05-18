import useAuth from "@/hooks/auth/useAuth";
import { getApi } from "@/services-v2/api/getApi";
import { useQuery } from "@tanstack/react-query";

export default function useGetQuery({
  endpoint = "",
  enabled = false,
  isTokenRequired = false,
  queryKey = [],
  ...options
}) {
  const { token } = useAuth();

  return useQuery({
    queryFn: () => getApi({ endpoint, token: isTokenRequired ? token : null }),
    enabled: enabled && !!endpoint,
    queryKey: [endpoint, ...queryKey],
    ...options,
  });
}
