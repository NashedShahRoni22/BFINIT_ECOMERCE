import useSelectedStore from "@/hooks/stores/useSelectedStore";

export default function PageHeader({ icon: Icon, title, description }) {
  const { selectedStore } = useSelectedStore();

  return (
    <div className="flex items-start gap-3">
      <div className="border-border bg-muted flex h-10 w-10 items-center justify-center rounded-md border">
        <Icon className="text-muted-foreground h-5 w-5" />
      </div>
      <div className="flex-1">
        <h1 className="text-foreground mb-1 text-lg font-semibold">{title}</h1>
        <p className="text-muted-foreground text-sm">
          {description}{" "}
          <span className="text-foreground font-medium">
            {selectedStore?.storeName}
          </span>
        </p>
      </div>
    </div>
  );
}
