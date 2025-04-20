import { useMutation } from "@tanstack/react-query";
import { deleteApi } from "../../api/deleteApi";

export default function useDeleteMutation({ endpoint, token, clientId }) {
  return useMutation({
    mutationFn: (payLoad) => deleteApi(endpoint, token, clientId, payLoad),
  });
}
