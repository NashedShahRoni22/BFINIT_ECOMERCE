import { Link } from "react-router";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { ChevronLeft, PackagePlus } from "lucide-react";
import { Form } from "@/components/ui/form";
import ProductStatus from "../components/sections/add-product/product-status/ProductStatus";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { transformProductForApi } from "@/utils/productMapper";
import ProductDetails from "../components/sections/add-product/ProductDetails";
import ProductImages from "../components/sections/add-product/product-images/ProductImages";
import CountryPricing from "../components/sections/add-product/Pricing";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import PageHeader from "../components/PageHeader";
import usePostMutation from "@/hooks/api/usePostMutation";
import useSelectedStore from "@/hooks/useSelectedStore";
import {
  validateCountryPricing,
  validateVariants,
} from "@/utils/productValidation";
import EmptyStoreState from "../components/EmptyStoreState";
import { breadcrubms } from "@/utils/constants/breadcrumbs";
import useGetStorePreference from "../hooks/store/useGetStorePreference";
import { useMemo, useState } from "react";

export default function AddProduct() {
  const { selectedStore } = useSelectedStore();
  const { data: storePreference } = useGetStorePreference();

  const storeId = selectedStore?.storeId;
  const countries = useMemo(
    () => storePreference?.countries || [],
    [storePreference?.countries],
  );

  const [resetKey, setResetKey] = useState(0);

  const form = useForm({
    defaultValues: {
      name: "",
      brand: "",
      category: "",
      subcategory: "",
      short_description: "",
      description: "",
      pricing: [],
      flash_sale: false,
      flash_sale_end_date: null,
      flash_sale_show_countdown: false,
      new_arrival: false,
      best_seller: false,
      best_seller_threshold: 50,
      hot_deal: false,
      featured: false,
      limited_stock: false,
      limited_stock_threshold: 10,
    },
  });
  const { handleSubmit } = form;

  const { mutate, isPending } = usePostMutation({
    endpoint: `/product/create/${storeId}`,
    token: true,
    clientId: true,
  });

  const onInvalid = () => {
    const data = form.getValues();
    validateCountryPricing(data, form);
  };

  const onSubmit = (data) => {
    // CORRECT: Pass full data object and form instance
    if (!validateCountryPricing(data, form)) {
      // Validation failed, error is already set on form
      return;
    }

    const formData = new FormData();
    const productData = transformProductForApi(data);
    formData.append("productData", JSON.stringify(productData));

    if (data?.thumbnail?.file) {
      formData.append("thumbnailImage", data.thumbnail.file);
    }

    if (data?.gallery && data?.gallery?.length > 0) {
      data.gallery.forEach((image) => {
        if (image?.file) {
          formData.append("productImages", image.file);
        }
      });
    }

    // Handle variant images for all countries
    if (data.pricing) {
      data.pricing.forEach((countryPricing, pricingIndex) => {
        if (
          countryPricing.variants?.enabled &&
          countryPricing.variants?.attributes
        ) {
          countryPricing.variants.attributes.forEach((attr, attrIndex) => {
            attr.values.forEach((value, valueIndex) => {
              if (value.image) {
                const fieldName = `variants[${pricingIndex}][attributes][${attrIndex}][value][${valueIndex}]`;
                formData.append(fieldName, value.image);
              }
            });
          });
        }
      });
    }

    mutate(formData, {
      onSuccess: (res) => {
        toast.success(res?.message);
        form.reset();
        setResetKey((prev) => prev + 1);
      },
      onError: (err) => {
        toast.error(err?.message);
      },
    });
  };

  if (!selectedStore) {
    return (
      <EmptyStoreState
        title="Store Required"
        description="You need to create a store before you can add products to sell."
      />
    );
  }

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.Add_Product} />
      <PageHeader
        icon={PackagePlus}
        title="Add Product"
        description="Create a new product for"
      />

      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="space-y-6"
        >
          <fieldset
            disabled={isPending}
            className={cn("space-y-6", isPending && "pointer-events-none")}
          >
            {storeId && (
              <>
                <ProductDetails form={form} />
                <ProductImages form={form} />
                <CountryPricing
                  form={form}
                  countries={countries}
                  resetKey={resetKey}
                />
                <ProductStatus form={form} />
              </>
            )}
          </fieldset>

          <div className="flex flex-col-reverse gap-4 lg:flex-row lg:justify-between">
            <Button variant="outline" size="sm" asChild className="text-xs">
              <Link to="/">
                <ChevronLeft /> Back to Home
              </Link>
            </Button>

            {storeId && (
              <Button
                disabled={isPending}
                type="submit"
                size="sm"
                className="min-w-[101px] text-xs"
              >
                {isPending ? (
                  <>
                    <Spinner size="3.5" />
                    Saving...
                  </>
                ) : (
                  "Save Product"
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </section>
  );
}
