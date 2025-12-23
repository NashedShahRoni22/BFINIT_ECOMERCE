import { useEffect, useRef, useState } from "react";
import { ChevronUp } from "lucide-react";
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
import SectionHeader from "./SectionHeader";
import useGetStorePreference from "@/features/admin/hooks/store/useGetStorePreference";
import { Spinner } from "@/components/ui/spinner";

export default function Pricing({ form }) {
  const { data, isLoading } = useGetStorePreference();

  const prefixRef = useRef(null);

  const [isOpen, setIsOpen] = useState(true);
  const [prefixWidth, setPrefixWidth] = useState(0);

  useEffect(() => {
    if (prefixRef.current) {
      setPrefixWidth(prefixRef.current.offsetWidth);
    }
  }, []);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="bg-card rounded-lg border p-5"
    >
      {/* header */}
      <div className="flex items-start justify-between gap-3">
        <SectionHeader
          title="Pricing"
          description="Set product pricing, compare prices and cost calculations"
        />

        {/* section collapse toggle button */}
        <CollapsibleTrigger asChild>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="size-8 shrink-0 cursor-pointer md:size-6"
          >
            <ChevronUp
              className={`h-4 w-4 transition-transform duration-200 ease-linear md:h-3 md:w-3 ${
                isOpen ? "rotate-0" : "rotate-180"
              }`}
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
              <FormLabel className="text-xs">
                Price <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <span
                    ref={prefixRef}
                    className="text-muted-foreground pointer-events-none absolute left-3 text-sm"
                  >
                    {isLoading ? <Spinner /> : data?.data?.currencySymbol}
                  </span>
                  <Input
                    {...field}
                    type="number"
                    placeholder="0.00"
                    style={{ paddingLeft: `${prefixWidth + 20}px` }}
                  />
                </div>
              </FormControl>
              {/* conditional error */}
              {fieldState.error ? (
                <FormMessage className="text-xs" />
              ) : (
                <p className="text-muted-foreground text-xs">
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
                <FormLabel className="text-xs">Compare at Price</FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <span className="text-muted-foreground absolute left-3 text-sm">
                      {isLoading ? <Spinner /> : data?.data?.currencySymbol}
                    </span>
                    <Input
                      {...field}
                      type="number"
                      placeholder="0.00"
                      className={`${showWarning ? "border-warning" : ""}`}
                      style={{ paddingLeft: `${prefixWidth + 20}px` }}
                    />
                  </div>
                </FormControl>

                {/* Show either error, warning, or help text */}
                {fieldState.error ? (
                  <FormMessage className="text-xs" />
                ) : showWarning ? (
                  <p className="text-warning text-xs">
                    Compare at price should be higher than selling price ($
                    {price}) to show a discount
                  </p>
                ) : (
                  <p className="text-muted-foreground text-xs">
                    Original price for discount display (optional, must be
                    higher than price)
                  </p>
                )}
              </FormItem>
            );
          }}
        />

        {/* TODO: make it available when inventory track is available */}
        {/* per item cost */}
        {/* <FormField
          control={form.control}
          name="cost"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Cost per Item</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <p className="text-muted-foreground absolute left-3 text-sm">
                    {isLoading ? <Spinner /> : data?.data?.currencySymbol}
                  </p>
                  <Input
                    {...field}
                    type="number"
                    placeholder="0.00"
                    style={{ paddingLeft: `${prefixWidth + 20}px` }}
                  />
                </div>
              </FormControl>
              <p className="text-muted-foreground text-xs">
                Your cost to acquire/produce this item (for profit calculations,
                not shown to customers)
              </p>
            </FormItem>
          )}
        /> */}

        {/* TODO: make it uncomment when shipping based pricing added charge tax */}
        {/* <div className="flex flex-col items-start">
          <FormField
            control={form.control}
            name="tax"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Tax</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="tax"
                      checked={field.value || false}
                      onCheckedChange={(checked) => field.onChange(checked)}
                      className="size-4 cursor-pointer"
                    />
                    <Label
                      htmlFor="tax"
                      className="text-muted-foreground font-normal"
                    >
                      Charge tax on this product
                    </Label>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
        </div> */}
      </CollapsibleContent>
    </Collapsible>
  );
}
