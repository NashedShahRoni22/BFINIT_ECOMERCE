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
import LimitedStock from "./LimitedStock";
import BestSeller from "./BestSeller";
import FlashSale from "./FlashSale";
import SectionHeader from "../SectionHeader";

export default function ProductStatus({ form }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="bg-card rounded-lg border p-5"
    >
      {/* header */}
      <div className="flex items-start justify-between gap-3">
        <SectionHeader
          title="Product Status"
          description="Select one or more status badges to display on the product. These
            help customers discover products and appear on product cards"
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

      <CollapsibleContent className="mt-4 grid grid-cols-1 gap-4 md:mt-6 md:grid-cols-2 md:gap-6">
        {/* Bestseller */}
        <BestSeller form={form} />

        {/* Featured */}
        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem>
              <div className="bg-card rounded-lg border p-5">
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div className="bg-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-md">
                    <Badge className="text-muted-foreground h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <h4 className="text-xs font-semibold">Featured</h4>
                    <p className="text-muted-foreground text-xs">
                      Highlights premium or recommended products in special
                      collections and homepage sections.
                    </p>
                  </div>
                </div>

                {/* Toggle */}
                <div className="mt-4 flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <FormLabel htmlFor="featured" className="text-xs">
                    Enable Featured badge
                  </FormLabel>
                  <FormControl>
                    <Switch
                      id="featured"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* New Arrival */}
        <FormField
          control={form.control}
          name="new_arrival"
          render={({ field }) => (
            <FormItem>
              <div className="bg-card rounded-lg border p-5">
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div className="bg-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-md">
                    <Star className="text-muted-foreground h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <h4 className="text-xs font-semibold">New Arrival</h4>
                    <p className="text-muted-foreground text-xs">
                      Highlights recently added products to attract attention to
                      your latest offerings.
                    </p>
                  </div>
                </div>

                {/* Toggle */}
                <div className="mt-4 flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <FormLabel htmlFor="new_arrival" className="text-xs">
                    Enable New Arrival badge
                  </FormLabel>
                  <FormControl>
                    <Switch
                      id="new_arrival"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Hot Deal */}
        <FormField
          control={form.control}
          name="hot_deal"
          render={({ field }) => (
            <FormItem>
              <div className="bg-card rounded-lg border p-5">
                {/* Header */}
                <div className="flex items-start gap-3">
                  <div className="bg-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-md">
                    <Flame className="text-muted-foreground h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <h4 className="text-xs font-semibold">Hot Deal</h4>
                    <p className="text-muted-foreground text-xs">
                      Promotes special offers and deals without time
                      constraints. Great for ongoing promotions.
                    </p>
                  </div>
                </div>

                {/* Toggle */}
                <div className="mt-4 flex w-full flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <FormLabel htmlFor="hot_deal" className="text-xs">
                    Enable Hot Deal badge
                  </FormLabel>
                  <FormControl>
                    <Switch
                      id="hot_deal"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Flash Sale */}
        <FlashSale form={form} />

        {/* Limited Stock */}
        <LimitedStock form={form} />
      </CollapsibleContent>
    </Collapsible>
  );
}
