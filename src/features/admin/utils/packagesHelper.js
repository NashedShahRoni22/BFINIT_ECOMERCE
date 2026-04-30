export const emptyPeriod = { price: "", duration: "", offer_percentage: "" };

export const emptyDefaults = {
  package_name: "",
  package_type: "starter",
  package_type_label: "",
  badge: "",
  short_description: "",
  description: [],
  product_limit: "",
  max_store: "",
  max_storage: "",
  precedence: "",
  is_active: true,
  subscription_periods: [{ ...emptyPeriod }],
};

export const transformPackageData = (data) => {
  return {
    package_name: data?.package_name ?? "",
    package_type: data?.package_type ?? "starter",
    package_type_label: data?.package_type_label ?? "",
    badge: data?.badge ?? "",
    short_description: data?.short_description ?? "",
    description: data?.description ?? [],
    product_limit: data?.product_limit ?? "",
    max_store: data?.max_store ?? "",
    max_storage: data?.max_storage ?? "",
    precedence: data?.precedence ?? "",
    is_active: data?.is_active ?? true,
    subscription_periods:
      data?.subscription_periods?.length > 0
        ? data?.subscription_periods.map((p) => ({
            price: p?.price ?? "",
            duration: p?.duration ?? "",
            offer_percentage: p?.offer_percentage ?? "",
          }))
        : [{ ...emptyPeriod }],
  };
};
