import useAuth from "@/hooks/auth/useAuth";
import { postApi } from "@/services-v2/api/postApi";
import { useMutation } from "@tanstack/react-query";

export function usePostMutation({
  endpoint = "",
  isTokenRequired = false,
  ...options
}) {
  const { token } = useAuth();

  return useMutation({
    mutationFn: (payload) =>
      postApi({ endpoint, payload, token: isTokenRequired ? token : null }),
    ...options,
  });
}
