const baseUrl = "https://ecomback.bfinit.com";

export const getApi = async (endpoint, token) => {
  const res = await fetch(baseUrl + endpoint, {
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });
  return res.json();
};
