import { BASE_URL } from "@/lib/api";

export const postApi = async ({ endpoint, payload, token }) => {
  const isFormData = payload instanceof FormData;
  console.log({ isFormData });

  const headers = {
    ...(!isFormData && { "Content-Type": "application/json" }),
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers,
    body: isFormData ? payload : JSON.stringify(payload),
  });

  const data = await res.json();

  return data;
};
