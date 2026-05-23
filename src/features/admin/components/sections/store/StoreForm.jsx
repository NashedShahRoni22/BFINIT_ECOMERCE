import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { ChevronLeft, Store } from "lucide-react";
import toast from "react-hot-toast";
import Branding from "./Branding";
import Location from "./Location";
import StoreInfo from "./StoreInfo";
import Social from "./Social";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Spinner } from "@/components/ui/spinner";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import PageHeader from "@/components/shared/PageHeader";
import { usePostMutation } from "@/hooks-v2/api/usePostMutation";
import { breadcrubms } from "@/features/admin/utils/constants/breadcrumbs";
import { createStorePayload } from "@/features/admin/utils/storeHelpers";

export default function StoreForm() {
  const { mutate, isPending } = usePostMutation({
    endpoint: "/api/v1/store",
    isTokenRequired: true,
  });

  const form = useForm({
    values: {
      logo: null,
      name: "",
      countries: [],
      default_country_id: null,
      is_active: true,
    },
  });

  const { handleSubmit } = form;

  const onSubmit = (data) => {
    const formData = createStorePayload(data);

    mutate(formData, {
      onSuccess: (data) => {
        console.log(data);
        if (!data?.success) {
          return toast.error(data?.message);
        }
      },

      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.createStore} />
      <PageHeader
        icon={Store}
        title="Create New Store"
        description="Enter your store details to get started"
      />

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <fieldset
            disabled={isPending}
            className={`space-y-6 ${isPending ? "pointer-events-none" : ""}`}
          >
            <Branding form={form} />
            <StoreInfo form={form} />
            <Location form={form} />
            {/* <Social form={form} /> */}
          </fieldset>

          {/* submit buttons */}
          <div className="flex flex-col-reverse gap-4 lg:flex-row lg:justify-between">
            <Button asChild size="sm" variant="outline">
              <Link to="/">
                <ChevronLeft /> Back to Home
              </Link>
            </Button>

            <Button type="submit" disabled={isPending} size="sm">
              {isPending ? (
                <>
                  <Spinner /> Creating...
                </>
              ) : (
                "Create Store"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
