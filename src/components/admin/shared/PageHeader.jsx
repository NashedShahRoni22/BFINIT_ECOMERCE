import useSelectedStore from "@/hooks/stores/useSelectedStore";

export default function PageHeader({ icon: Icon, title, description }) {
  const { selectedStore } = useSelectedStore();

  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-slate-50">
        <Icon className="h-5 w-5 text-slate-500" />
      </div>
      <div className="flex-1">
        <h1 className="mb-1 text-lg font-semibold">{title}</h1>
        <p className="text-sm text-slate-600">
          {description}{" "}
          <span className="font-medium text-slate-900">
            {selectedStore?.storeName}
          </span>
        </p>
      </div>
    </div>
  );
}
