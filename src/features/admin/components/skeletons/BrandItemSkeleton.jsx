import { Skeleton } from "@/components/ui/skeleton";

export default function BrandItemSkeleton() {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div className="flex items-center gap-3">
        <Skeleton className="size-10 shrink-0 rounded-md" />
        <Skeleton className="h-4 w-28" />
      </div>
      <div className="flex shrink-0 items-center gap-1">
        <Skeleton className="size-7 rounded-md" />
        <Skeleton className="size-7 rounded-md" />
      </div>
    </div>
  );
}
