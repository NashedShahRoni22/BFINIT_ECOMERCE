import { ShoppingCart, Heart, Eye, Star, Image, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/formatPrice";
import { Link } from "react-router";

export default function ProductCard({ product }) {
  const {
    productId,
    productName,
    productPrice,
    productDiscount,
    thumbnailImage,
    productShortDescription,
    rating = 0,
    featured,
    new_arrival,
    best_seller,
    hot_deal,
    flash_sale,
    limited_stock,
    variants,
  } = product || {};

  const hasVariants = variants?.enabled && variants?.attributes?.length > 0;

  // Calculate discount percentage
  const discountPercent =
    productDiscount && productPrice
      ? Math.round(((productDiscount - productPrice) / productDiscount) * 100)
      : 0;

  // Determine which badge to show (priority order)
  const badge = flash_sale
    ? {
        text: "Flash Sale",
        color: "bg-destructive text-destructive-foreground",
      }
    : hot_deal
    ? { text: "Hot Deal", color: "bg-warning text-warning-foreground" }
    : limited_stock
    ? { text: "Limited", color: "bg-destructive text-destructive-foreground" }
    : new_arrival
    ? { text: "New", color: "bg-info text-info-foreground" }
    : best_seller
    ? { text: "Bestseller", color: "bg-success text-success-foreground" }
    : featured
    ? { text: "Featured", color: "bg-primary text-primary-foreground" }
    : null;

  return (
    <div className="group bg-card border-border hover:border-primary/50 relative flex flex-col overflow-hidden rounded-lg border transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        {thumbnailImage ? (
          <img
            src={`https://ecomback.bfinit.com${thumbnailImage}`}
            alt={productName}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full aspect-square bg-muted rounded-lg flex items-center justify-center">
            <Image
              className="w-20 h-20 text-muted-foreground/20"
              strokeWidth={0.5}
            />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-muted-foreground/25 text-4xl font-medium -rotate-12">
                DEMO
              </span>
            </div>
          </div>
        )}

        {/* Badges */}
        {badge && (
          <div
            className={`absolute top-3 left-3 rounded-md px-2.5 py-1 text-xs font-semibold ${badge.color}`}
          >
            {badge.text}
          </div>
        )}

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="bg-destructive text-destructive-foreground absolute top-3 right-3 rounded-md px-2.5 py-1 text-xs font-semibold">
            -{discountPercent}%
          </div>
        )}

        {/* Quick Action Buttons */}
        <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            size="icon"
            variant="secondary"
            className="bg-background/95 hover:bg-primary hover:text-primary-foreground h-9 w-9 rounded-full backdrop-blur-sm"
          >
            <Link to={`/theme/customize/shop/${productId}`}>
              <Eye />
            </Link>
          </Button>
          <Button
            size="icon"
            variant="secondary"
            className="bg-background/95 hover:bg-primary hover:text-primary-foreground h-9 w-9 rounded-full backdrop-blur-sm"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        {/* Rating */}
        {rating > 0 && (
          <div className="mb-2 flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(rating)
                    ? "fill-warning text-warning"
                    : "text-muted-foreground/30"
                }`}
              />
            ))}
            <span className="text-muted-foreground ml-1 text-xs">
              ({rating})
            </span>
          </div>
        )}

        {/* Product Name */}
        <Link
          to={`/theme/customize/shop/${productId}`}
          className="text-foreground mb-2 line-clamp-2 text-sm font-semibold leading-snug transition-colors group-hover:text-primary"
        >
          {productName}
        </Link>

        {/* Description */}
        {productShortDescription && (
          <p className="text-muted-foreground mb-3 line-clamp-2 text-xs leading-relaxed">
            {productShortDescription}
          </p>
        )}

        {/* Price & Add to Cart */}
        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-foreground text-lg font-bold">
                {formatPrice(productPrice)}
              </span>
              {discountPercent > 0 && (
                <span className="text-muted-foreground text-xs line-through">
                  {formatPrice(productDiscount)}
                </span>
              )}
            </div>
          </div>
          <Button
            size="sm"
            // onClick={handleAction}
            className="hover:bg-primary/90 h-9 gap-1.5 px-3 text-xs font-medium"
          >
            {hasVariants ? (
              <>
                <Settings2 className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Options</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Add</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
