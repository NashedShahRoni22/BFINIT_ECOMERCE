import { useEffect, useState } from "react";
import TopNav from "@/components/customize/TopNav";
import ContentEditorPanel from "@/components/customize/ContentEditor/ContentEditorPanel";
import Preview from "@/components/customize/Preview";
import {
  getCategoryFromTemplateId,
  getSectionType,
} from "@/config/sectionTemplates";
import SectionSidebar from "@/components/customize/SectionSidebar/SectionSidebar";

export default function ThemeCustomize() {
  const [sections, setSections] = useState({
    header: [
      {
        id: "nav-1",
        templateId: "nav-simple",
        name: "Navigation",
        visible: true,
        order: 0,
        content: {
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
    body: [
      {
        id: "hero-1",
        templateId: "hero-minimal",
        name: "Hero Banner",
        visible: true,
        order: 0,
        content: {
          title: "Hero Title Will Be Here...",
          subTitle: "Hero subtitle goes here...",
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
    ],
    footer: [],
  });
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const previewData = localStorage.getItem("preview");

    if (previewData) {
      const parsed = JSON.parse(previewData);
      setSections(parsed.sections);
    }
  }, []);

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
      order: sections[category].length, // ← Set order based on current length
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

  const handleSave = () => {
    const pageConfig = {
      pageId: `page-${Date.now()}`,
      pageName: "Home Page",
      sections: sections,
    };

    // TODO: remove this ls after api integration for preview
    localStorage.setItem("preview", JSON.stringify(pageConfig));

    console.log(pageConfig);
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

  return (
    <main className="font-inter bg-muted">
      <TopNav onSave={handleSave} />

      <div className="flex justify-between">
        <SectionSidebar
          sections={sections}
          activeSection={activeSection}
          onSelectSection={setActiveSection}
          onToggleVisibility={handleToggleVisibility}
          onAddSection={handleAddSection}
          onReorderSections={handleReorderSections}
        />

        <Preview sections={sections} />

        <ContentEditorPanel
          activeSection={activeSection}
          sections={sections}
          onApplyChanges={handleApplyChanges}
          onCancel={handleCancel}
        />
      </div>
    </main>
  );
}
