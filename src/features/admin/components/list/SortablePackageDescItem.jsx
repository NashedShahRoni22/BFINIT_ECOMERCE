import { GripVertical, X } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function SortablePackageDescItem({ id, item, index, onRemove }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="bg-muted/40 flex items-center justify-between rounded-md border p-2"
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="size-3.5" />
        </button>
        <span className="text-secondary-foreground text-xs">{item}</span>
      </div>
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="text-muted-foreground hover:text-destructive ml-2 shrink-0 cursor-pointer"
      >
        <X className="size-3.5" />
      </button>
    </li>
  );
}
