import toast from "react-hot-toast";
import {
  AlertCircle,
  ArrowRight,
  Check,
  CircleX,
  CreditCard,
  DollarSign,
  ExternalLink,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import usePostMutation from "@/hooks/api/usePostMutation";
import useSelectedStore from "@/hooks/useSelectedStore";
import { Link } from "react-router";

export default function PaymentStatus({ currentStore }) {
  const { selectedStore } = useSelectedStore();

  const isConnected =
    currentStore?.charges_enabled && currentStore?.payouts_enabled;

  const { mutate, isPending } = usePostMutation({
    endpoint: `/payments/stripe/connect/?storeId=${selectedStore?.storeId}`,
    token: true,
    clientId: true,
  });

  const handleStripeConnect = () => {
    mutate(
      {},
      {
        onSuccess: (data) => {
          window.location.href = data?.url?.url;
        },
        onError: () => {
          toast.error("Somthing went wrong!");
        },
      },
    );
  };

  return (
    <div className="bg-card space-y-6 rounded-lg p-5">
      {/* connection status */}
      {!isConnected && (
        <Alert className="bg-muted/50 rounded-lg border [&>svg]:size-3.5">
          <AlertCircle className="text-primary" />
          <AlertTitle className="text-xs">Setup Required</AlertTitle>
          <AlertDescription className="text-xs">
            Connect your Stripe account to start accepting payments and
            receiving payouts
          </AlertDescription>
        </Alert>
      )}

      {/* Capabilities Grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {/* Accept Payments Card */}
        <div
          className={`rounded-lg border p-4 transition-colors ${
            isConnected
              ? "border-success/30 bg-success/5"
              : "border-border bg-background"
          }`}
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`rounded-md p-2 ${
                  isConnected ? "bg-success/10" : "bg-primary/10"
                }`}
              >
                <CreditCard
                  className={`h-4 w-4 ${
                    isConnected ? "text-success" : "text-primary"
                  }`}
                />
              </div>
              <span className="text-foreground text-sm font-medium">
                Accept Payments
              </span>
            </div>
            {isConnected ? (
              <Check className="text-success h-3.5 w-3.5" />
            ) : (
              <CircleX className="text-muted-foreground h-3.5 w-3.5" />
            )}
          </div>
          <p className="text-muted-foreground text-xs">
            {isConnected
              ? "Ready to accept credit card payments"
              : "Enable to start accepting credit card payments"}
          </p>
        </div>

        {/* Receive Payouts Card */}
        <div
          className={`rounded-lg border p-4 transition-colors ${
            isConnected
              ? "border-success/30 bg-success/5"
              : "border-border bg-background"
          }`}
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className={`rounded-md p-2 ${
                  isConnected ? "bg-success/10" : "bg-primary/10"
                }`}
              >
                <DollarSign
                  className={`h-4 w-4 ${
                    isConnected ? "text-success" : "text-primary"
                  }`}
                />
              </div>
              <span className="text-foreground text-sm font-medium">
                Receive Payouts
              </span>
            </div>
            {isConnected ? (
              <Check className="text-success h-3.5 w-3.5" />
            ) : (
              <CircleX className="text-muted-foreground h-3.5 w-3.5" />
            )}
          </div>
          <p className="text-muted-foreground text-xs">
            {isConnected
              ? "Automatic payouts enabled to your bank"
              : "Enable to receive automatic payouts to your bank"}
          </p>
        </div>
      </div>

      <Separator />

      {/* Action Section */}
      {isConnected ? (
        <div className="space-y-3">
          <div className="bg-muted/50 flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <p className="text-foreground text-sm font-medium">
                View Orders & Payments
              </p>
              <p className="text-muted-foreground text-xs">
                Manage orders and track payment status
              </p>
            </div>

            <Button variant="outline" size="sm" className="text-xs" asChild>
              <Link to="/orders">
                View Orders <ArrowRight />
              </Link>
            </Button>
          </div>

          {/* Disconnect Option */}
          <div className="flex items-center justify-between rounded-lg border border-dashed p-4">
            <div>
              <p className="text-foreground text-sm font-medium">
                Disconnect Stripe
              </p>
              <p className="text-muted-foreground text-xs">
                Need to disconnect? Our team will help ensure all transactions
                are settled
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => {
                /* open support/contact */
              }}
            >
              Contact Support
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-muted/50 flex items-center justify-between rounded-lg border p-4">
          <div>
            <p className="text-foreground text-sm font-medium">
              Complete Setup
            </p>
            <p className="text-muted-foreground text-xs">
              Connect to Stripe to start processing payments
            </p>
          </div>
          <Button
            onClick={handleStripeConnect}
            disabled={isPending}
            size="sm"
            className="text-xs"
          >
            {isPending ? "Connecting..." : "Connect Stripe"}
          </Button>
        </div>
      )}
    </div>
  );
}
