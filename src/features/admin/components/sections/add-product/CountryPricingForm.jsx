import { useRef, useEffect, useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useFormState } from "react-hook-form";

export default function CountryPricingForm({ country, form, data, onUpdate }) {
  const { errors } = useFormState({ control: form.control });
  const prefixRef = useRef(null);
  const [prefixWidth, setPrefixWidth] = useState(0);

  useEffect(() => {
    if (prefixRef.current) {
      setPrefixWidth(prefixRef.current.offsetWidth);
    }
  }, [country.currency_symbol]);

  // Memoized callback to prevent creating new function on every render
  const handlePriceChange = useCallback(
    (field, value) => {
      onUpdate(country._id, field, value);

      if (field === "productPrice" && value && parseFloat(value) > 0) {
        form.clearErrors("pricing");
      }
    },
    [country._id, onUpdate, form],
  );

  const validateComparePrice = (comparePrice) => {
    if (!comparePrice || !data.productPrice) return null;
    const price = parseFloat(data.productPrice);
    const compare = parseFloat(comparePrice);
    if (compare <= price) {
      return "warning";
    }
    return null;
  };

  const comparePriceStatus = validateComparePrice(data.discountPrice);

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center gap-2">
        <div className="bg-muted flex h-8 w-8 items-center justify-center rounded-lg">
          <span className="text-lg">{country.currency_symbol}</span>
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold">
            Pricing for {country.country_name}
          </h3>
          <p className="text-muted-foreground text-xs">
            {country.currency_name} ({country.currency_code})
          </p>
        </div>
      </div>

      <Separator />

      {/* Pricing Fields Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Product Price */}
        <div className="space-y-2">
          <Label htmlFor={`price-${country._id}`} className="text-xs">
            Price <span className="text-destructive">*</span>
          </Label>
          <div className="relative flex items-center">
            <span
              ref={prefixRef}
              className="text-muted-foreground pointer-events-none absolute left-3 text-sm font-medium"
            >
              {country.currency_symbol}
            </span>
            <Input
              id={`price-${country._id}`}
              type="number"
              step="0.01"
              placeholder="0.00"
              value={data?.productPrice ?? ""}
              onChange={(e) =>
                handlePriceChange("productPrice", e.target.value)
              }
              style={{ paddingLeft: `${prefixWidth + 20}px` }}
              className="text-sm"
            />
          </div>

          {errors.pricing ? (
            <p className="text-destructive mt-1.5 text-xs">
              {errors.pricing.message}
            </p>
          ) : (
            <p className="text-muted-foreground text-xs">
              The price customers will pay
            </p>
          )}
        </div>

        {/* Compare at Price (Discount Price) */}
        <div className="space-y-2">
          <Label htmlFor={`discount-${country._id}`} className="text-xs">
            Compare at Price
          </Label>
          <div className="relative flex items-center">
            <span className="text-muted-foreground absolute left-3 text-sm font-medium">
              {country.currency_symbol}
            </span>
            <Input
              id={`discount-${country._id}`}
              type="number"
              step="0.01"
              placeholder="0.00"
              value={data?.discountPrice ?? ""}
              onChange={(e) =>
                handlePriceChange("discountPrice", e.target.value)
              }
              style={{ paddingLeft: `${prefixWidth + 20}px` }}
              className={`text-sm ${comparePriceStatus === "warning" ? "border-warning" : ""}`}
            />
          </div>
          {comparePriceStatus === "warning" ? (
            <p className="text-warning text-xs">
              Compare at price should be higher than selling price (
              {country.currency_symbol}
              {data.productPrice}) to show a discount
            </p>
          ) : (
            <p className="text-muted-foreground text-xs">
              Original price for discount display (optional)
            </p>
          )}
        </div>

        {/* Cost per Item */}
        {/* <div className="space-y-2">
          <Label htmlFor={`cost-${country._id}`} className="text-xs">
            Cost per Item
          </Label>
          <div className="relative flex items-center">
            <span className="text-muted-foreground absolute left-3 text-sm font-medium">
              {country.currency_symbol}
            </span>
            <Input
              id={`cost-${country._id}`}
              type="number"
              step="0.01"
              placeholder="0.00"
              value={data?.productCost ?? ""}
              onChange={(e) => handlePriceChange("productCost", e.target.value)}
              style={{ paddingLeft: `${prefixWidth + 20}px` }}
              className="text-sm"
            />
          </div>
          <p className="text-muted-foreground text-xs">
            Your cost to acquire/produce this item
          </p>
        </div> */}

        {/* Shipping Charges */}
        {/* <div className="space-y-2">
          <Label htmlFor={`shipping-${country._id}`} className="text-xs">
            Shipping Charges
          </Label>
          <div className="relative flex items-center">
            <span className="text-muted-foreground absolute left-3 text-sm font-medium">
              {country.currency_symbol}
            </span>
            <Input
              id={`shipping-${country._id}`}
              type="number"
              step="0.01"
              placeholder="0.00"
              value={data?.shippingCharges ?? ""}
              onChange={(e) =>
                handlePriceChange("shippingCharges", e.target.value)
              }
              style={{ paddingLeft: `${prefixWidth + 20}px` }}
              className="text-sm"
            />
          </div>
          <p className="text-muted-foreground text-xs">
            Shipping cost for this country
          </p>
        </div> */}
      </div>

      {/* Tax Checkbox */}
      {/* <div className="flex items-center gap-2 pt-2">
        <Checkbox
          id={`tax-${country._id}`}
          checked={data?.tax ?? false}
          onCheckedChange={(checked) => handlePriceChange("tax", checked)}
          className="size-4 cursor-pointer"
        />
        <Label
          htmlFor={`tax-${country._id}`}
          className="text-muted-foreground cursor-pointer text-xs font-normal"
        >
          Charge tax on this product in {country.country_name}
        </Label>
      </div> */}
    </div>
  );
}
