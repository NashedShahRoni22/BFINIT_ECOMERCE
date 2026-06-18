const Home_Url = "/";

export const breadcrubms = {
  // === Main ===
  createStore: [{ label: "Home", href: Home_Url }, { label: "Create Store" }],
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
  subCategory: [
    { label: "Home", href: Home_Url },
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
  brands: [
    { label: "Home", href: Home_Url },
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

  // Blog
  addBlog: [
    { label: "Home", href: Home_Url },
    {
      label: "Blogs",
      dropdown: [{ label: "Manage Blog", href: "/blogs/manage" }],
    },
    { label: "Add Blog" },
  ],
  manageBlogs: [
    { label: "Home", href: Home_Url },
    {
      label: "Blogs",
      dropdown: [{ label: "Add Blog", href: "/blogs/add" }],
    },
    { label: "Manage Blog" },
  ],

  // === Settings ===
  privacyPolicy: [
    { label: "Home", href: Home_Url },
    {
      label: "Support",
      dropdown: [
        { label: "Help Center", href: "/support/help-center" },
        { label: "Return & Refunds", href: "/support/returns-refunds" },
        { label: "Terms & Conditions", href: "/support/terms-conditions" },
      ],
    },
    { label: "Privacy Policy" },
  ],
  terms: [
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
  help: [
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
  faq: [
    { label: "Home", href: "/" },
    {
      label: "Support",
      dropdown: [
        { label: "Help Center", href: "/support/help-center" },
        { label: "Return & Refunds", href: "/support/returns-refunds" },
        { label: "Terms & Conditions", href: "/support/terms-conditions" },
      ],
    },
    { label: "Faq" },
  ],
  buyGuide: [
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
  return: [
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
};
