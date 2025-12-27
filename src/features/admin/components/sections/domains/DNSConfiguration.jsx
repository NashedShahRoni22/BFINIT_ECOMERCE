import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, BookOpen, Clipboard, Clock, Info } from "lucide-react";
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
            Add these records to your domain&apos;s DNS settings. You&apos;ll
            need to add these records in your domain registrar&apos;s control
            panel
          </p>
        </div>

        {/* section collapse toggle button */}
        <Button variant="outline" size="sm" asChild>
          <Link to="/help/domain-setup">
            <BookOpen />
            Setup Guide
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
          <h3 className="text-sm font-semibold">Required DNS Records</h3>

          {/* A RECORD */}
          <div className="border-border bg-card rounded-lg border p-5">
            <h4 className="text-xs font-semibold">Record 1: A Record</h4>
            <p className="text-muted-foreground mt-1 text-xs">
              Points your domain to our server
            </p>

            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              <div className="space-y-2">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  HOST/NAME
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
                  Use &apos;@&apos; for root domain
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  VALUE/POINTS TO
                </p>
                <div className="flex items-center gap-2">
                  <div className="border-border bg-muted flex-1 rounded-md border px-3 py-2 font-mono text-xs">
                    {data?.dnsData?.aRecord}
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    onClick={() => handleTextCopy(data?.dnsData?.aRecord)}
                  >
                    <Clipboard className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground text-xs">
                  Bfinit&apos;s server IP
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  TTL
                </p>
                <div className="flex items-center gap-2">
                  <div className="border-border bg-muted flex-1 rounded-md border px-3 py-2 font-mono text-xs">
                    3600
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    onClick={() => handleTextCopy("3600")}
                  >
                    <Clipboard className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground text-xs">
                  Can be automatic
                </p>
              </div>
            </div>
          </div>

          {/* CNAME Record */}
          <div className="border-border bg-card rounded-lg border p-5">
            <h4 className="text-xs font-semibold">Record 2: CNAME Record</h4>
            <p className="text-muted-foreground mt-1 text-xs">
              Connects your www subdomain
            </p>

            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              <div className="space-y-2">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  HOST/NAME
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
                  Enables www.yourdomain.com
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  VALUE/POINTS TO
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
                  Points to Bfinit hosting
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  TTL
                </p>
                <div className="flex items-center gap-2">
                  <div className="border-border bg-muted flex-1 rounded-md border px-3 py-2 font-mono text-xs">
                    Default
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 shrink-0"
                    onClick={() => handleTextCopy("default")}
                  >
                    <Clipboard className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-muted-foreground text-xs">
                  Can be automatic
                </p>
              </div>
            </div>
          </div>

          {/* Help Banner */}
          <Alert variant="info">
            <AlertCircle />
            <AlertTitle className="text-xs">
              Need help adding these DNS records?
            </AlertTitle>
            <AlertDescription className="text-xs">
              <p>
                We&apos;ve created step-by-step guides for popular domain
                providers to help you connect your domain.
              </p>

              {/* Provider Quick Links */}
              <div className="flex flex-wrap items-center gap-2">
                <Button variant="link" size="sm" asChild className="px-0">
                  <Link to="/help/domain-setup">Complete Setup Guide →</Link>
                </Button>
                {/* <span className="text-muted-foreground">|</span>
                <Button
                  variant="link"
                  size="sm"
                  className="text-primary hover:text-primary/80 h-auto p-0"
                  asChild
                >
                  <Link to="/help/domain-setup/godaddy">GoDaddy</Link>
                </Button>
                <span className="text-muted-foreground">|</span>
                <Button
                  variant="link"
                  size="sm"
                  className="text-primary hover:text-primary/80 h-auto p-0"
                  asChild
                >
                  <Link to="/help/domain-setup/namecheap">Namecheap</Link>
                </Button>
                <span className="text-muted-foreground">|</span>
                <Button
                  variant="link"
                  size="sm"
                  className="text-primary hover:text-primary/80 h-auto p-0"
                  asChild
                >
                  <Link to="/help/domain-setup/cloudflare">Cloudflare</Link>
                </Button> */}
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
}
