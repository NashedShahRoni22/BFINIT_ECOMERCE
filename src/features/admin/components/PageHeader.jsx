import useSelectedStore from "@/hooks/useSelectedStore";

export default function PageHeader({
  icon: Icon,
  title,
  description,
  showStoreName = true,
}) {
  const { selectedStore } = useSelectedStore();

  return (
    <div className="flex items-start gap-2.5">
      <div className="border-border bg-card flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border">
        <Icon className="text-muted-foreground h-4 w-4" />
      </div>
      <div className="flex-1">
        <h1 className="text-sm font-semibold">{title}</h1>
        <p className="text-muted-foreground mt-0.5 text-xs">
          {description}{" "}
          {showStoreName && (
            <span className="font-medium">{selectedStore?.storeName}</span>
          )}
        </p>
      </div>
    </div>
  );
}
