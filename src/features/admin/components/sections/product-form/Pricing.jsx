import { useFieldArray } from "react-hook-form";
import { FieldDescription, FieldLegend, FieldSet } from "@/components/ui/field";
import PricingRow from "./pricing/PricingRow";

export default function Pricing({ form }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "pricing",
  });

  return (
    <FieldSet>
      <div className="border-b px-5 py-4">
        <FieldLegend>Pricing</FieldLegend>
        <FieldDescription>
          Set a price for every country this product is available in
        </FieldDescription>
      </div>

      {fields.map((field, index) => (
        <PricingRow key={field.id} form={form} index={index} />
      ))}
    </FieldSet>
  );
}
