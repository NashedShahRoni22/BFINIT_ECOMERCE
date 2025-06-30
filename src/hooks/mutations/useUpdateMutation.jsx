import { useMutation } from "@tanstack/react-query";
import { putApi } from "../../api/putApi";

export default function useUpdateMutation({ endpoint, token, clientId }) {
  return useMutation({
    mutationFn: (payload) => putApi(endpoint, token, clientId, payload),
  });
}
