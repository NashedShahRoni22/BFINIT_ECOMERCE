import { useEffect } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { X, Plus, Globe } from "lucide-react";
import SectionHeader from "../add-product/SectionHeader";

export default function Location({
  form,
  isLoading,
  countries,
  isCountryLoading,
  countryData,
}) {
  const { watch, setValue } = form;
  const selectedCountries = watch("countries") || [];
  const selectedCountry = watch("country");

  // Auto-fill currency data when country is selected
  useEffect(() => {
    if (countryData && selectedCountry) {
      // Check if this country already exists in the array
      const countryExists = selectedCountries.some(
        (c) => c.country_name === selectedCountry,
      );

      if (!countryExists) {
        const newCountry = {
          country_name: selectedCountry,
          currency_name: countryData?.currency_name || "",
          currency_code: countryData?.currency_code || "",
          currency_symbol: countryData?.currency_symbol || "",
          phone_code: countryData?.phone_code || "", // Add phone_code
          isDefault: selectedCountries.length === 0,
        };

        setValue("countries", [...selectedCountries, newCountry]);
        setValue("country", ""); // Reset selector
      }
    }
  }, [countryData, selectedCountry, selectedCountries, setValue]);

  const handleRemoveCountry = (index) => {
    const updatedCountries = selectedCountries.filter((_, i) => i !== index);

    // If removed country was default and there are others, make first one default
    if (selectedCountries[index].isDefault && updatedCountries.length > 0) {
      updatedCountries[0].isDefault = true;
    }

    setValue("countries", updatedCountries);
  };

  const handleSetDefault = (index) => {
    const updatedCountries = selectedCountries.map((country, i) => ({
      ...country,
      isDefault: i === index,
    }));
    setValue("countries", updatedCountries);
  };

  // Available countries (not yet selected)
  const availableCountries = countries?.filter(
    (country) => !selectedCountries.some((c) => c.country_name === country),
  );

  return (
    <div className="bg-card rounded-lg p-5">
      <SectionHeader
        title="Location"
        description="Select countries where you operate and provide your business address"
      />

      <div className="mt-4 space-y-4 md:mt-6">
        {/* Selected Countries Display */}
        {selectedCountries.length > 0 && (
          <div className="space-y-3">
            <p className="text-muted-foreground text-xs font-medium">
              Selected Countries
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedCountries.map((country, index) => (
                <div
                  key={index}
                  className="bg-muted/50 border-border flex items-center gap-2 rounded-md border px-3 py-1.5"
                >
                  <Globe className="text-muted-foreground size-3.5" />
                  <span className="text-xs font-medium">
                    {country.country_name}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    {country.currency_code} ({country.currency_symbol})
                  </span>
                  {country.isDefault && (
                    <Badge className="h-5 text-xs">Default</Badge>
                  )}
                  {!country.isDefault && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-5 px-2 text-xs"
                      onClick={() => handleSetDefault(index)}
                    >
                      Set Default
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="hover:bg-destructive/10 hover:text-destructive -mr-1 ml-1 size-5"
                    onClick={() => handleRemoveCountry(index)}
                    disabled={selectedCountries.length === 1}
                  >
                    <X className="size-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Country Select */}
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">
                Add Country{" "}
                {selectedCountries.length === 0 && (
                  <span className="text-destructive">*</span>
                )}
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}
                  disabled={isLoading || isCountryLoading}
                >
                  <SelectTrigger className="w-full">
                    <div className="flex items-center gap-2">
                      <Plus className="size-4" />
                      <SelectValue
                        placeholder={
                          isLoading
                            ? "Loading countries..."
                            : availableCountries?.length === 0
                              ? "All countries added"
                              : "Select a country to add"
                        }
                      />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {!isLoading &&
                      availableCountries?.length > 0 &&
                      availableCountries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        {/* Business Address */}
        <FormField
          control={form.control}
          name="address"
          rules={{
            required: "Please enter your business address",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">
                Business Address <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Street address, City, State/Province, Postal Code"
                  {...field}
                  rows={3}
                />
              </FormControl>
              <p className="text-muted-foreground text-xs">
                This address will be used for all countries
              </p>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
