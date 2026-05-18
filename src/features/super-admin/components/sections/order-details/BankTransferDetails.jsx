import { Building2, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/utils/formatDate";
import { BASE_URL } from "@/utils/api-config";

export default function BankTransferDetails({ orderDetails = {} }) {
  const bankInfo = orderDetails?.manualPayments?.[0];
  if (!bankInfo) return null;

  const {
    bank_name,
    branch,
    account_no,
    name,
    transaction_id,
    phone,
    payment_at,
    document,
  } = bankInfo;

  const documentUrl = `${BASE_URL}${document}`;
  const fileName = document?.split("/")?.pop();

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            <Building2
              className="mr-1.5 inline h-3.5 w-3.5 align-[-2px]"
              aria-hidden="true"
            />
            Payment info
          </CardTitle>
          <Badge variant="outline" className="text-xs font-normal">
            Bank transfer
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Bank detail rows */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs">Bank name</span>
            <span className="text-foreground text-xs font-medium">
              {bank_name}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs">Branch</span>
            <span className="text-foreground text-xs font-medium">
              {branch}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-muted-foreground shrink-0 text-xs">
              Account no.
            </span>
            <span className="text-foreground font-mono text-xs font-medium tracking-wide">
              {account_no}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs">
              Account holder
            </span>
            <span className="text-foreground text-xs font-medium">{name}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs">
              Transaction ID
            </span>
            <span className="text-foreground font-mono text-xs font-medium">
              {transaction_id}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs">Phone</span>
            <span className="text-foreground text-xs font-medium">{phone}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs">Payment date</span>
            <span className="text-foreground text-xs font-medium">
              {formatDate(payment_at)}
            </span>
          </div>
        </div>

        <Separator />

        {/* Payment slip */}
        <div className="border-border bg-muted/50 flex items-center gap-3 rounded-md border px-3 py-2.5">
          <div className="bg-warning/15 flex h-8 w-8 shrink-0 items-center justify-center rounded-md">
            <Building2 className="text-warning h-4 w-4" aria-hidden="true" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-foreground text-xs font-medium">Payment slip</p>
            <p className="text-muted-foreground truncate text-xs">{fileName}</p>
          </div>

          <a
            href={documentUrl}
            target="_blank"
            rel="noreferrer"
            className="text-primary flex shrink-0 items-center gap-1 text-xs hover:underline"
          >
            View
            <ExternalLink className="h-3 w-3" aria-hidden="true" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
