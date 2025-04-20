import { useMutation } from "@tanstack/react-query";
import { postApi } from "../../api/postApi";

export default function usePostMutation({ endpoint, token, clientId = null }) {
  return useMutation({
    mutationFn: (payload) => postApi(endpoint, token, clientId, payload),
  });
}
