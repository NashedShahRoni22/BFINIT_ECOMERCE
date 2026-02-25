import { useState } from "react";
import { Link } from "react-router";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { EllipsisVertical, Eye, Minus, Pencil, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableCell, TableRow } from "@/components/ui/table";
import useGetStorePreference from "@/features/admin/hooks/store/useGetStorePreference";
import useDeleteMutation from "@/hooks/api/useDeleteMutation";
import { formatPrice } from "@/utils/formatPrice";
import useSelectedStore from "@/hooks/useSelectedStore";
import ConfirmationDialog from "../../../modals/ConfirmationDialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function InventoryTableRow({ product, selectedCountry }) {
  const queryClient = useQueryClient();
  const { data: storePreference } = useGetStorePreference();
  const { selectedStore } = useSelectedStore();
  const { storeId } = selectedStore;

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [deleteScope, setDeleteScope] = useState("country"); //  "country" | "global"

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
    pricing,
  } = product || {};

  const currencySymbol =
    selectedCountry?.currency_symbol || storePreference?.currencySymbol;
  const price = productPrice || pricing?.productPrice;
  const discount = productDiscount || pricing?.discountPrice;

  const totalVariants =
    (variants &&
      variants?.attributes?.reduce((acc, attribute) => {
        return acc + attribute?.value?.length;
      }, 0)) ||
    (pricing &&
      pricing?.variants &&
      pricing?.variants?.attributes?.reduce((acc, attribute) => {
        return acc + attribute?.value?.length;
      }, 0));

  const { mutate: deleteGlobal, isPending: isDeletingGlobal } =
    useDeleteMutation({
      endpoint: `/product/delete/${productId}`,
      token: true,
      clientId: true,
    });

  const { mutate: deleteFromCountry, isPending: isDeletingFromCountry } =
    useDeleteMutation({
      endpoint: `/product/delete/country/${storeId}/${productId}/${selectedCountry?._id}`,
      token: true,
      clientId: true,
    });

  const isPending = isDeletingGlobal || isDeletingFromCountry;

  // Handle product delete
  const handleProductDelete = () => {
    const mutate = deleteScope === "global" ? deleteGlobal : deleteFromCountry;

    const queryKey = ["products", "list", selectedStore?.storeId];

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
        {/* <TableCell className="w-10 border border-l-0">
          <Checkbox />
        </TableCell> */}

        {/* product */}
        <TableCell className="border">
          <div className="flex items-start gap-3">
            <div className="aspect-square size-10 overflow-hidden rounded-md border">
              <img
                src={`https://ecomback.bfinit.com${thumbnailImage}`}
                alt={productName}
                loading="lazy"
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
        {/* <TableCell className="border">
          {productQuantity > 0 ? (
            <Badge variant="success">In Stock</Badge>
          ) : (
            <Badge variant="neutral">Out of Stock</Badge>
          )}
        </TableCell> */}

        {/* price */}
        <TableCell className="space-x-2 border text-xs">
          <span>{formatPrice(price, currencySymbol)}</span>

          {discount > 0 && (
            <span className="text-muted-foreground line-through">
              {formatPrice(discount, currencySymbol)}
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
                <Link
                  target="_blank"
                  to={`/stores/${storeId}/shop/${productId}`}
                  className="cursor-pointer text-xs font-medium"
                >
                  <Eye />
                  View
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  to={`/products/edit/${productId}`}
                  className="cursor-pointer text-xs font-medium"
                >
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
                  setIsDropdownOpen(false);
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
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete product?"
        onConfirm={handleProductDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isPending}
        loadingText="Deleting"
        variant="destructive"
      >
        <div className="space-y-3">
          <p>
            Choose how to remove{" "}
            <span className="font-medium">"{productName}"</span>:
          </p>
          <RadioGroup
            value={deleteScope}
            onValueChange={setDeleteScope}
            className="space-y-2"
          >
            <div
              className={`flex cursor-pointer items-start gap-2 rounded-md border p-3 transition-colors ${
                deleteScope === "country"
                  ? "border-primary/30"
                  : "border-border"
              }`}
            >
              <RadioGroupItem
                value="country"
                id="scope-country"
                className="mt-0.5"
              />

              <Label
                htmlFor="scope-country"
                className="flex cursor-pointer flex-col items-start gap-0.5"
              >
                <p className="text-xs font-medium">
                  Remove from {selectedCountry?.country_name} only
                </p>
                <p className="text-muted-foreground text-xs font-normal">
                  Product remains available in other regions
                </p>
              </Label>
            </div>

            <div
              className={`flex cursor-pointer items-start gap-2 rounded-md border p-3 transition-colors ${
                deleteScope === "global"
                  ? "border-destructive/30"
                  : "border-border"
              }`}
            >
              <RadioGroupItem
                value="global"
                id="scope-global"
                className="mt-0.5"
              />
              <Label
                htmlFor="scope-global"
                className="flex cursor-pointer flex-col items-start gap-0.5"
              >
                <p className="text-destructive text-xs font-medium">
                  Delete from all countries
                </p>
                <p className="text-muted-foreground mt-0.5 text-xs font-normal">
                  Permanently removes the product everywhere
                </p>
              </Label>
            </div>
          </RadioGroup>
        </div>
      </ConfirmationDialog>
    </>
  );
}
