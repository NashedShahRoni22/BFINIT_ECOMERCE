import { Button } from "@/components/ui/button";
import { BookOpen, Clipboard, Clock, Info } from "lucide-react";
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
        <div>
          <h3 className="text-foreground text-base font-semibold">
            DNS Configuration
          </h3>
          <p className="text-muted-foreground mt-1.5 text-sm">
            Add these records to your domain&apos;s DNS settings. You&apos;ll
            need to add these records in your domain registrar&apos;s control
            panel
          </p>
        </div>

        {/* section collapse toggle button */}
        <Button variant="outline" size="sm" className="shrink-0" asChild>
          <Link to="/help/domain-setup">
            <BookOpen className="h-4 w-4" />
            Setup Guide
          </Link>
        </Button>
      </div>

      {/* content */}
      <div className="mt-6 space-y-6">
        {/* time warning */}
        <div className="border-warning/20 bg-warning/10 flex items-start gap-3 rounded-lg border px-4 py-3">
          <Clock className="text-warning mt-0.5 h-5 w-5 shrink-0" />
          <div className="space-y-1">
            <p className="text-foreground text-sm font-semibold">
              DNS Propagation Time
            </p>
            <p className="text-muted-foreground text-sm">
              DNS changes can take up to 48 hours to propagate worldwide, but
              typically complete within 1-4 hours
            </p>
          </div>
        </div>

        {/* required records */}
        <div className="space-y-4">
          <h3 className="text-foreground text-sm font-semibold">
            Required DNS Records
          </h3>

          {/* A RECORD */}
          <div className="border-border bg-card rounded-lg border p-5">
            <h4 className="text-foreground text-sm font-semibold">
              Record 1: A Record
            </h4>
            <p className="text-muted-foreground mt-1 text-sm">
              Points your domain to our server
            </p>

            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              <div className="space-y-2">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  HOST/NAME
                </p>
                <div className="flex items-center gap-2">
                  <div className="border-border bg-muted text-foreground flex-1 rounded-md border px-3 py-2 font-mono text-sm">
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
                  <div className="border-border bg-muted text-foreground flex-1 rounded-md border px-3 py-2 font-mono text-sm">
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
                  <div className="border-border bg-muted text-foreground flex-1 rounded-md border px-3 py-2 font-mono text-sm">
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
            <h4 className="text-foreground text-sm font-semibold">
              Record 2: CNAME Record
            </h4>
            <p className="text-muted-foreground mt-1 text-sm">
              Connects your www subdomain
            </p>

            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              <div className="space-y-2">
                <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                  HOST/NAME
                </p>
                <div className="flex items-center gap-2">
                  <div className="border-border bg-muted text-foreground flex-1 rounded-md border px-3 py-2 font-mono text-sm">
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
                  <div className="border-border bg-muted text-foreground flex-1 rounded-md border px-3 py-2 font-mono text-sm">
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
                  <div className="border-border bg-muted text-foreground flex-1 rounded-md border px-3 py-2 font-mono text-sm">
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
          <div className="border-border bg-muted/50 flex items-start gap-3 rounded-lg border p-4">
            <Info className="text-muted-foreground mt-0.5 h-5 w-5 shrink-0" />
            <div className="flex-1 space-y-3">
              <div>
                <p className="text-foreground text-sm font-semibold">
                  Need help adding these DNS records?
                </p>
                <p className="text-muted-foreground mt-1 text-sm">
                  We&apos;ve created step-by-step guides for popular domain
                  providers to help you connect your domain.
                </p>
              </div>

              {/* Provider Quick Links */}
              <div className="flex flex-wrap items-center gap-2">
                <Button
                  variant="link"
                  size="sm"
                  className="text-primary hover:text-primary/80 h-auto p-0"
                  asChild
                >
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
