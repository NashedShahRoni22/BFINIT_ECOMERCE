import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, ArrowRight, Clipboard, Clock } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router";

export default function DNSConfiguration({ data }) {
  const handleTextCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Text copied!");
  };

  return (
    <div className="border-border bg-card rounded-lg border p-6">
      {/* dns header */}
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-0.5">
          <h3 className="text-sm font-semibold">DNS Configuration</h3>
          <p className="text-muted-foreground text-xs">
            Add these records to your Cloudflare DNS settings. Your domain must
            be managed through Cloudflare for this setup to work.
          </p>
        </div>

        {/* section collapse toggle button */}
        <Button variant="link" size="sm" asChild className="text-xs">
          <Link to="/help/domain-setup">
            View Complete Guide <ArrowRight />
          </Link>
        </Button>
      </div>

      {/* content */}
      <div className="mt-6 space-y-6">
        {/* time warning */}
        <Alert variant="warning">
          <Clock />
          <AlertTitle className="text-xs">DNS Propagation Time</AlertTitle>
          <AlertDescription className="text-xs">
            DNS changes can take up to 48 hours to propagate worldwide, but
            typically complete within 1-4 hours
          </AlertDescription>
        </Alert>

        {/* required records */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold">
            Cloudflare DNS Records Setup
          </h3>

          {/* Record 1 Root Domain */}
          <div className="border-border bg-card rounded-lg border p-5">
            <h4 className="text-xs font-semibold">Record 1: Root Domain (@)</h4>
            <p className="text-muted-foreground mt-1 text-xs">
              Points yourdomain.com to your store
            </p>

            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              <div className="space-y-2">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  Type
                </p>
                <div className="flex items-center gap-2">
                  <div className="border-border bg-muted flex-1 rounded-md border px-3 py-2 font-mono text-xs">
                    CNAME
                  </div>
                </div>
                <p className="text-muted-foreground text-xs">Record type</p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  NAME
                </p>
                <div className="flex items-center gap-2">
                  <div className="border-border bg-muted flex-1 rounded-md border px-3 py-2 font-mono text-xs">
                    @
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    onClick={() => handleTextCopy("@")}
                  >
                    <Clipboard className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground text-xs">
                  Use @ for root domain
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  Target
                </p>
                <div className="flex items-center gap-2">
                  <div className="border-border bg-muted flex-1 rounded-md border px-3 py-2 font-mono text-xs">
                    {data?.dnsData?.cName}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    onClick={() => handleTextCopy(data?.dnsData?.cName)}
                  >
                    <Clipboard className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground text-xs">
                  Points to Bfinit server
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  Proxy Status
                </p>
                <div className="flex items-center gap-2 px-3 py-2">
                  <Switch
                    defaultChecked
                    disabled
                    className="disabled:cursor-default disabled:opacity-100 data-[state=checked]:bg-[#f6821f]"
                  />
                </div>
                <p className="text-muted-foreground text-xs">Must be enabled</p>
              </div>
            </div>
          </div>

          {/* Record 2 for subdomain */}
          <div className="border-border bg-card rounded-lg border p-5">
            <h4 className="text-xs font-semibold">Record 2: WWW Subdomain</h4>
            <p className="text-muted-foreground mt-1 text-xs">
              Points www.yourdomain.com to your store
            </p>

            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
              <div className="space-y-2">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  Type
                </p>
                <div className="flex items-center gap-2">
                  <div className="border-border bg-muted flex-1 rounded-md border px-3 py-2 font-mono text-xs">
                    CNAME
                  </div>
                </div>
                <p className="text-muted-foreground text-xs">Record type</p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  NAME
                </p>
                <div className="flex items-center gap-2">
                  <div className="border-border bg-muted flex-1 rounded-md border px-3 py-2 font-mono text-xs">
                    www
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    onClick={() => handleTextCopy("www")}
                  >
                    <Clipboard className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground text-xs">
                  Enables www subdomain
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  Target
                </p>
                <div className="flex items-center gap-2">
                  <div className="border-border bg-muted flex-1 rounded-md border px-3 py-2 font-mono text-xs">
                    {data?.dnsData?.cName}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    onClick={() => handleTextCopy(data?.dnsData?.cName)}
                  >
                    <Clipboard className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground text-xs">
                  Points to Bfinit server
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  Proxy Status
                </p>
                <div className="flex items-center gap-2 px-3 py-2">
                  <Switch
                    defaultChecked
                    disabled
                    className="disabled:cursor-default disabled:opacity-100 data-[state=checked]:bg-[#f6821f]"
                  />
                </div>
                <p className="text-muted-foreground text-xs">Must be enabled</p>
              </div>
            </div>
          </div>

          {/* Help Banner */}
          <Alert variant="info">
            <AlertCircle />
            <AlertTitle className="text-xs">
              Need help setting up Cloudflare DNS?
            </AlertTitle>
            <AlertDescription className="text-xs">
              <p>
                View our complete guide for adding these records in your
                Cloudflare dashboard.
              </p>

              {/* Provider Quick Links */}
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="link"
                  size="sm"
                  asChild
                  className="px-0 text-xs"
                >
                  <Link to="/help/domain-setup">
                    View Cloudflare Setup Guide →
                  </Link>
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
