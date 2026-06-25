import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

export default function Pricing() {
  return (
    <FieldSet>
      <div className="border-b px-5 py-4">
        <FieldLegend>Pricing</FieldLegend>
        <FieldDescription>
          Set a price for every country this product is available in
        </FieldDescription>
      </div>

      <FieldGroup></FieldGroup>
    </FieldSet>
  );
}
