const baseUrl = import.meta.env.VITE_BASE_URL;

export const putApi = async (endpoint, token, payload) => {
  const isFormData = payload instanceof FormData; // check form data is raw json or new FormData();

  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
    ...(!isFormData && { "Content-Type": "application/json" }),
  };

  const res = await fetch(baseUrl + endpoint, {
    method: "PUT",
    headers,
    body: isFormData ? payload : JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message || "Request failed");
    error.response = data;
    throw error;
  }

  return data;
};
