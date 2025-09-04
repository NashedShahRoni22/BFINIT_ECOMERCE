import { useMutation } from "@tanstack/react-query";
import { postApi } from "../../api/postApi";

export default function usePostMutation({
  endpoint,
  token = null,
  clientId = null,
  storeId = null,
}) {
  return useMutation({
    mutationFn: (payload) =>
      postApi(endpoint, token, clientId, storeId, payload),
  });
}
