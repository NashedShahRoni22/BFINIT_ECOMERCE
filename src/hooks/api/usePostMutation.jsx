import { useMutation } from "@tanstack/react-query";
import { postApi } from "@/services/api/postApi";
import useAuth from "../auth/useAuth";

export default function usePostMutation({
  endpoint,
  token = null,
  clientId = null,
  storeId = null,
}) {
  const { user } = useAuth();

  return useMutation({
    mutationFn: (payload) =>
      postApi(
        endpoint,
        token && user?.token,
        clientId && user?.data?.clientid,
        storeId,
        payload
      ),
  });
}
