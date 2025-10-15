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
      className="rounded-lg border bg-white p-4 md:p-6"
    >
      {/* header */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 className="text-sm font-semibold text-gray-900">
            Product Status
          </h2>
          <p className="mt-1 text-xs text-gray-500 md:text-sm">
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
            className="size-8 shrink-0 cursor-pointer md:size-6"
          >
            <ChevronUp
              className={`h-4 w-4 transition-transform duration-200 ease-linear md:h-3 md:w-3 ${isOpen ? "rotate-0" : "rotate-180"}`}
            />
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:grid-cols-2 md:gap-6">
        {/* Flash Sale */}
        <FlashSale form={form} />

        {/* New Arrival */}
        <FormField
          control={form.control}
          name="new_arrival"
          render={({ field }) => (
            <FormItem>
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-secondary shrink-0 rounded p-1.5">
                    <Star size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      New Arrival
                    </p>
                    <p className="mt-0.5 text-xs text-gray-600 md:text-sm">
                      Highlights recently added products to attract attention to
                      your latest offerings.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <FormLabel
                    htmlFor="new_arrival"
                    className="text-sm font-medium text-gray-700"
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
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-secondary shrink-0 rounded p-1.5">
                    <Flame size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Hot Deal
                    </p>
                    <p className="mt-0.5 text-xs text-gray-600 md:text-sm">
                      Promotes special offers and deals without time
                      constraints. Great for ongoing promotions.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <FormLabel
                    htmlFor="hot_deal"
                    className="text-sm font-medium text-gray-700"
                  >
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
              <div className="rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-secondary shrink-0 rounded p-1.5">
                    <Badge size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      Featured
                    </p>
                    <p className="mt-0.5 text-xs text-gray-600 md:text-sm">
                      Highlights premium or recommended products in special
                      collections and homepage sections.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <FormLabel
                    htmlFor="featured"
                    className="text-sm font-medium text-gray-700"
                  >
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
