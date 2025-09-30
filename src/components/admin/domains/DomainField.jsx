import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DNSConfiguration from "./DNSConfiguration";
import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function DomainField({ form, isDomainIntegrated, data }) {
  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">
            {isDomainIntegrated ? "Update Your Domain" : "Connect Your Domain"}
          </h3>
          <p className="text-muted-foreground mt-1 text-sm">
            {isDomainIntegrated
              ? "Update your domain details or configure DNS records"
              : "Enter your domain details and configure DNS records to complete the integration"}
          </p>
        </div>
      </div>

      {/* Show existing domain info if integrated */}
      {isDomainIntegrated && (
        <div className="bg-muted/50 mt-6 rounded-lg border px-4 py-3">
          <div className="flex items-center justify-between">
            <p className="text-sm">
              <span className="text-muted-foreground">Current Domain:</span>{" "}
              <span className="font-medium">{data?.domainName}</span>
            </p>
            {data?.isActive && (
              <Badge variant="secondary" className="gap-1.5 text-green-600">
                <CheckCircle2 size={161} className="shrink-0" />
                Active
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Domain Name Input */}
      <FormField
        control={form.control}
        name="domain"
        rules={{
          required: "Domain name is required",
          pattern: {
            value: /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
            message: "Please enter a valid domain name",
          },
        }}
        render={({ field }) => (
          <FormItem className="mt-6">
            <FormLabel>
              Domain Name <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="example.com" {...field} />
            </FormControl>
            <FormDescription>
              Enter your root domain without &apos;www&apos; or
              &apos;https://&apos; (e.g., example.com)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {isDomainIntegrated && data && <DNSConfiguration data={data} />}
    </div>
  );
}
