import DomainField from "@/components/admin/domains/DomainField";
import DomainOwnership from "@/components/admin/domains/DomainOwnership";
import NewDomain from "@/components/admin/domains/NewDomain";
import SelectStore from "@/components/admin/domains/SelectStore";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import useAuth from "@/hooks/auth/useAuth";
import usePostMutation from "@/hooks/mutations/usePostMutation";
import useUpdateMutation from "@/hooks/mutations/useUpdateMutation";
import useGetQuery from "@/hooks/queries/useGetQuery";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router";

export default function Domains() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const form = useForm({
    defaultValues: {
      domainOwnership: "has-domain",
    },
    mode: "onChange",
  });

  const { handleSubmit, watch } = form;
  const storeId = watch("storeId");

  // Query get api fetch conditions
  const isFetchEnabled = !!storeId && !!user?.token && !!user?.data?.clientid;

  // Fetch domain data is domain added or not
  const { data } = useGetQuery({
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

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <SelectStore
          form={form}
          storeId={storeId}
          title="Select Your Store"
          description="Choose which store to configure domain settings for"
          placeholder="Select a store"
          alertMessage="Each store can have its own custom domain"
        />

        {storeId && !isDomainIntegrated && <DomainOwnership form={form} />}

        {/* Conditional Domain field Rendering based on selection */}
        {storeId && form.watch("domainOwnership") === "need-domain" && (
          <NewDomain />
        )}

        {storeId && form.watch("domainOwnership") === "has-domain" && (
          <DomainField
            form={form}
            isDomainIntegrated={isDomainIntegrated}
            data={data?.data}
          />
        )}

        <div className="flex flex-col-reverse gap-4 lg:flex-row lg:justify-between">
          <Button variant="outline" size="lg" asChild>
            <Link to="/">
              <ChevronLeft /> Back to stores
            </Link>
          </Button>

          {/* optional submit button for custom domain */}
          {storeId && form.watch("domainOwnership") !== "need-domain" && (
            <div className="flex flex-col-reverse gap-4 lg:flex-row">
              <Button variant="outline" size="lg" className="cursor-pointer">
                Save as Draft
              </Button>

              <Button type="submit" size="lg" className="cursor-pointer">
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
  );
}
