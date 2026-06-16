import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SubcategoryCardSkeleton() {
  return (
    <Card className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="size-4.5 rounded-full" />
      </div>

      {/* Items */}
      <div className="h-64 space-y-2 border-t pt-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between border-b pb-2 last:border-b-0"
          >
            <div className="flex items-center gap-2">
              <Skeleton className="size-8 shrink-0 rounded-md" />
              <Skeleton className="h-4 w-28" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="size-7 rounded-md" />
              <Skeleton className="size-7 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
