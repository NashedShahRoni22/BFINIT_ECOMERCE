import { useState, useEffect } from "react";
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
      <aside className="flex h-[calc(100vh-63px)] w-full max-w-80 items-center justify-center border-l bg-white">
        <p className="text-muted-foreground text-sm">
          No editor available for this section
        </p>
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
      {/* Header */}
      <div className="border-b px-4 py-3">
        <h2 className="text-sm font-semibold">{section.name}</h2>
        <p className="text-muted-foreground text-xs">Edit section content</p>
      </div>

      {/* Scrollable Form Content - DYNAMIC FIELDS */}
      <div className="flex-1 overflow-y-auto p-5">
        <div className="space-y-5">
          {fieldSchema.map((field) => (
            <DynamicFormField
              key={field.key}
              field={field}
              value={formData[field.key]}
              onChange={(value) => handleInputChange(field.key, value)}
            />
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex items-center gap-4 border-t px-4 py-3">
        <Button
          onClick={handleCancel}
          variant="outline"
          size="sm"
          className="min-w-[100px]"
        >
          Cancel
        </Button>
        <Button onClick={handleApply} size="sm" className="flex-1">
          Apply Changes
        </Button>
      </div>
    </aside>
  );
}
