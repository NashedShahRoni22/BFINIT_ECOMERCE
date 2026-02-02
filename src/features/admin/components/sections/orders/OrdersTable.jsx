import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OrderRow from "./OrderRow";

export default function OrdersTable({ orders }) {
  return (
    <Table>
      <TableHeader className="bg-card hover:bg-transparent">
        <TableRow>
          <TableHead className="h-12 w-10 border border-l-0 text-xs font-semibold">
            <Checkbox />
          </TableHead>
          <TableHead className="border text-xs font-semibold">
            Order ID
          </TableHead>
          <TableHead className="border text-xs font-semibold">
            Customer
          </TableHead>
          <TableHead className="border text-xs font-semibold">
            Date & Time
          </TableHead>
          <TableHead className="border text-xs font-semibold">Items</TableHead>
          <TableHead className="border text-xs font-semibold">Total</TableHead>
          <TableHead className="border text-xs font-semibold">
            Payment Method
          </TableHead>
          <TableHead className="border text-xs font-semibold">
            Payment Status
          </TableHead>
          <TableHead className="border text-xs font-semibold">
            Order Status
          </TableHead>
          <TableHead className="border text-xs font-semibold">
            Delivery Status
          </TableHead>
          <TableHead className="border text-xs font-semibold">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders.map((order) => (
          <OrderRow order={order} />
        ))}
      </TableBody>
    </Table>
  );
}
