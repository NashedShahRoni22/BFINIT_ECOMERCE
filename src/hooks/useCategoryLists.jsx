import { useContext } from "react";
import { CategoryContext } from "../Providers/CategoryProvider";

export default function useCategoryLists() {
  const categoryLists = useContext(CategoryContext);
  return categoryLists;
}
