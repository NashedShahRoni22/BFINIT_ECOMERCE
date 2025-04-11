import { useMutation } from "@tanstack/react-query";
import { handleStoreDelete } from "../api/stores";

export default function useStoreDelete({ clientId, token }) {
  return useMutation({
    mutationFn: (url) => handleStoreDelete(url, clientId, token),
  });
}
