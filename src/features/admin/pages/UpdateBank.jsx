import { useParams } from "react-router";
import { PenSquare } from "lucide-react";
import EmptyStoreState from "../components/EmptyStoreState";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import BankPayment from "./BankPayment";
import PageHeader from "../components/PageHeader";
import useSelectedStore from "@/hooks/useSelectedStore";
import useGetQuery from "@/hooks-v2/api/useGetQuery";
import { breadcrubms } from "../utils/constants/breadcrumbs";

export default function UpdateBank() {
  const { id } = useParams();
  const { activeStore } = useSelectedStore();
  const { data } = useGetQuery({
    endpoint: `/api/v1/bankPayment/get/${activeStore?.id}/${id}`,
    queryKey: ["bank", id],
    isTokenRequired: true,
    enabled: !!id,
  });

  if (!activeStore) {
    return (
      <EmptyStoreState
        title="No Store Selected"
        description="Create a store before adding a bank account."
      />
    );
  }

  return (
    <section className="space-y-6">
      {/* Breadcrumb Navigation */}
      <DynamicBreadcrumb items={breadcrubms.bankPayment} />

      {/* Page Header */}
      <PageHeader
        icon={PenSquare}
        title="Add Bank"
        description="Add bank account for"
      />

      {/* Blog form */}
      <BankPayment data={data?.data} />
    </section>
  );
}
