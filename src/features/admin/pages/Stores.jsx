import { Link } from "react-router";
import { Plus, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import EmptyState from "@/components/shared/EmptyState";
import PageHeader from "../components/PageHeader";
import StoreCard from "../components/sections/stores/StoreCard";
import { breadcrubms } from "@/utils/constants/breadcrumbs";
import useGetStores from "../hooks/useGetStores";

export default function Stores() {
  const { data } = useGetStores();

  const stores = data?.data?.data ?? [];

  if (!stores?.length > 0) {
    return (
      <EmptyState
        icon={Store}
        title="No Store Found"
        description="Get started by creating your first online store. You can manage multiple stores from this dashboard."
        actionText="Create Your First Store"
        actionPath="/stores/create"
      />
    );
  }

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.Stores} />

      <div className="flex items-end justify-between">
        <div>
          <PageHeader
            icon={Store}
            title="Stores"
            description="Manage Update Delete stores from here"
            showStoreName={false}
          />
        </div>

        <div className="flex items-center gap-4 pb-2">
          {/* <span className="text-muted-foreground text-sm">
            <span className="font-semibold">{stores?.data?.length || 0}</span>/
            {user?.data?.storeLimit || 0} stores
          </span> */}

          {/* {user?.data?.storeLimit > stores?.data?.length && (
            <Button size="sm" asChild className="text-xs">
              <Link to="/stores/create">
                <Plus />
                New Store
              </Link>
            </Button>
          )} */}
        </div>
      </div>

      <div className="grid gap-6">
        {stores?.map((store) => (
          <StoreCard key={store?.storeId} store={store} />
        ))}
      </div>
    </section>
  );
}
