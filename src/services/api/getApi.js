import { handleUnauthorized } from "@/lib/auth";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const getApi = async (endpoint, token, clientId) => {
  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(clientId && { clientid: clientId }),
  };

  const res = await fetch(baseUrl + endpoint, { headers });

  handleUnauthorized(res);

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
};
