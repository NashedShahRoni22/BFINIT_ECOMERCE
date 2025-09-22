import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ImagePlus, Trash, X } from "lucide-react";

export default function AllVariantsTable({
  getAllVariants,
  updateVariant,
  deleteVariant,
  onImageUpload,
  form,
}) {
  const [useDefaultPricing, setUseDefaultPricing] = useState(true);
  const fileInputRefs = useRef({});

  // Watch form values for main product pricing
  const watchedPrice = form.watch("price");
  const watchedDiscountPrice = form.watch("discountPrice");

  // Update all variant prices when switching to default pricing or when main prices change
  useEffect(() => {
    if (useDefaultPricing) {
      // Set all variants to use the main product prices
      getAllVariants().forEach((variant) => {
        updateVariant(
          variant.attributeId,
          variant.id,
          "price",
          watchedPrice || "",
        );
        updateVariant(
          variant.attributeId,
          variant.id,
          "discountPrice",
          watchedDiscountPrice || "",
        );
      });
    }
  }, [useDefaultPricing, watchedPrice, watchedDiscountPrice]);

  const handlePricingToggle = (enabled) => {
    setUseDefaultPricing(enabled);

    if (enabled) {
      // When switching to default pricing, update all variants with main product prices
      getAllVariants().forEach((variant) => {
        updateVariant(
          variant.attributeId,
          variant.id,
          "price",
          watchedPrice || "",
        );
        updateVariant(
          variant.attributeId,
          variant.id,
          "discountPrice",
          watchedDiscountPrice || "",
        );
      });
    }
    // When switching to custom pricing, keep existing variant prices as they are
  };

  // Handle image upload for variants
  const handleImageUpload = (attributeId, variantId, event) => {
    const file = event.target.files[0];
    if (file && onImageUpload) {
      onImageUpload(attributeId, variantId, file);
    }
    // Reset the input value so the same file can be selected again if needed
    event.target.value = "";
  };

  // Remove variant image
  const removeVariantImage = (attributeId, variantId) => {
    updateVariant(attributeId, variantId, "image", null);
    updateVariant(attributeId, variantId, "imageUrl", null);
  };

  // Trigger file input click
  const triggerFileInput = (variantId) => {
    const fileInput = fileInputRefs.current[variantId];
    if (fileInput) {
      fileInput.click();
    }
  };

  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xs font-medium text-gray-900">
          Generated Variants ({getAllVariants().length})
        </h3>

        {/* Pricing Toggle */}
        <div className="flex items-center gap-2">
          <Switch
            checked={useDefaultPricing}
            onCheckedChange={handlePricingToggle}
            className="cursor-pointer"
          />
          <Label
            className="cursor-pointer text-xs"
            onClick={() => handlePricingToggle(!useDefaultPricing)}
          >
            {useDefaultPricing ? "Default Pricing" : "Custom Pricing"}
          </Label>
        </div>
      </div>

      {/* Info message about current pricing mode */}
      <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-3">
        <p className="text-xs text-gray-700">
          {useDefaultPricing ? (
            <>
              Using main product price (
              {watchedPrice ? `$${watchedPrice}` : "not set"})
              {watchedDiscountPrice &&
                ` and discount ($${watchedDiscountPrice})`}{" "}
              for all variants. Price fields below will auto-update when main
              product price changes.
            </>
          ) : (
            "Custom pricing enabled. Set individual prices for each variant below."
          )}
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-[#F9FAFB]">
              <TableHead className="text-xs font-medium text-gray-700">
                Variant
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-700">
                SKU
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-700">
                PRICE
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-700">
                DISCOUNT PRICE
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-700">
                STOCK
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-700">
                STATUS
              </TableHead>
              <TableHead className="text-xs font-medium text-gray-700">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {getAllVariants().map((variant) => (
              <TableRow key={variant.id}>
                <TableCell className="flex items-center gap-3">
                  <div className="relative">
                    {variant.imageUrl ? (
                      <div className="group relative">
                        <img
                          src={variant.imageUrl}
                          alt={variant.name}
                          className="h-11 w-11 rounded-md object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() =>
                              removeVariantImage(
                                variant.attributeId,
                                variant.id,
                              )
                            }
                            className="h-5 w-5 text-white hover:bg-white/20 hover:text-white"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="hover:border-dashboard-primary group flex size-11 cursor-pointer items-center justify-center rounded-md border border-dashed transition-all duration-200 ease-linear"
                        onClick={() => triggerFileInput(variant.id)}
                      >
                        <ImagePlus className="group-hover:text-dashboard-primary h-4 w-4 text-neutral-400 transition-all duration-200 ease-linear" />
                      </div>
                    )}

                    {/* Hidden file input */}
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
                    <p className="text-xs font-medium text-gray-900">
                      {variant.name}
                    </p>
                    <p className="text-xs text-gray-400">
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
                    className="w-24 text-xs"
                  />
                </TableCell>

                <TableCell>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-gray-600">$</span>
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
                      className="w-20 text-xs"
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
                    <span className="text-xs text-gray-600">$</span>
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
                      className="w-20 text-xs"
                      disabled={useDefaultPricing}
                      title={
                        useDefaultPricing
                          ? "Discount price is controlled by main product discount"
                          : "Enter custom discount price for this variant"
                      }
                    />
                  </div>
                </TableCell>

                <TableCell>
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
                    className="w-16 text-xs"
                  />
                </TableCell>

                <TableCell>
                  <Switch
                    checked={variant.status}
                    onCheckedChange={(checked) =>
                      updateVariant(
                        variant.attributeId,
                        variant.id,
                        "status",
                        checked,
                      )
                    }
                  />
                </TableCell>

                <TableCell>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      deleteVariant(variant.attributeId, variant.id)
                    }
                    className="text-red-500 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash className="h-3 w-3" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
