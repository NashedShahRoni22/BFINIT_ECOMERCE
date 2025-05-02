import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const savedCart = localStorage.getItem("cartItems");
  const [cartItems, setCartItems] = useState(
    savedCart ? JSON.parse(savedCart) : [],
  );

  // Save cart items to local storage
  const handleAddToCart = (product, quantity) => {
    const isItemInCart = cartItems.find(
      (item) => item.productId === product.productId,
    );

    if (isItemInCart) {
      return toast.error("Item already in cart!");
    } else {
      setCartItems((prevItems) => [
        { ...product, quantity: quantity ? quantity : 1 },
        ...prevItems,
      ]);
      toast.success("New item added!");
    }
  };

  // Update quantity of a cart item
  const handleUpdateQuantity = (productId, newQuanity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity: newQuanity } : item,
      ),
    );
  };

  // Deleate a cart item from local storage
  const handleCartDelete = (productId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter(
        (item) => item.productId !== productId,
      );
      return updatedItems;
    });
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const cartInfo = {
    cartItems,
    setCartItems,
    handleAddToCart,
    handleUpdateQuantity,
    handleCartDelete,
  };

  return (
    <CartContext.Provider value={cartInfo}>{children}</CartContext.Provider>
  );
}
