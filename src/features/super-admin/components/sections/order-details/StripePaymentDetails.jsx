import { CreditCard, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function StripePaymentDetails() {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
            <CreditCard
              className="mr-1.5 inline h-3.5 w-3.5 align-[-2px]"
              aria-hidden="true"
            />
            Payment info
          </CardTitle>
          <Badge variant="outline" className="text-xs font-normal">
            Stripe
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <Alert variant="info" className="[&>svg]:translate-y-0">
          <Info />
          <AlertDescription className="text-xs">
            Payment processed automatically via Stripe. No manual verification
            required.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
