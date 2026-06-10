import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export default function StoreCardSkeleton() {
  return (
    <Card className="relative w-full max-w-sm p-4">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <Skeleton className="size-9 shrink-0 rounded-lg" />
          <div className="flex flex-col gap-1.5">
            <Skeleton className="h-3.5 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
        <div className="flex gap-1">
          <Skeleton className="size-7 rounded-md" />
          <Skeleton className="size-7 rounded-md" />
        </div>
      </div>

      <Separator />

      <div className="my-3 flex items-center gap-2">
        <Skeleton className="h-3.5 w-10" />
        <Skeleton className="h-5 w-9 rounded-full" />
      </div>

      <Skeleton className="h-8 w-20 rounded-md" />
    </Card>
  );
}
