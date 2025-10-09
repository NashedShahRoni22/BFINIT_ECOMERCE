import { useMutation } from "@tanstack/react-query";
import { putApi } from "../../api/putApi";

export default function useUpdateMutation({ endpoint, token, clientId }) {
  return useMutation({
    mutationFn: (payload) => {
      const finalEndpoint = payload?.endpoint || endpoint;
      const finalPayload = payload?.endpoint ? payload.data : payload;

      return putApi(finalEndpoint, token, clientId, finalPayload);
    },
  });
}
