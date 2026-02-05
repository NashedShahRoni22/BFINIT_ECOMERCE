import { useState } from "react";
import { Link } from "react-router";
import {
  Eye,
  MoreVertical,
  Palette,
  Pencil,
  Store,
  Trash2,
} from "lucide-react";
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
      <div className="bg-card group relative rounded-lg border p-6">
        {/* More Options Menu - Top Right */}
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link
                  to={`/stores/edit/${storeId}`}
                  className="text-xs hover:cursor-pointer"
                >
                  <Pencil className="mr-2 h-3.5 w-3.5" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive text-xs hover:cursor-pointer"
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="mr-2 h-3.5 w-3.5" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Store Logo - Centered, Square with Rounded Corners */}
        <div className="mb-4 flex items-center justify-center">
          <div className="from-primary/10 to-primary/5 flex size-14 items-center justify-center rounded-md bg-linear-to-br p-2.5">
            <img
              src={`https://ecomback.bfinit.com${storeLogo}`}
              alt={storeName}
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* Store Name - Centered */}
        <Link
          to={`/stores/${storeId}`}
          className="block truncate text-center text-sm font-semibold hover:underline"
        >
          {storeName}
        </Link>

        {/* Action Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-2">
          <Button size="sm" variant="outline" className="text-xs" asChild>
            <Link target="_blank" to={`/stores/${storeId}`}>
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
