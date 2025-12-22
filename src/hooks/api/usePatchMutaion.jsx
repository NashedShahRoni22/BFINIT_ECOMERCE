import { patchApi } from "@/services/api/patchApi";
import { useMutation } from "@tanstack/react-query";

export default function usePatchMutaion({ endpoint, token, clientId }) {
  return useMutation({
    mutationFn: (payload) => patchApi(endpoint, token, clientId, payload),
  });
}
