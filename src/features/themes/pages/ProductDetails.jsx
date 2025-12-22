import { useState } from "react";
import {
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Check,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/utils/formatPrice";

export default function ProductDetails({ product }) {
  const {
    productName,
    productPrice,
    productDiscount,
    productCost,
    productDescription,
    productShortDescription,
    thumbnailImage,
    productImage = [],
    rating = 0,
    productBrand,
    productCategory,
    productSubCategory,
    tags = [],
    variants,
    productQuantity,
    shippingCharges,
    flash_sale,
    new_arrival,
    best_seller,
    hot_deal,
    limited_stock,
  } = product || {
    variants: {
      enabled: true,
      useDefaultPricing: true,
      attributes: [
        {
          name: "Size",
          required: false,
          value: [
            {
              name: "Small",
              sku: "SZ-SM",
              price: { $numberDecimal: "0" },
              discountPrice: { $numberDecimal: "0" },
              stock: 50,
              status: true,
              image: [],
              _id: "var1",
            },
            {
              name: "Medium",
              sku: "SZ-MD",
              price: { $numberDecimal: "0" },
              discountPrice: { $numberDecimal: "0" },
              stock: 30,
              status: true,
              image: [],
              _id: "var2",
            },
          ],
          _id: "attr1",
        },
      ],
    },
    _id: "prod001",
    productName: "Wireless Bluetooth Headphones",
    productCategory: "Audio & Sound",
    productSubCategory: "Headphones",
    productBrand: "Sony",
    productDescription: null,
    productShortDescription:
      "Premium noise-cancelling wireless headphones with 30-hour battery life",
    productPrice: 299,
    productCost: 150,
    productDiscount: 50,
    tax: false,
    tags: ["wireless", "bluetooth", "noise-cancelling"],
    thumbnailImage: "/uploads/productImages/headphones-001.jpg",
    productImage: [],
    flash_sale: true,
    rating: 4.5,
    flash_sale_show_countdown: true,
    new_arrival: true,
    best_seller: true,
    best_seller_threshold: 100,
    hot_deal: true,
    limited_stock: false,
    limited_stock_threshold: 0,
    featured: true,
    productQuantity: 80,
    shippingCharges: 0,
    productStatus: true,
    storeId: "6857bc3e4205851792ca088a",
    createdAt: "2025-12-15T10:00:00.000Z",
    __v: 0,
    productId: "prod001",
  };

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(thumbnailImage);
  const [selectedVariants, setSelectedVariants] = useState({});

  // Calculate discount percentage
  const discountPercent =
    productDiscount && productPrice
      ? Math.round(((productDiscount - productPrice) / productDiscount) * 100)
      : 0;

  const hasVariants = variants?.enabled && variants?.attributes?.length > 0;

  const handleQuantityChange = (action) => {
    if (action === "increment") {
      setQuantity((prev) => Math.min(prev + 1, productQuantity || 999));
    } else if (action === "decrement") {
      setQuantity((prev) => Math.max(prev - 1, 1));
    }
  };

  const handleVariantSelect = (attributeName, valueName) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [attributeName]: valueName,
    }));
  };

  // Determine badge
  const badge = flash_sale
    ? {
        text: "Flash Sale",
        color: "bg-destructive text-destructive-foreground",
      }
    : hot_deal
    ? { text: "Hot Deal", color: "bg-warning text-warning-foreground" }
    : limited_stock
    ? {
        text: "Limited Stock",
        color: "bg-destructive text-destructive-foreground",
      }
    : new_arrival
    ? { text: "New Arrival", color: "bg-info text-info-foreground" }
    : best_seller
    ? { text: "Bestseller", color: "bg-success text-success-foreground" }
    : null;

  const allImages = [thumbnailImage, ...productImage].filter(Boolean);

  return (
    <div className="bg-background min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-muted relative aspect-square rounded-lg overflow-hidden border border-border">
              <img
                src={selectedImage || "/placeholder-image.jpg"}
                alt={productName}
                className="w-full h-full object-cover"
              />
              {badge && (
                <div
                  className={`absolute top-4 left-4 rounded-md px-3 py-1.5 text-sm font-semibold ${badge.color}`}
                >
                  {badge.text}
                </div>
              )}
              {discountPercent > 0 && (
                <div className="bg-destructive text-destructive-foreground absolute top-4 right-4 rounded-md px-3 py-1.5 text-sm font-semibold">
                  -{discountPercent}%
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`bg-muted aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === img
                        ? "border-primary"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${productName} ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Breadcrumb */}
            <div className="text-muted-foreground text-sm flex items-center gap-2">
              <span>{productCategory}</span>
              {productSubCategory && (
                <>
                  <span>/</span>
                  <span>{productSubCategory}</span>
                </>
              )}
            </div>

            {/* Product Name */}
            <h1 className="text-foreground text-3xl font-bold">
              {productName}
            </h1>

            {/* Rating & Brand */}
            <div className="flex items-center gap-4 flex-wrap">
              {rating > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(rating)
                            ? "fill-warning text-warning"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground text-sm">
                    {rating} out of 5
                  </span>
                </div>
              )}
              {productBrand && (
                <div className="text-muted-foreground text-sm">
                  Brand:{" "}
                  <span className="text-foreground font-medium">
                    {productBrand}
                  </span>
                </div>
              )}
            </div>

            {/* Short Description */}
            {productShortDescription && (
              <p className="text-muted-foreground leading-relaxed">
                {productShortDescription}
              </p>
            )}

            {/* Price */}
            <div className="bg-muted border-border rounded-lg p-4 border">
              <div className="flex items-baseline gap-3">
                <span className="text-foreground text-4xl font-bold">
                  {formatPrice(productPrice)}
                </span>
                {discountPercent > 0 && (
                  <>
                    <span className="text-muted-foreground text-xl line-through">
                      {formatPrice(productDiscount)}
                    </span>
                    <span className="bg-destructive/10 text-destructive rounded-md px-2 py-1 text-sm font-semibold">
                      Save {discountPercent}%
                    </span>
                  </>
                )}
              </div>
              {shippingCharges > 0 && (
                <p className="text-muted-foreground text-sm mt-2">
                  + {formatPrice(shippingCharges)} shipping
                </p>
              )}
            </div>

            {/* Variants */}
            {hasVariants && (
              <div className="space-y-4">
                {variants.attributes.map((attribute) => (
                  <div key={attribute._id} className="space-y-3">
                    <label className="text-foreground text-sm font-semibold">
                      {attribute.name}
                      {attribute.required && (
                        <span className="text-destructive ml-1">*</span>
                      )}
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {attribute.value.map((option) => (
                        <button
                          key={option._id}
                          onClick={() =>
                            handleVariantSelect(attribute.name, option.name)
                          }
                          disabled={!option.status}
                          className={`border rounded-md px-4 py-2 text-sm font-medium transition-all ${
                            selectedVariants[attribute.name] === option.name
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background text-foreground border-border hover:border-primary"
                          } ${
                            !option.status
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          {option.name}
                          {!option.status && (
                            <span className="ml-2 text-xs">(Out of stock)</span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-3">
              <label className="text-foreground text-sm font-semibold">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-border rounded-lg">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleQuantityChange("decrement")}
                    disabled={quantity <= 1}
                    className="h-10 w-10 rounded-r-none"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="border-border w-16 text-center border-x py-2 text-foreground font-semibold">
                    {quantity}
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleQuantityChange("increment")}
                    disabled={quantity >= productQuantity}
                    className="h-10 w-10 rounded-l-none"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {productQuantity > 0 && (
                  <span className="text-muted-foreground text-sm">
                    {productQuantity} available
                  </span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 flex-wrap">
              <Button
                size="lg"
                className="flex-1 min-w-[200px] gap-2 text-base font-semibold"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Heart className="h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>

            {/* Features */}
            {/* <div className="bg-muted/50 border-border rounded-lg p-4 space-y-3 border">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Truck className="h-5 w-5 text-primary" />
                <div className="text-sm">
                  <span className="text-foreground font-medium">
                    Free Delivery
                  </span>
                  <span className="ml-2">on orders over $50</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Shield className="h-5 w-5 text-primary" />
                <div className="text-sm">
                  <span className="text-foreground font-medium">
                    Secure Payment
                  </span>
                  <span className="ml-2">100% secure transaction</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <RotateCcw className="h-5 w-5 text-primary" />
                <div className="text-sm">
                  <span className="text-foreground font-medium">
                    Easy Returns
                  </span>
                  <span className="ml-2">30-day return policy</span>
                </div>
              </div>
            </div> */}

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-muted-foreground text-sm font-medium">
                  Tags:
                </span>
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-muted text-muted-foreground border-border rounded-md px-3 py-1 text-xs border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Description Section */}
        {productDescription && (
          <div className="bg-card border-border rounded-lg border p-8">
            <h2 className="text-foreground text-2xl font-bold mb-6">
              Product Description
            </h2>
            <div
              id="preview"
              className="prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: productDescription }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
