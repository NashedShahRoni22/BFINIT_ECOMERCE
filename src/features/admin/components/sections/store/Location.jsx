import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SectionHeader from "../add-product/SectionHeader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

export default function Location({
  form,
  isLoading,
  countries,
  isCountryLoading,
  countryData,
}) {
  const { setValue } = form;

  useEffect(() => {
    if (countryData) {
      setValue("currency_name", countryData?.currency_name);
      setValue("currency_code", countryData?.currency_code);
      setValue("currency_symbol", countryData?.currency_symbol);
      setValue("time_zone", countryData?.timezone);
      setValue("phone_code", countryData?.phone_code);
    }
  }, [countryData, setValue]);

  return (
    <div className="bg-card rounded-lg p-5">
      <SectionHeader
        title="Location"
        description="Select your country and business address. Currency will be set automatically"
      />

      <div className="mt-4 grid grid-cols-1 items-start gap-4 md:mt-6 md:gap-6">
        <FormField
          control={form.control}
          name="country"
          rules={{
            required: "Please select your country",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">
                Country <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  value={field.value}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        isLoading ? "Loading countries..." : "Select country"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {!isLoading &&
                      countries?.length > 0 &&
                      countries?.map((country) => (
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

        <div className="bg-muted/50 border-border flex items-center gap-2 rounded-md border px-3 py-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="text-muted-foreground size-4 shrink-0" />
            </TooltipTrigger>
            <TooltipContent>Automatically set based on country</TooltipContent>
          </Tooltip>
          <p className="text-xs">
            <span className="font-medium">Currency: </span>
            <span>
              {isCountryLoading
                ? "Loading..."
                : `${countryData?.currency_code || "USD"} - ${
                    countryData?.currency_name || "United States Dollar"
                  } (${countryData?.currency_symbol || "$"})`}
            </span>
          </p>
        </div>

        <FormField
          control={form.control}
          name="address"
          rules={{
            required: "Please enter your business address",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">
                Address <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Street address, City, State/Province, Postal Code"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
