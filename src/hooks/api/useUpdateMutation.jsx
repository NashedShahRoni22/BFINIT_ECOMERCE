import { putApi } from "@/services/api/putApi";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../auth/useAuth";

export default function useUpdateMutation({
  endpoint,
  token = null,
  clientId = null,
}) {
  const { user } = useAuth();

  return useMutation({
    mutationFn: (payload) => {
      const finalEndpoint = payload?.endpoint || endpoint;
      const finalPayload = payload?.endpoint ? payload.data : payload;

      return putApi(
        finalEndpoint,
        token && user?.token,
        clientId && user?.data?.clientid,
        finalPayload,
      );
    },
  });
}
