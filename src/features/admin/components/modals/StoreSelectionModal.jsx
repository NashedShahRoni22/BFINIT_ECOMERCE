import { useEffect } from "react";
import { Link } from "react-router";
import { Plus, Store } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useGetStores from "../../hooks/useGetStores";
import useSelectedStore from "@/hooks/useSelectedStore";
import usePackageInfo from "../../hooks/usePackageInfo";
import { BASE_URL } from "@/lib/api";

export default function StoreSelectionModal() {
  const { activeStore, selectStore } = useSelectedStore();

  const { data: packageInfo } = usePackageInfo();
  const { data, isLoading } = useGetStores();

  const stores = data?.data?.data ?? [];
  const hasStores = stores?.length > 0;
  const maxStoreLimit = packageInfo?.data?.package_upgrade?.package?.max_store;
  const isStoreLimitExceeded = stores?.length >= maxStoreLimit;

  const isOpen = !isLoading && stores.length > 1 && !activeStore;

  // auto select single store
  useEffect(() => {
    if (!isLoading && stores.length === 1 && !activeStore) {
      selectStore(stores[0]);
    }
  }, [isLoading, stores, activeStore]);

  let content = null;

  if (isLoading) {
    content = (
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="bg-muted h-5 w-32 animate-pulse rounded" />
          <div className="bg-muted mt-2 h-3 w-48 animate-pulse rounded" />
        </AlertDialogHeader>
        <div className="divide-y">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <div className="bg-muted size-8 animate-pulse rounded" />
              <div className="space-y-1">
                <div className="bg-muted h-3 w-24 animate-pulse rounded" />
                <div className="bg-muted h-2 w-32 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </AlertDialogContent>
    );
  }

  if (hasStores) {
    content = (
      <AlertDialogContent className="gap-4 sm:max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-sm font-semibold">
            Select a store
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs">
            Choose which store you'd like to manage
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* stores list */}
        <ul className="divide-y">
          {stores.map((store) => (
            <li key={store.id}>
              <button
                onClick={() => selectStore(store)}
                className="hover:bg-muted flex w-full items-center gap-3 px-4 py-3 transition-colors"
              >
                {/* logo */}
                <div className="bg-background">
                  <img
                    src={`${BASE_URL}${store.logo}`}
                    alt={store.name}
                    className="size-8 rounded border p-1"
                  />
                </div>
                <div className="text-left">
                  <p className="line-clamp-1 text-sm font-medium">
                    {store.name}
                  </p>
                  <p className="text-muted-foreground line-clamp-1 text-xs">
                    {store.public_subdomain}.bfinit.com
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>

        {!isStoreLimitExceeded && (
          <AlertDialogFooter className="border-t">
            <Button
              asChild
              variant="ghost"
              className="w-full gap-2 rounded-none"
            >
              <Link to="/stores/create">
                <Plus className="size-4" />
                Create new store
              </Link>
            </Button>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    );
  }

  if (!hasStores) {
    content = (
      <AlertDialogContent className="gap-4 sm:max-w-sm">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2 text-sm font-semibold">
            <Store className="text-muted-foreground size-4" />
            Create your first store
          </AlertDialogTitle>
          <AlertDialogDescription className="text-xs">
            Set up your store to start managing products, orders and customers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <Button className="w-full" asChild>
            <Link to="/stores/create">Get started</Link>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    );
  }

  return <AlertDialog open={isOpen}>{content}</AlertDialog>;
}
