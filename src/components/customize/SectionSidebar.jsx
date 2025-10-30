import { useState } from "react";
import { GripVertical, Eye, EyeOff, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

function SectionItem({ section, isActive, onClick, onToggleVisibility }) {
  return (
    <button
      onClick={onClick}
      className={`group hover:bg-accent flex w-full items-center justify-between rounded-md border px-2.5 py-2 transition-colors ${isActive ? "border-primary bg-primary/5" : "border-border bg-muted/30"} `}
    >
      <div className="flex items-center gap-2">
        <GripVertical
          size={16}
          className="text-muted-foreground cursor-grab active:cursor-grabbing"
        />
        <span className="text-sm font-medium">{section.name}</span>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleVisibility(section.id);
        }}
        className="hover:bg-accent rounded p-0.5"
        title={section.visible ? "Hide section" : "Show section"}
      >
        {section.visible ? (
          <Eye size={16} className="text-muted-foreground" />
        ) : (
          <EyeOff size={16} className="text-muted-foreground/50" />
        )}
      </button>
    </button>
  );
}

export default function SectionSidebar() {
  const [sections, setSections] = useState({
    header: [{ id: "nav-1", name: "Navigation", visible: true }],
    body: [
      { id: "hero-1", name: "Hero Banner", visible: true },
      { id: "product-1", name: "Product Grid", visible: true },
      { id: "testimonials-1", name: "Testimonials", visible: false },
    ],
    footer: [{ id: "footer-1", name: "Footer", visible: true }],
  });

  const [activeSection, setActiveSection] = useState("hero-1");

  const toggleVisibility = (sectionId) => {
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

  return (
    <aside className="custom-scrollbar-hide bg-background flex h-[calc(100dvh-63px)] w-full max-w-64 flex-col border-r">
      {/* Header */}
      <div className="border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Sections</h2>
          <Button
            size="sm"
            variant="ghost"
            className="h-7 gap-1.5 px-2 text-xs"
          >
            <Plus size={14} />
            Add
          </Button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <div className="space-y-6">
          {/* Header Sections */}
          <div className="space-y-2">
            <h3 className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Header
            </h3>
            <div className="space-y-1.5">
              {sections.header.map((section) => (
                <SectionItem
                  key={section.id}
                  section={section}
                  isActive={activeSection === section.id}
                  onClick={() => setActiveSection(section.id)}
                  onToggleVisibility={toggleVisibility}
                />
              ))}
            </div>
          </div>

          {/* Body Sections */}
          <div className="space-y-2">
            <h3 className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Body
            </h3>
            <div className="space-y-1.5">
              {sections.body.map((section) => (
                <SectionItem
                  key={section.id}
                  section={section}
                  isActive={activeSection === section.id}
                  onClick={() => setActiveSection(section.id)}
                  onToggleVisibility={toggleVisibility}
                />
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          <div className="space-y-2">
            <h3 className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
              Footer
            </h3>
            <div className="space-y-1.5">
              {sections.footer.map((section) => (
                <SectionItem
                  key={section.id}
                  section={section}
                  isActive={activeSection === section.id}
                  onClick={() => setActiveSection(section.id)}
                  onToggleVisibility={toggleVisibility}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
