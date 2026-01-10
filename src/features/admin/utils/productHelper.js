import { baseUrl } from "@/utils/api";

const getTransformedVariants = (variants) => {
  if (variants?.enabled) {
    return {
      enabled: variants.enabled,
      useDefaultPricing: variants.useDefaultPricing,
      attributes: variants.attributes.map((attr) => ({
        id: attr.id || attr._id,
        name: attr.name,
        required: attr.required,
        values: (attr.value || []).map((val) => ({
          id: val.id || val._id,
          name: val.name,
          sku: val.sku,
          price: val.price,
          discountPrice: val.discountPrice,
          stock: val.stock,
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
    productPrice,
    productDiscount,
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
    variants,
  } = product;

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
    price: productPrice,
    discount:
      productDiscount && parseInt(productDiscount) > 0 ? productDiscount : "",
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
    variants: getTransformedVariants(variants),
  });
};
