import { Zap } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

export default function FlashSale({ form }) {
  const price = form.watch("price");
  const compareAtPrice = form.watch("discount");
  const isFlashSaleEnabled = form.watch("flash_sale");
  const isEndDateSelected = form.watch("flash_sale_end_date");

  const hasValidPrices =
    price &&
    parseFloat(price) > 0 &&
    compareAtPrice &&
    parseFloat(compareAtPrice) > parseFloat(price);

  const discountPercentage = hasValidPrices
    ? Math.round(
        ((parseFloat(compareAtPrice) - parseFloat(price)) /
          parseFloat(compareAtPrice)) *
          100,
      )
    : 0;

  // Reset flash sale fields when disabled
  useEffect(() => {
    if (!isFlashSaleEnabled) {
      form.setValue("flash_sale_show_countdown", false);
      form.setValue("flash_sale_end_date", null);
    }
  }, [isFlashSaleEnabled, form]);

  return (
    <FormField
      control={form.control}
      name="flash_sale"
      render={({ field }) => (
        <FormItem>
          <div className="bg-card rounded-lg border p-5">
            {/* Header */}
            <div className="flex items-start gap-3">
              <div className="bg-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-md">
                <Zap className="text-muted-foreground h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1 space-y-0.5">
                <h4 className="text-xs font-semibold">Flash Sale</h4>
                <p className="text-muted-foreground text-xs">
                  Creates urgency with limited-time offer badge. Both{" "}
                  <span className="text-foreground font-medium">Price</span> and{" "}
                  <span className="text-foreground font-medium">
                    Compare at Price
                  </span>{" "}
                  must be set.
                </p>
              </div>
            </div>

            {/* Toggle */}
            <div className="mt-4 flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <FormLabel htmlFor="flash_sale">
                Enable Flash Sale badge
              </FormLabel>
              <FormControl>
                <Switch
                  id="flash_sale"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={!hasValidPrices}
                />
              </FormControl>
            </div>

            {/* Expanded content when enabled */}
            {isFlashSaleEnabled && hasValidPrices && (
              <div className="mt-5 space-y-4 border-t pt-5">
                {/* Flash Sale Percentage Display */}
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <span className="text-foreground text-xs font-medium">
                    Flash Sale Percentage
                  </span>
                  <span className="text-destructive text-xs font-semibold">
                    {discountPercentage}% OFF
                  </span>
                </div>
                <p className="text-muted-foreground text-xs">
                  Automatically calculated from Price and Compare at Price
                </p>

                {/* Sale End Date */}
                <FormField
                  control={form.control}
                  name="flash_sale_end_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sale End Date</FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Show Countdown Timer Toggle */}
                <FormField
                  control={form.control}
                  name="flash_sale_show_countdown"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
                        <FormLabel>Show countdown timer</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={!isEndDateSelected}
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
