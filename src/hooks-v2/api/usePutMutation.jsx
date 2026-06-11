import useAuth from "@/hooks/auth/useAuth";
import { putApi } from "@/services-v2/api/putApi";
import { useMutation } from "@tanstack/react-query";

export default function usePutMutation({
  endpoint = "",
  isTokenRequired = false,
  clientId = null,
}) {
  const { token } = useAuth();
  return useMutation({
    mutationFn: (payload) =>
      putApi({
        endpoint,
        payload,
        token: isTokenRequired ? token : null,
        clientId,
      }),
  });
}
