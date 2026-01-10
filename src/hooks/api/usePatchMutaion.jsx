import { patchApi } from "@/services/api/patchApi";
import { useMutation } from "@tanstack/react-query";
import useAuth from "../auth/useAuth";

export default function usePatchMutaion({ endpoint, token, clientId }) {
  const { user } = useAuth();

  return useMutation({
    mutationFn: (payload) =>
      patchApi(
        endpoint,
        token && user?.token,
        clientId && user?.data?.clientid,
        payload,
      ),
  });
}
