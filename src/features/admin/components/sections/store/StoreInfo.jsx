import { useEffect, useRef, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SectionHeader from "../add-product/SectionHeader";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

export default function StoreInfo({ form, countryData, isLoading }) {
  const phoneCodePrefixRef = useRef();
  const [prefixWidth, setPrefixWidth] = useState(0);

  useEffect(() => {
    if (phoneCodePrefixRef.current) {
      setPrefixWidth(phoneCodePrefixRef.current.offsetWidth);
    }
  }, [countryData, isLoading]);

  return (
    <div className="bg-card p-5 rounded-lg">
      <SectionHeader
        title="Store Information"
        description="Enter your store name and contact details for customer communication"
      />

      <div className="mt-4 grid grid-cols-1 items-start gap-4 md:mt-6 md:grid-cols-2 md:gap-6">
        <FormField
          control={form.control}
          name="name"
          rules={{
            required: "Please enter your store name",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">
                Store Name <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter store name" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          rules={{
            required: "Please enter your email address",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Please enter a valid email address",
            },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">
                Email <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="store@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mobile"
          rules={{
            required: "Please enter your mobile number",
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">
                Mobile No <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <span
                    ref={phoneCodePrefixRef}
                    className="text-muted-foreground pointer-events-none absolute left-3 text-sm"
                  >
                    {isLoading ? <Spinner /> : countryData?.phone_code || "+1"}
                  </span>
                  <Input
                    type="tel"
                    placeholder="(212) 000-0000"
                    {...field}
                    style={{ paddingLeft: `${prefixWidth + 20}px` }}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="telephone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Telephone</FormLabel>
              <FormControl>
                <div className="relative flex items-center">
                  <span
                    ref={phoneCodePrefixRef}
                    className="text-muted-foreground pointer-events-none absolute left-3 text-sm"
                  >
                    {isLoading ? <Spinner /> : countryData?.phone_code || "+1"}
                  </span>

                  <Input
                    type="tel"
                    placeholder="(212) 000-0000"
                    {...field}
                    style={{ paddingLeft: `${prefixWidth + 20}px` }}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
