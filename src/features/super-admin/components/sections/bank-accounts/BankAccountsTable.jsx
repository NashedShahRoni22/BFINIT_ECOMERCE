import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TooltipProvider } from "@/components/ui/tooltip";
import BankAccountRow from "./BankAccountRow";
import { cn } from "@/lib/utils";

const tableHeaders = [
  "Bank name",
  "Account name",
  "Account no.",
  "Routing no.",
  "Swift code",
  "Status",
  "Actions",
];

export default function BankAccountsTable({ data }) {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="bg-card rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableHead
                  key={index}
                  className={cn(
                    "text-xs",
                    index === tableHeaders?.length - 1 && "text-right",
                  )}
                >
                  {header}
                </TableHead>
              ))}
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
