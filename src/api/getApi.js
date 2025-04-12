const baseUrl = import.meta.env.VITE_BASE_URL;

export const getApi = async (endpoint, token) => {
  const headers = {
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const res = await fetch(baseUrl + endpoint, { headers });
  return res.json();
};
