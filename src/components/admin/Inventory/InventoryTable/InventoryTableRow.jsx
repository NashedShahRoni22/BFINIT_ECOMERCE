import { useState } from "react";
import { Link } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  AlertTriangle,
  EllipsisVertical,
  Eye,
  Loader,
  Minus,
  Pencil,
  Trash2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import useGetStorePreference from "@/hooks/stores/useGetStorePreference";
import useDeleteMutation from "@/hooks/mutations/useDeleteMutation";
import useSelectedStore from "@/hooks/stores/useSelectedStore";
import { formatPrice } from "@/utils/admin/formatPrice";

export default function InventoryTableRow({ product }) {
  const queryClient = useQueryClient();
  const { data: storePreference } = useGetStorePreference();
  const { selectedStore } = useSelectedStore();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {
    productName,
    productCategory,
    productSubCategory,
    thumbnailImage,
    productQuantity,
    productPrice,
    productDiscount,
    variants,
    productId,
  } = product || {};

  const { mutate, isPending } = useDeleteMutation({
    endpoint: `/product/delete/${productId}`,
    token: true,
    clientId: true,
  });

  const currencyCode = storePreference?.currencyCode || "USD";
  const totalVariants =
    variants &&
    variants?.attributes?.reduce((acc, attribute) => {
      return acc + attribute?.value?.length;
    }, 0);

  // Handle product delete
  const handleProductDelete = () => {
    const queryKey = ["/product/store", selectedStore?.storeId];

    mutate(null, {
      onSuccess: () => {
        toast.success(`${productName} deleted`);

        // remove item from cache
        queryClient.setQueryData(queryKey, (oldData) => {
          if (!oldData?.data) return oldData;
          return {
            ...oldData,
            data: oldData.data.filter(
              (product) => product.productId !== productId,
            ),
          };
        });

        queryClient.invalidateQueries({ queryKey });
      },

      onError: () => {
        toast.error("Couldn't delete product. Please try again.");
      },

      onSettled: () => {
        setIsDeleteDialogOpen(false);
      },
    });
  };

  return (
    <>
      <TableRow>
        <TableCell className="w-10 border border-l-0">
          <Checkbox />
        </TableCell>

        {/* product */}
        <TableCell className="border">
          <div className="flex items-start gap-3">
            <div className="aspect-square size-10 overflow-hidden rounded-md border">
              <img
                src={`https://ecomback.bfinit.com${thumbnailImage}`}
                alt={productName}
                className="size-full object-cover"
              />
            </div>
            <div className="mt-1 text-xs">
              <p title={productName} className="max-w-xs truncate font-medium">
                {productName}
              </p>
            </div>
          </div>
        </TableCell>

        {/* Category */}
        <TableCell className="border">
          <div className="space-y-0.5 text-xs">
            <p className="font-medium">{productCategory}</p>
            {productSubCategory && (
              <p className="text-muted-foreground">{productSubCategory}</p>
            )}
          </div>
        </TableCell>

        {/* stock */}
        <TableCell className="border">
          {productQuantity > 0 ? (
            <Badge variant="success">In Stock</Badge>
          ) : (
            <Badge variant="neutral">Out of Stock</Badge>
          )}
        </TableCell>

        {/* price */}
        <TableCell className="space-x-2 border text-xs">
          <span>{formatPrice(productPrice, currencyCode)}</span>

          {productDiscount > 0 && (
            <span className="text-muted-foreground line-through">
              {formatPrice(productDiscount, currencyCode)}
            </span>
          )}
        </TableCell>

        {/* variants */}
        <TableCell className="text-muted-foreground border text-xs">
          {totalVariants > 0 ? (
            `${totalVariants} variant${totalVariants > 1 ? "s" : ""}`
          ) : (
            <Minus size={14} />
          )}
        </TableCell>

        {/* action */}
        <TableCell className="border border-r-0 text-right">
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <EllipsisVertical />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/" className="cursor-pointer text-xs font-medium">
                  <Eye />
                  View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/" className="cursor-pointer text-xs font-medium">
                  <Pencil />
                  Edit
                </Link>
              </DropdownMenuItem>

              {/* delete menu item */}
              <DropdownMenuItem
                className="text-destructive focus:text-destructive cursor-pointer text-xs font-medium"
                onSelect={(e) => {
                  e.preventDefault();
                  setIsDeleteDialogOpen(true);
                  setIsDropdownOpen(false); // Close dropdown when dialog opens
                }}
              >
                <Trash2 className="text-destructive" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      {/* Delete Modal */}
      <Dialog
        open={isDeleteDialogOpen}
        onOpenChange={(open) => {
          if (!isPending) {
            setIsDeleteDialogOpen(open);
          }
        }}
      >
        <DialogContent
          onPointerDownOutside={(e) => {
            if (isPending) {
              e.preventDefault();
            }
          }}
          onEscapeKeyDown={(e) => {
            if (isPending) {
              e.preventDefault();
            }
          }}
          className="gap-0 sm:max-w-[440px] [&>button]:hidden"
        >
          <DialogHeader>
            <div className="flex items-start gap-4">
              <div className="bg-destructive/5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
              <div className="flex-1 pt-1">
                <DialogTitle className="text-sm font-medium">
                  Delete product?
                </DialogTitle>
                <DialogDescription className="text-muted-foreground mt-2 text-xs leading-relaxed">
                  Are you sure you want to delete{" "}
                  <span className="text-foreground font-medium">
                    &quot;{productName}&quot;
                  </span>
                  ? This action cannot be undone.
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="mt-9 flex items-center justify-end gap-3">
            <Button
              onClick={() => setIsDeleteDialogOpen(false)}
              variant="outline"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleProductDelete}
              variant="destructive"
              disabled={isPending}
              className="min-w-24"
            >
              {isPending ? (
                <>
                  <Loader className="animate-spin" /> Deleting
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
