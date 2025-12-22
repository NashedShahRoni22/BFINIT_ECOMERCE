import { cn } from "@/lib/utils";

export default function SectionHeader({ title, description, className }) {
  return (
    <div className={cn("space-y-0.5", className)}>
      <h2 className="text-sm font-semibold">{title}</h2>
      <p className="text-muted-foreground text-xs">{description}</p>
    </div>
  );
}
