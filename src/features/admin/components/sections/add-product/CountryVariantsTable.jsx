import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { ImagePlus, Trash, X, Info } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function CountryVariantsTable({
  country,
  attributes,
  setAttributes,
  getAllVariants,
  updateVariant,
  onImageUpload,
  useDefaultPricing,
  setUseDefaultPricing,
  basePrice,
  baseDiscountPrice,
}) {
  const fileInputRefs = useRef({});

  // Update all variant prices when switching to default pricing or when base prices change
  useEffect(() => {
    if (useDefaultPricing && (basePrice || baseDiscountPrice)) {
      getAllVariants().forEach((variant) => {
        updateVariant(
          variant.attributeId,
          variant.id,
          "price",
          basePrice || "",
        );
        updateVariant(
          variant.attributeId,
          variant.id,
          "discountPrice",
          baseDiscountPrice || "",
        );
      });
    }
  }, [useDefaultPricing]); // Only run when toggle changes, not when prices change

  const handlePricingToggle = (enabled) => {
    setUseDefaultPricing(enabled);

    if (enabled) {
      // When switching to default pricing, update all variants with base prices
      getAllVariants().forEach((variant) => {
        updateVariant(
          variant.attributeId,
          variant.id,
          "price",
          basePrice || "",
        );
        updateVariant(
          variant.attributeId,
          variant.id,
          "discountPrice",
          baseDiscountPrice || "",
        );
      });
    }
  };

  // Handle image upload for variants
  const handleImageUpload = (attributeId, variantId, event) => {
    const file = event.target.files[0];
    if (file && onImageUpload) {
      onImageUpload(attributeId, variantId, file);
    }
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

  // Delete variant
  const deleteVariant = (attributeId, variantId) => {
    setAttributes(
      attributes.map((attr) =>
        attr.id === attributeId
          ? {
              ...attr,
              values: attr.values.filter((val) => val.id !== variantId),
            }
          : attr,
      ),
    );
  };

  return (
    <div className="mt-6 space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <h3 className="text-xs font-semibold">
          Generated Variants ({getAllVariants().length})
        </h3>

        {/* Pricing Toggle */}
        <div className="flex items-center gap-2">
          <Switch
            checked={useDefaultPricing}
            onCheckedChange={handlePricingToggle}
            className={useDefaultPricing ? "bg-primary" : "bg-input"}
          />
          <Label
            className="cursor-pointer text-xs"
            onClick={() => handlePricingToggle(!useDefaultPricing)}
          >
            Default Pricing
          </Label>
        </div>
      </div>

      {/* Info message about current pricing mode */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle className="text-xs">Pricing Mode</AlertTitle>
        <AlertDescription className="text-xs">
          {useDefaultPricing ? (
            <>
              Using base product price (
              {basePrice ? `${country.currency_symbol}${basePrice}` : "not set"}
              )
              {baseDiscountPrice &&
                ` and discount (${country.currency_symbol}${baseDiscountPrice})`}{" "}
              for all variants.
            </>
          ) : (
            "Custom pricing enabled. Set individual prices for each variant below."
          )}
        </AlertDescription>
      </Alert>

      {/* Mobile Card View */}
      <div className="space-y-3 md:hidden">
        {getAllVariants().map((variant) => (
          <div key={variant.id} className="bg-card rounded-lg border p-3">
            {/* Variant Header */}
            <div className="mb-3 flex items-start justify-between gap-2">
              <div className="flex items-center gap-3">
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

                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs font-medium">{variant.name}</p>
                  <p className="text-muted-foreground truncate text-xs">
                    {variant.attributeName}
                  </p>
                </div>
              </div>

              <Button
                type="button"
                size="icon"
                variant="ghost"
                onClick={() => deleteVariant(variant.attributeId, variant.id)}
                className="text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>

            {/* Variant Details */}
            <div className="space-y-3">
              {/* SKU */}
              <div>
                <label className="mb-1 block text-xs font-medium">SKU</label>
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
                  className="text-xs"
                />
              </div>

              {/* Price and Discount Price */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="mb-1 block text-xs font-medium">
                    Price <span className="text-destructive">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <span className="text-muted-foreground pointer-events-none absolute left-3 text-xs font-medium">
                      {country.currency_symbol}
                    </span>
                    <Input
                      type="number"
                      step="0.01"
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
                      disabled={useDefaultPricing}
                      className="pl-8 text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-medium">
                    Discount Price
                  </label>
                  <div className="relative flex items-center">
                    <span className="text-muted-foreground pointer-events-none absolute left-3 text-xs font-medium">
                      {country.currency_symbol}
                    </span>
                    <Input
                      type="number"
                      step="0.01"
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
                      disabled={useDefaultPricing}
                      className="pl-8 text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Stock and Status */}
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <label className="mb-1 block text-xs font-medium">
                    Stock
                  </label>
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
                    className="text-xs"
                  />
                </div>

                <div className="flex items-center gap-2 pb-2">
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
                    className={variant.status ? "bg-primary" : "bg-input"}
                  />
                  <label className="text-xs font-medium">Active</label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden overflow-hidden rounded-lg border md:block">
        <div className="custom-scrollbar overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="text-xs font-medium">Variant</TableHead>
                <TableHead className="text-xs font-medium">SKU</TableHead>
                <TableHead className="text-xs font-medium">
                  Price ({country.currency_symbol}){" "}
                  <span className="text-destructive">*</span>
                </TableHead>
                <TableHead className="text-xs font-medium">
                  Discount Price
                </TableHead>
                <TableHead className="text-xs font-medium">Stock</TableHead>
                <TableHead className="text-xs font-medium">Status</TableHead>
                <TableHead className="text-xs font-medium">Action</TableHead>
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
                            className="h-12 w-12 rounded-md object-cover"
                          />
                          <div className="absolute inset-0 flex items-center justify-center rounded-md bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                            <Button
                              type="button"
                              size="icon"
                              variant="ghost"
                              onClick={() =>
                                removeVariantImage(
                                  variant.attributeId,
                                  variant.id,
                                )
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
                      className="w-24 text-xs"
                    />
                  </TableCell>

                  <TableCell>
                    <div className="relative flex items-center">
                      <span className="text-muted-foreground pointer-events-none absolute left-2 text-xs font-medium">
                        {country.currency_symbol}
                      </span>
                      <Input
                        type="number"
                        step="0.01"
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
                        className="w-24 pl-6 text-xs"
                        disabled={useDefaultPricing}
                        title={
                          useDefaultPricing
                            ? "Price is controlled by base product price"
                            : "Enter custom price for this variant"
                        }
                      />
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="relative flex items-center">
                      <span className="text-muted-foreground pointer-events-none absolute left-2 text-xs font-medium">
                        {country.currency_symbol}
                      </span>
                      <Input
                        type="number"
                        step="0.01"
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
                        className="w-24 pl-6 text-xs"
                        disabled={useDefaultPricing}
                        title={
                          useDefaultPricing
                            ? "Discount price is controlled by base discount"
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
                      className="w-20 text-xs"
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
                      className={variant.status ? "bg-primary" : "bg-input"}
                    />
                  </TableCell>

                  <TableCell>
                    <Button
                      type="button"
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        deleteVariant(variant.attributeId, variant.id)
                      }
                      className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
