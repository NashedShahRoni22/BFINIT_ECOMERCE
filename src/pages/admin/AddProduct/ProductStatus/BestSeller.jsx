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
          <div className="rounded-lg border p-4 text-xs text-gray-700">
            <div className="flex items-start gap-2 font-medium">
              <div className="bg-secondary rounded p-1">
                <Crown size={14} />
              </div>
              <div>
                <p>Bestseller</p>
                <p className="mt-0.5 text-xs font-normal">
                  Showcases popular products based on sales volume to build
                  social proof and trust.
                </p>
              </div>
            </div>

            <div className="mt-4 flex w-full items-center justify-between">
              <FormLabel htmlFor="best_seller" className="text-xs font-medium">
                Enable Bestseller badge
              </FormLabel>
              <FormControl>
                <Switch
                  id="best_seller"
                  className="cursor-pointer"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </div>

            {isBestSellerEnabled && (
              <FormField
                control={form.control}
                name="best_seller_threshold"
                render={({ field }) => (
                  <FormItem className="mt-4 border-t pt-4">
                    <FormLabel className="text-xs font-medium">
                      Show when stock is below
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 50"
                        {...field}
                        className="text-xs shadow-none"
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
