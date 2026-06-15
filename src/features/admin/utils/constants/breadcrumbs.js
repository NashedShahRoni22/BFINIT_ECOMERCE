const Home_Url = "/";

export const breadcrubms = {
  categories: [
    { label: "Home", href: Home_Url },
    {
      label: "Products",
      dropdown: [
        { label: "Sub Category", href: "/products/sub-category" },
        { label: "Brands", href: "/products/brands" },
        { label: "Add Product", href: "/products/add-product" },
        { label: "Inventory", href: "/products/inventory" },
      ],
    },
    { label: "Category" },
  ],

  // settings
  about: [
    { label: "Home", href: Home_Url },
    {
      label: "Support",
      dropdown: [
        { label: "Help Center", href: "/support/help-center" },
        { label: "Return & Refunds", href: "/support/returns-refunds" },
        { label: "Terms & Conditions", href: "/support/terms-conditions" },
      ],
    },
    { label: "About" },
  ],
  createStore: [{ label: "Home", href: "/" }, { label: "Create Store" }],
};
