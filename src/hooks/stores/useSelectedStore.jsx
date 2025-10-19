import { useContext } from "react";
import { StoreContext } from "@/context/StoreContext";

export default function useSelectedStore() {
  return useContext(StoreContext);
}
