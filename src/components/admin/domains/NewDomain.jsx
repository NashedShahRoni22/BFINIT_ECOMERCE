import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  Clock,
  DollarSign,
  Plug,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router";

const domainFeatures = [
  { id: 1, icon: DollarSign, title: "Starting from $23.99/year" },
  { id: 2, icon: ShieldCheck, title: "Free SSL certificate" },
  { id: 3, icon: Clock, title: "24/7 DNS management" },
  { id: 4, icon: Plug, title: "Easy Bfinit integration" },
];

export default function NewDomain() {
  return (
    <div className="bg-card rounded-lg border p-6">
      {/* Header Section */}
      <div className="mb-5 space-y-1">
        <h2 className="text-sm font-semibold text-gray-900">
          Get Your Custom Domain
        </h2>
        <p className="text-sm text-gray-500">
          Purchase a professional domain name for your store from our trusted
          partners
        </p>
      </div>

      {/* features */}
      <div className="mb-4 grid grid-cols-4 gap-3">
        {domainFeatures.map((feat) => (
          <div
            key={feat?.id}
            className="bg-card flex flex-col items-center gap-1.5 rounded-[10px] border px-3 py-3 text-center"
          >
            <feat.icon className="text-muted-foreground size-4" />
            <p className="text-muted-foreground text-xs leading-tight">
              {feat?.title}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        <div className="rounded-[10px] border p-4">
          <div className="flex items-start gap-3">
            <div className="bg-dashboard-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
              <span className="text-primary text-sm font-semibold">BF</span>
            </div>
            <div className="flex-1 space-y-1.5">
              <div>
                <h4 className="text-sm font-semibold">
                  BFINIT Domain Registration
                </h4>
                <p className="text-muted-foreground text-xs">
                  Starting at $23.99/year for .COM
                </p>
              </div>
              <p className="text-muted-foreground text-sm">
                Register your domain with us and receive everything you need to
                get online with seamless integration to your store
              </p>

              <Button asChild size="lg">
                <Link
                  to="https://www.secureserver.net/?plid=599412"
                  target="_blank"
                  className="mt-3 cursor-pointer"
                >
                  Purchase Domain
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-muted/50 flex items-start gap-2 rounded-[10px] border px-4 py-3">
          <ChevronLeft className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
          <div className="space-y-0.5">
            <p className="text-sm font-medium">Next Step</p>
            <p className="text-muted-foreground text-sm">
              After purchasing your domain, come back here to connect it to your
              store
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
