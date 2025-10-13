import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Badge, ChevronUp, Flame, Star } from "lucide-react";
import { useState } from "react";
import LimitedStock from "./ProductStatus/LimitedStock";
import BestSeller from "./ProductStatus/BestSeller";
import FlashSale from "./ProductStatus/FlashSale";

export default function ProductStatus({ form }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="rounded-lg border bg-white p-8"
    >
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">
            Product Status
          </h2>
          <p className="mt-1 text-xs text-gray-600">
            Select one or more status badges to display on the product. These
            help customers discover products and appear on product cards.
          </p>
        </div>

        {/* section collapse toggle button */}
        <CollapsibleTrigger asChild>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="size-6 cursor-pointer text-xs"
          >
            <ChevronUp
              className={`h-3 w-3 transition-transform duration-200 ease-linear ${isOpen ? "rotate-0" : "rotate-180"}`}
            />
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="mt-6 grid grid-cols-2 gap-6">
        {/* Flash Sale */}
        <FlashSale form={form} />

        {/* New Arrival */}
        <FormField
          control={form.control}
          name="new_arrival"
          render={({ field }) => (
            <FormItem>
              <div className="rounded-lg border p-4 text-xs text-gray-700">
                <div className="flex items-start gap-2 font-medium">
                  <div className="bg-secondary rounded p-1">
                    <Star size={14} />
                  </div>
                  <div>
                    <p>New Arrival</p>
                    <p className="mt-0.5 text-xs font-normal">
                      Highlights recently added products to attract attention to
                      your latest offerings.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex w-full items-center justify-between">
                  <FormLabel
                    htmlFor="new_arrival"
                    className="text-xs font-medium"
                  >
                    Enable New Arrival badge
                  </FormLabel>
                  <FormControl>
                    <Switch
                      id="new_arrival"
                      className="cursor-pointer"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
              </div>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* Bestseller */}
        <BestSeller form={form} />

        {/* Hot Deal */}
        <FormField
          control={form.control}
          name="hot_deal"
          render={({ field }) => (
            <FormItem>
              <div className="rounded-lg border p-4 text-xs text-gray-700">
                <div className="flex items-start gap-2 font-medium">
                  <div className="bg-secondary rounded p-1">
                    <Flame size={14} />
                  </div>
                  <div>
                    <p>Hot Deal</p>
                    <p className="mt-0.5 text-xs font-normal">
                      Promotes special offers and deals without time
                      constraints. Great for ongoing promotions.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex w-full items-center justify-between">
                  <FormLabel htmlFor="hot_deal" className="text-xs font-medium">
                    Enable Hot Deal badge
                  </FormLabel>
                  <FormControl>
                    <Switch
                      id="hot_deal"
                      className="cursor-pointer"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
              </div>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* Featured */}
        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem>
              <div className="rounded-lg border p-4 text-xs text-gray-700">
                <div className="flex items-start gap-2 font-medium">
                  <div className="bg-secondary rounded p-1">
                    <Badge size={14} />
                  </div>
                  <div>
                    <p>Featured</p>
                    <p className="mt-0.5 text-xs font-normal">
                      Highlights premium or recommended products in special
                      collections and homepage sections.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex w-full items-center justify-between">
                  <FormLabel htmlFor="featured" className="text-xs font-medium">
                    Enable Featured badge
                  </FormLabel>
                  <FormControl>
                    <Switch
                      id="featured"
                      className="cursor-pointer"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
              </div>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* Limited Stock */}
        <LimitedStock form={form} />
      </CollapsibleContent>
    </Collapsible>
  );
}
