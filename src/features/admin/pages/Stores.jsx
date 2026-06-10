import { Plus, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import EmptyState from "@/components/shared/EmptyState";
import PageHeader from "../components/PageHeader";
import StoreCard from "../components/sections/stores/StoreCard";
import { breadcrubms } from "@/utils/constants/breadcrumbs";
import useGetStores from "../hooks/useGetStores";
import usePackageInfo from "../hooks/usePackageInfo";
import { Link } from "react-router";
import StoreCardSkeleton from "../components/skeletons/StoreCardSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function Stores() {
  const { data: packageInfo, isLoading: isPackageInfoLoading } =
    usePackageInfo();
  const { data, isLoading } = useGetStores();

  const stores = data?.data?.data ?? [];
  const maxStoreLimit = packageInfo?.data?.package_upgrade?.package?.max_store;
  const isStoreLimitExceeded = stores?.length >= maxStoreLimit;

  let content = null;

  if (isLoading) {
    content = (
      <>
        {Array.from({ length: 3 }).map((_, i) => (
          <StoreCardSkeleton key={i} />
        ))}
      </>
    );
  }

  if (!isLoading && stores?.length >= 1) {
    content = (
      <>
        {stores?.map((store) => (
          <StoreCard key={store?.id} store={store} />
        ))}
      </>
    );
  }

  if (!isLoading && stores?.length === 0) {
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

        {isLoading || isPackageInfoLoading ? (
          <Skeleton className="h-7 w-40" />
        ) : (
          <div className="flex items-center gap-3">
            <div className="flex flex-col gap-1">
              <span className="text-muted-foreground text-xs">
                {stores?.length} / {maxStoreLimit} stores used
              </span>
              <div className="bg-muted h-1.5 w-24 rounded-full">
                <div
                  className="bg-foreground h-1.5 rounded-full transition-all"
                  style={{
                    width: `${(stores?.length / maxStoreLimit) * 100}%`,
                  }}
                />
              </div>
            </div>

            {!isStoreLimitExceeded && (
              <Button size="sm" asChild className="text-xs">
                <Link to="/stores/create">
                  <Plus />
                  New Store
                </Link>
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-4">{content}</div>
    </section>
  );
}
