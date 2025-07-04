import { handleUnauthorized } from "../utils/admin/auth";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const deleteApi = async (
  endpoint,
  token,
  clientId = null,
  payload = null,
) => {
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

  const res = await fetch(baseUrl + endpoint, options);
  handleUnauthorized(res);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message || "Request failed");
    error.response = data;
    throw error;
  }

  return data;
};
