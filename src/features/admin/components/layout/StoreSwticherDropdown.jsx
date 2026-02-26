import { Link, useNavigate } from "react-router";
import {
  Loader2,
  Store,
  ChevronDown,
  Plus,
  Check,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import useAuth from "@/hooks/auth/useAuth";
import useSelectedStore from "@/hooks/useSelectedStore";
import useGetStores from "@/features/admin/hooks/store/useGetStores";
import { useEffect } from "react";

export default function StoreSwitcherDropdown() {
  const { data: stores, isLoading } = useGetStores();
  const { selectedStore, handleSetStore } = useSelectedStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  const storeLimit = user?.data?.storeLimit || 0;
  const hasStores = stores?.data?.length > 0;

  useEffect(() => {
    if (!stores?.data || !selectedStore) return;

    const freshStore = stores.data.find(
      (s) => s.storeId === selectedStore.storeId,
    );

    if (!freshStore) return;

    // Check if any field differs and sync if so
    const hasChanged = Object.keys(freshStore).some(
      (key) => freshStore[key] !== selectedStore[key],
    );

    if (hasChanged) {
      handleSetStore(freshStore);
    }
  }, [stores?.data]);

  const handleStoreCreate = () => {
    navigate("/stores/create");
  };

  if (!isLoading && !hasStores) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="group hover:bg-accent flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 shadow-none transition-all"
        >
          {isLoading ? (
            <>
              <Store className="text-muted-foreground h-4 w-4" />
              <Loader2 className="text-muted-foreground h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              <div className="bg-muted flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded border">
                {selectedStore?.storeLogo ? (
                  <img
                    src={`https://ecomback.bfinit.com${selectedStore.storeLogo}`}
                    alt=""
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <Store className="text-muted-foreground h-3.5 w-3.5" />
                )}
              </div>

              <span className="max-w-[120px] truncate text-sm font-medium">
                {selectedStore?.storeName || "Select store"}
              </span>

              <ChevronDown className="text-muted-foreground h-4 w-4 shrink-0 transition-transform group-data-[state=open]:rotate-180" />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64">
        {/* Header */}
        <DropdownMenuLabel className="px-3 py-2">
          <div className="flex items-center justify-between">
            <h3 className="text-muted-foreground text-xs font-semibold tracking-wide uppercase">
              Your Stores
            </h3>
            <span className="text-muted-foreground text-xs font-medium">
              {stores?.data?.length || 0} of {storeLimit}
            </span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Store List */}
        {stores && stores?.data?.length > 0 ? (
          <>
            <div className="max-h-80 overflow-y-auto px-1">
              {stores?.data?.map((store) => (
                <DropdownMenuItem
                  key={store?.storeId}
                  onClick={() => handleSetStore(store)}
                  className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-2 transition-colors"
                >
                  {/* Store Logo */}
                  <div className="border-border bg-muted flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md border p-0.5">
                    <img
                      src={`https://ecomback.bfinit.com${store?.storeLogo}`}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </div>

                  {/* Store Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate text-xs font-semibold">
                        {store?.storeName}
                      </span>
                      {selectedStore?.storeId === store?.storeId && (
                        <Check className="text-primary h-3.5 w-3.5 shrink-0" />
                      )}
                    </div>
                    {store?.storeDomain && (
                      <span className="text-muted-foreground mt-0.5 block truncate text-[11px] leading-tight">
                        {store.storeDomain}
                      </span>
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </div>

            <DropdownMenuSeparator />

            {/* Quick Actions */}
            <div className="px-1 py-1">
              <DropdownMenuItem asChild>
                <Link
                  to="/stores"
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2"
                >
                  <Settings className="text-muted-foreground h-4 w-4" />
                  <span className="text-xs font-medium">Manage Stores</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  to="/stores/create"
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2"
                >
                  <Plus className="text-muted-foreground h-4 w-4" />
                  <span className="text-xs font-medium">Create New Store</span>
                </Link>
              </DropdownMenuItem>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="px-4 py-8 text-center">
            <div className="bg-muted mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full">
              <Store className="text-muted-foreground h-6 w-6" />
            </div>
            <p className="text-sm font-semibold">No stores yet</p>
            <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
              Create your first store to start selling online
            </p>

            <DropdownMenuSeparator className="my-4" />

            <DropdownMenuItem asChild>
              <button
                onClick={handleStoreCreate}
                className="bg-primary/10 text-primary hover:bg-primary/20 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md px-3 py-2 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span className="text-xs font-semibold">
                  Create Your First Store
                </span>
              </button>
            </DropdownMenuItem>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
