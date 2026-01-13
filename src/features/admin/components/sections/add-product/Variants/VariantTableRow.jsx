import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { TableCell, TableRow } from "@/components/ui/table";
import useDeleteMutation from "@/hooks/api/useDeleteMutation";
import { ImagePlus, Trash, X } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import ConfirmationDialog from "../../../modals/ConfirmationDialog";
import useGetStorePreference from "@/features/admin/hooks/store/useGetStorePreference";

export default function VariantTableRow({
  isEditMode,
  attributes,
  setAttributes,
  variant,
  removeVariantImage,
  triggerFileInput,
  fileInputRefs,
  handleImageUpload,
  updateVariant,
  useDefaultPricing,
}) {
  const { data, isLoading } = useGetStorePreference();

  const { productId } = useParams();
  const { mutate, isPending } = useDeleteMutation({
    endpoint: `/product/delete/attribute-value/${productId}?attributeId=${variant.attributeId}&valueId=${variant.id}`,
    token: true,
    clientId: true,
  });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const deleteVariant = () => {
    if (isEditMode) {
      setIsDeleteDialogOpen(true);
    } else {
      setAttributes(
        attributes.map((attr) =>
          attr.id === variant.attributeId
            ? {
                ...attr,
                values: attr.values.filter((val) => val.id !== variant.id),
              }
            : attr,
        ),
      );
    }
  };

  const confirmDeleteVariant = () => {
    mutate(null, {
      onSuccess: () => {
        setAttributes(
          attributes.map((attr) =>
            attr.id === variant.attributeId
              ? {
                  ...attr,
                  values: attr.values.filter((val) => val.id !== variant.id),
                }
              : attr,
          ),
        );
        setIsDeleteDialogOpen(false);
        toast.success("Variant value removed");
      },

      onError: () => {
        toast.error("Couldn't remove variant value");
      },
    });
  };

  return (
    <>
      <TableRow>
        <TableCell className="flex items-center gap-3">
          <div className="relative">
            {variant.imageUrl ? (
              <div className="group relative">
                <img
                  src={variant.imageUrl}
                  alt={variant.name}
                  className="h-12 w-12 rounded-md object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      removeVariantImage(variant.attributeId, variant.id)
                    }
                    className="h-6 w-6 text-white hover:bg-white/20 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div
                className="group hover:border-primary flex size-12 cursor-pointer items-center justify-center rounded-md border border-dashed transition-colors"
                onClick={() => triggerFileInput(variant.id)}
              >
                <ImagePlus className="text-muted-foreground group-hover:text-primary h-5 w-5 transition-colors" />
              </div>
            )}

            <input
              ref={(el) => (fileInputRefs.current[variant.id] = el)}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) =>
                handleImageUpload(variant.attributeId, variant.id, e)
              }
            />
          </div>

          <div>
            <p className="text-xs font-medium">{variant.name}</p>
            <p className="text-muted-foreground text-xs">
              {variant.attributeName}
            </p>
          </div>
        </TableCell>

        <TableCell>
          <Input
            value={variant.sku}
            onChange={(e) =>
              updateVariant(
                variant.attributeId,
                variant.id,
                "sku",
                e.target.value,
              )
            }
            placeholder="SKU"
            className="w-24"
          />
        </TableCell>

        <TableCell>
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground text-xs">
              {data?.data?.currencySymbol}
            </span>
            <Input
              type="number"
              value={variant.price}
              onChange={(e) =>
                updateVariant(
                  variant.attributeId,
                  variant.id,
                  "price",
                  e.target.value,
                )
              }
              placeholder="0.00"
              className="w-20"
              disabled={useDefaultPricing}
              title={
                useDefaultPricing
                  ? "Price is controlled by main product price"
                  : "Enter custom price for this variant"
              }
            />
          </div>
        </TableCell>

        <TableCell>
          <div className="flex items-center gap-1">
            <span className="text-muted-foreground text-xs">
              {data?.data?.currencySymbol}
            </span>
            <Input
              type="number"
              value={variant.discountPrice}
              onChange={(e) =>
                updateVariant(
                  variant.attributeId,
                  variant.id,
                  "discountPrice",
                  e.target.value,
                )
              }
              placeholder="0.00"
              className="w-20"
              disabled={useDefaultPricing}
              title={
                useDefaultPricing
                  ? "Discount price is controlled by main product discount"
                  : "Enter custom discount price for this variant"
              }
            />
          </div>
        </TableCell>

        {/* <TableCell>
                  <Input
                    type="number"
                    value={variant.stock}
                    onChange={(e) =>
                      updateVariant(
                        variant.attributeId,
                        variant.id,
                        "stock",
                        e.target.value,
                      )
                    }
                    placeholder="0"
                    className="w-16"
                  />
                </TableCell> */}

        <TableCell>
          <Switch
            checked={variant.status}
            onCheckedChange={(checked) =>
              updateVariant(variant.attributeId, variant.id, "status", checked)
            }
          />
        </TableCell>

        <TableCell>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            onClick={deleteVariant}
            className="text-red-500 hover:bg-red-50 hover:text-red-700"
          >
            <Trash className="h-4 w-4" />
          </Button>
        </TableCell>
      </TableRow>

      {/* Variant value delete confirmation modal */}
      <ConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Delete value?"
        description={
          <>
            Are you sure you want to delete{" "}
            {variant.name ? (
              <>
                <span className="font-medium">&quot;{variant.name}&quot;</span>
              </>
            ) : (
              "this value"
            )}
            ? This action cannot be undone.
          </>
        }
        onConfirm={confirmDeleteVariant}
        onCancel={() => {
          setIsDeleteDialogOpen(false);
        }}
        confirmText="Delete"
        cancelText="Cancel"
        isLoading={isPending}
        loadingText="Deleting"
        variant="destructive"
      />
    </>
  );
}
