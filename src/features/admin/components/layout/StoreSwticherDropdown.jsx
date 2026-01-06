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

export default function StoreSwitcherDropdown() {
  const { data: stores, isLoading } = useGetStores();
  const { selectedStore, handleSetStore } = useSelectedStore();
  const { user } = useAuth();
  const navigate = useNavigate();

  const storeLimit = user?.data?.storeLimit || 0;
  const hasStores = stores?.data?.length > 0;

  const handleStoreCreate = () => {
    navigate("/stores/create");
  };

  if (!isLoading && !hasStores) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="group flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 transition-all duration-200"
        >
          {isLoading ? (
            <>
              <Store className="text-muted-foreground h-3.5 w-3.5" />
              <Loader2 className="text-muted-foreground h-3.5 w-3.5 animate-spin" />
            </>
          ) : (
            <>
              <Store className="text-foreground h-3.5 w-3.5 shrink-0 transition-colors" />
              <span className="hidden max-w-[120px] truncate text-xs font-medium sm:block">
                {selectedStore?.storeName || "Select store"}
              </span>
              <ChevronDown
                size={14}
                className="text-muted-foreground shrink-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              />
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
            {stores?.data?.length > 0 && (
              <span className="text-muted-foreground text-xs font-medium">
                {stores.data.length}/{storeLimit}
              </span>
            )}
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
