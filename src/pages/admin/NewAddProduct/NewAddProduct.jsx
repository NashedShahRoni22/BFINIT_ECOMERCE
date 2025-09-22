import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import GeneralInformation from "@/components/admin/NewAddProduct/GeneralInformation";
import ProductImages from "@/components/admin/NewAddProduct/ProductImages";
import Variants from "@/components/admin/NewAddProduct/Variants/Variants";
import Pricing from "@/components/admin/NewAddProduct/Pricing";

export default function NewAddProduct() {
  const form = useForm({
    defaultValues: {
      name: "",
      brand: "",
      category: "",
      subcategory: "",
      short_description: "",
      price: "",
      discountPrice: "",
      variants: {
        enabled: false,
        attributes: [],
      },
    },
  });

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* General Information */}
          <GeneralInformation form={form} />

          {/* Product Thumbnail & Gallery Images */}
          <ProductImages form={form} />

          {/* Pricing */}
          <Pricing form={form} />

          {/* Product Variants */}
          <Variants form={form} />

          <Button type="submit">Add New product</Button>
        </form>
      </Form>
    </section>
  );
}
