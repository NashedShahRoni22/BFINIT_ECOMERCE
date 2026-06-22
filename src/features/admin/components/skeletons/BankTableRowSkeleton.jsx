import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

export function BankTableSkeleton() {
  return (
    <Table>
      <TableBody>
        {[...Array(5)].map((_, i) => (
          <TableRow key={i}>
            {[...Array(4)].map((_, j) => (
              <TableCell key={j} className="border text-center">
                <Skeleton className="mx-auto h-3 w-32" />
              </TableCell>
            ))}
            <TableCell className="border border-r-0 text-center">
              <Skeleton className="mx-auto h-7 w-7 rounded-md" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
