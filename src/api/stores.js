// delete api
export const handleStoreDelete = async (url, clientId, token) => {
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      clientId: clientId,
    },
  });
  const data = await res.json();
  return data;
};
