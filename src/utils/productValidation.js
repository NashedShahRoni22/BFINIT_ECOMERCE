// Updated validation for country-based pricing and variants

export const validateCountryPricing = (data, form) => {
  // Clear any previous errors
  form.clearErrors("pricing");

  const { pricing } = data;

  // Check if pricing array exists and has at least one country
  if (!pricing || pricing.length === 0) {
    form.setError("pricing", {
      type: "manual",
      message: "Please add pricing for at least one country.",
    });
    return false;
  }

  // Check if at least one country has a valid price
  const hasValidPricing = pricing.some(
    (countryPricing) =>
      countryPricing.productPrice &&
      parseFloat(countryPricing.productPrice) > 0,
  );

  if (!hasValidPricing) {
    form.setError("pricing", {
      type: "manual",
      message: "Please set a price for at least one country.",
    });
    return false;
  }

  // Validate variants for each country that has variants enabled
  for (let i = 0; i < pricing.length; i++) {
    const countryPricing = pricing[i];

    if (countryPricing.variants?.enabled) {
      const variantValidation = validateCountryVariants(
        countryPricing.variants,
        form,
        i,
      );
      if (!variantValidation) {
        return false;
      }
    }
  }

  return true;
};

export const validateCountryVariants = (variants, form, countryIndex) => {
  // Clear any previous variant errors
  form.clearErrors("variants");

  if (!variants.enabled) {
    return true;
  }

  // Check if at least one attribute exists
  if (!variants.attributes || variants.attributes.length === 0) {
    form.setError("variants", {
      type: "manual",
      message:
        "Please add at least one variant attribute when variants are enabled.",
    });
    return false;
  }

  // Check if all attributes have names
  const attributesWithoutNames = variants.attributes.filter(
    (attr) => !attr.name || attr.name.trim() === "",
  );
  if (attributesWithoutNames.length > 0) {
    form.setError("variants", {
      type: "manual",
      message:
        "All variant attributes must have a name. Please fill in the attribute name field.",
    });
    return false;
  }

  // Check if all attributes have at least one value
  const attributesWithoutValues = variants.attributes.filter(
    (attr) => !attr.values || attr.values.length === 0,
  );
  if (attributesWithoutValues.length > 0) {
    const attrName = attributesWithoutValues[0].name || "Unnamed attribute";
    form.setError("variants", {
      type: "manual",
      message: `Please add at least one value for "${attrName}"`,
    });
    return false;
  }

  // Check if required attributes are filled
  const requiredAttributesEmpty = variants.attributes.filter(
    (attr) => attr.required && (!attr.values || attr.values.length === 0),
  );
  if (requiredAttributesEmpty.length > 0) {
    form.setError("variants", {
      type: "manual",
      message: `Required attribute "${requiredAttributesEmpty[0].name}" must have at least one value.`,
    });
    return false;
  }

  // Validate custom pricing
  if (variants?.useDefaultPricing === false) {
    console.log("Custom pricing is enabled, checking variant prices...");

    const allVariants = [];
    variants.attributes.forEach((attribute) => {
      if (attribute.values && attribute.values.length > 0) {
        attribute.values.forEach((value) => {
          allVariants.push({
            ...value,
            attributeName: attribute.name,
          });
        });
      }
    });

    const variantsWithoutPrice = allVariants.filter(
      (variant) => !variant.price || variant.price.toString().trim() === "",
    );

    if (variantsWithoutPrice.length > 0) {
      const variantName = variantsWithoutPrice[0].name || "Unnamed variant";
      const attributeName = variantsWithoutPrice[0].attributeName;

      form.setError("variants", {
        type: "manual",
        message: `Custom pricing is enabled. Please set a price for "${variantName}" (${attributeName}) and all other variants.`,
      });
      return false;
    }
  }

  return true;
};

// Legacy function - kept for backward compatibility
// Use validateCountryPricing instead for new country-based pricing
export const validateVariants = (data, form) => {
  // Clear any previous variant errors
  form.clearErrors("variants");

  if (!data.variants.enabled) {
    return true;
  }

  // Check if at least one attribute exists
  if (!data.variants.attributes || data.variants.attributes.length === 0) {
    form.setError("variants", {
      type: "manual",
      message:
        "Please add at least one variant attribute when variants are enabled.",
    });
    return false;
  }

  // Check if all attributes have names
  const attributesWithoutNames = data.variants.attributes.filter(
    (attr) => !attr.name || attr.name.trim() === "",
  );
  if (attributesWithoutNames.length > 0) {
    form.setError("variants", {
      type: "manual",
      message:
        "All variant attributes must have a name. Please fill in the attribute name field.",
    });
    return false;
  }

  // Check if all attributes have at least one value
  const attributesWithoutValues = data.variants.attributes.filter(
    (attr) => !attr.values || attr.values.length === 0,
  );
  if (attributesWithoutValues.length > 0) {
    const attrName = attributesWithoutValues[0].name || "Unnamed attribute";
    form.setError("variants", {
      type: "manual",
      message: `Please add at least one value for "${attrName}"`,
    });
    return false;
  }

  // Check if required attributes are filled
  const requiredAttributesEmpty = data.variants.attributes.filter(
    (attr) => attr.required && (!attr.values || attr.values.length === 0),
  );
  if (requiredAttributesEmpty.length > 0) {
    form.setError("variants", {
      type: "manual",
      message: `Required attribute "${requiredAttributesEmpty[0].name}" must have at least one value.`,
    });
    return false;
  }

  // Validate custom pricing
  if (data?.variants?.useDefaultPricing === false) {
    console.log("Custom pricing is enabled, checking variant prices...");

    const allVariants = [];
    data.variants.attributes.forEach((attribute) => {
      if (attribute.values && attribute.values.length > 0) {
        attribute.values.forEach((value) => {
          allVariants.push({
            ...value,
            attributeName: attribute.name,
          });
        });
      }
    });

    const variantsWithoutPrice = allVariants.filter(
      (variant) => !variant.price || variant.price.toString().trim() === "",
    );

    if (variantsWithoutPrice.length > 0) {
      const variantName = variantsWithoutPrice[0].name || "Unnamed variant";
      const attributeName = variantsWithoutPrice[0].attributeName;

      form.setError("variants", {
        type: "manual",
        message: `Custom pricing is enabled. Please set a price for "${variantName}" (${attributeName}) and all other variants.`,
      });
      return false;
    }
  }

  return true;
};
