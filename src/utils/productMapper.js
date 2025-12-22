export const transformProductForApi = (data) => {
  const {
    name,
    category,
    subcategory,
    brand,
    tags,
    price,
    cost,
    discount,
    tax,
    flash_sale,
    flash_sale_end_date,
    flash_sale_show_countdown,
    best_seller,
    new_arrival,
    best_seller_threshold,
    hot_deal,
    limited_stock,
    limited_stock_threshold,
    description,
    short_description,
    variants,
    featured,
  } = data;

  const productData = {
    productName: name,
    productCategory: category,
    productSubCategory: subcategory,
    productBrand: brand,
    tags: tags || [],
    productShortDescription: short_description,
    productDescription: description,
    productPrice: parseFloat(price) || 0,
    productDiscount: parseFloat(discount) || 0,
    productCost: parseFloat(cost) || 0,
    tax: tax || false,
    best_seller,
    best_seller_threshold: best_seller ? best_seller_threshold : 0,
    featured,
    new_arrival,
    hot_deal,
    flash_sale,
    flash_sale_end_date,
    flash_sale_show_countdown,
    limited_stock,
    limited_stock_threshold: limited_stock ? limited_stock_threshold : 0,
    variants: transformVariantsForApi(variants),
    productQuantity: 0, // TODO: implement product quantity in frontend
    shippingCharges: 0, // TODO: implement shipping charges in frontend
    productStatus: true, // TODO: ask nitish what this product status do
  };

  return productData;
};

const transformVariantsForApi = (variants) => {
  if (!variants.enabled) {
    return {
      enabled: false,
      useDefaultPricing: true,
      attributes: [],
    };
  }

  return {
    enabled: variants.enabled,
    useDefaultPricing: variants.useDefaultPricing,
    attributes: variants.attributes.map((attr) => ({
      name: attr.name,
      required: attr.required,
      value: attr.values.map((val) => ({
        name: val.name,
        sku: val.sku || "",
        price: parseFloat(val.price) || 0,
        discountPrice: parseFloat(val.discountPrice) || 0,
        stock: parseInt(val.stock) || 0,
        status: val.status,
      })),
    })),
  };
};
