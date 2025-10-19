import DomainField from "@/components/admin/domains/DomainField";
import DomainOwnership from "@/components/admin/domains/DomainOwnership";
import NewDomain from "@/components/admin/domains/NewDomain";
import DomainSkeleton from "@/components/site/skeleton/DomainSkeleton";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useAuth from "@/hooks/auth/useAuth";
import usePostMutation from "@/hooks/mutations/usePostMutation";
import useUpdateMutation from "@/hooks/mutations/useUpdateMutation";
import useGetQuery from "@/hooks/queries/useGetQuery";
import useSelectedStore from "@/hooks/stores/useSelectedStore";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronLeft, Globe, SlashIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import EmptyStoreState from "@/components/admin/shared/EmptyStoreState";
import PageHeader from "@/components/admin/shared/PageHeader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function Domains() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { selectedStore } = useSelectedStore();

  const form = useForm({
    defaultValues: {
      domainOwnership: "has-domain",
    },
    mode: "onChange",
  });

  const { handleSubmit, setValue } = form;
  const storeId = selectedStore?.storeId;

  // Auto-set storeId when selectedStore changes
  useEffect(() => {
    if (storeId) {
      setValue("storeId", storeId);
    }
  }, [storeId, setValue]);

  // Query get api fetch conditions
  const isFetchEnabled = !!storeId && !!user?.token && !!user?.data?.clientid;

  // Fetch domain data is domain added or not
  const { data, isLoading } = useGetQuery({
    endpoint: `/publish/status/${storeId}`,
    token: user?.token,
    clientId: user?.data?.clientid,
    queryKey: ["/publish/status", storeId],
    enabled: isFetchEnabled,
  });

  // Add new domain
  const { mutate, isPending: isSubmitting } = usePostMutation({
    endpoint: `/publish/domain/add/${storeId}`,
    token: user?.token,
    clientId: user?.data?.clientid,
  });

  // Update domain mutation hook
  const { mutate: updateDomain, isPending: isUpdating } = useUpdateMutation({
    endpoint: `/publish/domain/update/${data?.data?._id}`,
    token: user?.token,
    clientId: user?.data?.clientid,
  });

  const isDomainIntegrated = data && data?.message === "Domain Record Found";

  // Add or Update domain submit handler
  const onSubmit = (values) => {
    if (isDomainIntegrated && data.data.domainName === values.domain) {
      return toast.error(
        "This domain is already connected. Please enter a different domain name.",
      );
    }

    const payload = { domainName: values.domain };

    // add new domain
    if (!isDomainIntegrated) {
      mutate(payload, {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["/publish/status", storeId]);
          toast.success(`Successfully connected ${data?.domain}`);
        },
        onError: (err) => {
          console.error(err);
          toast.error("Failed to connect domain. Please try again.");
        },
      });
      return;
    }

    // update domain name
    updateDomain(payload, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["/publish/status", storeId]);
        toast.success(`Domain updated to ${data?.domain || values.domain}`);
      },
      onError: (err) => {
        console.error(err);
        toast.error("Failed to update domain. Please try again.");
      },
    });
  };

  // Show empty state if no store selected
  if (!selectedStore) {
    return (
      <EmptyStoreState description="Select a store to manage your domain settings." />
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Domain</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <PageHeader
        icon={Globe}
        title="Domain Settings"
        description="Configure a custom domain for"
      />

      {/* Main Form */}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {isLoading ? (
            <DomainSkeleton />
          ) : (
            <>
              {!isDomainIntegrated && <DomainOwnership form={form} />}

              {/* Conditional Domain field Rendering based on selection */}
              {form.watch("domainOwnership") === "need-domain" && <NewDomain />}

              {form.watch("domainOwnership") === "has-domain" && (
                <DomainField
                  form={form}
                  isDomainIntegrated={isDomainIntegrated}
                  data={data?.data}
                />
              )}
            </>
          )}

          {/* Bottom buttons */}
          <div className="flex flex-col-reverse gap-4 border-t border-slate-200 pt-6 lg:flex-row lg:justify-between">
            <Button variant="outline" size="lg" asChild>
              <Link to="/">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>

            {/* Submit button for custom domain */}
            {!isLoading && form.watch("domainOwnership") !== "need-domain" && (
              <div className="flex flex-col-reverse gap-4 lg:flex-row">
                <Button
                  variant="outline"
                  size="lg"
                  className="cursor-pointer"
                  type="button"
                >
                  Save as Draft
                </Button>

                <Button
                  type="submit"
                  size="lg"
                  className="cursor-pointer"
                  disabled={isSubmitting || isUpdating}
                >
                  {isDomainIntegrated
                    ? isUpdating
                      ? "Updating..."
                      : "Update Domain"
                    : isSubmitting
                      ? "Connecting..."
                      : "Connect Domain"}
                </Button>
              </div>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
