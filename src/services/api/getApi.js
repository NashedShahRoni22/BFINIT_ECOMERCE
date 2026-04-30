import { handleUnauthorized } from "@/lib/auth";

const baseUrl = import.meta.env.VITE_BASE_URL;
const NEW_BASE_URL = import.meta.env.VITE_NEW_BASE_URL;

export const getApi = async (endpoint, token, clientId, newBaseUrl = false) => {
  const BASE_URL = newBaseUrl ? NEW_BASE_URL : baseUrl;

  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(clientId && { clientid: clientId }),
  };

  const res = await fetch(BASE_URL + endpoint, { headers });

  handleUnauthorized(res);

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
};
