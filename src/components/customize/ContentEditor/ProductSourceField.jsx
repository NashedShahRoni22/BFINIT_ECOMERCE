import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Package, X, Info } from "lucide-react";
import ProductSelectionModal from "./ProductSelectionModal";
import CollectionSelectionModal from "./CollectionSelectionModal";

export default function ProductSourceField({ field, value, onChange }) {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCollectionModalOpen, setIsCollectionModalOpen] = useState(false);

  // Parse the current value
  const currentType = value?.type || "badge";
  const currentValue = value?.value || "featured";

  // Construct the select value (e.g., "badge:featured" or "manual")
  const selectValue =
    currentType === "badge"
      ? `badge:${currentValue}`
      : currentType === "auto"
        ? `auto:${currentValue}`
        : currentType;

  const handleSourceChange = (newValue) => {
    if (newValue === "manual") {
      onChange({
        type: "manual",
        value: [], // Empty array of product IDs
      });
    } else if (newValue === "collection") {
      onChange({
        type: "collection",
        value: null, // No collection selected yet
      });
    } else if (newValue.startsWith("badge:")) {
      onChange({
        type: "badge",
        value: newValue.split(":")[1],
      });
    } else if (newValue.startsWith("auto:")) {
      onChange({
        type: "auto",
        value: newValue.split(":")[1],
      });
    }
  };

  const handleProductsSelected = (productIds) => {
    onChange({
      type: "manual",
      value: productIds,
    });
    setIsProductModalOpen(false);
  };

  const handleCollectionSelected = (collectionId) => {
    onChange({
      type: "collection",
      value: collectionId,
    });
    setIsCollectionModalOpen(false);
  };

  const removeProduct = (productId) => {
    onChange({
      type: "manual",
      value: value.value.filter((id) => id !== productId),
    });
  };

  return (
    <>
      <div className="space-y-3">
        <div className="space-y-2">
          <Label className="text-foreground text-xs font-medium">
            {field.label}
          </Label>
          {field.helpText && (
            <p className="text-muted-foreground -mt-0.5 text-[11px] leading-relaxed">
              {field.helpText}
            </p>
          )}

          <Select value={selectValue} onValueChange={handleSourceChange}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="Select product source" />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="text-sm"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Manual Selection UI */}
        {currentType === "manual" && (
          <div className="space-y-2">
            {value.value && value.value.length > 0 && (
              <div className="border-border bg-muted/20 space-y-1.5 rounded-lg border p-2">
                {value.value.map((productId) => (
                  <SelectedProductChip
                    key={productId}
                    productId={productId}
                    onRemove={() => removeProduct(productId)}
                  />
                ))}
              </div>
            )}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsProductModalOpen(true)}
              className="h-8 w-full text-xs"
            >
              <Package size={14} className="mr-1.5" />
              {value.value?.length > 0
                ? `Edit Products (${value.value.length})`
                : "Select Products"}
            </Button>
          </div>
        )}

        {/* Collection Selection UI */}
        {currentType === "collection" && (
          <div className="space-y-2">
            {value.value && (
              <div className="border-border bg-muted/20 rounded-lg border p-2">
                <SelectedCollectionChip
                  collectionId={value.value}
                  onRemove={() => onChange({ type: "collection", value: null })}
                />
              </div>
            )}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsCollectionModalOpen(true)}
              className="h-8 w-full text-xs"
            >
              <Package size={14} className="mr-1.5" />
              {value.value ? "Change Collection" : "Select Collection"}
            </Button>
          </div>
        )}

        {/* Auto/Badge Selection Info */}
        {(currentType === "badge" || currentType === "auto") && (
          <div className="flex gap-2 rounded-lg border border-blue-200 bg-blue-50 p-2.5">
            <Info size={14} className="mt-0.5 flex-shrink-0 text-blue-600" />
            <p className="text-[11px] leading-relaxed text-blue-900">
              <span className="font-medium">Automatic selection:</span> Products
              will be dynamically loaded based on your chosen criteria.
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      <ProductSelectionModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        selectedProductIds={value?.value || []}
        onConfirm={handleProductsSelected}
      />

      <CollectionSelectionModal
        isOpen={isCollectionModalOpen}
        onClose={() => setIsCollectionModalOpen(false)}
        selectedCollectionId={value?.value}
        onConfirm={handleCollectionSelected}
      />
    </>
  );
}

// Helper Components
function SelectedProductChip({ productId, onRemove }) {
  // TODO: Fetch real product data
  const product = {
    id: productId,
    name: `Product ${productId}`,
    price: "$29.99",
    image: "https://via.placeholder.com/80",
  };

  return (
    <div className="bg-background group flex items-center gap-2 rounded-md border p-1.5 pr-2">
      <img
        src={product.image}
        alt={product.name}
        className="h-8 w-8 rounded object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="text-foreground truncate text-xs font-medium">
          {product.name}
        </p>
        <p className="text-muted-foreground text-[10px]">{product.price}</p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="text-muted-foreground hover:text-destructive opacity-0 transition-all group-hover:opacity-100"
      >
        <X size={14} />
      </button>
    </div>
  );
}

function SelectedCollectionChip({ collectionId, onRemove }) {
  // TODO: Fetch real collection data
  const collection = {
    id: collectionId,
    name: `Collection ${collectionId}`,
    productCount: 12,
  };

  return (
    <div className="bg-background group flex items-center justify-between rounded-md border p-2">
      <div className="min-w-0 flex-1">
        <p className="text-foreground truncate text-xs font-medium">
          {collection.name}
        </p>
        <p className="text-muted-foreground text-[10px]">
          {collection.productCount} products
        </p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="text-muted-foreground hover:text-destructive ml-2 opacity-0 transition-all group-hover:opacity-100"
      >
        <X size={14} />
      </button>
    </div>
  );
}
