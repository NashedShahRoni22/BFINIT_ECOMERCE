export default function CardSkeleton() {
  return (
    <div className="flex flex-col rounded-lg border border-neutral-200">
      <div className="aspect-video w-full animate-pulse rounded-t-lg bg-gray-200" />
      <div className="p-4">
        <div className="mb-3 h-6 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="mt-4 h-8 w-24 animate-pulse rounded-md bg-gray-200" />
      </div>
    </div>
  );
}
