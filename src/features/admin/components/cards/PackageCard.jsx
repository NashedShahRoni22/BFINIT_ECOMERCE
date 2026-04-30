import { Link } from "react-router";
import { Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export default function PackageCard({ pack }) {
  const {
    id,
    package_name,
    package_type_label,
    is_active,
    short_description,
    max_store,
    product_limit,
    max_storage,
    precedence,
    subscription_periods = [],
  } = pack;

  const monthlyPrice = subscription_periods.find((p) => p.duration === 1);
  const yearlyPlan = subscription_periods.find((p) => p.duration === 12);

  return (
    <div
      className={cn(
        "bg-card flex flex-col rounded-md border p-4",
        !is_active && "opacity-60",
      )}
    >
      <div className="flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div>
            {package_type_label && (
              <p className="text-muted-foreground mb-0.5 text-xs">
                {package_type_label}
              </p>
            )}
            <span className="text-sm font-medium">{package_name}</span>
          </div>
          <Switch checked={is_active} />
        </div>

        {/* Status row */}
        <div className="mt-2 flex items-center gap-1.5">
          <span
            className={cn(
              "size-1.5 shrink-0 rounded-full",
              is_active ? "bg-success" : "bg-destructive",
            )}
          />
          <span className="text-muted-foreground text-xs">
            {is_active ? "Active" : "Inactive"}
          </span>
          {subscription_periods.length > 0 && (
            <>
              <span className="text-muted-foreground text-xs">·</span>
              <span className="text-muted-foreground text-xs">
                {subscription_periods.length} billing{" "}
                {subscription_periods.length === 1 ? "period" : "periods"}
              </span>
            </>
          )}
        </div>

        {/* Short description */}
        <p className="text-muted-foreground mt-3 line-clamp-2 text-xs leading-relaxed">
          {short_description}
        </p>

        {/* Price */}
        <div className="mt-4">
          <div className="flex items-baseline gap-1.5">
            {monthlyPrice ? (
              <>
                <span className="text-xl font-semibold">
                  €{parseFloat(monthlyPrice.price).toFixed(2)}
                </span>
                <span className="text-muted-foreground text-xs">/month</span>
              </>
            ) : (
              <span className="text-muted-foreground text-xs italic">
                No monthly price
              </span>
            )}
          </div>
          {yearlyPlan?.offer_percentage && (
            <p className="text-success mt-1 text-xs">
              Save {yearlyPlan.offer_percentage}% billed yearly
            </p>
          )}
        </div>
      </div>

      <div>
        <Separator className="my-4" />

        {/* Meta */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          <div>
            <p className="text-muted-foreground text-xs">Max Stores</p>
            <p className="mt-0.5 text-sm font-medium">{max_store}</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Products</p>
            <p className="mt-0.5 text-sm font-medium">
              {product_limit === null ? "Unlimited" : product_limit}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Storage</p>
            <p className="mt-0.5 text-sm font-medium">
              {max_storage > 0 ? (
                `${max_storage} GB`
              ) : (
                <Minus className="size-4" />
              )}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs">Precedence</p>
            <p className="mt-0.5 text-sm font-medium">#{precedence}</p>
          </div>
        </div>

        <Separator className="my-4" />

        <Button
          variant="outline"
          size="sm"
          className="w-full rounded text-xs"
          asChild
        >
          <Link to={`/packages/edit/${id}`}>Edit</Link>
        </Button>
      </div>
    </div>
  );
}
