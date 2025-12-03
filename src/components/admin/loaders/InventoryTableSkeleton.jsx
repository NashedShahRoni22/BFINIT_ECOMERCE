import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function InventoryTableSkeleton() {
  return (
    <>
      {/* Tools section skeleton */}
      <div className="flex items-center justify-end gap-3 px-5">
        <Skeleton className="h-9 w-72" />
        <Skeleton className="h-9 w-19" />
        <Skeleton className="h-9 w-28" />
      </div>

      {/* Table Skeleton */}
      <div className="overflow-hidden rounded-md">
        <Table>
          <TableHeader className="bg-muted hover:bg-muted">
            <TableRow>
              <TableHead className="w-12">
                <div className="bg-card size-4 rounded"></div>
              </TableHead>

              {Array.from({ length: 6 }).map((_, i) => (
                <TableHead key={i}>
                  <Skeleton className="bg-card h-3 w-24" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                {/* Checkbox */}
                <TableCell className="w-12">
                  <div className="bg-muted size-4 rounded"></div>
                </TableCell>

                {/* Product */}
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Skeleton className="aspect-square size-10 rounded-md" />
                    <div className="space-y-2">
                      <Skeleton className="h-3 w-32" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                </TableCell>

                {/* Category */}
                <TableCell>
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </TableCell>

                {/* Stock */}
                <TableCell>
                  <Skeleton className="h-5 w-20 rounded-full" />
                </TableCell>

                {/* Price */}
                <TableCell>
                  <Skeleton className="h-3 w-16" />
                </TableCell>

                {/* Variants */}
                <TableCell>
                  <Skeleton className="h-3 w-16" />
                </TableCell>

                {/* Action */}
                <TableCell className="text-right">
                  <div className="flex justify-end">
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
