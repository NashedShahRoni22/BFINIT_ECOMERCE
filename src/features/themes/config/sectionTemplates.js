export const sectionTemplates = {
  header: [
    {
      id: "announce-bar-default",
      name: "Announcement Bar",
      description:
        "Top banner for promotions, announcements, and important messages",
      thumbnail: "📢",
      singleInstance: true,
      defaultContent: {
        message: "Free shipping on orders over $50 | Shop now and save!",
      },
      fieldSchema: [
        {
          key: "message",
          label: "Announcement Message",
          type: "textarea",
          rows: 2,
          placeholder: "Enter your announcement...",
          helpText: "Promotional or informational message displayed at the top",
        },
      ],
    },
    {
      id: "nav-simple",
      name: "Simple Navigation",
      description: "Clean navigation bar with logo and links",
      thumbnail: "🧭",
      singleInstance: true, // Only one navbar allowed
      defaultContent: {
        logoText: "My Store",
      },
      fieldSchema: [
        {
          key: "logoText",
          label: "Logo Text",
          type: "text",
          placeholder: "Enter logo text",
          helpText: "The brand name displayed in the navigation bar",
        },
      ],
    },
  ],
  hero: [
    {
      id: "hero-default",
      name: "Hero with Background",
      description: "Hero section with background image",
      thumbnail: "🖼️",
      singleInstance: false, // Only one hero allowed
      defaultContent: {
        title: "Discover Your Next Favorite Thing",
        subTitle:
          "Curated products and collections designed for your lifestyle",
        cta: "Shop Now",
        backgroundImage: null,
      },
      fieldSchema: [
        {
          key: "title",
          label: "Hero Title",
          type: "text",
          placeholder: "Enter hero title",
          helpText: "Main headline for your hero section",
        },
        {
          key: "subTitle",
          label: "Subtitle",
          type: "textarea",
          placeholder: "Enter subtitle",
          rows: 3,
          helpText: "Supporting text below the headline",
        },
        {
          key: "cta",
          label: "Button Text",
          type: "text",
          placeholder: "Enter button text",
          helpText: "Call-to-action button label",
        },
        {
          key: "backgroundImage",
          label: "Background Image",
          type: "image",
          helpText: "Background image for the hero section",
        },
      ],
    },
  ],
  products: [
    {
      id: "product-grid",
      name: "Product Grid",
      description: "Display products in a grid layout",
      thumbnail: "🛍️",
      singleInstance: false,
      defaultContent: {
        title: "Featured Products",
        columns: "4",
        productsToShow: "8",
        productSource: {
          type: "all",
          value: null,
        },
        sortBy: "default",
        showTitle: false,
      },
      fieldSchema: [
        {
          key: "title",
          label: "Section Title",
          type: "text",
          placeholder: "e.g., Featured Products, Summer Collection",
          helpText: "The heading displayed above the product grid",
        },
        {
          key: "showTitle",
          label: "Show Section Title",
          type: "switch",
          helpText: "Toggle title visibility",
        },
        {
          key: "productSource",
          label: "Product Source",
          type: "product-source",
          helpText: "Choose which products to display in this section",
          options: [
            {
              label: "All Products",
              value: "all",
              description: "Show all available products",
            },
            {
              label: "Manual Selection",
              value: "manual",
              description: "Choose specific products yourself",
            },
            // TODO: after implementing query params then enable these fields.
            // {
            //   label: "Featured Products",
            //   value: "badge:featured",
            //   description: "Products marked as featured",
            // },
            // {
            //   label: "New Arrivals",
            //   value: "badge:new_arrival",
            //   description: "Products marked as new",
            // },
            // {
            //   label: "Hot Deals",
            //   value: "badge:hot_deal",
            //   description: "Products on special promotion",
            // },
            // {
            //   label: "Best Selling",
            //   value: "auto:best_selling",
            //   description: "Top products by sales volume",
            // },
            // {
            //   label: "Recently Added",
            //   value: "auto:newest",
            //   description: "Newest products by date added",
            // },
          ],
        },
        // {
        //   key: "sortBy",
        //   label: "Sort By",
        //   type: "select",
        //   options: [
        //     { label: "Default", value: "default" },
        //     { label: "Price: Low to High", value: "price_asc" },
        //     { label: "Price: High to Low", value: "price_desc" },
        //     { label: "Name: A to Z", value: "name_asc" },
        //     { label: "Name: Z to A", value: "name_desc" },
        //   ],
        //   helpText: "Order in which products appear",
        // },
        {
          key: "columns",
          label: "Number of Columns",
          type: "select",
          options: [
            { label: "2 Columns", value: "2" },
            { label: "4 Columns", value: "4" },
            { label: "6 Columns", value: "6" },
          ],
          helpText: "How many products to show per row",
        },
        {
          key: "productsToShow",
          label: "Maximum Products",
          type: "select",
          options: [
            { label: "4 Products", value: "4" },
            { label: "8 Products", value: "8" },
            { label: "12 Products", value: "12" },
            { label: "16 Products", value: "16" },
            { label: "20 Products", value: "20" },
          ],
          helpText: "Maximum number of products to display",
        },
      ],
    },
  ],

  footer: [
    {
      id: "footer-default",
      name: "Complete Footer",
      description:
        "Comprehensive footer with company information, navigation columns, contact details, and social media integration",
      thumbnail: "🔗",
      singleInstance: true,
      defaultContent: {
        contact: {
          email: "contact@yourstore.com",
          mobile: "+1 (555) 123-4567",
          address: "Dhaka, Bangladesh",
        },
        copyright: "© 2025 Store Name. All rights reserved.",
        description:
          "We are committed to providing high-quality products and exceptional customer service.",
        socialLinks: {
          facebook: "facebook.com",
          twitter: "twitter.com",
          instagram: "instagram.com",
          youtube: "youtube.com",
        },
        showContactInfo: true,
        showSocialLinks: true,
      },
      fieldSchema: [
        {
          key: "description",
          label: "About Description",
          type: "textarea",
          rows: 3,
          placeholder: "Brief description about your company...",
          helpText: "Short text describing your business in the footer",
        },
        {
          key: "showContactInfo",
          label: "Show Contact Information",
          type: "switch",
          helpText: "Display email, phone, and address in footer",
        },
        {
          key: "showSocialLinks",
          label: "Show Social Media Links",
          type: "switch",
          helpText: "Display social media icons in footer",
        },
      ],
    },
  ],
};

// Helper function to get category from template ID
export const getCategoryFromTemplateId = (templateId) => {
  if (templateId.startsWith("nav")) return "header";
  if (templateId.startsWith("announce-bar")) return "header";
  if (templateId.startsWith("hero")) return "body";
  if (templateId.startsWith("product")) return "body";
  if (templateId.startsWith("testimonials")) return "body";
  if (templateId.startsWith("footer")) return "footer";
  return "body";
};

// Helper function to get section type (for single instance check)
export const getSectionType = (templateId) => {
  if (templateId.startsWith("nav")) return "navbar";
  if (templateId.startsWith("announce-bar")) return "announcebar";
  if (templateId.startsWith("hero")) return "hero";
  if (templateId.startsWith("footer")) return "footer";
  return null; // null means multiple instances allowed
};
