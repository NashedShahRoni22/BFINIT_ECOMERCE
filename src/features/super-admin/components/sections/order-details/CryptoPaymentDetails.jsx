import { Bitcoin, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

const PAYMENT_DETAILS = [
  { label: "Wallet address", value: "7xL...Pub" },
  { label: "Transaction ID", value: "5K...abc" },
];

export default function CryptoPaymentDetails() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            <Bitcoin
              className="mr-1.5 inline h-3.5 w-3.5 align-[-2px]"
              aria-hidden="true"
            />
            Payment info
          </CardTitle>
          <Badge variant="neutral" className="text-xs font-normal">
            Crypto
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-2.5">
          {PAYMENT_DETAILS.map(({ label, value }) => (
            <div key={label} className="flex flex-col gap-0.5">
              <span className="text-muted-foreground text-xs">{label}</span>
              <span className="font-mono text-xs font-medium break-all">
                {value}
              </span>
            </div>
          ))}
        </div>

        <Alert variant="info" className="mt-4 [&>svg]:translate-y-0">
          <Info />
          <AlertDescription className="text-xs">
            Payment processed automatically via Crypto. No manual verification
            required.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
