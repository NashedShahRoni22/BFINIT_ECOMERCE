import { Skeleton } from "@/components/ui/skeleton";

function StatCardSkeleton() {
  return (
    <div className="border-border bg-card space-y-2 rounded-lg border p-5">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-7 w-10" />
    </div>
  );
}

function PackageCardSkeleton() {
  return (
    <div className="border-border bg-card space-y-4 rounded-lg border p-5">
      {/* Label + toggle */}
      <div className="flex items-start justify-between">
        <div className="space-y-1.5">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-4 w-36" />
        </div>
        <Skeleton className="h-6 w-11 rounded-full" />
      </div>

      {/* Active + billing period */}
      <div className="flex items-center gap-2">
        <Skeleton className="h-2 w-2 rounded-full" />
        <Skeleton className="h-3 w-32" />
      </div>

      {/* Description */}
      <div className="space-y-1.5">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-4/5" />
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-1.5 py-1">
        <Skeleton className="h-7 w-20" />
        <Skeleton className="h-3 w-14" />
      </div>

      <Skeleton className="h-px w-full" />

      {/* Spec grid */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        <div className="space-y-1">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3.5 w-8" />
        </div>
        <div className="space-y-1">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3.5 w-10" />
        </div>
        <div className="space-y-1">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3.5 w-14" />
        </div>
        <div className="space-y-1">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3.5 w-8" />
        </div>
      </div>

      <Skeleton className="h-px w-full" />

      {/* Edit button */}
      <Skeleton className="h-8 w-full rounded-md" />
    </div>
  );
}

export default function PackagesSkeleton({ cards = 4 }) {
  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      {/* Package cards grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: cards }).map((_, i) => (
          <PackageCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
