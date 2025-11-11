import { Eye, EyeOff, GripVertical } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { Button } from "@/components/ui/button";
import { CSS } from "@dnd-kit/utilities";

export default function SortableSectionItem({
  section,
  activeSection,
  onSelect,
  onToggleVisibility,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: section.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={() => onSelect(section.id)}
      className={`group flex w-full cursor-pointer items-center justify-between rounded-md border transition-all select-none ${
        activeSection === section.id
          ? "border-accent-foreground/20 bg-accent"
          : "border-border bg-card hover:bg-accent/50"
      }`}
    >
      <div className="flex flex-1 items-center">
        <div
          {...attributes}
          {...listeners}
          className="text-muted-foreground hover:text-foreground cursor-grab py-2 pr-2 pl-2.5 transition-colors active:cursor-grabbing"
        >
          <GripVertical className="size-3.5" />
        </div>
        <span
          className={`text-xs font-medium ${activeSection === section.id ? "text-foreground" : "text-muted-foreground"}`}
        >
          {section.name}
        </span>
      </div>

      <Button
        onClick={(e) => {
          e.stopPropagation();
          onToggleVisibility(section.id);
        }}
        size="icon"
        variant="ghost"
        className={`mr-1 h-7 w-7 ${
          activeSection === section.id
            ? "text-foreground"
            : "text-muted-foreground"
        }`}
      >
        {section.visible ? <Eye size={14} /> : <EyeOff size={14} />}
      </Button>
    </div>
  );
}
