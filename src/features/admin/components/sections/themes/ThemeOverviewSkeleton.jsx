import { Skeleton } from "@/components/ui/skeleton";

export default function ThemeOverviewSkeleton() {
  return (
    <div className="border-border bg-card grid grid-cols-1 gap-6 rounded-lg border p-5 lg:grid-cols-2">
      {/* Image container */}
      <div className="flex items-center justify-center">
        <Skeleton className="aspect-video max-h-[450px] w-full rounded-lg border" />
      </div>

      {/* Theme info container */}
      <div className="flex flex-col gap-4">
        <div className="space-y-2">
          {/* title */}
          <Skeleton className="h-4 w-36" />

          {/* description */}
          <div className="space-y-2">
            <Skeleton className="h-3 w-full max-w-md" />
            <Skeleton className="h-3 w-full max-w-sm" />
            <Skeleton className="h-3 w-3/4 max-w-xs" />
          </div>
        </div>

        {/* actions */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <Skeleton className="h-8 w-36 rounded-md" />
          <Skeleton className="h-8 w-28 rounded-md" />
        </div>
      </div>
    </div>
  );
}
