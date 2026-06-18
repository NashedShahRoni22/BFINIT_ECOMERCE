import { TableCell, TableRow } from "@/components/ui/table";

export default function BlogTableRowSkeleton() {
  return (
    <TableRow>
      <TableCell className="border">
        <div className="flex items-start gap-3">
          <div className="bg-muted aspect-square size-10 animate-pulse rounded-md" />
          <div className="mt-1 flex-1">
            <div className="bg-muted h-3 w-3/4 animate-pulse rounded" />
          </div>
        </div>
      </TableCell>
      <TableCell className="border border-r-0 text-right">
        <div className="bg-muted ml-auto h-7 w-7 animate-pulse rounded-md" />
      </TableCell>
    </TableRow>
  );
}
