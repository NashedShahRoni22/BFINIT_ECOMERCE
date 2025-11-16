import { Link } from "react-router";
import OrderRow from "../../../components/admin/OrderRow/OrderRow";
import useAuth from "../../../hooks/auth/useAuth";
import useGetQuery from "../../../hooks/queries/useGetQuery";
import useGetStorePreference from "../../../hooks/stores/useGetStorePreference";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ShoppingCart, SlashIcon } from "lucide-react";
import PageHeader from "@/components/admin/shared/PageHeader";
import useSelectedStore from "@/hooks/stores/useSelectedStore";

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

  return (
    <section className="space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Orders</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

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
