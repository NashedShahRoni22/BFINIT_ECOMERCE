import { Skeleton } from "@/components/ui/skeleton";

export default function StatCardsSkeleton() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 rounded md:grid-cols-2 lg:grid-cols-4">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="bg-card rounded-lg border p-4">
          <div className="flex items-start gap-3">
            <Skeleton className="h-10 w-10 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-7 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
