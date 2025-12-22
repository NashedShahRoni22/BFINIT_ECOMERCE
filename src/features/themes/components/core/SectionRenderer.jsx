import { Pencil } from "lucide-react";
import useTheme from "../../hooks/useTheme";
import { componentMap } from "../../config/componentMap";

export default function SectionRenderer({
  sections = [],
  activeSection = null,
  isEditorMode = false,
}) {
  const { setActiveSection } = useTheme();

  const renderSection = (section, index) => {
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

    const isActive = activeSection === section.id;

    return (
      <div
        key={section?.id || `section-${index}`}
        onClick={() => setActiveSection(section.id)}
        className="relative group/section"
      >
        {/* section hover effect */}
        {isEditorMode && !isActive && (
          <>
            <div className="absolute pointer-events-none opacity-0 transition-opacity group-hover/section:opacity-100 inset-0 border border-dashed z-100 border-muted-foreground/40" />

            <div className="absolute pointer-events-none opacity-0 text-xs group-hover/section:opacity-100 transition-opacity bg-muted text-muted-foreground z-100 px-1.5 py-0.5 rounded -top-3 left-3 font-medium">
              {section.name}
            </div>
          </>
        )}

        {/* section editing active style */}
        {isEditorMode && isActive && (
          <>
            <div className="pointer-events-none absolute inset-0 z-100 border border-dashed border-primary" />

            <div className="bg-primary items-center gap-1 font-medium inline-flex text-xs absolute z-100 text-primary-foreground px-1.5 py-0.5 rounded -top-3 left-3">
              <Pencil className="size-3.5" /> Editing
            </div>
          </>
        )}

        <Component content={section.content} />
      </div>
    );
  };

  return <>{sections?.map(renderSection)}</>;
}
