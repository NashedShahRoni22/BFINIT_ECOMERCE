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
import Variants from "../components/sections/add-product/Variants/Variants";
import Pricing from "../components/sections/add-product/Pricing";
import DynamicBreadcrumb from "../components/DynamicBreadcrumb";
import PageHeader from "../components/PageHeader";
import usePostMutation from "@/hooks/api/usePostMutation";
import useSelectedStore from "@/hooks/useSelectedStore";
import { validateVariants } from "@/utils/productValidation";

const ADD_PRODUCT_BREADCRUMB_ITEMS = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    dropdown: [
      { label: "Category", href: "/products/category" },
      { label: "Sub Category", href: "/products/sub-category" },
      { label: "Brands", href: "/products/brands" },
      { label: "Inventory", href: "/products/inventory" },
    ],
  },
  { label: "Add Product" },
];

export default function AddProduct() {
  const { selectedStore } = useSelectedStore();
  const storeId = selectedStore?.storeId;
  const form = useForm({
    defaultValues: {
      name: "",
      brand: "",
      category: "",
      subcategory: "",
      short_description: "",
      price: "",
      variants: {
        enabled: false,
        attributes: [],
      },
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
      tax: false,
    },
  });
  const { handleSubmit } = form;

  // Add Product POST Mutation Hook
  const { mutate, isPending } = usePostMutation({
    endpoint: `/product/create/${storeId}`,
    token: true,
    clientId: true,
  });

  // Handle Product Add Submit Form
  const onSubmit = (data) => {
    // validate form
    if (!validateVariants(data, form)) {
      return;
    }

    const formData = new FormData();

    const productData = transformProductForApi(data);
    formData.append("productData", JSON.stringify(productData));

    // Add thumbnail image (required)
    if (data?.thumbnail?.file) {
      formData.append("thumbnailImage", data.thumbnail.file);
    }

    // Add gallery images (optional)
    if (data?.gallery && data?.gallery?.length > 0) {
      data.gallery.forEach((image) => {
        if (image?.file) {
          formData.append("productImages", image.file);
        }
      });
    }

    // Add variant images (optional)
    if (data.variants.enabled && data.variants.attributes) {
      data.variants.attributes.forEach((attr, attrIndex) => {
        attr.values.forEach((value, valueIndex) => {
          if (value.image) {
            const fieldName = `variants[attributes][${attrIndex}][value][${valueIndex}]`;
            formData.append(fieldName, value.image);
          }
        });
      });
    }

    // Call the Add Product mutation function and pass form data as payload
    mutate(formData, {
      onSuccess: (res) => {
        toast.success(res?.message);
        form.reset();
      },
      onError: (err) => {
        toast.error(err?.message);
      },
    });
  };

  return (
    <section className="space-y-6">
      {/* Breadcrumb Navigation */}
      <DynamicBreadcrumb items={ADD_PRODUCT_BREADCRUMB_ITEMS} />

      {/* Page Header */}
      <PageHeader
        icon={PackagePlus}
        title="Add Product"
        description="Create a new product for"
      />

      {/* product form */}
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <fieldset
            disabled={isPending}
            className={cn("space-y-6", isPending && "pointer-events-none")}
          >
            {storeId && (
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
                <Variants form={form} />
              </>
            )}
          </fieldset>

          <div className="flex flex-col-reverse gap-4 lg:flex-row lg:justify-between">
            <Button variant="outline" size="sm" asChild className="text-xs">
              <Link to="/">
                <ChevronLeft /> Back to Home
              </Link>
            </Button>

            {/* show submit and save as draft button when store is selected */}
            {storeId && (
              <div className="flex flex-col-reverse gap-4 lg:flex-row">
                {/* TODO: implement save as draft. it will be silent save automatically */}
                {/* <Button
                  disabled={isPending}
                  type="button"
                  variant="outline"
                  size="lg"
                >
                  Save as Draft
                </Button> */}

                <Button
                  disabled={isPending}
                  type="submit"
                  size="sm"
                  className="text-xs"
                >
                  {isPending ? (
                    <>
                      <Spinner size="3.5" />
                      Adding Product...
                    </>
                  ) : (
                    "Add New Product"
                  )}
                </Button>
              </div>
            )}
          </div>
        </form>
      </Form>
    </section>
  );
}
