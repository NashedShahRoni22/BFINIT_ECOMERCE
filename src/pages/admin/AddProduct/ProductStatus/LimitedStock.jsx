import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Package2 } from "lucide-react";

export default function LimitedStock({ form }) {
  const isLimitedStockEnabled = form.watch("limited_stock");

  return (
    <FormField
      control={form.control}
      name="limited_stock"
      render={({ field }) => (
        <FormItem>
          <div className="rounded-lg border p-4">
            <div className="flex items-start gap-3">
              <div className="bg-secondary rounded p-1.5">
                <Package2 size={16} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  Limited Stock
                </p>
                <p className="mt-0.5 text-sm text-gray-600">
                  Shows scarcity to encourage quick purchasing decisions when
                  inventory is running low.
                </p>
              </div>
            </div>
            <div className="mt-4 flex w-full items-center justify-between">
              <FormLabel
                htmlFor="limited_stock"
                className="text-sm font-medium text-gray-700"
              >
                Enable Limited Stock badge
              </FormLabel>
              <FormControl>
                <Switch
                  id="limited_stock"
                  className="cursor-pointer"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </div>
            {isLimitedStockEnabled && (
              <FormField
                control={form.control}
                name="limited_stock_threshold"
                render={({ field }) => (
                  <FormItem className="mt-4 border-t pt-4">
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Show when stock is below
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 10"
                        {...field}
                        className="shadow-none"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            )}
          </div>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );
}
