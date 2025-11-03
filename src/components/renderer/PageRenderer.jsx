import { componentMap } from "@/config/componentMap";

export default function PageRenderer({ pageConfig }) {
  const { sections } = pageConfig;

  const renderSection = (section) => {
    if (!section.visible) return null;

    const Component = componentMap[section.templateId];

    if (!Component) {
      console.warn(`Component not found for templateId: ${section.templateId}`);
      return null;
    }

    return <Component key={section.id} content={section.content} />;
  };

  return (
    <div className="page-container">
      {/* Render Header Sections */}
      {sections.header?.map(renderSection)}

      {/* Render Body Sections */}
      <main>{sections.body?.map(renderSection)}</main>

      {/* Render Footer Sections */}
      {sections.footer?.map(renderSection)}
    </div>
  );
}
