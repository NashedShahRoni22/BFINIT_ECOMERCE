import { useEffect } from "react";
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
import Pricing from "../components/sections/add-product/Pricing";
import ProductStatus from "../components/sections/add-product/product-status/ProductStatus";
import Variants from "../components/sections/add-product/Variants/Variants";
import { fillFormWithProductData } from "../utils/productHelper";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import useSelectedStore from "@/hooks/useSelectedStore";
import { validateVariants } from "@/utils/productValidation";
import { transformProductForApi } from "@/utils/productMapper";
import usePatchMutaion from "@/hooks/api/usePatchMutaion";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import EmptyStoreState from "../components/EmptyStoreState";

export default function UpdateProduct() {
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const { selectedStore } = useSelectedStore();

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
      price: "",
      discount: "",
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
      variants: {
        enabled: false,
        useDefaultPricing: true,
        attributes: [],
      },
      tax: false,
    },
  });

  const { handleSubmit, reset, watch } = form;

  // Watch category value from form
  const selectedCategoryName = watch("category");

  useEffect(() => {
    if (productDetails?.data && categories && brands) {
      fillFormWithProductData(productDetails?.data, reset);
    }
  }, [productDetails?.data, categories, selectedCategoryName, brands, reset]);

  const onSubmit = (data) => {
    // validate form
    if (!validateVariants(data, form)) {
      return toast.error("form submit error");
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
      // Separate new uploads from existing images
      const newGalleryImages = data.gallery.filter((img) => img.file);

      // Append new images
      newGalleryImages.forEach((image) => {
        formData.append("productImages", image.file);
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
      {/* Breadcrumb Navigation */}
      <DynamicBreadcrumb items={breadcrubms.Update_Product} />

      {/* Page Header */}
      <PageHeader
        icon={Package}
        title="Edit Product"
        description="Update your product information"
        showStoreName={false}
      />

      {/* Product Form */}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <fieldset
            disabled={isLoading || isPending}
            className={cn("space-y-6", isPending && "pointer-events-none")}
          >
            <>
              {/* Product Details */}
              <ProductDetails form={form} />

              {/* Product Thumbnail & Gallery Images */}
              <ProductImages form={form} />

              {/* Pricing */}
              <Pricing form={form} />

              {/* Product Status */}
              <ProductStatus form={form} />

              {/* Product Variants */}
              <Variants form={form} isEditMode={true} />
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
