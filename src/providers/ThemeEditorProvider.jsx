import { useEffect, useState } from "react";
import { ThemeEditorContext } from "@/context/ThemeEditorContext";
import useGetQuery from "@/hooks/api/useGetQuery";
import useSelectedStore from "@/hooks/useSelectedStore";
import {
  getCategoryFromTemplateId,
  getSectionType,
} from "@/features/themes/config/sectionTemplates";

export default function ThemeEditorProvider({ children }) {
  const { selectedStore } = useSelectedStore();
  const [sections, setSections] = useState({
    header: [],
    body: [],
    footer: [],
  });
  const [colorTheme, setColorTheme] = useState("default");
  const [activeSection, setActiveSection] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const isEditorMode = true;

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

  const handleTogglePreview = () => {
    setIsPreviewMode((prev) => !prev);
  };

  const handleToggleVisibility = (sectionId) => {
    setSections((prev) => {
      const newSections = { ...prev };
      Object.keys(newSections).forEach((category) => {
        newSections[category] = newSections[category].map((section) =>
          section.id === sectionId
            ? { ...section, visible: !section.visible }
            : section,
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
            : section,
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
            (section) => getSectionType(section.templateId) !== sectionType,
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
          (section) => section.id !== sectionId,
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
    isLoading,
    activeSection,
    setActiveSection,
    colorTheme,
    sections,
    isUploading,
    isPreviewMode,
    isEditorMode,
    setIsUploading,
    setColorTheme,
    handleTogglePreview,
    handleToggleVisibility,
    handleApplyChanges,
    handleCancel,
    handleAddSection,
    handleReorderSections,
    handleDeleteSection,
  };

  return (
    <ThemeEditorContext.Provider value={value}>
      {children}
    </ThemeEditorContext.Provider>
  );
}
