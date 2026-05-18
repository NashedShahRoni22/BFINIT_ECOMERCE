import { useState } from "react";
import { Link } from "react-router";
import { Minus } from "lucide-react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import usePatchMutation from "@/hooks-v2/api/usePatchMutation";
import { cn } from "@/lib/utils";

export default function PackageCard({ pack }) {
  const queryClient = useQueryClient();

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

  const [isActive, setIsActive] = useState(is_active);
  const monthlyPrice = subscription_periods.find((p) => p.duration === 1);
  const yearlyPlan = subscription_periods.find((p) => p.duration === 12);

  const { mutate, isPending } = usePatchMutation({
    endpoint: `/api/v1/package/status-toggle/${id}`,
  });

  const handleStatusToggle = () => {
    mutate(null, {
      onSuccess: (data) => {
        queryClient.invalidateQueries([
          "/api/v1/package/get-all-admin",
          "packages",
        ]);
        toast.success(data?.message);
        setIsActive((prev) => !prev);
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <div
      className={cn(
        "bg-card flex flex-col rounded-md border p-4",
        !isActive && "opacity-60",
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
          <Switch
            disabled={isPending}
            checked={isActive}
            onCheckedChange={handleStatusToggle}
          />
        </div>

        {/* Status row */}
        <div className="mt-2 flex items-center gap-1.5">
          <span
            className={cn(
              "size-1.5 shrink-0 rounded-full",
              isActive ? "bg-success" : "bg-destructive",
            )}
          />
          <span className="text-muted-foreground text-xs">
            {isActive ? "Active" : "Inactive"}
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
          disabled={!isActive}
          variant="outline"
          size="sm"
          className="w-full rounded text-xs"
          asChild
        >
          <Link to={`/super-admin/packages/edit/${id}`}>Edit</Link>
        </Button>
      </div>
    </div>
  );
}
