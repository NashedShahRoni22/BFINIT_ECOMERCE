import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";

function BankAccountRowSkeleton() {
  return (
    <TableRow>
      <TableCell>
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
      </TableCell>
      <TableCell>
        <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
      </TableCell>
      <TableCell>
        <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200" />
      </TableCell>
      <TableCell className="text-right">
        <div className="flex items-center justify-end gap-2">
          <div className="h-7 w-7 animate-pulse rounded bg-gray-200" />
          <div className="h-7 w-7 animate-pulse rounded bg-gray-200" />
        </div>
      </TableCell>
    </TableRow>
  );
}

export default function BankAccountsTableSkeleton() {
  return (
    <div className="bg-card rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs">Bank name</TableHead>
            <TableHead className="text-xs">Account name</TableHead>
            <TableHead className="text-xs">Account no.</TableHead>
            <TableHead className="text-xs">Routing no.</TableHead>
            <TableHead className="text-xs">Swift code</TableHead>
            <TableHead className="text-xs">Status</TableHead>
            <TableHead className="text-right text-xs">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 3 }).map((_, i) => (
            <BankAccountRowSkeleton key={i} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
