import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TooltipProvider } from "@/components/ui/tooltip";
import BankAccountRow from "./BankAccountRow";

export default function BankAccountsTable({ data }) {
  return (
    <TooltipProvider delayDuration={300}>
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
            {data?.map((account) => (
              <BankAccountRow key={account?.id} account={account} />
            ))}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
}
