import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import toast from "react-hot-toast";
import { CartContext } from "@/context/CartContext";

export default function CartProvider({ children }) {
  const location = useLocation();
  const isPreviewMode = location.pathname.includes("/theme-editor");

  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const generateCartItemId = (productId, selectedVariant) => {
    const variantPart = selectedVariant?.sku || "no-variant";
    return `${productId}-${variantPart}-${Date.now()}`;
  };

  const isSameVariant = (variant1, variant2) => {
    if (!variant1 && !variant2) return true; // Both null/undefined
    if (!variant1 || !variant2) return false; // One is null
    return variant1.sku === variant2.sku;
  };

  const addToCart = (product, quantity = 1, selectedVariant = null) => {
    let isUpdated = false;

    setCartItems((prev) => {
      // Find existing item with same product and variant
      const existingItemIndex = prev.findIndex(
        (item) =>
          item.productId === product.productId &&
          isSameVariant(item.selectedVariant, selectedVariant),
      );

      // If item exists, increase quantity
      if (existingItemIndex > -1) {
        const updated = [...prev];
        updated[existingItemIndex].quantity += quantity;
        isUpdated = true;
        return updated;
      }

      // Create new cart item
      const cartItem = {
        id: generateCartItemId(product.productId, selectedVariant),
        productId: product.productId,
        productName: product.productName,
        thumbnailImage: product.thumbnailImage,
        productPrice: product.productPrice,
        productDiscount: product.productDiscount || 0,
        quantity,
        selectedVariant: selectedVariant || null, // Store entire variant object for checkout
      };
      isUpdated = false;
      return [...prev, cartItem];
    });

    toast.success(
      isUpdated ? "Cart updated successfully" : "Added to cart successfully",
    );
  };

  const removeFromCart = (cartItemId) => {
    setCartItems((prev) => {
      const updated = prev.filter((item) => item.id !== cartItemId);
      toast.success("Removed from cart");
      return updated;
    });
  };

  const updateQuantity = (cartItemId, quantity) => {
    if (quantity < 1) {
      removeFromCart(cartItemId);
      return;
    }

    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item,
      ),
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    toast.success("Cart cleared");
  };

  const getItemPrice = (item) => {
    // If variant has custom pricing (useDefaultPricing is false)
    if (
      item.selectedVariant &&
      !item.selectedVariant.useDefaultPricing &&
      item.selectedVariant.price
    ) {
      const variantPrice = parseFloat(
        item.selectedVariant.price.$numberDecimal || item.selectedVariant.price,
      );
      const variantDiscount = item.selectedVariant.discountPrice
        ? parseFloat(
            item.selectedVariant.discountPrice.$numberDecimal ||
              item.selectedVariant.discountPrice,
          )
        : 0;

      return variantDiscount > 0 ? variantDiscount : variantPrice;
    }

    // Use product pricing
    return item.productDiscount > 0 ? item.productDiscount : item.productPrice;
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + getItemPrice(item) * item.quantity,
    0,
  );

  const totalSavings = cartItems.reduce((sum, item) => {
    const originalPrice = item.selectedVariant?.price
      ? parseFloat(
          item.selectedVariant.price.$numberDecimal ||
            item.selectedVariant.price,
        )
      : item.productPrice;
    const currentPrice = getItemPrice(item);

    if (currentPrice < originalPrice) {
      return sum + (originalPrice - currentPrice) * item.quantity;
    }
    return sum;
  }, 0);

  const value = {
    cartItems,
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
