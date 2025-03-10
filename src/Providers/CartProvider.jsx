import { createContext, useEffect, useState } from "react";

export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const savedCart = localStorage.getItem("cartItems");
  const [cartItems, setCartItems] = useState(
    savedCart ? JSON.parse(savedCart) : [],
  );

  // Save cart items to local storage
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const isItemInCart = prevItems.some((item) => item.id === product.id);
      if (!isItemInCart) {
        return [{ ...product, quantity: 1 }, ...prevItems];
      }
      return [...prevItems];
    });
  };

  // Update quantity of a cart item
  const handleUpdateQuantity = (productId, newQuanity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuanity } : item,
      ),
    );
  };

  // Deleate a cart item from local storage
  const handleCartDelete = (productId) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== productId);
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
