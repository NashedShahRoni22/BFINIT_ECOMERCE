import React from "react";
import useAuth from "@/hooks/auth/useAuth";
import useSelectedStore from "@/hooks/useSelectedStore";
import useGetQuery from "@/hooks/api/useGetQuery";
import EmptyStoreState from "../components/EmptyStoreState";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import { User } from "lucide-react";
import PageHeader from "../components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CUSTOMERS_BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Customers" },
];

export default function Customers() {
  const { user } = useAuth();
  const { selectedStore } = useSelectedStore();

  // fetch customers of selected store
  const { data: customers, isLoading } = useGetQuery({
    endpoint: `/store/customers/all/${selectedStore?.storeId}`,
    token: user?.token,
    clientId: user?.data?.clientid,
    queryKey: ["customers", selectedStore?.storeId],
    enabled: !!selectedStore?.storeId && !!user?.token,
  });

  if (!selectedStore) {
    return (
      <EmptyStoreState
        title="No customers Yet"
        description="Create your store to start receiving and managing customer orders."
      />
    );
  }

  const hasCustomers = customers && customers?.length > 0;
  const noCustomersAvailable =
    customers?.message === "No customers available for this store";
  return (
    <section className="space-y-6">
      {/* Breadcrumb Navigation */}
      <DynamicBreadcrumb items={CUSTOMERS_BREADCRUMB_ITEMS} />

      {/* Page Header */}
      <PageHeader
        icon={User}
        title="Customers"
        description="View and manage customer orders"
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

      {/* Customers Table */}
      {!isLoading && hasCustomers && (
        <Card className="overflow-x-auto p-0">
          <table className="w-full">
            <thead>
              <tr className="border-border bg-muted/50 border-b">
                <th className="text-muted-foreground px-4 py-3 text-left text-xs font-medium">
                  Date
                </th>
                <th className="text-muted-foreground px-4 py-3 text-left text-xs font-medium">
                  Name
                </th>
                <th className="text-muted-foreground px-4 py-3 text-left text-xs font-medium">
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {customers?.map((customer, index) => (
                <tr
                  key={index}
                  className="border-border hover:bg-muted/40 border-b last:border-b-0"
                >
                  <td className="px-4 py-4 text-xs text-muted-foreground">{customer.createdAt}</td>
                  <td className="px-4 py-4 text-xs text-muted-foreground">{customer.name}</td>
                  <td className="px-4 py-4 text-xs text-muted-foreground">{customer.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {/* No Customers Message */}
      {!isLoading && noCustomersAvailable && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center px-4 py-16">
            <div className="bg-muted mb-4 rounded-full p-4">
              <User className="text-muted-foreground h-8 w-8" />
            </div>
            <h3 className="text-foreground mb-2 text-lg font-medium">
              No customers yet
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
