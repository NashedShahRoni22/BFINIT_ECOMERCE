import { BASE_URL } from "@/utils/api-config";

export const getApi = async ({ endpoint, token }) => {
  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, { headers });
  return res.json();
};
