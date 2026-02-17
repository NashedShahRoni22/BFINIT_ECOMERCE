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

export default function StoreInfo({ form }) {
  const phoneCodePrefixRef = useRef();
  const [prefixWidth, setPrefixWidth] = useState(0);

  // Get phone code from default country in countries array
  const countries = form.watch("countries");
  const defaultCountry = countries?.find((c) => c.isDefault) || countries?.[0];
  const phoneCode = defaultCountry?.phone_code || "+1";

  useEffect(() => {
    if (phoneCodePrefixRef.current) {
      setPrefixWidth(phoneCodePrefixRef.current.offsetWidth);
    }
  }, [phoneCode, countries]);

  return (
    <div className="bg-card rounded-lg p-5">
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
                    {!phoneCode ? <Spinner /> : phoneCode}
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
                    {!phoneCode ? <Spinner /> : phoneCode}
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
