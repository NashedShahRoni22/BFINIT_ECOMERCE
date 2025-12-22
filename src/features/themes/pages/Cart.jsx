import { useContext } from "react";
import { Link } from "react-router";
import { Minus, Plus, X, ShoppingBag, ArrowRight, Tag } from "lucide-react";
import { CartContext } from "@/context/CartContext";

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    totalSavings,
    getItemPrice,
    isPreviewMode,
  } = useContext(CartContext);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-md text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-muted p-8">
                <ShoppingBag className="h-16 w-16 text-muted-foreground" />
              </div>
            </div>
            <h2 className="mb-3 text-3xl font-bold text-foreground">
              Your cart is empty
            </h2>
            <p className="mb-8 text-muted-foreground">
              Looks like you haven't added anything to your cart yet
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-md bg-foreground px-8 py-3 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
            >
              Start Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const estimatedTax = subtotal * 0.1;
  const shippingCost = subtotal > 100 ? 0 : 10;
  const total = subtotal + estimatedTax + shippingCost;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground lg:text-4xl">
            Shopping Cart
          </h1>
          <p className="mt-2 text-muted-foreground">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="space-y-4 lg:col-span-2">
            {cartItems.map((item) => {
              const itemPrice = getItemPrice(item);
              const itemTotal = itemPrice * item.quantity;
              const hasDiscount =
                item.productDiscount > 0 &&
                item.productDiscount < item.productPrice;
              const discountPercentage = hasDiscount
                ? Math.round(
                    ((item.productPrice - item.productDiscount) /
                      item.productPrice) *
                      100
                  )
                : 0;

              return (
                <div
                  key={item.id}
                  className="relative rounded-lg border bg-card p-4 transition-shadow hover:shadow-md lg:p-6"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-muted lg:h-32 lg:w-32">
                      <img
                        src={item.thumbnailImage}
                        alt={item.productName}
                        className="h-full w-full object-cover"
                      />
                      {hasDiscount && (
                        <div className="absolute left-2 top-2">
                          <span className="rounded bg-destructive px-2 py-0.5 text-xs font-semibold text-destructive-foreground">
                            -{discountPercentage}%
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <Link
                              to={`/shop/${item.productId}`}
                              className="text-base font-semibold text-card-foreground transition-colors hover:text-foreground lg:text-lg"
                            >
                              {item.productName}
                            </Link>
                            {item.selectedVariant && (
                              <p className="mt-1 text-sm text-muted-foreground">
                                Variant: {item.selectedVariant.name}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            aria-label="Remove item"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-lg font-bold text-foreground">
                            ${itemPrice.toFixed(2)}
                          </span>
                          {hasDiscount && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${item.productPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls and Total */}
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-md border bg-background transition-colors hover:bg-muted"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="w-12 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-md border bg-background transition-colors hover:bg-muted"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">
                            Subtotal
                          </p>
                          <p className="text-lg font-bold text-foreground">
                            ${itemTotal.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Clear Cart */}
            <button
              onClick={clearCart}
              className="text-sm text-muted-foreground underline transition-colors hover:text-foreground"
            >
              Clear all items
            </button>
          </div>

          {/* Order Summary - Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              {/* Summary Card */}
              <div className="rounded-lg border bg-card p-6">
                <h2 className="mb-6 text-xl font-bold text-card-foreground">
                  Order Summary
                </h2>

                <div className="space-y-4">
                  {/* Subtotal */}
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold text-foreground">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  {/* Savings */}
                  {totalSavings > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-success">
                        <Tag className="h-4 w-4" />
                        You Save
                      </span>
                      <span className="font-semibold text-success">
                        -${totalSavings.toFixed(2)}
                      </span>
                    </div>
                  )}

                  {/* Divider */}
                  <div className="border-t"></div>

                  {/* Tax */}
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Estimated Tax</span>
                    <span className="font-semibold text-foreground">
                      ${estimatedTax.toFixed(2)}
                    </span>
                  </div>

                  {/* Shipping */}
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    {shippingCost === 0 ? (
                      <span className="font-semibold text-success">FREE</span>
                    ) : (
                      <span className="font-semibold text-foreground">
                        ${shippingCost.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {/* Free Shipping Progress */}
                  {subtotal < 100 && subtotal > 0 && (
                    <div className="rounded-lg bg-muted p-3">
                      <p className="mb-2 text-xs text-muted-foreground">
                        Add{" "}
                        <strong className="text-foreground">
                          ${(100 - subtotal).toFixed(2)}
                        </strong>{" "}
                        more for free shipping
                      </p>
                      <div className="h-2 overflow-hidden rounded-full bg-background">
                        <div
                          className="h-full bg-foreground transition-all"
                          style={{ width: `${(subtotal / 100) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Divider */}
                  <div className="border-t"></div>

                  {/* Total */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-foreground">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-foreground">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link
                  to="/checkout"
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>

                {/* Continue Shopping */}
                <Link
                  to="/shop"
                  className="mt-3 flex w-full items-center justify-center rounded-md border px-6 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Trust Badges */}
              {/* <div className="rounded-lg border bg-card p-4">
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-success/20">
                      <span className="text-xs font-bold text-success">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Secure Checkout
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Your data is protected
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-success/20">
                      <span className="text-xs font-bold text-success">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        Free Returns
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Within 30 days
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-success/20">
                      <span className="text-xs font-bold text-success">✓</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        24/7 Support
                      </p>
                      <p className="text-xs text-muted-foreground">
                        We're here to help
                      </p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
