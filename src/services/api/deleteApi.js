import { handleUnauthorized } from "@/lib/auth";

const baseUrl = import.meta.env.VITE_BASE_URL;
const NEW_BASE_URL = import.meta.env.VITE_NEW_BASE_URL;

export const deleteApi = async (
  endpoint,
  token,
  clientId = null,
  payload = null,
  newBaseUrl = false,
) => {
  const BASE_URL = newBaseUrl ? NEW_BASE_URL : baseUrl;

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(clientId && { clientid: clientId }),
  };

  const options = {
    method: "DELETE",
    headers,
  };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  const res = await fetch(BASE_URL + endpoint, options);
  handleUnauthorized(res);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message || "Request failed");
    error.response = data;
    throw error;
  }

  return data;
};
