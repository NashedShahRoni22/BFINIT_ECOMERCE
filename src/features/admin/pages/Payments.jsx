import useAuth from "@/hooks/auth/useAuth";
import useGetQuery from "@/hooks/api/useGetQuery";
import StripeRow from "../components/sections/payments/StripeRow";
import EmptyStoreState from "../components/EmptyStoreState";
import useSelectedStore from "@/hooks/useSelectedStore";
import { breadcrubms } from "@/utils/constants/breadcrumbs";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import { CreditCard } from "lucide-react";
import PageHeader from "../components/PageHeader";
import PaymentStatus from "../components/sections/payments/PaymentStatus";

export default function Payments() {
  const { user } = useAuth();
  const { selectedStore } = useSelectedStore();

  // fetch stripe info of all stores
  const { data } = useGetQuery({
    endpoint: `/payments/stripe/client`,
    token: user?.token,
    clientId: user?.data?.clientid,
    queryKey: ["stripeConnectionInfo", user?.token, user?.data?.clientid],
    enabled: !!user?.token && !!user?.data?.clientid,
  });

  const currentStore =
    data?.data?.length > 0 &&
    data?.data?.find((status) => status.storeId === selectedStore?.storeId);

  if (!selectedStore) {
    return (
      <EmptyStoreState
        title="No Store Selected"
        description="Create a store before setting up payment methods for your customers."
      />
    );
  }

  return (
    <section className="space-y-6">
      {/* Breadcrumb Navigation */}
      <DynamicBreadcrumb items={breadcrubms.Payment} />

      {/* Page Header */}
      <PageHeader
        icon={CreditCard}
        title="Payment Integration"
        description="Connect and configure payment gateways for"
      />

      <PaymentStatus currentStore={currentStore} />

      {/* <div className="grid gap-4 sm:grid-cols-2">
        <div className="border-border bg-card rounded-lg border p-4">
          <h4 className="text-card-foreground mb-2 text-sm font-semibold">
            Why Connect Stripe?
          </h4>
          <ul className="text-muted-foreground space-y-1.5 text-xs">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Accept credit and debit card payments securely</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Get paid directly to your bank account</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Manage refunds and disputes easily</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>
              <span>Access detailed payment analytics</span>
            </li>
          </ul>
        </div>
      </div> */}
    </section>
  );
}
