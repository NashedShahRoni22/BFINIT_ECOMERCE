import { useMutation } from "@tanstack/react-query";
import { patchApi } from "../../api/patchApi";

export default function usePatchMutaion({ endpoint, token }) {
  return useMutation({
    mutationFn: (payload) => patchApi(endpoint, token, payload),
  });
}
