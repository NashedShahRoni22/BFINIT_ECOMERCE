import { Skeleton } from "@/components/ui/skeleton";

export default function DomainSkeleton() {
  return (
    <div className="space-y-8">
      {/* Domain Ownership Check Skeleton */}
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
        <div>
          <Skeleton className="mb-2 h-6 w-56" />
          <Skeleton className="h-4 w-full max-w-2xl" />
        </div>

        {/* Radio Options */}
        <div className="space-y-4">
          <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-start space-x-3">
              <Skeleton className="mt-1 h-5 w-5 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-3 w-full max-w-md" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-4">
            <div className="flex items-start space-x-3">
              <Skeleton className="mt-1 h-5 w-5 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-full max-w-md" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Domain Field Skeleton */}
      <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-6">
        <div>
          <Skeleton className="mb-2 h-6 w-48" />
          <Skeleton className="h-4 w-full max-w-xl" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      {/* Buttons Skeleton */}
      <div className="flex flex-col-reverse gap-4 lg:flex-row lg:justify-between">
        <Skeleton className="h-10 w-40" />
        <div className="flex flex-col-reverse gap-4 lg:flex-row">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-40" />
        </div>
      </div>
    </div>
  );
}
