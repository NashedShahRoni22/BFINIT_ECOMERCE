import { handleUnauthorized } from "../utils/admin/auth";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const getApi = async (endpoint, token) => {
  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const res = await fetch(baseUrl + endpoint, { headers });

  handleUnauthorized(res);

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  return res.json();
};
