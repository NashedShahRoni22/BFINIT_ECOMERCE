import { useMutation } from "@tanstack/react-query";
import { deleteApi } from "../../api/deleteApi";
import useAuth from "../auth/useAuth";

export default function useDeleteMutation({ endpoint, token, clientId }) {
  const { user } = useAuth();

  return useMutation({
    mutationFn: (payLoad) =>
      deleteApi(
        endpoint,
        token && user?.token,
        clientId && user?.data?.clientid,
        payLoad,
      ),
  });
}
