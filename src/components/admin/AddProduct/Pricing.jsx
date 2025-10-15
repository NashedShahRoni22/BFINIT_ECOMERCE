import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronUp } from "lucide-react";
import { useState } from "react";

export default function Pricing({ form }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="rounded-lg border bg-white p-4 md:p-6"
    >
      {/* header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-gray-900">Pricing</h2>
          <p className="mt-1 text-xs text-gray-500 md:text-sm">
            Set product pricing, compare prices and cost calculations
          </p>
        </div>

        {/* section collapse toggle button */}
        <CollapsibleTrigger asChild>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="size-8 shrink-0 cursor-pointer md:size-6"
          >
            <ChevronUp
              className={`h-4 w-4 transition-transform duration-200 ease-linear md:h-3 md:w-3 ${isOpen ? "rotate-0" : "rotate-180"}`}
            />
          </Button>
        </CollapsibleTrigger>
      </div>

      {/* main pricing input field */}
      <CollapsibleContent className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:grid-cols-2 md:gap-6">
        {/* price */}
        <FormField
          control={form.control}
          name="price"
          rules={{ required: "Price is required" }}
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Price <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <p className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-gray-500">
                    $
                  </p>
                  <Input
                    {...field}
                    type="number"
                    placeholder="0.00"
                    className="h-11 pl-7 shadow-none"
                  />
                </div>
              </FormControl>
              {/* conditional error */}
              {fieldState.error ? (
                <FormMessage className="text-xs" />
              ) : (
                <p className="text-xs text-gray-500">
                  The price customers will pay
                </p>
              )}
            </FormItem>
          )}
        />

        {/* compare at price */}
        <FormField
          control={form.control}
          name="discount"
          rules={{
            validate: (value) => {
              if (!value) return true; // Optional field
              const price = parseFloat(form.getValues("price"));
              const comparePrice = parseFloat(value);

              if (comparePrice && comparePrice <= price) {
                return "Compare at price must be higher than selling price";
              }
              return true;
            },
          }}
          render={({ field, fieldState }) => {
            const price = form.watch("price");
            const compareAtPrice = field.value;
            const showWarning =
              compareAtPrice && parseFloat(compareAtPrice) <= parseFloat(price);

            return (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Compare at Price
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <p className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-gray-500">
                      $
                    </p>
                    <Input
                      {...field}
                      type="number"
                      placeholder="0.00"
                      className={`h-11 pl-7 shadow-none ${showWarning ? "border-amber-500" : ""}`}
                    />
                  </div>
                </FormControl>

                {/* Show either error, warning, or help text */}
                {fieldState.error ? (
                  <FormMessage className="text-xs" />
                ) : showWarning ? (
                  <p className="text-xs text-amber-600">
                    Compare at price should be higher than selling price ($
                    {price}) to show a discount
                  </p>
                ) : (
                  <p className="text-xs text-gray-500">
                    Original price for discount display (optional, must be
                    higher than price)
                  </p>
                )}
              </FormItem>
            );
          }}
        />

        {/* per item cost */}
        <FormField
          control={form.control}
          name="cost"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">
                Cost per Item
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <p className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-gray-500">
                    $
                  </p>
                  <Input
                    {...field}
                    type="number"
                    placeholder="0.00"
                    className="h-11 pl-7 shadow-none"
                  />
                </div>
              </FormControl>
              <p className="text-xs text-gray-500">
                Your cost to acquire/produce this item (for profit calculations,
                not shown to customers)
              </p>
            </FormItem>
          )}
        />

        {/* charge tax */}
        <div className="flex flex-col items-start">
          <FormField
            control={form.control}
            name="tax"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-gray-700">
                  Tax
                </FormLabel>
                <FormControl>
                  <div className="flex min-h-[44px] items-center gap-3">
                    <Checkbox
                      id="tax"
                      checked={field.value || false}
                      onCheckedChange={(checked) => field.onChange(checked)}
                      className="size-5 cursor-pointer"
                    />
                    <Label
                      htmlFor="tax"
                      className="cursor-pointer text-sm text-gray-600"
                    >
                      Charge tax on this product
                    </Label>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
