import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function StoreCardSkeleton() {
  return (
    <Card className="relative w-full max-w-xs px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo + info */}
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 rounded-lg bg-muted animate-pulse" />
          <div className="flex flex-col gap-1.5">
            <div className="h-3 w-20 rounded bg-muted animate-pulse" />
            <div className="h-2.5 w-32 rounded bg-muted animate-pulse" />
          </div>
        </div>

        {/* Status + toggle */}
        <div className="mt-3 flex items-center justify-end gap-2">
          <div className="h-2.5 w-8 rounded bg-muted animate-pulse" />
          <div className="h-5 w-9 rounded-full bg-muted animate-pulse" />
        </div>
      </div>

      <Separator />

      <div>
        {/* Switch button */}
        <div className="h-9 w-full rounded-md bg-muted animate-pulse" />

        {/* Icon buttons */}
        <div className="mt-4 flex flex-1 items-center justify-between">
          <div className="h-9 w-9 rounded-md bg-muted animate-pulse" />
          <div className="h-9 w-9 rounded-md bg-muted animate-pulse" />
          <div className="h-9 w-9 rounded-md bg-muted animate-pulse" />
        </div>
      </div>
    </Card>
  );
}