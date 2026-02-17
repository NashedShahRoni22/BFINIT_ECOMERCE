import { useEffect, useMemo, useRef } from "react";
import { Link, useParams } from "react-router";
import useGetQuery from "@/hooks/api/useGetQuery";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import PageHeader from "../components/PageHeader";
import { ChevronLeft, Package } from "lucide-react";
import { breadcrubms } from "@/utils/constants/breadcrumbs";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import ProductDetails from "../components/sections/add-product/ProductDetails";
import useGetCategories from "../hooks/category/useGetCategories";
import useGetBrands from "../hooks/brands/useGetBrands";
import ProductImages from "../components/sections/add-product/product-images/ProductImages";
import CountryPricing from "../components/sections/add-product/Pricing"; // UPDATED
import ProductStatus from "../components/sections/add-product/product-status/ProductStatus";
import { fillFormWithProductData } from "../utils/productHelper";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import useSelectedStore from "@/hooks/useSelectedStore";
import { validateCountryPricing } from "@/utils/productValidation"; // UPDATED
import { transformProductForApi } from "@/utils/productMapper";
import usePatchMutaion from "@/hooks/api/usePatchMutaion";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import EmptyStoreState from "../components/EmptyStoreState";
import useGetStorePreference from "../hooks/store/useGetStorePreference";

export default function UpdateProduct() {
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const { selectedStore } = useSelectedStore();
  const { data: storePreference } = useGetStorePreference();

  const isInitializing = useRef(false);

  const countries = useMemo(
    () => storePreference?.countries || [],
    [storePreference?.countries],
  );

  const { data: productDetails, isLoading } = useGetQuery({
    endpoint: `/product/?productId=${productId}`,
    queryKey: ["product", productId],
    enabled: !!productId,
  });

  const { mutate, isPending } = usePatchMutaion({
    endpoint: `/product/update/${productId}`,
    token: true,
    clientId: true,
  });

  const { data: categories } = useGetCategories();
  const { data: brands } = useGetBrands();

  const form = useForm({
    defaultValues: {
      name: "",
      category: "",
      subcategory: "",
      brand: "",
      tags: "",
      short_description: "",
      description: "",
      thumbnail: null,
      gallery: [],
      pricing: [], // UPDATED: Array for country-based pricing
      best_seller: false,
      best_seller_threshold: 50,
      featured: false,
      new_arrival: false,
      hot_deal: false,
      flash_sale: false,
      flash_sale_show_countdown: false,
      flash_sale_end_date: null,
      limited_stock: false,
      limited_stock_threshold: 10,
    },
  });

  const { handleSubmit, reset } = form;

  useEffect(() => {
    if (productDetails?.data && categories && brands && countries.length > 0) {
      isInitializing.current = true;

      fillFormWithProductData(productDetails.data, reset);

      const timeoutId = setTimeout(() => {
        // Set category and brand
        if (productDetails.data.productCategory) {
          form.setValue("category", productDetails.data.productCategory);
        }
        if (productDetails.data.productBrand) {
          form.setValue("brand", productDetails.data.productBrand);
        }

        // Use requestAnimationFrame to wait for next paint
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Now subcategory options should be rendered
            if (productDetails.data.productSubCategory) {
              form.setValue(
                "subcategory",
                productDetails.data.productSubCategory,
              );
            }
            isInitializing.current = false;
          });
        });
      }, 0);

      return () => {
        clearTimeout(timeoutId);
        isInitializing.current = false;
      };
    }
  }, [
    productId,
    productDetails?.data,
    categories,
    brands,
    countries,
    reset,
    form,
  ]);

  const onSubmit = (data) => {
    // UPDATED: Validate country pricing
    if (!validateCountryPricing(data, form)) {
      return; // Error already set on form
    }

    const formData = new FormData();

    const productData = transformProductForApi(data);
    formData.append("productData", JSON.stringify(productData));

    // Handle thumbnail
    if (data?.thumbnail?.file) {
      formData.append("thumbnailImage", data.thumbnail.file);
    }

    // Handle gallery images
    if (data.gallery && data.gallery.length > 0) {
      const newGalleryImages = data.gallery.filter((img) => img.file);
      newGalleryImages.forEach((image) => {
        formData.append("productImages", image.file);
      });
    }

    // UPDATED: Handle variant images for all countries
    if (data.pricing) {
      data.pricing.forEach((countryPricing, pricingIndex) => {
        if (
          countryPricing.variants?.enabled &&
          countryPricing.variants?.attributes
        ) {
          countryPricing.variants.attributes.forEach((attr, attrIndex) => {
            attr.values.forEach((value, valueIndex) => {
              if (value.image) {
                const fieldName = `pricing[${pricingIndex}][variants][attributes][${attrIndex}][value][${valueIndex}]`;
                formData.append(fieldName, value.image);
              }
            });
          });
        }
      });
    }

    mutate(formData, {
      onSuccess: () => {
        toast.success("Product updated");
        queryClient.invalidateQueries(["product", productId]);
      },
      onError: () => {
        toast.error("Couldn't update product");
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
      <DynamicBreadcrumb items={breadcrubms.Update_Product} />

      <PageHeader
        icon={Package}
        title="Edit Product"
        description="Update your product information"
        showStoreName={false}
      />

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <fieldset
            disabled={isLoading || isPending}
            className={cn("space-y-6", isPending && "pointer-events-none")}
          >
            <>
              <ProductDetails form={form} isInitializingRef={isInitializing} />
              <ProductImages form={form} />

              {/* UPDATED: Use CountryPricing instead of Pricing + Variants */}
              <CountryPricing form={form} countries={countries} />

              <ProductStatus form={form} />
            </>
          </fieldset>

          <div className="flex flex-col-reverse gap-4 lg:flex-row lg:justify-between">
            <Button variant="outline" size="sm" asChild className="text-xs">
              <Link to="/">
                <ChevronLeft /> Back to Home
              </Link>
            </Button>

            <Button
              disabled={isPending}
              type="submit"
              size="sm"
              className="min-w-[101px] text-xs"
            >
              {isPending ? (
                <>
                  <Spinner size="3.5" />
                  Updating...
                </>
              ) : (
                "Update Product"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
