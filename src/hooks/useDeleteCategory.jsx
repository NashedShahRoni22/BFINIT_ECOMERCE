import { useMutation } from "@tanstack/react-query";
import { deleteCategory } from "../api/categories";

export default function useDeleteCategory({ storeId, token }) {
  return useMutation({
    mutationFn: (categoryId) => deleteCategory(storeId, categoryId, token),
  });
}
