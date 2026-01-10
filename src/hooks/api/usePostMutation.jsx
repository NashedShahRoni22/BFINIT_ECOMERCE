import { useMutation } from "@tanstack/react-query";
import { postApi } from "@/services/api/postApi";
import useAuth from "../auth/useAuth";

export default function usePostMutation({
  endpoint,
  token = null,
  clientId = null,
  customerId = null,
  storeId = null,
}) {
  const { user } = useAuth();
  const activeToken = token ? token : user?.token;

  return useMutation({
    mutationFn: (payload) =>
      postApi(
        endpoint,
        token && activeToken,
        clientId && user?.data?.clientid,
        customerId,
        storeId,
        payload,
      ),
  });
}
