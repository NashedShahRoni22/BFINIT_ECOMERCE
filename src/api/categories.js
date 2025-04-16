export const baseUrl = import.meta.env.VITE_BASE_URL;

// Delete a category
export const deleteCategory = async (storeId, categoryId, token) => {
  const res = await fetch(
    `${baseUrl}/category/delete/${storeId}/${categoryId}`,
    {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const data = await res.json();
  return data;
};

export const fetcher = async ({ url, token }) => {
  const res = await fetch(url, {
    headers: {
      Authorization: token && token,
    },
  });

  return res.json();
};
