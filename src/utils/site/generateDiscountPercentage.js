export const generateDiscountPercentage = (originalPrice, discountedPrice) => {
  const originalPriceInCents = Math.round(parseFloat(originalPrice) * 100);
  const discountedPriceInCents = Math.round(parseFloat(discountedPrice) * 100);

  if (originalPriceInCents < discountedPriceInCents) return 0;

  const discountInCents = originalPriceInCents - discountedPriceInCents;
  const discountPercentage = (discountInCents / originalPriceInCents) * 100;

  return Number.isInteger(discountPercentage)
    ? Math.round(discountPercentage)
    : discountPercentage.toFixed(2);
};
