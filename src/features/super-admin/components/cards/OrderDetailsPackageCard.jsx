import { Package } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/utils/formatDate";

export default function OrderDetailsPackageCard({ orderDetails = {} }) {
  const { package_upgrade, package_order } = orderDetails;

  const duration = package_upgrade?.subscriptionPeriod?.duration;
  const descriptions = package_upgrade?.package?.description ?? [];
  const visibleFeatures = descriptions?.slice(0, 6);
  const remainingCount = Math.max(0, descriptions?.length - 6);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
          <Package
            className="mr-1.5 inline h-3.5 w-3.5 align-[-2px]"
            aria-hidden="true"
          />
          Package
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Plan name + badge */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold">
              {package_upgrade?.package?.package_name}
            </p>
            <p className="text-muted-foreground mt-0.5 text-xs">
              {package_upgrade?.package?.package_type_label} ·{" "}
              {duration >= 12
                ? "1 year subscription"
                : `${duration} month subscription`}
            </p>
          </div>
          <Badge variant="outline" className="shrink-0 text-xs font-normal">
            {package_upgrade?.package?.package_type_label}
          </Badge>
        </div>

        <Separator />

        {/* Spec rows */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs">Max stores</span>
            <span className="text-xs font-medium">
              {package_upgrade?.package?.max_store}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs">Product limit</span>
            <span className="text-xs font-medium">
              {package_upgrade?.package?.product_limit}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-xs">Storage</span>
            <span className="text-xs font-medium">
              {package_upgrade?.package?.max_storage} GB
            </span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <span className="text-muted-foreground shrink-0 text-xs">
              Subscription period
            </span>
            <span className="text-right text-xs font-medium">
              {formatDate(package_order?.created_at)} →{" "}
              {formatDate(package_order?.expire_at)}
            </span>
          </div>
        </div>

        <Separator />

        {/* Feature pills */}
        <div className="flex flex-wrap gap-1.5">
          {visibleFeatures?.map((feature) => (
            <span
              key={feature}
              className="border-border bg-muted text-muted-foreground inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs"
            >
              {feature}
            </span>
          ))}
          {remainingCount > 0 && (
            <span className="border-border bg-muted text-muted-foreground inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs">
              +{remainingCount} more
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
