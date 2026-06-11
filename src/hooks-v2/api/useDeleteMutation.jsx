import useAuth from "@/hooks/auth/useAuth";
import { deleteApi } from "@/services-v2/api/deleteApi";
import { useMutation } from "@tanstack/react-query";

export default function useDeleteMutation({
  endpoint = "",
  isTokenRequired = false,
  ...options
}) {
  const { token } = useAuth();

  return useMutation({
    mutationFn: (payload) =>
      deleteApi({ endpoint, payload, token: isTokenRequired ? token : null }),
    ...options,
  });
}
