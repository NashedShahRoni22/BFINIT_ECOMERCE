import { useMutation } from "@tanstack/react-query";
import { createCategory } from "../api/categories";

export default function useCreateCategory({ storeId, token }) {
  return useMutation({
    mutationFn: (category) => createCategory(storeId, token, category),
  });
}
