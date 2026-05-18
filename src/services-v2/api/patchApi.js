import { BASE_URL } from "@/utils/api-config";

export const patchApi = async ({ endpoint, payload, token }) => {
  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return data;
};
