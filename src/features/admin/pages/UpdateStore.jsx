import { Link, useNavigate, useParams } from "react-router";
import { useForm, useWatch } from "react-hook-form";
import { ChevronLeft, Store } from "lucide-react";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import PageHeader from "../components/PageHeader";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import useGetQuery from "@/hooks/api/useGetQuery";
import Branding from "../components/sections/store/Branding";
import Location from "../components/sections/store/Location";
import StoreInfo from "../components/sections/store/StoreInfo";
import Social from "../components/sections/store/Social";
import { breadcrubms } from "@/utils/constants/breadcrumbs";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import useAuth from "@/hooks/auth/useAuth";
import { Spinner } from "@/components/ui/spinner";
import useGetStorePreference from "../hooks/store/useGetStorePreference";
import { useEffect } from "react";
import useUpdateMutation from "@/hooks/api/useUpdateMutation";
import {
  createStorePayload,
  fillFormWithStoreData,
} from "../utils/storeHelpers";

export default function UpdateStore() {
  const { storeId } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();
  const queryClient = useQueryClient();

  const form = useForm({
    defaultValues: {
      country: "",
      address: "",
      currency_name: "",
      currency_code: "",
      currency_symbol: "",
      phone_code: "",
      time_zone: "",
      name: "",
      email: "",
      mobile: "",
      telephone: "",
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
    },
  });

  const { setValue } = form;
  const selectedCountry = useWatch({
    control: form.control,
    name: "country",
  });

  const { data: store, isLoading: isStoreLoading } =
    useGetStorePreference(storeId);

  const { data: countries, isLoading } = useGetQuery({
    endpoint: "/api/countries",
    queryKey: ["countries"],
  });

  const { data: countryData, isLoading: isCountryLoading } = useGetQuery({
    endpoint: `/api/countries/${selectedCountry}`,
    queryKey: ["country", selectedCountry],
    enabled: !!selectedCountry,
  });

  const { mutate, isPending } = useUpdateMutation({
    endpoint: `/store/main/update/${storeId}`,
    token: true,
    clientId: true,
  });

  useEffect(() => {
    fillFormWithStoreData(store, countryData, setValue);
  }, [store, countryData, setValue]);

  const onSubmit = (data) => {
    const storePayload = createStorePayload(data);

    mutate(storePayload, {
      onSuccess: () => {
        toast.success("Store updated successfully!");
        queryClient.invalidateQueries([
          "admin",
          "stores",
          user?.data?.clientid,
        ]);
        navigate("/stores");
      },

      onError: (error) => {
        toast.error(error?.message || "Failed to update store");
        console.error("Store update error:", error);
      },
    });
  };

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.Update_Store} />

      <PageHeader
        icon={Store}
        title="Edit Store"
        description="Update your store information and branding"
        showStoreName={false}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <fieldset
            disabled={isPending || isStoreLoading}
            className={`space-y-6 ${isPending ? "pointer-events-none" : ""}`}
          >
            <Branding form={form} />

            <Location
              form={form}
              isLoading={isLoading}
              countries={countries}
              isCountryLoading={isCountryLoading}
              countryData={countryData}
            />

            <StoreInfo
              form={form}
              countryData={countryData}
              isLoading={isCountryLoading}
            />

            <Social form={form} />
          </fieldset>

          {/* submit buttons */}
          <div className="flex flex-col-reverse gap-4 lg:flex-row lg:justify-between">
            <Button variant="outline" size="sm" asChild className="text-xs">
              <Link to="/">
                <ChevronLeft /> Back to Home
              </Link>
            </Button>

            <Button
              type="submit"
              disabled={isPending}
              size="sm"
              className="text-xs"
            >
              {isPending ? (
                <>
                  <Spinner /> Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
