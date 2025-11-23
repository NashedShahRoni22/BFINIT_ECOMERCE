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
import { AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
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
      <div className="bg-card rounded-lg border p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-0.5">
            <h3 className="text-foreground text-sm font-semibold">
              {isDomainIntegrated
                ? "Update Your Domain"
                : "Connect Your Domain"}
            </h3>
            <p className="text-muted-foreground text-xs">
              {isDomainIntegrated
                ? "Update your domain details or configure DNS records"
                : "Enter your domain details and configure DNS records to complete the integration"}
            </p>
          </div>

          {isDomainIntegrated && (
            <div className="flex shrink-0 items-center gap-2">
              <Badge variant={isActive ? "active" : "inactive"} showDot>
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
          <Alert variant="warning" className="mt-5">
            <AlertCircle />
            <AlertTitle>Domain Not Active</AlertTitle>
            <AlertDescription>
              This domain is currently turned off. Your store is not accessible
              via this domain. Use the toggle switch above to activate it.
            </AlertDescription>
          </Alert>
        )}

        {/* Current Domain */}
        {isDomainIntegrated && (
          <div className="bg-muted/50 mt-5 rounded-lg border px-3.5 py-2.5">
            <p className="text-foreground text-xs">
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

        {/* Domain Name Input */}
        {(!isDomainIntegrated || (isDomainIntegrated && isActive)) && (
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
              <FormItem className="mt-5">
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
      </div>

      {/* DNS Configuration - Only show when active */}
      {isDomainIntegrated && isActive && data && (
        <DNSConfiguration data={data} />
      )}
    </>
  );
}
