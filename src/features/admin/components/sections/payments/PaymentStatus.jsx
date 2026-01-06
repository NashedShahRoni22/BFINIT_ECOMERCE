import { CircleX, CreditCard, DollarSign } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function PaymentStatus() {
  return (
    <div className="bg-card space-y-6 rounded-lg p-5">
      {/* connection status */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold">Connection Status</h2>

        <Alert
          variant="destructive"
          className="has-[>svg]:gap-x-1.5 [&>svg]:size-3.5"
        >
          <CircleX />
          <AlertTitle className="text-xs">Not Connected</AlertTitle>
          <AlertDescription className="text-xs">
            Connect your Stripe account to start accepting payments
          </AlertDescription>
        </Alert>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2">
        {/* Charges Card */}
        <div className="border-border bg-background rounded-lg border p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 rounded-md p-2">
                <CreditCard className="text-primary h-4 w-4" />
              </div>
              <span className="text-foreground text-sm font-medium">
                Accept Payments
              </span>
            </div>
            <CircleX className="text-muted-foreground h-4 w-4" />
          </div>
          <p className="text-muted-foreground text-xs">
            Enable to start accepting credit card payments
          </p>
        </div>

        {/* Payouts Card */}
        <div className="border-border bg-background rounded-lg border p-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="bg-primary/10 rounded-md p-2">
                <DollarSign className="text-primary h-4 w-4" />
              </div>
              <span className="text-foreground text-sm font-medium">
                Receive Payouts
              </span>
            </div>
            <CircleX className="text-muted-foreground h-4 w-4" />
          </div>
          <p className="text-muted-foreground text-xs">
            Enable to receive automatic payouts to your bank
          </p>
        </div>
      </div>

      <div className="border-border bg-muted/50 flex items-center justify-between rounded-lg border p-4">
        <div>
          <p className="text-foreground text-sm font-medium">Complete Setup</p>
          <p className="text-muted-foreground text-xs">
            Connect to Stripe to start processing payments
          </p>
        </div>
        <Button size="sm" className="text-xs">
          Connect Stripe
        </Button>
      </div>
    </div>
  );
}
