import { Link } from "react-router";
import {
  AlertCircle,
  Clock,
  DollarSign,
  Plug,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const domainFeatures = [
  { id: 1, icon: DollarSign, title: "Starting from $23.99/year" },
  { id: 2, icon: ShieldCheck, title: "Free SSL certificate" },
  { id: 3, icon: Clock, title: "24/7 DNS management" },
  { id: 4, icon: Plug, title: "Easy BFINIT integration" },
];

export default function NewDomain() {
  return (
    <div className="bg-card rounded-lg border p-5">
      {/* Header Section */}
      <div className="mb-5 space-y-0.5">
        <h3 className="text-sm font-semibold">Get Your Custom Domain</h3>
        <p className="text-muted-foreground text-xs">
          Purchase a professional domain name for your store from our trusted
          partners
        </p>
      </div>

      {/* Features */}
      <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
        {domainFeatures.map((feat) => (
          <div
            key={feat?.id}
            className="bg-card flex flex-col items-center gap-2 rounded-lg border p-3 text-center"
          >
            <feat.icon className="h-4 w-4" />
            <p className="text-muted-foreground text-xs">{feat?.title}</p>
          </div>
        ))}
      </div>

      {/* Domain Provider */}
      <div className="space-y-3">
        <div className="rounded-lg border p-4">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 flex h-8 w-8 shrink-0 items-center justify-center rounded-md">
              <span className="text-primary text-xs font-medium">BF</span>
            </div>
            <div className="flex-1 space-y-2">
              <div className="space-y-0.5">
                <h4 className="text-xs font-semibold">
                  BFINIT Domain Registration
                </h4>
                <p className="text-muted-foreground text-xs">
                  Starting at $23.99/year for .COM
                </p>
              </div>

              <p className="text-muted-foreground text-xs">
                Register your domain with us and receive everything you need to
                get online with seamless integration to your store
              </p>

              <Button asChild size="sm" className="mt-1">
                <Link
                  to="https://www.secureserver.net/?plid=599412"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Purchase Domain
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Next Step Info */}
        <Alert variant="info">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Next Step</AlertTitle>
          <AlertDescription>
            After purchasing your domain, come back here to connect it to your
            store
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
