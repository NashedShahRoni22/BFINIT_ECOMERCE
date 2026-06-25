import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { ChevronLeft, PackagePlus, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import EmptyState from "@/components/shared/EmptyState";
import { Form } from "@/components/ui/form";
import PageHeader from "@/components/shared/PageHeader";
import Details from "../components/sections/product-form/Details";
import Status from "../components/sections/product-form/Status";
import Images from "../components/sections/product-form/Images";
import Pricing from "../components/sections/product-form/Pricing";
import useSelectedStore from "@/hooks/useSelectedStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { breadcrubms } from "../utils/constants/breadcrumbs";
import { productSchema } from "../schemas/productSchema";

export default function ProductForm() {
  const { activeStore } = useSelectedStore();

  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      category_id: undefined,
      sub_category_id: undefined,
      brand_id: undefined,
      tags: [],
      short_description: "",
      description: "",
      is_hot_deal: false,
      is_new_arrival: false,
      is_featured: false,
      is_best_selling: false,
      is_flash_deal: false,
      flash_deal_start_date: null,
      flash_deal_end_date: null,
      image: null,
      images: [],
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  if (!activeStore) {
    return (
      <EmptyState
        icon={Store}
        title="No Store Selected"
        description="You need an active store to add and manage products"
        actionText="Create Store"
        actionPath="/stores/create"
      />
    );
  }

  return (
    <section className="space-y-6">
      <DynamicBreadcrumb items={breadcrubms.addProduct} />

      <PageHeader
        icon={PackagePlus}
        title="Add Product"
        description="Add a new product to your store's catalog."
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Details form={form} />
          <Status form={form} />
          <Images form={form} />
          <Pricing form={form} />

          <div className="flex flex-col-reverse gap-4 lg:flex-row lg:justify-between">
            <Button asChild size="sm" variant="outline">
              <Link to="/">
                <ChevronLeft /> Back to Home
              </Link>
            </Button>

            <Button type="submit" size="sm">
              Save Product
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
