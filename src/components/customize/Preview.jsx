import { componentMap } from "@/config/componentMap";

export default function Preview({ sections, liveView }) {
  const renderSection = (section) => {
    if (!section.visible) return null;

    const Component = componentMap[section.templateId];

    if (!Component) {
      console.warn(`Component not found for templateId: ${section.templateId}`);
      return (
        <div key={section.id} className="border-b bg-gray-50 p-8 text-center">
          <p className="text-gray-500">
            Preview not available for: {section.name}
          </p>
        </div>
      );
    }

    return <Component key={section.id} content={section.content} />;
  };

  return (
    <div
      className={`bg-background custom-scrollbar w-full overflow-y-auto rounded-md ${liveView ? "h-full" : "m-2 h-[calc(100dvh-79px)]"}`}
    >
      {/* Render Header Sections */}
      {sections.header?.map(renderSection)}

      {/* Render Body Sections */}
      <main>{sections.body?.map(renderSection)}</main>

      {/* Render Footer Sections */}
      {sections.footer?.map(renderSection)}

      {/* Empty state */}
      {sections.header?.length === 0 &&
        sections.body?.length === 0 &&
        sections.footer?.length === 0 && (
          <div className="flex h-96 items-center justify-center text-gray-400">
            <p>Click &quot;Add&quot; to add sections to your page</p>
          </div>
        )}
    </div>
  );
}
