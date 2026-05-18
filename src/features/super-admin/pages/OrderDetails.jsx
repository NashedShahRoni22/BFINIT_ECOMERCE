import { ClipboardList } from "lucide-react";
import { useParams } from "react-router";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { breadcrubms } from "../utils/constants/breadcrumbs";
import OrderDetailHeader from "../components/sections/order-details/OrderDetailHeader";
import OrderDetailGrid from "../components/sections/order-details/OrderDetailGrid";
import OrderDetailsSkeleton from "@/components/skeletons/OrderDetailsSkeleton";

export default function OrderDetails() {
  const { invoiceId } = useParams();

  const { data, isLoading } = useGetQuery({
    endpoint: `/api/v1/package-order/order-info/${invoiceId}`,
    enabled: true,
    isTokenRequired: true,
    queryKey: ["order-details", invoiceId],
  });

  let content = null;

  if (isLoading) {
    content = <OrderDetailsSkeleton />;
  }

  if (data?.success) {
    content = (
      <div className="bg-card space-y-4 rounded-lg p-5">
        <OrderDetailHeader orderDetails={data?.data} />
        <OrderDetailGrid orderDetails={data?.data} />
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.orders} />

      <PageHeader
        icon={ClipboardList}
        title="Order Details"
        description="View and manage customer orders on the e-Bfinit"
      />

      {content}
    </section>
  );
}
