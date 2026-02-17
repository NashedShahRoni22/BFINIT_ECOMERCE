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
import { useEffect, useRef } from "react";
import {
  createStorePayload,
  fillFormWithStoreData,
} from "../utils/storeHelpers";
import usePatchMutaion from "@/hooks/api/usePatchMutaion";

export default function UpdateStore() {
  const { storeId } = useParams();
  const navigate = useNavigate();

  const { user } = useAuth();
  const queryClient = useQueryClient();

  const hasFilledForm = useRef(false);

  const form = useForm({
    defaultValues: {
      country: "",
      countries: [],
      address: "",
      time_zone: "",
      name: "",
      email: "",
      mobile: "",
      telephone: "",
      facebook: "",
      twitter: "",
      instagram: "",
      youtube: "",
      logo: null,
      favicon: null,
    },
  });

  const { setValue } = form;

  // Watch the countries array to detect default country changes
  const countries = form.watch("countries");
  const defaultCountry = countries?.find((c) => c.isDefault) || countries?.[0];

  const selectedCountry = useWatch({
    control: form.control,
    name: "country",
  });

  const { data: store, isLoading: isStoreLoading } =
    useGetStorePreference(storeId);

  const { data: countriesList, isLoading } = useGetQuery({
    endpoint: "/api/countries",
    queryKey: ["countries"],
  });

  // Fetch country data for the default country (for backward compatibility)
  // This will refetch whenever the default country changes
  const { data: countryData } = useGetQuery({
    endpoint: `/api/countries/${defaultCountry?.country_name}`,
    queryKey: ["country", defaultCountry?.country_name],
    enabled: !!defaultCountry?.country_name && !defaultCountry?.phone_code, // Only fetch if phone_code is missing
  });

  // Fetch country data when user is selecting a NEW country to add
  const { data: newCountryData, isLoading: isNewCountryLoading } = useGetQuery({
    endpoint: `/api/countries/${selectedCountry}`,
    queryKey: ["country", "new", selectedCountry],
    enabled: !!selectedCountry,
  });

  const { mutate, isPending } = usePatchMutaion({
    endpoint: `/store/main/update/${storeId}`,
    token: true,
    clientId: true,
  });

  // Fill form with existing store data
  useEffect(() => {
    if (!hasFilledForm.current && store && !isStoreLoading) {
      const hasOldFormat = store.country && !store.countries;

      if (hasOldFormat) {
        // Old format - wait for countryData
        return;
      } else if (store.countries) {
        // New multi-country format - fill form directly
        fillFormWithStoreData(store, null, setValue);
        hasFilledForm.current = true;
      }
    }
  }, [store, isStoreLoading, setValue]);

  // Handle old format migration (only if needed)
  useEffect(() => {
    if (
      !hasFilledForm.current &&
      store &&
      countryData &&
      store.country &&
      !store.countries
    ) {
      fillFormWithStoreData(store, countryData, setValue);
      hasFilledForm.current = true;
    }
  }, [store, countryData, setValue]);

  // Update phone code when default country changes and countryData is fetched
  useEffect(() => {
    if (
      hasFilledForm.current &&
      countryData &&
      defaultCountry &&
      !defaultCountry.phone_code
    ) {
      // Update the default country with the fetched phone_code
      const updatedCountries = countries.map((c) =>
        c.isDefault ? { ...c, phone_code: countryData.phone_code } : c,
      );
      setValue("countries", updatedCountries);
    }
  }, [countryData, defaultCountry, countries, setValue, hasFilledForm]);

  const onSubmit = (data) => {
    if (!data.countries || data.countries.length === 0) {
      form.setError("country", {
        type: "manual",
        message: "Please add at least one country",
      });
      return;
    }

    form.clearErrors("country");

    const storePayload = createStorePayload(data);

    mutate(storePayload, {
      onSuccess: () => {
        toast.success("Store updated successfully!");
        queryClient.invalidateQueries([
          "admin",
          "stores",
          user?.data?.clientid,
        ]);
        queryClient.invalidateQueries(["store", "preference", storeId]);
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
              countries={countriesList}
              isCountryLoading={isNewCountryLoading}
              countryData={newCountryData}
            />

            <StoreInfo form={form} />

            <Social form={form} />
          </fieldset>

          {/* submit buttons */}
          <div className="flex flex-col-reverse gap-4 lg:flex-row lg:justify-between">
            <Button variant="outline" size="sm" asChild className="text-xs">
              <Link to="/stores">
                <ChevronLeft /> Back to Stores
              </Link>
            </Button>

            <Button
              type="submit"
              disabled={isPending || isStoreLoading}
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
