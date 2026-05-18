import { ClipboardList } from "lucide-react";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import OrdersTable from "../components/sections/orders/OrdersTable";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { breadcrubms } from "../utils/constants/breadcrumbs";
import OrdersTableSkeleton from "@/components/skeletons/OrdersTableSkeleton";

export default function Orders() {
  const { data, isLoading } = useGetQuery({
    endpoint: "/api/v1/package-order/all-orders-for-admin",
    enabled: true,
    isTokenRequired: true,
    queryKey: ["orders"],
  });

  let content = null;

  if (isLoading) {
    content = <OrdersTableSkeleton />;
  }

  if (data?.success) {
    content = (
      <div className="bg-card">
        <OrdersTable orders={data?.data} />
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.orders} />

      <PageHeader
        icon={ClipboardList}
        title="Orders"
        description="View and manage customer orders on the e-Bfinit"
      />

      {content}
    </section>
  );
}
