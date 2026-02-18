import { baseUrl } from "@/utils/api";

const getTransformedVariants = (variants) => {
  if (variants?.enabled) {
    return {
      enabled: variants.enabled,
      useDefaultPricing: variants?.useDefaultPricing,
      attributes: variants.attributes.map((attr) => ({
        id: attr.id || attr._id,
        name: attr.name,
        required: attr.required,
        values: (attr.value || []).map((val) => ({
          id: val.id || val._id,
          name: val.name,
          sku: val.sku,
          price: val.price?.toString() || "",
          discountPrice: val.discountPrice?.toString() || "",
          stock: val.stock?.toString() || "",
          status: val.status,
          image:
            val.image && val.image.length > 0
              ? {
                  preview: `${baseUrl}${val.image[0]}`,
                  name: val.image[0].split("/").pop(),
                  isExisting: true,
                }
              : null,
          imageUrl:
            val.image && val.image.length > 0
              ? `${baseUrl}${val.image[0]}`
              : null,
        })),
      })),
    };
  } else {
    return {
      enabled: false,
      useDefaultPricing: true,
      attributes: [],
    };
  }
};

export const fillFormWithProductData = (product, reset) => {
  const {
    productName,
    productCategory,
    productSubCategory,
    productBrand,
    tags,
    productShortDescription,
    productDescription,
    thumbnailImage,
    productImage,
    productPrice, // OLD: Single price - kept for backward compatibility
    productDiscount, // OLD: Single discount - kept for backward compatibility
    pricing, // NEW: Array of country-based pricing
    best_seller,
    best_seller_threshold,
    featured,
    new_arrival,
    hot_deal,
    flash_sale,
    flash_sale_show_countdown,
    flash_sale_end_date,
    limited_stock,
    limited_stock_threshold,
    variants, // OLD: Single variants object - kept for backward compatibility
  } = product;

  // Transform pricing array if it exists (NEW multi-country format)
  const transformedPricing =
    pricing?.map((countryPricing) => {
      const discountVal = parseFloat(countryPricing.discountPrice);

      return {
        countryId: countryPricing.countryId,
        productPrice: countryPricing.productPrice?.toString() || "",
        productCost: countryPricing.productCost?.toString() || "",
        discountPrice:
          !isNaN(discountVal) && discountVal > 0 ? discountVal.toString() : "",
        shippingCharges: countryPricing.shippingCharges?.toString() || "",
        tax: countryPricing.tax || false,
        status: countryPricing.status ?? true,
        variants: getTransformedVariants(countryPricing.variants),
      };
    }) || [];

  // Reset all fields
  reset({
    name: productName,
    category: productCategory,
    subcategory: productSubCategory,
    brand: productBrand,
    tags,
    short_description: productShortDescription,
    description: productDescription,
    thumbnail: thumbnailImage
      ? {
          preview: `${baseUrl}${thumbnailImage}`,
          name: thumbnailImage.split("/").pop(),
          isExisting: true,
        }
      : null,
    gallery: productImage
      ? productImage.map((imagePath) => ({
          id: imagePath,
          preview: `${baseUrl}${imagePath}`,
          name: imagePath.split("/").pop(),
          isExisting: true,
        }))
      : [],

    // NEW: Country-based pricing array
    pricing: transformedPricing,

    // OLD: Keep these for backward compatibility (if pricing array doesn't exist)
    price: productPrice,
    discount:
      productDiscount && parseInt(productDiscount) > 0 ? productDiscount : "",
    variants: getTransformedVariants(variants),

    // Product status fields
    best_seller,
    best_seller_threshold,
    featured,
    new_arrival,
    hot_deal,
    flash_sale,
    flash_sale_show_countdown,
    flash_sale_end_date,
    limited_stock,
    limited_stock_threshold,
  });
};
