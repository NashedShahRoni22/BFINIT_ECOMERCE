import { useContext } from "react";
import { CartContext } from "../Providers/CartProvider";

export default function useCart() {
  const cartInfo = useContext(CartContext);
  return cartInfo;
}
