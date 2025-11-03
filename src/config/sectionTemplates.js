// src/config/sectionTemplates.js

export const sectionTemplates = {
  header: [
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
    {
      id: "nav-with-search",
      name: "Navigation with Search",
      description: "Navigation bar with search functionality",
      thumbnail: "🔍",
      singleInstance: true, // Only one navbar allowed
      defaultContent: {
        logoText: "My Store",
        showSearch: true,
      },
      fieldSchema: [
        {
          key: "logoText",
          label: "Logo Text",
          type: "text",
          placeholder: "Enter logo text",
        },
        {
          key: "showSearch",
          label: "Show Search Bar",
          type: "checkbox",
        },
      ],
    },
  ],
  hero: [
    {
      id: "hero-minimal",
      name: "Minimal Hero",
      description: "Simple hero section with text and CTA",
      thumbnail: "📄",
      singleInstance: true, // Only one hero allowed
      defaultContent: {
        title: "Welcome to Our Store",
        subTitle: "Discover amazing products",
        cta: "Shop Now",
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
      ],
    },
    {
      id: "hero-with-image",
      name: "Hero with Background",
      description: "Hero section with background image",
      thumbnail: "🖼️",
      singleInstance: true, // Only one hero allowed
      defaultContent: {
        title: "Hero with background image",
        subTitle: "hero with bg image section",
        cta: "Testing",
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
      singleInstance: false, // Multiple product grids allowed
      defaultContent: {
        title: "Featured Products",
        columns: "4",
      },
      fieldSchema: [
        {
          key: "title",
          label: "Section Title",
          type: "text",
          placeholder: "Enter section title",
          helpText: "Title for the product grid section",
        },
        {
          key: "columns",
          label: "Number of Columns",
          type: "select",
          options: [
            { label: "2 Columns", value: "2" },
            { label: "3 Columns", value: "3" },
            { label: "4 Columns", value: "4" },
          ],
          helpText: "How many products to show per row",
        },
      ],
    },
    {
      id: "product-carousel",
      name: "Product Carousel",
      description: "Scrollable product showcase",
      thumbnail: "🎠",
      singleInstance: false, // Multiple carousels allowed
      defaultContent: {
        title: "Trending Products",
        autoplay: true,
      },
      fieldSchema: [
        {
          key: "title",
          label: "Section Title",
          type: "text",
          placeholder: "Enter section title",
        },
        {
          key: "autoplay",
          label: "Auto-play Carousel",
          type: "checkbox",
        },
      ],
    },
  ],
  content: [
    {
      id: "testimonials",
      name: "Testimonials",
      description: "Customer testimonials section",
      thumbnail: "💬",
      singleInstance: false, // Multiple testimonial sections allowed
      defaultContent: {
        title: "What Our Customers Say",
        columns: "3",
      },
      fieldSchema: [
        {
          key: "title",
          label: "Section Title",
          type: "text",
          placeholder: "Enter section title",
        },
        {
          key: "columns",
          label: "Number of Columns",
          type: "select",
          options: [
            { label: "2 Columns", value: "2" },
            { label: "3 Columns", value: "3" },
          ],
        },
      ],
    },
    {
      id: "news-letter",
      name: "News Letter",
      description: "Subscribe to news letter section",
      thumbnail: "📰",
      singleInstance: false, // Multiple testimonial sections allowed
      defaultContent: {
        title: "Subscribe to Our News Letter",
        cta: "Subscribe",
      },
      fieldSchema: [
        {
          key: "title",
          label: "Section Title",
          type: "text",
          placeholder: "Enter section title",
        },
        {
          key: "cta",
          label: "Button Text",
          type: "text",
          placeholder: "Enter button text",
        },
      ],
    },
  ],
  footer: [
    {
      id: "footer-simple",
      name: "Simple Footer",
      description: "Basic footer with copyright",
      thumbnail: "📍",
      singleInstance: true, // Only one footer allowed
      defaultContent: {
        copyrightText: "© 2025 My Store. All rights reserved.",
      },
      fieldSchema: [
        {
          key: "copyrightText",
          label: "Copyright Text",
          type: "text",
          placeholder: "© 2025 Your Company",
          helpText: "Copyright notice in the footer",
        },
      ],
    },
    {
      id: "footer-detailed",
      name: "Detailed Footer",
      description: "Footer with links and social media",
      thumbnail: "🔗",
      singleInstance: true, // Only one footer allowed
      defaultContent: {
        copyrightText: "© 2025 My Store. All rights reserved.",
        showSocials: true,
      },
      fieldSchema: [
        {
          key: "copyrightText",
          label: "Copyright Text",
          type: "text",
          placeholder: "© 2025 Your Company",
        },
        {
          key: "showSocials",
          label: "Show Social Links",
          type: "checkbox",
        },
      ],
    },
  ],
};

// Helper function to get category from template ID
export const getCategoryFromTemplateId = (templateId) => {
  if (templateId.startsWith("nav")) return "header";
  if (templateId.startsWith("hero")) return "body";
  if (templateId.startsWith("product")) return "body";
  if (templateId.startsWith("testimonials")) return "body";
  if (templateId.startsWith("footer")) return "footer";
  return "body";
};

// Helper function to get section type (for single instance check)
export const getSectionType = (templateId) => {
  if (templateId.startsWith("nav")) return "navbar";
  if (templateId.startsWith("hero")) return "hero";
  if (templateId.startsWith("footer")) return "footer";
  return null; // null means multiple instances allowed
};
