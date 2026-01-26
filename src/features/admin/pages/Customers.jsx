import useAuth from "@/hooks/auth/useAuth";
import useSelectedStore from "@/hooks/useSelectedStore";
import useGetQuery from "@/hooks/api/useGetQuery";
import EmptyStoreState from "../components/EmptyStoreState";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import { Search, Users } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { breadcrubms } from "@/utils/constants/breadcrumbs";
import CustomerTable from "../components/sections/customers/CustomerTable";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import EmptyState from "../components/EmptyState";
import CustomersToolsSkeleton from "../components/skeletons/CustomersToolsSkeleton";
import CustomersTableSkeleton from "../components/skeletons/CustomersTableSkeleton";

export default function Customers() {
  const { user } = useAuth();
  const { selectedStore } = useSelectedStore();

  // fetch customers of selected store
  const { data: customersData, isLoading } = useGetQuery({
    endpoint: `/store/customers/all/${selectedStore?.storeId}`,
    token: user?.token,
    clientId: user?.data?.clientid,
    queryKey: ["customers", selectedStore?.storeId],
    enabled: !!selectedStore?.storeId && !!user?.token,
  });

  const [search, setSearch] = useState("");
  const hasCustomers = customersData?.length > 0;

  let content = null;

  if (!selectedStore) {
    return (
      <EmptyStoreState
        title="No Store Selected"
        description="Select a store to view and manage your customer accounts and information."
      />
    );
  }

  if (isLoading) {
    content = (
      <>
        <CustomersToolsSkeleton />
        <CustomersTableSkeleton />
      </>
    );
  }

  if (!isLoading && hasCustomers) {
    content = (
      <>
        <div className="flex items-center justify-end gap-4 px-5">
          <div className="relative w-full max-w-72">
            <Search className="text-muted-foreground absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2" />
            <Input
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customers..."
              value={search}
              className="pl-7 placeholder:text-xs md:text-xs"
            />
          </div>
        </div>

        <CustomerTable customersData={customersData} />
      </>
    );
  }

  if (!isLoading && !hasCustomers) {
    content = (
      <EmptyState
        icon={Users}
        title="No customers yet"
        description="Customers will appear here once they create an account or make their first purchase"
      />
    );
  }

  return (
    <section className="space-y-6">
      {/* Breadcrumb Navigation */}
      <DynamicBreadcrumb items={breadcrubms.customers} />

      {/* Page Header */}
      <PageHeader
        icon={Users}
        title="Customers"
        description="View customer accounts registered to your store"
      />

      {/* content */}
      <div className="bg-card space-y-6 rounded-lg py-5">{content}</div>
    </section>
  );
}
