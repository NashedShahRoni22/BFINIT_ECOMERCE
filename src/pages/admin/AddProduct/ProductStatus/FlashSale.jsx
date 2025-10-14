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
          <div className="rounded-lg border p-4">
            <div className="flex items-start gap-3">
              <div className="bg-secondary rounded p-1.5">
                <Zap size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Flash Sale</p>
                <p className="mt-0.5 text-sm text-gray-600">
                  Creates urgency with limited-time offer badge. Requires
                  <span className="font-medium"> Compare at Price</span> to be
                  set.
                </p>
              </div>
            </div>
            <div className="mt-4 flex w-full items-center justify-between">
              <FormLabel
                htmlFor="flash_sale"
                className="text-sm font-medium text-gray-700"
              >
                Enable Flash Sale Badge
              </FormLabel>
              <FormControl>
                <Switch
                  id="flash_sale"
                  className="cursor-pointer"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={!hasValidPrices}
                />
              </FormControl>
            </div>
            {/* Show additional fields when enabled */}
            {isFlashSaleEnabled && hasValidPrices && (
              <div className="mt-4 space-y-4 border-t pt-4">
                {/* Flash Sale Percentage Display */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    Flash Sale Percentage
                  </span>
                  <span className="text-sm font-semibold text-red-600">
                    {discountPercentage}% OFF
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Automatically calculated from Price and Compare at Price
                </p>
                {/* Sale End Date */}
                <FormField
                  control={form.control}
                  name="flash_sale_end_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-gray-700">
                        Sale End Date
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="datetime-local"
                          {...field}
                          value={field.value || ""}
                          className="shadow-none"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                {/* Show Countdown Timer Toggle */}
                <FormField
                  control={form.control}
                  name="flash_sale_show_countdown"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Show countdown timer
                        </FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={!isEndDateSelected}
                            className="cursor-pointer"
                          />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
