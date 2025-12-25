import { useState } from "react";
import { Link } from "react-router";
import { Eye, MoreVertical, Palette, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import StoreDeleteModal from "../../modals/StoreDeleteModal";

export default function StoreCard({ store = {} }) {
  const { storeId, storeName, storeLogo } = store;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  return (
    <>
      <div className="bg-card group relative rounded-lg border p-4">
        {/* More Options Menu - Top Right */}
        <div className="absolute top-4 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link
                  to={`/stores/edit/${storeId}`}
                  className="text-xs hover:cursor-pointer"
                >
                  <Pencil className="size-3.5" />
                  Edit Store
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive text-xs hover:cursor-pointer"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="size-3.5" />
                Delete Store
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Store Logo and Name */}
        <div className="flex gap-4">
          <div className="h-auto w-16 shrink-0 overflow-hidden rounded-md border p-2">
            <img
              src={`https://ecomback.bfinit.com${storeLogo}`}
              alt={storeName}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="mt-1 min-w-0 flex-1">
            <Link
              to={`/stores/preview/${storeId}`}
              className="text-foreground block truncate text-sm font-semibold hover:underline"
            >
              {storeName}
            </Link>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-2">
          <Button size="sm" variant="outline" className="text-xs" asChild>
            <Link to={`/stores/preview/${storeId}`}>
              <Eye className="h-3.5 w-3.5" />
              Preview
            </Link>
          </Button>

          <Button size="sm" className="text-xs" asChild>
            <Link to={`/stores/${storeId}/theme-editor`}>
              <Palette className="h-3.5 w-3.5" />
              Customize
            </Link>
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <StoreDeleteModal
        store={store}
        showDeleteDialog={showDeleteDialog}
        setShowDeleteDialog={setShowDeleteDialog}
      />
    </>
  );
}
