import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import GeneralInformation from "@/components/admin/NewAddProduct/GeneralInformation";
import ProductImages from "@/components/admin/NewAddProduct/ProductImages";

export default function NewAddProduct() {
  const form = useForm({
    defaultValues: {
      name: "",
      brand: "",
      category: "",
      subcategory: "",
      short_description: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* General Information */}
          <GeneralInformation form={form} />
          {/* Product Thumbnail & Gallery Images */}
          <ProductImages form={form} />

          <Button type="submit">Add New product</Button>
        </form>
      </Form>
    </section>
  );
}
