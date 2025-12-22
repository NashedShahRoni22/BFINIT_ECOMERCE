import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Crown } from "lucide-react";

export default function BestSeller({ form }) {
  const isBestSellerEnabled = form.watch("best_seller");

  return (
    <FormField
      control={form.control}
      name="best_seller"
      render={({ field }) => (
        <FormItem>
          <div className="bg-card rounded-lg border p-5">
            {/* Header */}
            <div className="flex items-start gap-3">
              <div className="bg-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-md">
                <Crown className="text-muted-foreground h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1 space-y-0.5">
                <h4 className="text-xs font-semibold">Bestseller</h4>
                <p className="text-muted-foreground text-xs">
                  Showcases popular products based on sales volume to build
                  social proof and trust.
                </p>
              </div>
            </div>

            {/* Toggle */}
            <div className="mt-4 flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <FormLabel htmlFor="best_seller" className="text-xs">
                Enable Bestseller badge
              </FormLabel>
              <FormControl>
                <Switch
                  id="best_seller"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </div>

            {/* Expanded content when enabled */}
            {isBestSellerEnabled && (
              <FormField
                control={form.control}
                name="best_seller_threshold"
                render={({ field }) => (
                  <FormItem className="mt-5 border-t pt-5">
                    <FormLabel>Show when units sold is at least</FormLabel>
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
