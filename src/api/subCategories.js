import { baseUrl } from "./categories";

// Create new sub category
export const createSubCategory = async (
  storeId,
  categoryId,
  token,
  subCategory,
) => {
  const res = await fetch(
    `${baseUrl}/category/update/${storeId}/${categoryId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: subCategory,
    },
  );
  const data = await res.json();
  return data;
};
