import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CustomerTable({ customersData }) {
  return (
    <Table>
      <TableHeader className="bg-card hover:bg-transparent">
        <TableRow>
          <TableHead className="h-12 w-10 border border-l-0 text-xs font-semibold">
            <Checkbox />
          </TableHead>
          <TableHead className="border text-xs font-semibold">Name</TableHead>
          <TableHead className="border text-xs font-semibold">Email</TableHead>
          <TableHead className="border text-xs font-semibold">
            Created At
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {customersData.map((customer) => (
          <TableRow>
            <TableCell className="w-10 border border-l-0">
              <Checkbox />
            </TableCell>

            <TableCell
              title={customer.name}
              className="max-w-xs truncate border text-xs font-medium"
            >
              {customer.name}
            </TableCell>

            <TableCell
              title={customer.email}
              className="max-w-xs truncate border text-xs font-medium"
            >
              {customer.email}
            </TableCell>

            <TableCell
              title={customer.createdAt}
              className="max-w-xs truncate border text-xs font-medium"
            >
              {customer.createdAt}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
