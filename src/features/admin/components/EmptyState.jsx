import { Store } from "lucide-react";

export default function EmptyState({
  icon: Icon = Store,
  title = "No Store Selected",
  description,
}) {
  return (
    <div className="mt-8 flex flex-col items-center justify-center rounded-lg border-gray-300 bg-gray-50 p-12 text-center">
      <Icon className="mx-auto size-12 text-gray-400" />
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-gray-500">{description}</p>
    </div>
  );
}
