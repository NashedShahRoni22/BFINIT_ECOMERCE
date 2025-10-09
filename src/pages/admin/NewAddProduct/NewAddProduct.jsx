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
      variants: {
        enabled: false,
        attributes: [],
      },
    },
  });

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

          <Button type="submit">Add New Product</Button>
        </form>
      </Form>
    </section>
  );
}
