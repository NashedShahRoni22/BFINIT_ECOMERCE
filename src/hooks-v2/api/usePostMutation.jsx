import { postApi } from "@/services-v2/api/postApi";
import { useMutation } from "@tanstack/react-query";

export function usePostMutation({ endpoint }) {
  return useMutation({
    mutationFn: (payload) => postApi({ endpoint, payload }),
  });
}
