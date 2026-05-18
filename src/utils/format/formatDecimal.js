export const formatDecimal = (value) => {
  const num = parseFloat(value);
  if (isNaN(num)) return 0;

  return num % 1 === 0 ? Math.round(num) : num.toFixed(2);
};
