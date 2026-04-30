import { useMutation } from "@tanstack/react-query";
import { postApi } from "@/services/api/postApi";
import useAuth from "../auth/useAuth";

export default function usePostMutation({
  endpoint,
  token = null,
  customerToken = null,
  clientId = null,
  customerId = null,
  storeId = null,
  newBaseUrl = false,
}) {
  const { user } = useAuth();

  const activeToken = customerToken || (token && user?.token) || null;

  return useMutation({
    mutationFn: (payload) =>
      postApi(
        endpoint,
        activeToken,
        clientId && user?.data?.clientid,
        customerId,
        storeId,
        payload,
        newBaseUrl,
      ),
  });
}
