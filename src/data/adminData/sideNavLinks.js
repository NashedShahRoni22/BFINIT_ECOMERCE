import {
  CircleQuestionMark,
  CornerDownRight,
  CreditCard,
  Globe,
  House,
  Newspaper,
  Package,
  Search,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";

export const sideNavLinks = [
  {
    groupName: "main",
    links: [
      {
        icon: House,
        name: "Home",
        url: "/",
      },
      {
        icon: ShoppingBag,
        name: "Stores",
        url: "/all-stores",
      },
      {
        icon: Package,
        name: "Products",
        subCategories: [
          {
            name: "Category",
            url: "/products/category",
            icon: CornerDownRight,
          },
          {
            name: "Sub Category",
            url: "/products/sub-category",
            icon: CornerDownRight,
          },
          {
            name: "Brands",
            url: "/products/brands",
            icon: CornerDownRight,
          },
          {
            name: "Add Product",
            url: "/products/add-product",
            icon: CornerDownRight,
          },
          {
            name: "Inventory",
            url: "/products/inventory",
            icon: CornerDownRight,
          },
        ],
      },
      {
        icon: ShoppingCart,
        name: "Orders",
        url: "/orders",
      },
    ],
  },

  {
    groupName: "marketing",
    links: [
      {
        icon: Search,
        name: "SEO & Meta",
        url: "/seo-meta",
      },
      {
        icon: Newspaper,
        name: "Blogs",
        subCategories: [
          {
            name: "Add Blog",
            url: "/blogs/add",
            icon: CornerDownRight,
          },
          {
            name: "Manage Blog",
            url: "/blogs/manage",
            icon: CornerDownRight,
          },
        ],
      },
    ],
  },

  {
    groupName: "settings",
    links: [
      {
        icon: Globe,
        name: "Domain",
        url: "/domains",
      },
      {
        icon: CreditCard,
        name: "Payments",
        url: "/payments",
      },
      {
        icon: CircleQuestionMark,
        name: "Support",
        subCategories: [
          {
            name: "Help Center",
            url: "/support/help-center",
            icon: CornerDownRight,
          },
          {
            name: "Returns & Refunds",
            url: "/support/returns-refunds",
            icon: CornerDownRight,
          },
          {
            name: "Terms & Conditions",
            url: "/support/terms-conditions",
            icon: CornerDownRight,
          },
          {
            name: "How to Buy",
            url: "/support/how-to-buy",
            icon: CornerDownRight,
          },
        ],
      },
    ],
  },
];
