export const baseUrl = import.meta.env.VITE_BASE_URL;

// Fetch all catgories of a store
export const fetchCategories = async (storeId, token) => {
  const res = await fetch(`${baseUrl}/category/?storeId=${storeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await res.json();
  return data;
};

// Create new category
export const createCategory = async (storeId, token, category) => {
  const res = await fetch(`${baseUrl}/category/create/${storeId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: category,
  });
  const data = await res.json();
  return data;
};

// Update category name or image
export const updateCategory = async (
  storeId,
  categoryId,
  token,
  updateCategoryData,
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
