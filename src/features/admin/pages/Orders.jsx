import { ShoppingCart } from "lucide-react";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import PageHeader from "../components/PageHeader";
import OrderRow from "../components/sections/orders/OrderRow";
import useAuth from "@/hooks/auth/useAuth";
import useGetQuery from "@/hooks/api/useGetQuery";
import useSelectedStore from "@/hooks/useSelectedStore";
import useGetStorePreference from "../hooks/store/useGetStorePreference";
import EmptyStoreState from "../components/EmptyStoreState";

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
  const { data: orders } = useGetQuery({
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

      {/* Responsive Table */}
      {orders && orders?.OrdersData?.length > 0 && (
        <table className="mt-6 w-full">
          <thead>
            <tr className="border-y border-neutral-200 text-left">
              <th className="py-2 text-sm font-medium">Order ID</th>
              <th className="py-2 text-center text-sm font-medium">
                Total Amount
              </th>
              <th className="py-2 text-center text-sm font-medium">
                Payment Method
              </th>
              <th className="py-2 text-center text-sm font-medium">
                Payment Status
              </th>
              <th className="py-2 text-center text-sm font-medium">
                Order Status
              </th>
              <th className="py-2 text-center text-sm font-medium">
                Delivery Status
              </th>
              <th className="py-2 text-center text-sm font-medium">Details</th>
            </tr>
          </thead>
          <tbody>
            {orders?.OrdersData?.map((order) => (
              <OrderRow
                key={order?.orderId}
                order={order}
                currencySymbol={storePreference?.currencySymbol}
                storeId={selectedStore?.storeId}
              />
            ))}
          </tbody>
        </table>
      )}

      {/* no order message */}
      {orders && orders?.message === "No orders available for this store" && (
        <p className="mt-12 text-center text-lg">
          You haven&apos;t received any orders yet. When you do, they&apos;ll
          appear here.
        </p>
      )}
    </section>
  );
}
