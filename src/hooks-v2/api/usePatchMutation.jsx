import { useMutation } from "@tanstack/react-query";
import useAuth from "@/hooks/auth/useAuth";
import { patchApi } from "@/services-v2/api/patchApi";

export default function usePatchMutation({
  endpoint = "",
  isTokenRequired = false,
}) {
  const { token } = useAuth();

  return useMutation({
    mutationFn: (payload) =>
      patchApi({
        endpoint,
        payload,
        token: isTokenRequired ? token : null,
      }),
  });
}
