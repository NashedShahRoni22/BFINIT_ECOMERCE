import { BASE_URL } from "@/lib/api";

export const deleteApi = async ({ endpoint, payload, token }) => {
  const isFormData = payload instanceof FormData;

  const headers = {
    ...(!isFormData && { "Content-Type": "application/json" }),
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const options = {
    method: "DELETE",
    headers,
  };

  if (payload) {
    options.body = isFormData ? payload : JSON.stringify(payload);
  }

  const res = await fetch(`${BASE_URL}${endpoint}`, options);

  const data = await res.json();

  return data;
};
