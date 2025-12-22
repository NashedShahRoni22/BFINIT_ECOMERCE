import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import InventoryTableRow from "./InventoryTableRow";

export default function InventoryTable({ products }) {
  return (
    <Table>
      <TableHeader className="bg-card hover:bg-transparent">
        <TableRow>
          <TableHead className="h-12 w-10 border border-l-0 text-xs font-semibold">
            <Checkbox />
          </TableHead>
          <TableHead className="border text-xs font-semibold">
            Product
          </TableHead>
          <TableHead className="border text-xs font-semibold">
            Category
          </TableHead>
          <TableHead className="border text-xs font-semibold">Stock</TableHead>
          <TableHead className="border text-xs font-semibold">Price</TableHead>
          <TableHead className="border text-xs font-semibold">
            Variants
          </TableHead>
          <TableHead className="border border-r-0 text-xs font-semibold">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.map((product) => (
          <InventoryTableRow key={product._id} product={product} />
        ))}
      </TableBody>
    </Table>
  );
}
