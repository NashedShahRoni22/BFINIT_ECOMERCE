import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Clipboard, Clock } from "lucide-react";

export default function DomainField({ form }) {
  return (
    <div className="bg-card rounded-lg border p-6">
      {/* Header Section */}
      <div className="mb-5 space-y-1">
        <h2 className="text-base font-semibold">Connect Your Domain</h2>
        <p className="text-muted-foreground text-sm">
          Enter your domain details and configure DNS records to complete the
          integration
        </p>
      </div>

      {/* domain field */}
      <FormField
        control={form.control}
        name="domain"
        rules={{
          required: "Domain name is required",
          pattern: {
            value:
              /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/,
            message: "Enter your root domain only (e.g., example.com)",
          },
        }}
        render={({ field }) => (
          <FormItem className="space-y-2">
            <FormLabel className="text-sm font-medium">
              Domain Name <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="example.com" {...field} />
            </FormControl>
            <FormDescription className="text-muted-foreground text-xs">
              Enter your root domain without &apos;www&apos; or
              &apos;https://&apos; (e.g., example.com)
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <hr className="my-6" />

      {/* dns header */}
      <div className="mb-5 space-y-1">
        <h2 className="text-base">DNS Configuration</h2>
        <p className="text-muted-foreground text-sm">
          Add these records to your domain&apos;s DNS settings
        </p>
        <p className="text-muted-foreground text-sm">
          You&apos;ll need to add these records in your domain registrar&apos;s
          control panel
        </p>
      </div>

      {/* time warning */}
      <div className="bg-muted flex items-start gap-2 rounded-[10px] border px-4 py-3">
        <Clock className="text-muted-foreground mt-0.5 size-5" />
        <div className="space-y-0.5">
          <p className="text-muted-foreground text-sm font-semibold">
            DNS Propagation Time
          </p>
          <p className="text-muted-foreground text-sm">
            DNS changes can take up to 48 hours to propagate worldwide, but
            typically complete within 1-4 hours
          </p>
        </div>
      </div>

      {/* required records */}
      <div className="mt-5">
        <h2 className="text-muted-foreground text-base">
          Required DNS Records
        </h2>

        {/* A RECORD */}
        <div className="mt-5 rounded-[10px] border p-6">
          <h4 className="font-medium">Record 1: A Record</h4>
          <p className="text-muted-foreground mt-1 text-sm">
            Points your domain to our server
          </p>

          <div className="text-muted-foreground mt-3 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="space-y-1.5">
              <p className="text-sm">Type</p>
              <div className="bg-muted rounded border px-2 py-0.5 text-sm text-gray-900">
                A
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="text-sm">HOST/NAME</p>
              <div className="flex items-center gap-2">
                <p className="bg-muted w-full rounded border px-2 py-0.5 text-sm text-gray-900">
                  @
                </p>
                <Clipboard size={18} className="cursor-pointer" />
              </div>
              <p className="text-sm">Use &apos;@&apos; for root domain</p>
            </div>

            <div className="space-y-1.5">
              <p className="text-sm">VALUE/POINTS TO</p>
              <div className="flex items-center gap-2">
                <p className="bg-muted w-full rounded border px-2 py-0.5 text-sm text-gray-900">
                  76.76.21.21
                </p>
                <Clipboard size={18} className="cursor-pointer" />
              </div>
              <p className="text-sm">Bfinit&apos;s server IP</p>
            </div>

            <div className="space-y-1.5">
              <p className="text-sm">TTL</p>
              <div className="flex items-center gap-2">
                <p className="bg-muted w-full rounded border px-2 py-0.5 text-sm text-gray-900">
                  3600
                </p>
                <Clipboard size={18} className="cursor-pointer" />
              </div>

              <p className="text-sm">Can be automatic</p>
            </div>
          </div>
        </div>

        {/* CNAME Record */}
        <div className="mt-5 rounded-[10px] border p-6">
          <h4 className="font-medium">Record 2: CNAME Record</h4>
          <p className="text-muted-foreground mt-1 text-sm">
            Connects your www subdomain
          </p>

          <div className="text-muted-foreground mt-3 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="space-y-1.5">
              <p className="text-sm">Type</p>
              <div className="bg-muted rounded border px-2 py-0.5 text-sm text-gray-900">
                CNAME
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="text-sm">HOST/NAME</p>
              <div className="flex items-center gap-2">
                <p className="bg-muted w-full rounded border px-2 py-0.5 text-sm text-gray-900">
                  www
                </p>
                <Clipboard size={18} className="cursor-pointer" />
              </div>
              <p className="text-sm">Enables www.yourdomain.com</p>
            </div>

            <div className="space-y-1.5">
              <p className="text-sm">VALUE/POINTS TO</p>
              <div className="flex items-center gap-2">
                <p className="bg-muted w-full rounded border px-2 py-0.5 text-sm text-gray-900">
                  stores.bfinit.com
                </p>
                <Clipboard size={18} className="cursor-pointer" />
              </div>
              <p className="text-sm">Points to Bfinit hosting</p>
            </div>

            <div className="space-y-1.5">
              <p className="text-sm">TTL</p>
              <div className="flex items-center gap-2">
                <p className="bg-muted w-full rounded border px-2 py-0.5 text-sm text-gray-900">
                  3600
                </p>
                <Clipboard size={18} className="cursor-pointer" />
              </div>

              <p className="text-sm">Can be automatic</p>
            </div>
          </div>
        </div>

        {/* TXT Record */}
        <div className="mt-5 rounded-[10px] border p-6">
          <h4 className="font-medium">Record 3: TXT Record</h4>
          <p className="text-muted-foreground mt-1 text-sm">
            Verifies domain ownership
          </p>

          <div className="text-muted-foreground mt-3 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            <div className="space-y-1.5">
              <p className="text-sm">Type</p>
              <p className="bg-muted rounded border px-2 py-0.5 text-sm text-gray-900">
                TXT
              </p>
            </div>

            <div className="space-y-1.5">
              <p className="text-sm">HOST/NAME</p>
              <div className="flex items-center gap-2">
                <p className="bg-muted w-full rounded border px-2 py-0.5 text-sm text-gray-900">
                  @
                </p>
                <Clipboard size={18} className="cursor-pointer" />
              </div>
              <p className="text-sm">Root domain verification</p>
            </div>

            <div className="space-y-1.5">
              <p className="text-sm">VALUE/TEXT</p>
              <div className="flex items-center gap-2">
                <p className="bg-muted w-full rounded border px-2 py-0.5 text-sm text-gray-900">
                  bfinit-verification=bf789xyz456
                </p>
                <Clipboard size={18} className="cursor-pointer" />
              </div>
              <p className="text-sm">Unique verification code</p>
            </div>

            <div className="space-y-1.5">
              <p className="text-sm">TTL</p>
              <div className="flex items-center gap-2">
                <p className="bg-muted w-full rounded border px-2 py-0.5 text-sm text-gray-900">
                  3600
                </p>
                <Clipboard size={18} className="cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
