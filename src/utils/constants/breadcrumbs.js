export const breadcrubms = {
  Create_Store: [{ label: "Home", href: "/" }, { label: "Create Store" }],
  Update_Store: [{ label: "Home", href: "/" }, { label: "Edit Store" }],
  Stores: [{ label: "Home", href: "/" }, { label: "Stores" }],
  Inventory: [
    { label: "Home", href: "/" },
    {
      label: "Products",
      dropdown: [
        { label: "Category", href: "/products/category" },
        { label: "Sub Category", href: "/products/sub-category" },
        { label: "Brands", href: "/products/brands" },
        { label: "Add Product", href: "/products/add-product" },
      ],
    },
    { label: "Inventory" },
  ],

  Category: [
    { label: "Home", href: "/" },
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

  Subcategory: [
    { label: "Home", href: "/" },
    {
      label: "Products",
      dropdown: [
        { label: "Category", href: "/products/category" },
        { label: "Brands", href: "/products/brands" },
        { label: "Add Product", href: "/products/add-product" },
        { label: "Inventory", href: "/products/inventory" },
      ],
    },
    { label: "Subcategory" },
  ],

  Brands: [
    { label: "Home", href: "/" },
    {
      label: "Products",
      dropdown: [
        { label: "Category", href: "/products/category" },
        { label: "Sub Category", href: "/products/sub-category" },
        { label: "Add Product", href: "/products/add-product" },
        { label: "Inventory", href: "/products/inventory" },
      ],
    },
    { label: "Brands" },
  ],

  Payment: [{ label: "Home", href: "/" }, { label: "Payments" }],

  Help: [
    { label: "Home", href: "/" },
    {
      label: "Support",
      dropdown: [
        { label: "Return & Refunds", href: "/support/returns-refunds" },
        { label: "Terms & Conditions", href: "/support/terms-conditions" },
        { label: "How to Buy", href: "/support/how-to-buy" },
      ],
    },
    { label: "Help Center" },
  ],

  Return: [
    { label: "Home", href: "/" },
    {
      label: "Support",
      dropdown: [
        { label: "Help Center", href: "/support/help-center" },
        { label: "Terms & Conditions", href: "/support/terms-conditions" },
        { label: "How to Buy", href: "/support/how-to-buy" },
      ],
    },
    { label: "Return & Refunds" },
  ],

  Terms: [
    { label: "Home", href: "/" },
    {
      label: "Support",
      dropdown: [
        { label: "Help Center", href: "/support/help-center" },
        { label: "Return & Refunds", href: "/support/returns-refunds" },
        { label: "How to Buy", href: "/support/how-to-buy" },
      ],
    },
    { label: "Terms & Conditions" },
  ],

  BuyGuide: [
    { label: "Home", href: "/" },
    {
      label: "Support",
      dropdown: [
        { label: "Help Center", href: "/support/help-center" },
        { label: "Return & Refunds", href: "/support/returns-refunds" },
        { label: "Terms & Conditions", href: "/support/terms-conditions" },
      ],
    },
    { label: "How to Buy" },
  ],
};
