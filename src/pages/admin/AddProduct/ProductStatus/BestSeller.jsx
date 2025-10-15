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
          <div className="rounded-lg border p-4">
            <div className="flex items-start gap-3">
              <div className="bg-secondary shrink-0 rounded p-1.5">
                <Crown size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">Bestseller</p>
                <p className="mt-0.5 text-xs text-gray-600 md:text-sm">
                  Showcases popular products based on sales volume to build
                  social proof and trust.
                </p>
              </div>
            </div>
            <div className="mt-4 flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <FormLabel
                htmlFor="best_seller"
                className="text-sm font-medium text-gray-700"
              >
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
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Show when stock is below
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 50"
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
