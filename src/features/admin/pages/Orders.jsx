import { ShoppingCart } from "lucide-react";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import PageHeader from "../components/PageHeader";
import OrderRow from "../components/sections/orders/OrderRow";
import useAuth from "@/hooks/auth/useAuth";
import useGetQuery from "@/hooks/api/useGetQuery";
import useSelectedStore from "@/hooks/useSelectedStore";
import useGetStorePreference from "../hooks/store/useGetStorePreference";
import EmptyStoreState from "../components/EmptyStoreState";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ORDERS_BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Orders" },
];

export default function Orders() {
  const { user } = useAuth();
  const { selectedStore } = useSelectedStore();

  // fetch store preference
  const { data: storePreference } = useGetStorePreference(
    selectedStore?.storeId,
  );

  // fetch orders of selected store
  const { data: orders, isLoading } = useGetQuery({
    endpoint: `/orders/all/${selectedStore?.storeId}`,
    token: user?.token,
    clientId: user?.data?.clientid,
    queryKey: ["orders", selectedStore?.storeId],
    enabled: !!selectedStore?.storeId && !!user?.token,
  });

  if (!selectedStore) {
    return (
      <EmptyStoreState
        title="No Orders Yet"
        description="Create your store to start receiving and managing customer orders."
      />
    );
  }

  const hasOrders = orders?.OrdersData && orders.OrdersData.length > 0;
  const noOrdersAvailable =
    orders?.message === "No orders available for this store";

  return (
    <section className="space-y-6">
      {/* Breadcrumb Navigation */}
      <DynamicBreadcrumb items={ORDERS_BREADCRUMB_ITEMS} />

      {/* Page Header */}
      <PageHeader
        icon={ShoppingCart}
        title="Orders"
        description="View and manage customer orders for"
      />

      {/* Loading State */}
      {isLoading && (
        <Card>
          <CardContent className="space-y-4 p-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </CardContent>
        </Card>
      )}

      {/* Orders Table */}
      {!isLoading && hasOrders && (
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-border bg-muted/50 border-b">
                    <th className="text-muted-foreground px-4 py-3 text-left text-xs font-medium">
                      Order ID
                    </th>
                    <th className="text-muted-foreground px-4 py-3 text-left text-xs font-medium">
                      Date & Time
                    </th>
                    <th className="text-muted-foreground px-4 py-3 text-center text-xs font-medium">
                      Order Status
                    </th>
                    <th className="text-muted-foreground px-4 py-3 text-center text-xs font-medium">
                      Delivery Status
                    </th>
                    <th className="text-muted-foreground px-4 py-3 text-center text-xs font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-border divide-y">
                  {orders.OrdersData.map((order) => (
                    <OrderRow
                      key={order.orderId}
                      order={order}
                      currencySymbol={storePreference?.currencySymbol}
                      storeId={selectedStore?.storeId}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* No Orders Message */}
      {!isLoading && noOrdersAvailable && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center px-4 py-16">
            <div className="bg-muted mb-4 rounded-full p-4">
              <ShoppingCart className="text-muted-foreground h-8 w-8" />
            </div>
            <h3 className="text-foreground mb-2 text-lg font-medium">
              No orders yet
            </h3>
            <p className="text-muted-foreground max-w-md text-center text-sm">
              You haven't received any orders yet. When you do, they'll appear
              here.
            </p>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
