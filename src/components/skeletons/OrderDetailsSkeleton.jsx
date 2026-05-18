import { Skeleton } from "@/components/ui/skeleton";

function CardShell({ children }) {
  return (
    <div className="border-border bg-card space-y-3 rounded-lg border p-5">
      {children}
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex items-center justify-between py-1">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-3 w-32" />
    </div>
  );
}

// Header skeleton
function OrderDetailHeaderSkeleton() {
  return (
    <div className="flex items-start justify-between">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
        <Skeleton className="h-3.5 w-52" />
      </div>
      <Skeleton className="h-6 w-20 rounded-full" />
    </div>
  );
}

// Customer card skeleton
function CustomerCardSkeleton() {
  return (
    <CardShell>
      <Skeleton className="h-3 w-20" />
      <div className="flex items-center gap-3 py-1">
        <Skeleton className="h-9 w-9 shrink-0 rounded-full" />
        <div className="space-y-1.5">
          <Skeleton className="h-3.5 w-36" />
          <Skeleton className="h-3 w-44" />
        </div>
      </div>
      <Skeleton className="h-px w-full" />
      <SkeletonRow />
      <SkeletonRow />
      <SkeletonRow />
    </CardShell>
  );
}

// Invoice summary skeleton
function InvoiceSummaryCardSkeleton() {
  return (
    <CardShell>
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-5 w-14 rounded-full" />
      </div>
      <div className="space-y-1.5 py-1">
        <Skeleton className="h-7 w-28" />
        <Skeleton className="h-3 w-40" />
      </div>
      <Skeleton className="h-px w-full" />
      <SkeletonRow />
      <SkeletonRow />
      <Skeleton className="h-px w-full" />
      <SkeletonRow />
    </CardShell>
  );
}

// Package card skeleton
function PackageCardSkeleton() {
  return (
    <CardShell>
      <Skeleton className="h-3 w-20" />
      <div className="flex items-start justify-between py-1">
        <div className="space-y-1.5">
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-3 w-52" />
        </div>
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-px w-full" />
      <SkeletonRow />
      <SkeletonRow />
      <SkeletonRow />
      <SkeletonRow />
      <Skeleton className="h-px w-full" />
      <div className="flex flex-wrap gap-1.5 pt-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-24 rounded-full" />
        ))}
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </CardShell>
  );
}

// Payment info skeleton (bank transfer)
function PaymentInfoCardSkeleton() {
  return (
    <CardShell>
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-24 rounded-full" />
      </div>
      <SkeletonRow />
      <SkeletonRow />
      <SkeletonRow />
      <SkeletonRow />
      <SkeletonRow />
      <SkeletonRow />
      <SkeletonRow />
      <Skeleton className="h-px w-full" />
      <div className="border-border bg-muted/50 flex items-center gap-3 rounded-md border px-3 py-2.5">
        <Skeleton className="h-8 w-8 shrink-0 rounded-md" />
        <div className="flex-1 space-y-1.5">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-36" />
        </div>
        <Skeleton className="h-3 w-10" />
      </div>
    </CardShell>
  );
}

// Approval card skeleton
function ApprovalCardSkeleton() {
  return (
    <CardShell>
      <Skeleton className="h-3 w-20" />
      <Skeleton className="h-3.5 w-full" />
      <Skeleton className="h-3.5 w-3/4" />
      <div className="flex gap-2 pt-1">
        <Skeleton className="h-8 flex-1 rounded-md" />
        <Skeleton className="h-8 flex-1 rounded-md" />
      </div>
      <Skeleton className="mx-auto h-3 w-32" />
    </CardShell>
  );
}

// Full page skeleton
export default function OrderDetailsSkeleton() {
  return (
    <div className="bg-card space-y-4 rounded-lg p-5">
      <OrderDetailHeaderSkeleton />

      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8 flex flex-col gap-4">
          <CustomerCardSkeleton />
          <InvoiceSummaryCardSkeleton />
          <PackageCardSkeleton />
        </div>

        <div className="col-span-4 flex flex-col gap-4">
          <PaymentInfoCardSkeleton />
          <ApprovalCardSkeleton />
        </div>
      </div>
    </div>
  );
}
