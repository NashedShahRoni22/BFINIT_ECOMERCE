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
import useGetStores from "@/hooks/stores/useGetStores";
import useSelectedStore from "@/hooks/stores/useSelectedStore";
import {
  Loader2,
  Store,
  ChevronDown,
  Plus,
  Check,
  Settings,
} from "lucide-react";
import { Link } from "react-router";

export default function TopNavStoreSelect() {
  const { data: stores, isLoading } = useGetStores();
  const { selectedStore, handleSetStore } = useSelectedStore();
  const { user } = useAuth();

  const storeLimit = user?.data?.storeLimit || 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="group flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-slate-100"
        >
          {isLoading ? (
            <>
              <Store className="h-3.5 w-3.5 text-neutral-400" />
              <Loader2 className="h-3.5 w-3.5 animate-spin text-neutral-400" />
            </>
          ) : (
            <>
              <Store className="h-3.5 w-3.5 text-neutral-600 transition-colors group-hover:text-neutral-900" />
              <span className="hidden text-xs font-medium text-neutral-900 sm:block">
                {selectedStore?.storeName || "Select store"}
              </span>
              <ChevronDown
                size={14}
                className="text-muted-foreground opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              />
            </>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-64" sideOffset={8}>
        {/* Header */}
        <DropdownMenuLabel className="px-3 py-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold tracking-wide text-neutral-700 uppercase">
              Your Stores
            </h3>
            {stores?.data?.length > 0 && (
              <span className="text-xs font-medium text-neutral-500">
                {stores.data.length}/{storeLimit}
              </span>
            )}
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Store List */}
        {stores && stores?.data?.length > 0 ? (
          <>
            <div className="max-h-[320px] overflow-y-auto px-1">
              {stores?.data?.map((store) => (
                <DropdownMenuItem
                  key={store?.storeId}
                  onClick={() => handleSetStore(store)}
                  className="flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-2 transition-colors hover:bg-neutral-50"
                >
                  {/* Store Icon */}
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-neutral-100">
                    <Store className="h-4 w-4 text-neutral-600" />
                  </div>

                  {/* Store Info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="truncate text-xs font-semibold text-neutral-900">
                        {store?.storeName}
                      </span>
                      {selectedStore?.storeId === store?.storeId && (
                        <Check className="h-3.5 w-3.5 flex-shrink-0 text-blue-600" />
                      )}
                    </div>
                    {store?.storeDomain && (
                      <span className="mt-0.5 block truncate text-[11px] leading-tight text-neutral-500">
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
                  <Settings className="h-4 w-4 text-neutral-600" />
                  <span className="text-xs font-medium">Manage Stores</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  to="/stores/create"
                  className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-2"
                >
                  <Plus className="h-4 w-4 text-neutral-600" />
                  <span className="text-xs font-medium">Create New Store</span>
                </Link>
              </DropdownMenuItem>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="px-4 py-8 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100">
              <Store className="h-6 w-6 text-neutral-400" />
            </div>
            <p className="text-sm font-semibold text-neutral-900">
              No stores yet
            </p>
            <p className="mt-1 text-xs leading-relaxed text-neutral-500">
              Create your first store to start selling online
            </p>

            <DropdownMenuSeparator className="my-4" />

            <DropdownMenuItem asChild>
              <Link
                to="/stores/create"
                className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-50 px-3 py-2 transition-colors hover:bg-blue-100"
              >
                <Plus className="h-4 w-4 text-blue-600" />
                <span className="text-xs font-semibold text-blue-600">
                  Create Your First Store
                </span>
              </Link>
            </DropdownMenuItem>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
