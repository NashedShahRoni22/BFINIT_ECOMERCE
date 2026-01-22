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

  Add_Product: [
    { label: "Home", href: "/" },
    {
      label: "Products",
      dropdown: [
        { label: "Category", href: "/products/category" },
        { label: "Sub Category", href: "/products/sub-category" },
        { label: "Brands", href: "/products/brands" },
        { label: "Inventory", href: "/products/inventory" },
      ],
    },
    { label: "Add Product" },
  ],

  Update_Product: [
    { label: "Home", href: "/" },
    {
      label: "Products",
      dropdown: [
        { label: "Category", href: "/products/category" },
        { label: "Sub Category", href: "/products/sub-category" },
        { label: "Brands", href: "/products/brands" },
        { label: "Add Product", href: "/products/add-product" },
        { label: "Inventory", href: "/products/inventory" },
      ],
    },
    { label: "Edit Product" },
  ],

  // payments
  StripePayment: [
    { label: "Home", href: "/" },
    {
      label: "Payments",
      dropdown: [{ label: "Bank", href: "/payments/bank" }],
    },
    { label: "Stripe" },
  ],

  BankPayment: [
    { label: "Home", href: "/" },
    {
      label: "Payments",
      dropdown: [{ label: "Stripe", href: "/payments/stripe" }],
    },
    { label: "Bank" },
  ],

  // support
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

  AddAbout: [
    { label: "Home", href: "/" },
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

  Faq: [
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

  Privacy: [
    { label: "Home", href: "/" },
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

  addBlog: [
    { label: "Home", href: "/" },
    {
      label: "Blogs",
      dropdown: [{ label: "Manage Blog", href: "/blogs/manage" }],
    },
    { label: "Add Blog" },
  ],

  manageBlogs: [
    { label: "Home", href: "/" },
    {
      label: "Blogs",
      dropdown: [{ label: "Add Blog", href: "/blogs/add" }],
    },
    { label: "Manage Blog" },
  ],
};
