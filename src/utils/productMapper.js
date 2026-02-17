// Updated product mapper for country-based pricing
export const transformProductForApi = (data) => {
  const {
    name,
    category,
    subcategory,
    brand,
    tags,
    pricing, // Array of country-based pricing
    description,
    short_description,
    flash_sale,
    flash_sale_end_date,
    flash_sale_show_countdown,
    best_seller,
    new_arrival,
    best_seller_threshold,
    hot_deal,
    limited_stock,
    limited_stock_threshold,
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
    pricing: transformPricingForApi(pricing), // Transform country-based pricing
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
    productQuantity: calculateTotalQuantity(pricing), // Calculate from all countries
    productStatus: true,
  };

  return productData;
};

// Transform country-based pricing array for API
export const transformPricingForApi = (pricingArray = []) => {
  if (!pricingArray || pricingArray.length === 0) {
    return [];
  }

  return pricingArray.map((countryPricing) => ({
    countryId: countryPricing.countryId,
    productPrice: parseFloat(countryPricing.productPrice) || 0,
    productCost: parseFloat(countryPricing.productCost) || 0,
    discountPrice: parseFloat(countryPricing.discountPrice) || 0,
    shippingCharges: parseFloat(countryPricing.shippingCharges) || 0,
    tax: countryPricing.tax || false,
    status: countryPricing.status ?? true,
    variants: transformVariantsForApi(countryPricing.variants),
  }));
};

// Transform variants for API (works for country-specific variants)
export const transformVariantsForApi = (variants) => {
  if (!variants || !variants.enabled) {
    return {
      enabled: false,
      useDefaultPricing: true,
      attributes: [],
    };
  }

  return {
    enabled: variants.enabled,
    useDefaultPricing: variants?.useDefaultPricing,
    attributes: variants.attributes.map((attr) => ({
      name: attr.name,
      required: attr.required,
      value: attr.values.map((val) => ({
        name: val.name,
        sku: val.sku || "",
        price: parseFloat(val.price) || 0,
        discountPrice: parseFloat(val.discountPrice) || 0,
        stock: parseInt(val.stock) || 0,
        status: val.status ?? true,
      })),
    })),
  };
};

// Calculate total product quantity from all countries
export const calculateTotalQuantity = (pricingArray = []) => {
  let total = 0;

  pricingArray.forEach((countryPricing) => {
    if (countryPricing.variants?.enabled) {
      // Sum up all variant stocks
      countryPricing.variants.attributes.forEach((attr) => {
        attr.values.forEach((val) => {
          total += parseInt(val.stock) || 0;
        });
      });
    }
  });

  return total;
};

// Validation helper for country pricing
export const validateCountryPricing = (pricingArray) => {
  if (!pricingArray || pricingArray.length === 0) {
    return {
      isValid: false,
      message: "Please add pricing for at least one country",
    };
  }

  // Check if at least one country has pricing data
  const hasValidPricing = pricingArray.some(
    (pricing) => pricing.productPrice && parseFloat(pricing.productPrice) > 0,
  );

  if (!hasValidPricing) {
    return {
      isValid: false,
      message: "Please set a price for at least one country",
    };
  }

  // Validate variants if enabled for any country
  for (const pricing of pricingArray) {
    if (pricing.variants?.enabled) {
      const variantValidation = validateCountryVariants(pricing.variants);
      if (!variantValidation.isValid) {
        return variantValidation;
      }
    }
  }

  return { isValid: true };
};

// Validate country-specific variants
export const validateCountryVariants = (variants) => {
  if (!variants.enabled) {
    return { isValid: true };
  }

  if (!variants.attributes || variants.attributes.length === 0) {
    return {
      isValid: false,
      message: "Please add at least one variant attribute",
    };
  }

  // Check if all attributes have names
  const hasEmptyNames = variants.attributes.some(
    (attr) => !attr.name || !attr.name.trim(),
  );
  if (hasEmptyNames) {
    return {
      isValid: false,
      message: "All variant attributes must have names",
    };
  }

  // Check if all attributes have values
  const hasEmptyValues = variants.attributes.some(
    (attr) => !attr.values || attr.values.length === 0,
  );
  if (hasEmptyValues) {
    return {
      isValid: false,
      message: "All variant attributes must have at least one value",
    };
  }

  // If custom pricing is enabled, check prices
  if (!variants?.useDefaultPricing) {
    const missingPrices = variants.attributes.some((attr) =>
      attr.values.some((val) => !val.price || parseFloat(val.price) <= 0),
    );
    if (missingPrices) {
      return {
        isValid: false,
        message: "All variants must have prices when custom pricing is enabled",
      };
    }
  }

  return { isValid: true };
};
