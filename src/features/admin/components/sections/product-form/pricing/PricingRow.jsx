import { useMemo, useState } from "react";
import { Controller, useFieldArray, useWatch } from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import OptionRow from "./OptionRow";
import { AlertTriangle, Combine, Plus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const discountTypes = [
  { label: "Percentage", value: "percentage" },
  { label: "Fixed", value: "fixed" },
];

function generateVariantCombinations(options) {
  if (!options || options.length === 0) return [];

  const validOptions = options.filter((opt) => opt.values.length > 0);
  if (validOptions.length === 0) return [];

  return validOptions.reduce(
    (combinations, option) => {
      const next = [];
      combinations.forEach((combo) => {
        option.values.forEach((value) => {
          next.push({
            ...combo,
            optionValues: {
              ...combo.optionValues,
              [option.id]: value.id,
            },
            labels: [...combo.labels, value.name],
          });
        });
      });
      return next;
    },
    [{ optionValues: {}, labels: [] }],
  );
}

const createOptionSnapshot = (options) =>
  options.map((option) => ({
    name: option.name,
    values: option.values.map((v) => v.name),
  }));

export default function PricingRow({ form, index }) {
  const [generatedSnapshot, setGeneratedSnapshot] = useState(null);

  const isVariantsEnabled = useWatch({
    control: form.control,
    name: `pricing.${index}.variants_enabled`,
  });

  const watchedOptions = useWatch({
    control: form.control,
    name: `pricing.${index}.options`,
  });

  const lastOption = watchedOptions?.at(-1);
  const canAddOption =
    !lastOption ||
    (lastOption.name.trim() !== "" && lastOption.values.length > 0);

  const variantsDirty =
    JSON.stringify(generatedSnapshot) !==
    JSON.stringify(createOptionSnapshot(watchedOptions));

  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control: form.control,
    name: `pricing.${index}.options`,
  });

  const { fields: variantFields, replace: replaceVariants } = useFieldArray({
    control: form.control,
    name: `pricing.${index}.variants`,
  });

  const combinations = useMemo(
    () => generateVariantCombinations(watchedOptions),
    [watchedOptions],
  );

  const handleAddOption = () => {
    appendOption({
      id: `option-${crypto.randomUUID()}`,
      name: "",
      values: [],
    });
  };

  const handleRemoveOption = (index) => {
    removeOption(index);
  };

  const handleGenerateVariants = () => {
    const newVariants = combinations.map((combo) => ({
      optionValues: combo.optionValues,
      sku: "",
      price: undefined,
      is_discount: false,
      discount_value: 0,
      stock: undefined,
      is_active: true,
      labels: combo.labels,
    }));
    replaceVariants(newVariants);
    setGeneratedSnapshot(createOptionSnapshot(watchedOptions));
  };

  const handleInputChange = (e, field) => {
    const val = e.target.value;
    field.onChange(val === "" ? undefined : Number(val));
  };

  const handleToggleChange = (checked, field) => {
    field.onChange(checked);

    if (!optionFields.length > 0) {
      handleAddOption();
    }
  };

  return (
    <>
      <FieldGroup className="grid-cols-[repeat(3,1fr)_240px_auto]">
        <Controller
          name={`pricing.${index}.price`}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Price <span className="text-destructive">*</span>
              </FieldLabel>

              <div className="border-input focus-within:border-primary focus-within:ring-primary/20 flex h-9 w-full items-center gap-1.5 rounded-md border px-3 text-sm focus-within:ring-1">
                <span className="text-muted-foreground shrink-0">$</span>
                <Input
                  {...field}
                  onChange={(e) => handleInputChange(e, field)}
                  value={field.value ?? ""}
                  type="number"
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="0.00"
                  className="h-full min-w-1/4 flex-1 shrink-0 border-0 px-0 focus-visible:ring-0"
                />
              </div>

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name={`pricing.${index}.discount_value`}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Discount</FieldLabel>

              <div className="border-input focus-within:border-primary focus-within:ring-primary/20 flex h-9 w-full items-center gap-1.5 rounded-md border px-3 text-sm focus-within:ring-1">
                <span className="text-muted-foreground shrink-0">$</span>
                <Input
                  {...field}
                  onChange={(e) => handleInputChange(e, field)}
                  value={field.value ?? ""}
                  type="number"
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="0.00"
                  className="h-full min-w-1/4 flex-1 shrink-0 border-0 px-0 focus-visible:ring-0"
                />
              </div>

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name={`pricing.${index}.discount_type`}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Discount Type</FieldLabel>
              <Select
                onValueChange={field.onChange}
                name={field.name}
                value={field.value}
              >
                <SelectTrigger id={field.name}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>

                <SelectContent>
                  {discountTypes.map((discount) => (
                    <SelectItem key={discount.value} value={discount.value}>
                      {discount.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name={`pricing.${index}.stock`}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Stock <span className="text-destructive">*</span>
              </FieldLabel>

              <Input
                {...field}
                onChange={(e) => handleInputChange(e, field)}
                value={field.value ?? ""}
                type="number"
                id={field.name}
                aria-invalid={fieldState.invalid}
                placeholder="0"
              />

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name={`pricing.${index}.variants_enabled`}
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Variants</FieldLabel>
              <div>
                <Switch
                  id={field.name}
                  name={field.name}
                  checked={field.value}
                  onCheckedChange={(checked) =>
                    handleToggleChange(checked, field)
                  }
                />
              </div>
            </Field>
          )}
        />
      </FieldGroup>

      {isVariantsEnabled && (
        <div className="bg-muted border-t px-5 py-4">
          {/* options container */}
          <>
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="mb-1.5 text-sm font-medium">Variant Options</p>
                <p className="text-muted-foreground text-xs leading-normal">
                  Add options like Size or Color to create product variants.
                </p>
              </div>

              <div className="space-x-4">
                <Button
                  onClick={handleAddOption}
                  disabled={!canAddOption}
                  type="button"
                  size="sm"
                  variant="outline"
                >
                  <Plus /> Add Option
                </Button>
                <Button
                  onClick={handleGenerateVariants}
                  disabled={combinations.length === 0}
                  type="button"
                  size="sm"
                >
                  <Combine />
                  Generate Variants
                </Button>
              </div>
            </div>

            {variantsDirty && variantFields.length > 0 && (
              <Alert className="mb-5">
                <AlertTriangle />
                <AlertTitle>Variants need to be regenerated</AlertTitle>
                <AlertDescription>
                  Variant options have changed. Generate variants again to
                  update the generated variants.
                </AlertDescription>
              </Alert>
            )}

            {/* options container */}
            {optionFields.length > 0 && (
              <div className="bg-background space-y-5 rounded-lg border px-5 py-4">
                {optionFields.map((optionField, optionIndex) => (
                  <OptionRow
                    key={optionField.id}
                    form={form}
                    pricingIndex={index}
                    optionIndex={optionIndex}
                    onRemove={() => handleRemoveOption(optionIndex)}
                  />
                ))}
              </div>
            )}
          </>

          {/* generated variants container */}
          {variantFields.length > 0 && (
            <div className="mt-5 space-y-4">
              <p className="text-sm font-medium">
                Total Generated Variants ({variantFields.length})
              </p>

              <div>
                {variantFields.map((variant, i) => (
                  <div key={variant.id}>
                    <div>{variant.labels?.join(" / ")}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
