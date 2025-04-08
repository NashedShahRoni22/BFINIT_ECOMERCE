const baseUrl = import.meta.env.VITE_BASE_URL;

// Get all categories
export const getCategories = async (storeId, token) => {
  const res = await fetch(`${baseUrl}/category/?storeId=${storeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

// Update category name or image
export const handleUpdateCategory = async (
  storeId,
  categoryId,
  updateCategoryData,
  token,
) => {
  const res = await fetch(
    `${baseUrl}/category/update/${storeId}/${categoryId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: updateCategoryData,
    },
  );
  const data = await res.json();
  return data;
};
