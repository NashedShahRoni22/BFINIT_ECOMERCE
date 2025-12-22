import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Store, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useSelectedStore from "@/hooks/useSelectedStore";
import useAuth from "@/hooks/auth/useAuth";
import useGetStores from "../../hooks/store/useGetStores";

export default function StoreSelectionModal() {
  const { data: stores, isLoading } = useGetStores();
  const { selectedStore, handleSetStore } = useSelectedStore();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // Reset modal and cleanup when user logs out or component unmounts
  useEffect(() => {
    if (!user) {
      setIsOpen(false);
    }

    // Cleanup function to remove any lingering portals/backdrops
    return () => {
      setIsOpen(false);
      // Force cleanup of any Radix UI portals
      const overlays = document.querySelectorAll("[data-radix-dialog-overlay]");
      overlays.forEach((overlay) => overlay.remove());

      const portals = document.querySelectorAll("[data-radix-portal]");
      portals.forEach((portal) => portal.remove());

      // Re-enable body scroll
      document.body.style.pointerEvents = "";
      document.body.style.overflow = "";
    };
  }, [user]);

  // Auto-select logic and modal control
  useEffect(() => {
    // Don't run if no user (logged out)
    if (!user || isLoading || !stores?.data) {
      setIsOpen(false);
      return;
    }

    const storeList = stores.data;

    // If user has exactly one store, auto-select it
    if (storeList.length === 1 && !selectedStore) {
      handleSetStore(storeList[0]);
      setIsOpen(false);
      return;
    }

    // If user has multiple stores and none selected, show modal
    if (storeList.length > 1 && !selectedStore) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [stores, isLoading, selectedStore, handleSetStore, user]);

  const handleSelectStore = (store) => {
    handleSetStore(store);
    setIsOpen(false);
  };

  // Prevent closing the modal unless a store is selected
  const handleOpenChange = (open) => {
    // Only allow closing if user has selected a store or is logged out
    if (!open && (selectedStore || !user)) {
      setIsOpen(false);
    }
  };

  const handleCreateStore = () => {
    setIsOpen(false);
    navigate("/stores/create");
  };

  // Don't render anything if user is not logged in
  if (!user) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[400px] gap-0 p-0 sm:w-full [&>button]:hidden">
        {/* Header */}
        <DialogHeader className="border-b px-4 py-3 sm:px-4">
          <DialogTitle className="text-foreground text-sm font-semibold sm:text-sm">
            Select a store
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-[11px] leading-relaxed sm:text-[11px]">
            Choose which store you&apos;d like to manage
          </DialogDescription>
        </DialogHeader>

        {/* Store List */}
        <div className="px-1.5 py-1.5">
          {stores?.data && stores.data.length > 0 ? (
            <div className="max-h-[50vh] space-y-0.5 overflow-y-auto px-1.5 sm:max-h-[360px]">
              {stores.data.map((store) => (
                <button
                  key={store.storeId}
                  onClick={() => handleSelectStore(store)}
                  className="hover:bg-accent focus-visible:bg-accent active:bg-accent group flex w-full touch-manipulation items-center gap-2.5 rounded-md px-2.5 py-2.5 text-left transition-colors hover:cursor-pointer focus-visible:outline-none sm:gap-2.5 sm:px-2.5 sm:py-2"
                >
                  {/* Store Logo */}
                  <div className="bg-muted flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded border sm:h-8 sm:w-8">
                    {store.storeLogo ? (
                      <img
                        src={`https://ecomback.bfinit.com${store.storeLogo}`}
                        alt={store.storeName}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Store className="text-muted-foreground h-4 w-4 sm:h-3.5 sm:w-3.5" />
                    )}
                  </div>

                  {/* Store Info */}
                  <div className="min-w-0 flex-1">
                    <p className="text-foreground truncate text-sm font-medium sm:text-xs">
                      {store.storeName}
                    </p>
                    {store.storeDomain && (
                      <p className="text-muted-foreground mt-0.5 truncate text-xs sm:text-[11px]">
                        {store.storeDomain}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="px-4 py-10 text-center sm:py-8">
              <div className="bg-muted/50 mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border sm:h-10 sm:w-10">
                <Store className="text-muted-foreground h-5 w-5 sm:h-4 sm:w-4" />
              </div>
              <p className="text-foreground text-sm font-medium sm:text-xs">
                No stores yet
              </p>
              <p className="text-muted-foreground mt-1 text-xs leading-relaxed sm:text-[11px]">
                Create your first store to get started
              </p>
            </div>
          )}
        </div>

        {/* Footer - Create New Store */}
        <div className="border-t px-3 py-3 sm:py-2.5">
          <button
            onClick={handleCreateStore}
            className="text-foreground hover:bg-accent focus-visible:bg-accent active:bg-accent flex w-full items-center justify-center gap-1.5 rounded-md px-2.5 py-2 text-sm font-medium transition-colors hover:cursor-pointer focus-visible:outline-none sm:text-xs"
          >
            <Plus className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
            Create new store
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
