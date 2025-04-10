import { useMutation } from "@tanstack/react-query";
import { createSubCategory } from "../api/subCategories";

export default function useCreateSubCategory({ storeId, categoryId, token }) {
  return useMutation({
    mutationFn: (subCategory) =>
      createSubCategory(storeId, categoryId, token, subCategory),
  });
}
