import { Skeleton } from "@/components/ui/skeleton";

export default function CustomersToolsSkeleton() {
  return (
    <div className="flex items-center justify-end gap-3 px-5">
      <Skeleton className="h-9 w-72" />
    </div>
  );
}
