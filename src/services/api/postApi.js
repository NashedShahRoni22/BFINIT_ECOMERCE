import { handleUnauthorized } from "@/lib/auth";

const baseUrl = import.meta.env.VITE_BASE_URL;
const NEW_BASE_URL = import.meta.env.VITE_NEW_BASE_URL;

export const postApi = async (
  endpoint,
  token,
  clientId,
  customerId,
  storeId,
  payload,
  newBaseUrl = false,
) => {
  const BASE_URL = newBaseUrl ? NEW_BASE_URL : baseUrl;
  const isFormData = payload instanceof FormData;

  const headers = {
    ...(!isFormData && { "Content-Type": "application/json" }),
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(clientId && { clientid: clientId }),
    ...(customerId && { customerid: customerId }),
    ...(storeId && { storeid: storeId }),
  };

  const res = await fetch(BASE_URL + endpoint, {
    method: "POST",
    headers,
    body: isFormData ? payload : JSON.stringify(payload),
  });

  handleUnauthorized(res);

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message || "Request failed");
    error.response = data;
    throw error;
  }

  return data;
};
