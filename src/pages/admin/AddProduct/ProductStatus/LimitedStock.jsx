import { Package2 } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

export default function LimitedStock({ form }) {
  const isLimitedStockEnabled = form.watch("limited_stock");

  return (
    <FormField
      control={form.control}
      name="limited_stock"
      render={({ field }) => (
        <FormItem>
          <div className="bg-card rounded-lg border p-5">
            {/* Header */}
            <div className="flex items-start gap-3">
              <div className="bg-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-md">
                <Package2 className="text-muted-foreground h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1 space-y-0.5">
                <h4 className="text-xs font-semibold">Limited Stock</h4>
                <p className="text-muted-foreground text-xs">
                  Shows scarcity to encourage quick purchasing decisions when
                  inventory is running low.
                </p>
              </div>
            </div>

            {/* Toggle */}
            <div className="mt-4 flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <FormLabel htmlFor="limited_stock">
                Enable Limited Stock badge
              </FormLabel>
              <FormControl>
                <Switch
                  id="limited_stock"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </div>

            {/* Expanded content when enabled */}
            {isLimitedStockEnabled && (
              <FormField
                control={form.control}
                name="limited_stock_threshold"
                render={({ field }) => (
                  <FormItem className="mt-5 border-t pt-5">
                    <FormLabel>Show when stock is below</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 50" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
