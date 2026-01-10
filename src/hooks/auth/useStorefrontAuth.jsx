import { useContext } from "react";
import { StorefrontAuthContext } from "@/context/StorefrontAuthContext";

export default function useStorefrontAuth() {
  return useContext(StorefrontAuthContext);
}
