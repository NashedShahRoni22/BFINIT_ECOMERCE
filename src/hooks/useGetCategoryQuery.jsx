import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../api/categories";

export default function useCategoryQuery({ storeId, token }) {
  return useQuery({
    queryKey: ["categories", storeId],
    queryFn: () => fetchCategories(storeId, token),
    enabled: !!storeId && !!token,
  });
}
