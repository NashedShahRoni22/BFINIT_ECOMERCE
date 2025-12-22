import { StoreContext } from "@/context/StoreContext";
import { useContext } from "react";

export default function useSelectedStore() {
  return useContext(StoreContext);
}
