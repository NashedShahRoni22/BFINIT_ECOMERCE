import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronUp, Clipboard, Clock } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DNSConfiguration({ data }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleTextCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Text copided!");
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="bg-card rounded-lg border p-6"
    >
      {/* dns header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">DNS Configuration</h3>
          <p className="text-muted-foreground mt-1 text-sm">
            Add these records to your domain&apos;s DNS settings. You&apos;ll
            need to add these records in your domain registrar&apos;s control
            panel
          </p>
        </div>

        <CollapsibleTrigger asChild>
          <Button
            type="button"
            variant="secondary"
            size="icon"
            className="shrink-0 hover:cursor-pointer"
          >
            <ChevronUp
              className={`h-5 w-5 transition-transform duration-200 ${
                isOpen ? "rotate-0" : "rotate-180"
              }`}
            />
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="mt-5">
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
          {/* <div className="mt-5 rounded-[10px] border p-6">
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
                      {data?.dnsData?.aRecord}
                    </p>
                    <Clipboard
                      size={18}
                      className="cursor-pointer"
                      onClick={() => handleTextCopy(data?.dnsData?.aRecord)}
                    />
                  </div>
                  <p className="text-sm">Bfinit&apos;s server IP</p>
                </div>

                <div className="space-y-1.5">
                  <p className="text-sm">TTL</p>
                  <div className="flex items-center gap-2">
                    <p className="bg-muted w-full rounded border px-2 py-0.5 text-sm text-gray-900">
                      3600
                    </p>
                    <Clipboard
                      size={18}
                      className="cursor-pointer"
                      onClick={() => handleTextCopy("3600")}
                    />
                  </div>

                  <p className="text-sm">Can be automatic</p>
                </div>
              </div>
            </div> */}

          {/* CNAME Record */}
          <div className="mt-5 rounded-[10px] border p-6">
            <h4 className="font-medium">Record 1: CNAME Record</h4>
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

              {/* <div className="space-y-1.5">
                  <p className="text-sm">HOST/NAME</p>
                  <div className="flex items-center gap-2">
                    <p className="bg-muted w-full rounded border px-2 py-0.5 text-sm text-gray-900">
                      www
                    </p>
                    <Clipboard size={18} className="cursor-pointer" />
                  </div>
                  <p className="text-sm">Enables www.yourdomain.com</p>
                </div> */}

              <div className="space-y-1.5">
                <p className="text-sm">VALUE/POINTS TO</p>
                <div className="flex items-center gap-2">
                  <p className="bg-muted w-full rounded border px-2 py-0.5 text-sm text-gray-900">
                    {data?.dnsData?.cName}
                  </p>
                  <Clipboard
                    size={18}
                    className="cursor-pointer"
                    onClick={() => handleTextCopy(data?.dnsData?.cName)}
                  />
                </div>
                <p className="text-sm">Points to Bfinit hosting</p>
              </div>

              {/* <div className="space-y-1.5">
                  <p className="text-sm">TTL</p>
                  <div className="flex items-center gap-2">
                    <p className="bg-muted w-full rounded border px-2 py-0.5 text-sm text-gray-900">
                      3600
                    </p>
                    <Clipboard
                      size={18}
                      className="cursor-pointer"
                      onClick={() => handleTextCopy("3600")}
                    />
                  </div>

                  <p className="text-sm">Can be automatic</p>
                </div> */}
            </div>
          </div>

          {/* Name Servers */}
          {/* <div className="mt-5 rounded-[10px] border p-6">
              <h4 className="font-medium">Record 3: Name Servers</h4>
              <p className="text-muted-foreground mt-1 text-sm">
                Here is your name servers
              </p>

              <div className="text-muted-foreground mt-3 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                {data?.dnsData?.nameServers?.map((server, i) => (
                  <div key={i} className="space-y-1.5">
                    <p className="text-sm">Name Server {i + 1}</p>
                    <div className="flex items-center gap-2">
                      <p className="bg-muted w-full rounded border px-2 py-0.5 text-sm text-gray-900">
                        {server}
                      </p>
                      <Clipboard
                        size={18}
                        className="cursor-pointer transition-colors hover:text-gray-900"
                        onClick={() => handleTextCopy(server)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div> */}

          {/* TXT Record */}
          {/* <div className="mt-5 rounded-[10px] border p-6">
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
            </div> */}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
