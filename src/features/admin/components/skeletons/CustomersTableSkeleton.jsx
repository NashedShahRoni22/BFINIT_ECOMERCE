import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CustomersTableSkeleton() {
  return (
    <div className="overflow-hidden">
      <Table>
        <TableHeader className="bg-muted hover:bg-muted">
          <TableRow>
            {/* <TableHead className="w-12">
              <div className="bg-card size-4 rounded"></div>
            </TableHead> */}

            {Array.from({ length: 3 }).map((_, i) => (
              <TableHead key={i}>
                <Skeleton className="bg-card h-3 w-24" />
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {[...Array(5)].map((_, index) => (
            <TableRow key={index}>
              {/* checkbox */}
              {/* <TableCell className="w-12">
                <div className="bg-muted size-4 rounded"></div>
              </TableCell> */}

              {/* name */}
              <TableCell>
                <Skeleton className="h-3 w-32" />
              </TableCell>

              {/* email */}
              <TableCell>
                <Skeleton className="h-3 w-20" />
              </TableCell>

              {/* created date */}
              <TableCell>
                <Skeleton className="h-3 w-16" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
