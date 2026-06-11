import { BASE_URL } from "@/lib/api";

export const getApi = async ({ endpoint, token }) => {
  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, { headers });
  return res.json();
};
