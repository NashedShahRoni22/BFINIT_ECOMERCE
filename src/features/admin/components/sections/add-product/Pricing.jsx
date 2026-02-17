import { useState, useCallback, useMemo } from "react";
import { ChevronUp, Globe, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SectionHeader from "./SectionHeader";
import CountryPricingForm from "./CountryPricingForm";
import CountryVariants from "./CountryVariants";

export default function CountryPricing({ form, countries = [] }) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeCountryTab, setActiveCountryTab] = useState(
    countries.find((c) => c.isDefault)?._id || countries[0]?._id,
  );

  // Get default country data structure
  const getDefaultCountryData = useCallback(
    (countryId) => ({
      countryId,
      productPrice: "",
      productCost: "",
      discountPrice: "",
      shippingCharges: "",
      tax: false,
      status: true,
      variants: {
        enabled: false,
        useDefaultPricing: true,
        attributes: [],
      },
    }),
    [],
  );

  // Get current pricing data from form
  const currentPricing = form.watch("pricing") || [];

  // Find or create country data
  const getCountryData = useCallback(
    (countryId) => {
      const existing = currentPricing.find((p) => p.countryId === countryId);
      return existing || getDefaultCountryData(countryId);
    },
    [currentPricing, getDefaultCountryData],
  );

  // Update country pricing - directly updates form
  const updateCountryPricing = useCallback(
    (countryId, field, value) => {
      const currentPricing = form.getValues("pricing") || [];

      // Find existing country data or create new
      const existingIndex = currentPricing.findIndex(
        (p) => p.countryId === countryId,
      );

      if (existingIndex >= 0) {
        // Update existing
        const updated = [...currentPricing];
        updated[existingIndex] = {
          ...updated[existingIndex],
          [field]: value,
        };
        form.setValue("pricing", updated, { shouldValidate: false });
      } else {
        // Add new
        const newCountryData = {
          ...getDefaultCountryData(countryId),
          [field]: value,
        };
        form.setValue("pricing", [...currentPricing, newCountryData], {
          shouldValidate: false,
        });
      }
    },
    [form, getDefaultCountryData],
  );

  // Check if country has data
  const hasDataForCountry = useCallback(
    (countryId) => {
      const data = currentPricing.find((p) => p.countryId === countryId);
      return (
        data &&
        (data.productPrice ||
          data.productCost ||
          data.discountPrice ||
          data.variants?.enabled)
      );
    },
    [currentPricing],
  );

  if (countries.length === 0) {
    return (
      <div className="bg-card rounded-lg border p-5">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="text-xs">No Countries Configured</AlertTitle>
          <AlertDescription className="text-xs">
            Please configure countries in your store settings before adding
            products.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="bg-card rounded-lg border p-5"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <SectionHeader
          title="Country-Based Pricing & Variants"
          description="Set different prices and variants for each country your store operates in"
        />

        {/* Section collapse toggle button */}
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

      <CollapsibleContent className="mt-6">
        {/* Country Tabs */}
        <Tabs
          value={activeCountryTab}
          onValueChange={setActiveCountryTab}
          className="w-full"
        >
          <TabsList className="bg-muted inline-flex h-auto w-full justify-start gap-2 overflow-x-auto rounded-lg p-1">
            {countries.map((country) => (
              <TabsTrigger
                key={country._id}
                value={country._id}
                className="data-[state=active]:bg-background relative flex shrink-0 items-center gap-2 rounded-md px-3 py-2 text-xs transition-all"
              >
                <Globe className="h-3 w-3" />
                <span>{country.country_name}</span>
                {country.isDefault && (
                  <Badge
                    variant="secondary"
                    className="ml-1 h-4 px-1 text-[10px]"
                  >
                    Default
                  </Badge>
                )}
                {hasDataForCountry(country._id) && (
                  <span className="bg-primary absolute top-1 right-1 h-1.5 w-1.5 rounded-full" />
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {countries.map((country) => (
            <TabsContent
              key={country._id}
              value={country._id}
              className="mt-6 space-y-6"
            >
              {/* Pricing Section */}
              <CountryPricingForm
                country={country}
                data={getCountryData(country._id)}
                onUpdate={updateCountryPricing}
              />

              {/* Variants Section */}
              <CountryVariants
                country={country}
                data={getCountryData(country._id)}
                onUpdate={updateCountryPricing}
                form={form}
              />
            </TabsContent>
          ))}
        </Tabs>
      </CollapsibleContent>
    </Collapsible>
  );
}
