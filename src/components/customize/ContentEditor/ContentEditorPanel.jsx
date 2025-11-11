import { useState, useEffect } from "react";
import { SquarePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import DynamicFormField from "./DynamicFormField";

export default function ContentEditorPanel({
  activeSection,
  sections,
  onApplyChanges,
  onCancel,
}) {
  const [formData, setFormData] = useState({});

  // Find the active section
  const section = [
    ...sections.header,
    ...sections.body,
    ...sections.footer,
  ].find((s) => s.id === activeSection);

  // Initialize form data when section changes
  useEffect(() => {
    if (section) {
      setFormData(section.content);
    }
  }, [section]);

  // If no section is selected on SectionSidebar show nothing
  if (!activeSection || !section) {
    return null;
  }

  // Get the field schema for this section
  const fieldSchema = section.fieldSchema;

  if (!fieldSchema || !fieldSchema.length) {
    return (
      <aside className="flex h-[calc(100vh-63px)] w-full max-w-80 flex-col border-l bg-white">
        {/* Header - Keep consistency even in empty state */}
        <div className="bg-card border-b px-4 py-2.5">
          <h2 className="text-foreground text-xs font-semibold">
            {section.name}
          </h2>
          <p className="text-muted-foreground mt-0.5 text-[11px]">
            Edit section content
          </p>
        </div>

        {/* Empty state content */}
        <div className="flex flex-1 items-center justify-center px-4">
          <div className="max-w-[240px] space-y-2 text-center">
            <div className="bg-muted/30 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg border border-dashed">
              <SquarePen size={20} className="text-muted-foreground" />
            </div>
            <h3 className="text-foreground text-xs font-medium">
              No editor available
            </h3>
            <p className="text-muted-foreground text-[11px] leading-relaxed">
              This section doesn&apos;t have any editable fields configured yet.
            </p>
          </div>
        </div>
      </aside>
    );
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApply = () => {
    onApplyChanges(section.id, formData);
  };

  const handleCancel = () => {
    setFormData(section.content);
    onCancel();
  };

  return (
    <aside className="flex h-[calc(100vh-63px)] w-full max-w-80 flex-col border-l bg-white">
      {/* Header - Matches SectionSidebar styling exactly */}
      <div className="bg-card border-b px-4 py-2.5">
        <h2 className="text-foreground text-xs font-semibold">
          {section.name}
        </h2>
        <p className="text-muted-foreground mt-0.5 text-[11px]">
          Edit section content
        </p>
      </div>

      {/* Scrollable Form Content */}
      <div className="custom-scrollbar-hide flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-5">
          {section.fieldSchema.map((field) => (
            <DynamicFormField
              key={field.key}
              field={field}
              value={formData[field.key]}
              onChange={(value) => handleInputChange(field.key, value)}
            />
          ))}
        </div>
      </div>

      {/* Footer Actions - Refined button hierarchy */}
      <div className="bg-card border-t px-4 py-3">
        <div className="flex items-center gap-2">
          <Button
            onClick={handleCancel}
            variant="outline"
            size="sm"
            className="h-8 flex-1 text-xs font-medium"
          >
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            size="sm"
            className="h-8 flex-1 text-xs font-medium"
          >
            Apply Changes
          </Button>
        </div>
      </div>
    </aside>
  );
}
