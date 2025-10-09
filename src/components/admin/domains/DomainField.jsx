import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DNSConfiguration from "./DNSConfiguration";
import { Info, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useEffect, useState } from "react";
import useUpdateMutation from "@/hooks/mutations/useUpdateMutation";
import useAuth from "@/hooks/auth/useAuth";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function DomainField({ form, isDomainIntegrated, data }) {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [isActive, setIsActive] = useState(data?.isActive ?? true);
  const [publishId, setPublishId] = useState("");

  const storeId = form.watch("storeId");

  useEffect(() => {
    if (data?.isActive !== undefined) {
      setIsActive(data.isActive);
    }

    if (data?._id) {
      setPublishId(data?._id);
    }
  }, [data?.isActive, data?._id]);

  const { mutate, isPending } = useUpdateMutation({
    token: user?.token,
    clientId: user?.data?.clientid,
  });

  const toggleDomainActive = () => {
    const newStatus = !isActive;
    mutate(
      {
        endpoint: `/publish/domain/live/${newStatus}/${publishId}`,
      },
      {
        onSuccess: () => {
          setIsActive(newStatus);
          queryClient.invalidateQueries([["/publish/status", storeId]]);
          toast.success(
            newStatus
              ? "Domain activated successfully"
              : "Domain deactivated successfully",
          );
        },
        onError: () => {
          toast.error("Failed to update domain status");
        },
      },
    );
  };

  return (
    <>
      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold">
              {isDomainIntegrated
                ? "Update Your Domain"
                : "Connect Your Domain"}
            </h3>
            <p className="text-muted-foreground mt-1 text-sm">
              {isDomainIntegrated
                ? "Update your domain details or configure DNS records"
                : "Enter your domain details and configure DNS records to complete the integration"}
            </p>
          </div>

          {isDomainIntegrated && (
            <div className="flex items-center gap-3">
              <Badge
                variant={isActive ? "default" : "secondary"}
                className={
                  isActive ? "border-green-200 bg-green-100 text-green-700" : ""
                }
              >
                {isPending ? "Updating..." : isActive ? "Active" : "Inactive"}
              </Badge>
              <Switch
                checked={isActive}
                onCheckedChange={toggleDomainActive}
                disabled={data?.isActive === undefined || isPending}
              />
            </div>
          )}
        </div>

        {/* Inactive Domain Alert */}
        {isDomainIntegrated && !isActive && (
          <Alert className="mt-6 border-amber-200 bg-amber-50">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <p className="font-medium">Domain Not Active</p>
              <p className="text-muted-foreground mt-1 text-sm">
                This domain is currently turned off. Your store is not
                accessible via this domain. Use the toggle switch above to
                activate it.
              </p>
            </AlertDescription>
          </Alert>
        )}

        {/* Show existing domain info if integrated */}
        {isDomainIntegrated && (
          <div className="bg-muted/50 mt-6 rounded-lg border px-4 py-3">
            <p className="text-sm">
              <span className="text-muted-foreground">Current Domain:</span>{" "}
              <span className="font-medium">{data?.domainName}</span>
              {!isActive && (
                <span className="text-muted-foreground ml-2 text-xs">
                  (Not serving traffic)
                </span>
              )}
            </p>
          </div>
        )}

        {/* Domain Name Input - Only show when active */}
        {isActive && (
          <FormField
            control={form.control}
            name="domain"
            rules={{
              required: "Domain name is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid domain name",
              },
            }}
            render={({ field }) => (
              <FormItem className="mt-6">
                <FormLabel>
                  Domain Name <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="example.com" {...field} />
                </FormControl>
                <FormDescription>
                  Enter your root domain without &apos;www&apos; or
                  &apos;https://&apos; (e.g., example.com)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Helper message when inactive and trying to edit */}
        {isDomainIntegrated && !isActive && (
          <div className="mt-6 rounded-lg border border-dashed p-4 text-center">
            <Info className="text-muted-foreground mx-auto mb-2 h-8 w-8" />
            <p className="text-muted-foreground text-sm">
              Activate your domain to update settings and configure DNS records
            </p>
          </div>
        )}
      </div>

      {/* DNS Configuration - Only show when active */}
      {isDomainIntegrated && isActive && data && (
        <DNSConfiguration data={data} />
      )}
    </>
  );
}
