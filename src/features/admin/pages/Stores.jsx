import { Link } from "react-router";
import { Plus, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import PageHeader from "../components/PageHeader";
import StoreCard from "../components/sections/stores/StoreCard";
import useAuth from "@/hooks/auth/useAuth";
import useGetStores from "../hooks/store/useGetStores";
import { breadcrubms } from "@/utils/constants/breadcrumbs";
import useSelectedStore from "@/hooks/useSelectedStore";
import EmptyStoreState from "../components/EmptyStoreState";

export default function Stores() {
  const { user } = useAuth();
  const { selectedStore } = useSelectedStore();
  const { data: stores } = useGetStores();

  if (!selectedStore) {
    return (
      <EmptyStoreState
        title="No Stores Created Yet"
        description="Get started by creating your first online store. You can manage multiple stores from this dashboard."
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
          <span className="text-muted-foreground text-sm">
            <span className="font-semibold">{stores?.data?.length || 0}</span>/
            {user?.data?.storeLimit || 0} stores
          </span>

          {user?.data?.storeLimit > stores?.data?.length && (
            <Button size="sm" asChild className="text-xs">
              <Link to="/stores/create">
                <Plus />
                New Store
              </Link>
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {stores?.data?.map((store) => (
          <StoreCard key={store?.storeId} store={store} />
        ))}
      </div>
    </section>
  );
}
