import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { ChevronDownIcon, ChevronLeft, Package, SlashIcon } from "lucide-react";
import { Form } from "@/components/ui/form";
import ProductDetails from "@/components/admin/AddProduct/ProductDetails";
import ProductImages from "@/components/admin/AddProduct/ProductImages";
import Variants from "@/components/admin/AddProduct/Variants/Variants";
import { Button } from "@/components/ui/button";
import Pricing from "@/components/admin/AddProduct/Pricing";
import EmptyStoreState from "@/components/admin/shared/EmptyStoreState";
import useSelectedStore from "@/hooks/stores/useSelectedStore";
import ProductStatus from "./ProductStatus";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PageHeader from "@/components/admin/shared/PageHeader";

export default function AddProduct() {
  const { selectedStore } = useSelectedStore();

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
    },
  });

  const { handleSubmit } = form;
  const storeId = selectedStore?.storeId;

  const onSubmit = (data) => {
    // Clear any previous variant errors
    form.clearErrors("variants");

    // Variant validation
    if (data.variants.enabled) {
      // Check if at least one attribute exists
      if (!data.variants.attributes || data.variants.attributes.length === 0) {
        form.setError("variants", {
          type: "manual",
          message:
            "Please add at least one variant attribute when variants are enabled.",
        });
        return;
      }

      // Check if all attributes have names
      const attributesWithoutNames = data.variants.attributes.filter(
        (attr) => !attr.name || attr.name.trim() === "",
      );
      if (attributesWithoutNames.length > 0) {
        form.setError("variants", {
          type: "manual",
          message:
            "All variant attributes must have a name. Please fill in the attribute name field.",
        });
        return;
      }

      // Check if all attributes have at least one value
      const attributesWithoutValues = data.variants.attributes.filter(
        (attr) => !attr.values || attr.values.length === 0,
      );
      if (attributesWithoutValues.length > 0) {
        const attrName = attributesWithoutValues[0].name || "Unnamed attribute";
        form.setError("variants", {
          type: "manual",
          message: `"${attrName}" must have at least one value. Add values separated by | (pipe).`,
        });
        return;
      }

      // Check if required attributes are filled
      const requiredAttributesEmpty = data.variants.attributes.filter(
        (attr) => attr.required && (!attr.values || attr.values.length === 0),
      );
      if (requiredAttributesEmpty.length > 0) {
        form.setError("variants", {
          type: "manual",
          message: `Required attribute "${requiredAttributesEmpty[0].name}" must have at least one value.`,
        });
        return;
      }

      if (data.variants.useDefaultPricing === false) {
        console.log("Custom pricing is enabled, checking variant prices...");

        // Get all variants from attributes
        const allVariants = [];
        data.variants.attributes.forEach((attribute) => {
          if (attribute.values && attribute.values.length > 0) {
            attribute.values.forEach((value) => {
              allVariants.push({
                ...value,
                attributeName: attribute.name,
              });
            });
          }
        });

        // Check if any variant is missing a price
        const variantsWithoutPrice = allVariants.filter(
          (variant) => !variant.price || variant.price.toString().trim() === "",
        );

        if (variantsWithoutPrice.length > 0) {
          const variantName = variantsWithoutPrice[0].name || "Unnamed variant";
          const attributeName = variantsWithoutPrice[0].attributeName;

          form.setError("variants", {
            type: "manual",
            message: `Custom pricing is enabled. Please set a price for "${variantName}" (${attributeName}) and all other variants.`,
          });
          return;
        }
      }
    }

    // If all validations pass
    console.log(data);
  };

  if (!selectedStore) {
    return (
      <EmptyStoreState description="Select a store to start adding products." />
    );
  }

  return (
    <section className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5">
                Products
                <ChevronDownIcon />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/products/category">Category</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/products/sub-category">Sub Category</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/products/brands">Brands</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/products/inventory">Inventory</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <SlashIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Add Product</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Page Header */}
      <PageHeader
        icon={Package}
        title="Add Product"
        description="Create a new product for"
      />

      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* If store is selected then show the fields of add product */}
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

          <div className="flex flex-col-reverse gap-4 lg:flex-row lg:justify-between">
            <Button variant="outline" size="lg" asChild>
              <Link to="/">
                <ChevronLeft /> Back to stores
              </Link>
            </Button>

            {/* show submit and save as draft button when store is selected */}
            {storeId && (
              <div className="flex flex-col-reverse gap-4 lg:flex-row">
                <Button variant="outline" size="lg" className="cursor-pointer">
                  Save as Draft
                </Button>

                <Button type="submit" size="lg" className="cursor-pointer">
                  Add New Product
                </Button>
              </div>
            )}
          </div>
        </form>
      </Form>
    </section>
  );
}
