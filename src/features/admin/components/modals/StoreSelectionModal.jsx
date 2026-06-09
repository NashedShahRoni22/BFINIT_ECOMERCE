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
import { baseUrl } from "@/lib/api";

export default function StoreSelectionModal() {
  const { data, isLoading } = useGetStores();
  const { activeStore, selectStore } = useSelectedStore();

  const stores = data?.data?.data ?? [];
  const hasStores = stores?.length > 0;

  const isOpen = hasStores && !activeStore;

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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Select a store</AlertDialogTitle>
          <AlertDialogDescription>
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
                    src={`${baseUrl}${store.logo}`}
                    alt={store.name}
                    className="size-8 rounded border p-1"
                  />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">{store.name}</p>
                  <p className="text-muted-foreground text-xs">
                    {store.public_subdomain}.bfinit.com
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>

        <AlertDialogFooter className="border-t">
          <Button asChild variant="ghost" className="w-full gap-2 rounded-none">
            <Link to="/stores/create">
              <Plus className="size-4" />
              Create new store
            </Link>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    );
  }

  if (!hasStores) {
    content = (
      <AlertDialogContent className="gap-6 sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Store className="text-muted-foreground size-4" /> Create your first
            store
          </AlertDialogTitle>
          <AlertDialogDescription>
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
