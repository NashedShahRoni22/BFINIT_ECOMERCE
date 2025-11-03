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
      className={`group flex w-full cursor-pointer items-center justify-between rounded-md border pr-2.5 transition-colors select-none ${
        activeSection === section.id
          ? "border-primary bg-gray-100"
          : "border-gray-200 hover:bg-gray-50"
      }`}
    >
      <div className="flex flex-1 items-center">
        <div
          {...attributes}
          {...listeners}
          className="active:text-primary text-muted-foreground h-full cursor-grab pr-1 pl-2.5 active:cursor-grabbing"
        >
          <GripVertical size={14} />
        </div>
        <span
          className={`text-xs font-medium ${activeSection === section.id ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`}
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
        className={
          activeSection === section.id
            ? "text-primary"
            : "text-muted-foreground"
        }
      >
        {section.visible ? <Eye size={14} /> : <EyeOff size={14} />}
      </Button>
    </div>
  );
}
