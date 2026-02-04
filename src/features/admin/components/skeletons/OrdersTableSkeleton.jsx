import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function OrdersTableSkeleton() {
  return (
    <div className="overflow-hidden">
      <Table>
        <TableHeader className="bg-muted hover:bg-muted">
          <TableRow>
            {/* Checkbox column */}
            {/* <TableHead className="w-10 border border-l-0">
              <div className="bg-card size-4 rounded"></div>
            </TableHead> */}

            {/* Order ID */}
            <TableHead className="border">
              <Skeleton className="bg-card h-3 w-16" />
            </TableHead>

            {/* Customer */}
            <TableHead className="border">
              <Skeleton className="bg-card h-3 w-20" />
            </TableHead>

            {/* Date & Time */}
            <TableHead className="border">
              <Skeleton className="bg-card h-3 w-24" />
            </TableHead>

            {/* Items */}
            <TableHead className="border">
              <Skeleton className="bg-card h-3 w-12" />
            </TableHead>

            {/* Total */}
            <TableHead className="border">
              <Skeleton className="bg-card h-3 w-12" />
            </TableHead>

            {/* Payment Method */}
            <TableHead className="border">
              <Skeleton className="bg-card h-3 w-28" />
            </TableHead>

            {/* Payment Status */}
            <TableHead className="border">
              <Skeleton className="bg-card h-3 w-24" />
            </TableHead>

            {/* Order Status */}
            <TableHead className="border">
              <Skeleton className="bg-card h-3 w-24" />
            </TableHead>

            {/* Delivery Status */}
            <TableHead className="border">
              <Skeleton className="bg-card h-3 w-28" />
            </TableHead>

            {/* Actions */}
            <TableHead className="border">
              <Skeleton className="bg-card h-3 w-16" />
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: 5 }).map((_, index) => (
            <TableRow key={index}>
              {/* Checkbox */}
              {/* <TableCell className="w-10 border border-l-0">
                <div className="bg-muted size-4 rounded"></div>
              </TableCell> */}

              {/* Order ID */}
              <TableCell className="max-w-xs border">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-3 w-28" />
                  <Skeleton className="size-4" />
                </div>
              </TableCell>

              {/* Customer - Multi-line */}
              <TableCell className="max-w-xs border">
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="h-3 w-40" />
                  <Skeleton className="h-3 w-36" />
                </div>
              </TableCell>

              {/* Date & Time - Multi-line */}
              <TableCell className="border">
                <div className="flex flex-col gap-0.5">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </TableCell>

              {/* Items */}
              <TableCell className="border">
                <Skeleton className="h-3 w-12" />
              </TableCell>

              {/* Total */}
              <TableCell className="border">
                <Skeleton className="h-3 w-16" />
              </TableCell>

              {/* Payment Method */}
              <TableCell className="border">
                <div className="flex items-center gap-1.5">
                  <Skeleton className="size-3.5 rounded" />
                  <Skeleton className="h-3 w-28" />
                </div>
              </TableCell>

              {/* Payment Status */}
              <TableCell className="border">
                <Skeleton className="h-5 w-16 rounded-full" />
              </TableCell>

              {/* Order Status */}
              <TableCell className="border">
                <Skeleton className="h-8 w-28 rounded-md" />
              </TableCell>

              {/* Delivery Status */}
              <TableCell className="border">
                <Skeleton className="h-8 w-36 rounded-md" />
              </TableCell>

              {/* Actions */}
              <TableCell className="border">
                <Skeleton className="h-8 w-16 rounded-md" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
