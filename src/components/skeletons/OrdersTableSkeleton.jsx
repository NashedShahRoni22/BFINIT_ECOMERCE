import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const tableHeader = [
  "Invoice",
  "Customer",
  "Package",
  "Total",
  "Payment Method",
  "Status",
  "Actions",
];

const columnSkeletons = [
  // Invoice — number + date stacked
  <div className="space-y-1.5">
    <Skeleton className="h-3 w-28" />
    <Skeleton className="h-3 w-20" />
  </div>,
  // Customer — name + email stacked
  <div className="space-y-1.5">
    <Skeleton className="h-3 w-32" />
    <Skeleton className="h-3 w-40" />
  </div>,
  // Package — name + duration stacked
  <div className="space-y-1.5">
    <Skeleton className="h-3 w-36" />
    <Skeleton className="h-3 w-12" />
  </div>,
  // Total
  <Skeleton className="h-3 w-12" />,
  // Payment method — icon + label inline
  <div className="flex items-center gap-1.5">
    <Skeleton className="h-3.5 w-3.5 rounded-sm" />
    <Skeleton className="h-3 w-24" />
  </div>,
  // Status badge
  <Skeleton className="h-5 w-16 rounded-full" />,
  // Actions button
  <Skeleton className="h-7 w-14 rounded-md" />,
];

export default function OrdersTableSkeleton({ rows = 8 }) {
  return (
    <Table>
      <TableHeader className="bg-card hover:bg-transparent">
        <TableRow>
          {tableHeader.map((item, index) => (
            <TableHead key={index} className="border text-xs font-semibold">
              {item}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <TableRow key={rowIndex}>
            {columnSkeletons.map((skeleton, colIndex) => (
              <TableCell key={colIndex} className="border">
                {skeleton}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
