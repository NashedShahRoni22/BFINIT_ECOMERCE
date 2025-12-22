import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import toast from "react-hot-toast";
import { CartContext } from "@/context/CartContext";

// Mock data for preview mode
const MOCK_CART_ITEMS = [
  {
    id: "693ee05df2c24ef9cceae0cc",
    productId: "693ee05df2c24ef9cceae0cc",
    productName: "Kelly Norton",
    thumbnailImage:
      "/uploads/productImages/1765728349209-pexels-element-apothec-275580249-13272754.jpg",
    productPrice: 750,
    productDiscount: 0,
    quantity: 2,
    selectedVariant: null,
  },
  {
    id: "69313036ebadf1a11b48c662",
    productId: "69313036ebadf1a11b48c662",
    productName: "Jena Stuart",
    thumbnailImage:
      "/uploads/productImages/1764831286245-pexels-correxiko-collagen-18647881-6475116.jpg",
    productPrice: 654,
    productDiscount: 895,
    quantity: 1,
    selectedVariant: null,
  },
];

export default function CartProvider({ children }) {
  const location = useLocation();
  const isPreviewMode = location.pathname.includes("/theme/customize");

  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const activeCartItems = isPreviewMode ? MOCK_CART_ITEMS : cartItems;

  // Load cart from localStorage on mount (only in public mode)
  useEffect(() => {
    if (!isPreviewMode) {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (error) {
          console.error("Failed to load cart:", error);
        }
      }
    }
  }, [isPreviewMode]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isPreviewMode && cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems, isPreviewMode]);

  const addToCart = (product, quantity = 1, selectedVariant = null) => {
    if (isPreviewMode) {
      toast.success("Preview mode: Item would be added to cart", {
        duration: 2000,
      });
      return;
    }

    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) =>
          item.productId === product.productId &&
          JSON.stringify(item.selectedVariant) ===
            JSON.stringify(selectedVariant)
      );

      if (existingItemIndex > -1) {
        const updated = [...prev];
        updated[existingItemIndex].quantity += quantity;
        toast.success("Cart updated successfully");
        return updated;
      }

      const cartItem = {
        id: `${product.productId}-${Date.now()}`,
        productId: product.productId,
        productName: product.productName,
        thumbnailImage: product.thumbnailImage,
        productPrice: product.productPrice,
        productDiscount: product.productDiscount || 0,
        quantity,
        selectedVariant,
      };

      toast.success("Added to cart successfully");
      return [...prev, cartItem];
    });
  };

  const removeFromCart = (cartItemId) => {
    if (isPreviewMode) {
      toast.success("Preview mode: Item would be removed", {
        duration: 2000,
      });
      return;
    }

    setCartItems((prev) => {
      const updated = prev.filter((item) => item.id !== cartItemId);
      toast.success("Removed from cart");
      return updated;
    });
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (isPreviewMode) {
      toast.success("Preview mode: Quantity would be updated", {
        duration: 2000,
      });
      return;
    }

    if (quantity < 1) {
      removeFromCart(cartItemId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    if (isPreviewMode) {
      toast.success("Preview mode: Cart would be cleared", {
        duration: 2000,
      });
      return;
    }

    setCartItems([]);
    localStorage.removeItem("cart");
    toast.success("Cart cleared");
  };

  const getItemPrice = (item) => {
    return item.productDiscount > 0 ? item.productDiscount : item.productPrice;
  };

  const totalItems = activeCartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const subtotal = activeCartItems.reduce(
    (sum, item) => sum + getItemPrice(item) * item.quantity,
    0
  );

  const totalSavings = activeCartItems.reduce((sum, item) => {
    if (item.productDiscount > 0 && item.productDiscount < item.productPrice) {
      return sum + (item.productPrice - item.productDiscount) * item.quantity;
    }
    return sum;
  }, 0);

  const value = {
    cartItems: activeCartItems,
    isLoading,
    isPreviewMode,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    totalSavings,
    getItemPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
