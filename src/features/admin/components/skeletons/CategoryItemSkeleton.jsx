import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryItemSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-lg border px-3 py-2">
      <Skeleton className="size-9 shrink-0 rounded-md" />
      <Skeleton className="h-4 flex-1" />
      <div className="flex shrink-0 items-center gap-1">
        <Skeleton className="size-7 rounded-md" />
        <Skeleton className="size-7 rounded-md" />
      </div>
    </div>
  );
}
