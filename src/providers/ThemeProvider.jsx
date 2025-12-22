import { useEffect, useState } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import useGetQuery from "@/hooks/api/useGetQuery";
import useSelectedStore from "@/hooks/useSelectedStore";
import {
  getCategoryFromTemplateId,
  getSectionType,
} from "@/features/themes/config/sectionTemplates";

const INITIAL_SECTIONS_TEMPLATE = {
  header: [
    {
      content: { logoText: "Dawn Parsons" }, // DYNAMIC: Replace with user's store name from store.name field
      id: "nav-1",
      templateId: "nav-simple",
      name: "Navigation",
      visible: true,
      order: 0,
    },
  ],

  body: [
    {
      content: {
        title: "Discover Your Next Favorite Thing",
        subTitle:
          "Curated products and collections designed for your lifestyle",
        cta: "Shop Now",
        backgroundImage: null, // TODO: Upload default hero image to CDN and hardcode the URL here (e.g., "https://cdn.yourapp.com/defaults/hero-bg.webp")
      },
      id: "hero-1",
      templateId: "hero-default",
      name: "Hero with Background",
      visible: true,
      order: 0,
      fieldSchema: [
        {
          key: "title",
          label: "Hero Title",
          type: "text",
          placeHolder: "Enter hero title",
          helpText: "Main headline for your hero section",
        },
        {
          key: "subTitle",
          label: "Subtitle",
          type: "textarea",
          placeHolder: "Enter subtitle",
          rows: 3,
          helpText: "Supporting text below the headline",
        },
        {
          key: "cta",
          label: "Button Text",
          type: "text",
          placeHolder: "Enter button text",
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
    {
      id: "product-grid-1765969045832",
      templateId: "product-grid",
      name: "Product Grid",
      visible: true,
      order: 1,
      content: {
        title: "Featured Products",
        columns: "4",
        productsToShow: "8",
        productSource: { type: "all", value: null },
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
            {
              label: "Featured Products",
              value: "badge:featured",
              description: "Products marked as featured",
            },
            {
              label: "New Arrivals",
              value: "badge:new_arrival",
              description: "Products marked as new",
            },
            {
              label: "Hot Deals",
              value: "badge:hot_deal",
              description: "Products on special promotion",
            },
            {
              label: "Best Selling",
              value: "auto:best_selling",
              description: "Top products by sales volume",
            },
            {
              label: "Recently Added",
              value: "auto:newest",
              description: "Newest products by date added",
            },
          ],
        },
        {
          key: "sortBy",
          label: "Sort By",
          type: "select",
          options: [
            { label: "Default", value: "default" },
            { label: "Price: Low to High", value: "price_asc" },
            { label: "Price: High to Low", value: "price_desc" },
            { label: "Name: A to Z", value: "name_asc" },
            { label: "Name: Z to A", value: "name_desc" },
          ],
          helpText: "Order in which products appear",
        },
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
      id: "footer-default-1765969053342",
      templateId: "footer-default",
      name: "Complete Footer",
      visible: true,
      order: 0,
      content: {
        contact: {
          email: "contact@yourstore.com", // DYNAMIC: Replace with store.email
          mobile: "+1 (555) 123-4567", // DYNAMIC: Replace with store.phone (NOT telephone field)
          address: "Dhaka, Bangladesh", // DYNAMIC: Replace with store.address + store.country
        },
        copyright: "© 2025 Your Store. All rights reserved.", // DYNAMIC: Replace year with current year, "Your Store" with store.name
        description:
          "Your one-stop shop for quality products. We're dedicated to bringing you the best selection with outstanding customer service.",
        socialLinks: {
          facebook: "facebook.com", // DYNAMIC: Replace with store.socialLinks.facebook || "" (empty string if null/undefined)
          twitter: "twitter.com", // DYNAMIC: Replace with store.socialLinks.twitter || ""
          instagram: "instagram.com", // DYNAMIC: Replace with store.socialLinks.instagram || ""
          youtube: "youtube.com", // DYNAMIC: Replace with store.socialLinks.youtube || ""
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

export default function ThemeProvider({ children }) {
  const { selectedStore } = useSelectedStore();
  const [sections, setSections] = useState(INITIAL_SECTIONS_TEMPLATE);
  const [colorTheme, setColorTheme] = useState("default");
  const [activeSection, setActiveSection] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Fetch store layout with fieldschema value
  const { data: theme, isLoading } = useGetQuery({
    endpoint: `/store/theme/data/admin/${selectedStore?.storeId}`,
    token: true,
    clientId: true,
    queryKey: ["admin", "stores", selectedStore?.storeId, "theme", "data"],
    enabled: !!selectedStore?.storeId,
  });

  // Update sections with theme api data
  useEffect(() => {
    if (
      !isLoading &&
      theme?.message === "Admin Theme data" &&
      theme?.data?.sections
    ) {
      setColorTheme(theme?.data?.theme);
      setSections(theme?.data?.sections);
    }
  }, [isLoading, theme?.message, theme?.data?.sections, theme?.data?.theme]);

  const handleToggleVisibility = (sectionId) => {
    setSections((prev) => {
      const newSections = { ...prev };
      Object.keys(newSections).forEach((category) => {
        newSections[category] = newSections[category].map((section) =>
          section.id === sectionId
            ? { ...section, visible: !section.visible }
            : section
        );
      });
      return newSections;
    });
  };

  const handleApplyChanges = (sectionId, newContent) => {
    setSections((prev) => {
      const newSections = { ...prev };
      Object.keys(newSections).forEach((category) => {
        newSections[category] = newSections[category].map((section) =>
          section.id === sectionId
            ? { ...section, content: newContent }
            : section
        );
      });
      return newSections;
    });
    setActiveSection(null);
  };

  const handleCancel = () => {
    setActiveSection(null);
  };

  const handleAddSection = (template) => {
    const category = getCategoryFromTemplateId(template.id);
    const sectionType = getSectionType(template.id);

    const newSection = {
      id: `${template.id}-${Date.now()}`,
      templateId: template.id,
      name: template.name,
      visible: true,
      order: sections[category].length,
      content: { ...template.defaultContent },
      fieldSchema: template.fieldSchema,
    };

    setSections((prev) => {
      const newSections = { ...prev };

      if (template.singleInstance && sectionType) {
        Object.keys(newSections).forEach((cat) => {
          newSections[cat] = newSections[cat].filter(
            (section) => getSectionType(section.templateId) !== sectionType
          );
        });

        // Recalculate order after filtering
        newSections[category].forEach((section, index) => {
          section.order = index;
        });
        newSection.order = newSections[category].length;
        newSections[category] = [...newSections[category], newSection];
      } else {
        newSections[category] = [...newSections[category], newSection];
      }

      return newSections;
    });

    setActiveSection(newSection.id);
  };

  const handleReorderSections = (category, activeId, overId) => {
    setSections((prev) => {
      const newSections = { ...prev };
      const categorySections = [...newSections[category]];

      const oldIndex = categorySections.findIndex((s) => s.id === activeId);
      const newIndex = categorySections.findIndex((s) => s.id === overId);

      if (oldIndex === -1 || newIndex === -1) return prev;

      // Remove and reinsert
      const [movedItem] = categorySections.splice(oldIndex, 1);
      categorySections.splice(newIndex, 0, movedItem);

      // Update order field for all sections in category
      categorySections.forEach((section, index) => {
        section.order = index;
      });

      newSections[category] = categorySections;
      return newSections;
    });
  };

  const handleDeleteSection = (sectionId) => {
    // Optional: Add confirmation
    // if (!confirm("Are you sure you want to delete this section?")) {
    //   return;
    // }

    setSections((prev) => {
      const newSections = { ...prev };

      Object.keys(newSections).forEach((category) => {
        newSections[category] = newSections[category].filter(
          (section) => section.id !== sectionId
        );

        // fix order number after removing a section
        newSections[category].forEach((section, index) => {
          section.order = index;
        });
      });

      return newSections;
    });

    // Clear active section if it was deleted
    if (activeSection === sectionId) {
      setActiveSection(null);
    }
  };

  useEffect(() => {
    document.documentElement.classList.remove("theme-green", "theme-violet");

    if (colorTheme !== "default") {
      document.documentElement.classList.add(`theme-${colorTheme}`);
    }
  }, [colorTheme]);

  const value = {
    activeSection,
    setActiveSection,
    colorTheme,
    sections,
    isUploading,
    setIsUploading,
    setColorTheme,
    handleToggleVisibility,
    handleApplyChanges,
    handleCancel,
    handleAddSection,
    handleReorderSections,
    handleDeleteSection,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}
