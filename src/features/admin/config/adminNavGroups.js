import {
  Store,
  CornerDownRight,
  CreditCard,
  Globe,
  House,
  Newspaper,
  Package,
  Search,
  Palette,
  ShoppingCart,
  Scale,
  LifeBuoy,
  Building2,
  Users,
} from "lucide-react";

export const adminNavGroups = [
  {
    groupName: "main",
    links: [
      {
        icon: House,
        name: "Home",
        url: "/",
      },
      {
        icon: Store,
        name: "Stores",
        url: "/stores",
      },
      {
        icon: Palette,
        name: "Themes",
        url: "/themes",
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
            name: "Subcategory",
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
    ],
  },

  // sales
  {
    groupName: "sales",
    links: [
      {
        icon: ShoppingCart,
        name: "Orders",
        url: "/orders",
      },

      {
        icon: Users,
        name: "Customers",
        url: "/customers",
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
        subCategories: [
          {
            name: "Stripe",
            url: "/payments/stripe",
            icon: CornerDownRight,
          },
          {
            name: "Add Bank",
            url: "/payments/bank",
            icon: CornerDownRight,
          },
          {
            name: "Manage Bank",
            url: "/payments/manage-bank",
            icon: CornerDownRight,
          },
        ],
      },
      {
        icon: Scale,
        name: "Legal",
        subCategories: [
          {
            name: "Privacy Policy",
            url: "/support/privacy",
            icon: CornerDownRight,
          },
          {
            name: "Legal & Terms",
            url: "/support/terms-conditions",
            icon: CornerDownRight,
          },
        ],
      },
      {
        icon: LifeBuoy,
        name: "Support",
        subCategories: [
          {
            name: "Customer Support",
            url: "/support/help-center",
            icon: CornerDownRight,
          },
          {
            name: "FAQ",
            url: "/support/faq",
            icon: CornerDownRight,
          },
          {
            name: "Shopping Guide",
            url: "/support/how-to-buy",
            icon: CornerDownRight,
          },
          {
            name: "Return Policy",
            url: "/support/returns-refunds",
            icon: CornerDownRight,
          },
        ],
      },
      {
        icon: Building2,
        name: "Company",
        subCategories: [
          {
            name: "About",
            url: "/support/about",
            icon: CornerDownRight,
          },
        ],
      },
    ],
  },
];
