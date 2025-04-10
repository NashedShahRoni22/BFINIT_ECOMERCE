import { useMutation } from "@tanstack/react-query";
import { updateCategory } from "../api/categories";

export default function useUpdateCategory({ storeId, categoryId, token }) {
  return useMutation({
    mutationFn: (updateCategoryData) =>
      updateCategory(storeId, categoryId, token, updateCategoryData),
  });
}
