import { useState, useEffect } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Plus, AlertCircle } from "lucide-react";
import AttributeCard from "./AttributeCard";
import AllVariantsTable from "./AllVariantsTable";
import SectionHeader from "../../SectionHeader";

export default function Variants({ form }) {
  const [isOpen, setIsOpen] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [useDefaultPricing, setUseDefaultPricing] = useState(true);

  // Get error state from form
  const variantError = form.formState.errors.variants;

  // Watch form values and update them when attributes change
  useEffect(() => {
    // Update form with current variants data
    form.setValue("variants", {
      enabled: isOpen,
      useDefaultPricing,
      attributes: attributes,
    });
  }, [attributes, isOpen, useDefaultPricing, form]);

  // Get all variants from attributes values
  const getAllVariants = () => {
    const allVariants = [];
    attributes.forEach((attribute) => {
      if (attribute.name && attribute.values.length > 0) {
        attribute.values.forEach((value) => {
          allVariants.push({
            ...value,
            attributeName: attribute.name,
            attributeId: attribute.id,
          });
        });
      }
    });
    return allVariants;
  };

  // Add new attribute
  const addAttribute = () => {
    const newAttribute = {
      id: Date.now(),
      name: "",
      values: [],
      required: false,
    };
    setAttributes([...attributes, newAttribute]);
    // Clear error when user starts adding attributes
    if (variantError) {
      form.clearErrors("variants");
    }
  };

  // Delete attribute
  const deleteAttribute = (id) => {
    setAttributes(attributes.filter((attr) => attr.id !== id));
  };

  // Update attribute name
  const updateAttributeName = (id, name) => {
    setAttributes(
      attributes.map((attr) => (attr.id === id ? { ...attr, name } : attr)),
    );
    // Clear error when user starts filling data
    if (variantError) {
      form.clearErrors("variants");
    }
  };

  // Add values from input (pipe separated) - now creates value objects
  const addValues = (id, inputValue) => {
    if (!inputValue.trim()) return;

    const newValueStrings = inputValue
      .split("|")
      .map((value) => value.trim())
      .filter((value) => value.length > 0);

    const attribute = attributes.find((attr) => attr.id === id);
    const attributePrefix =
      attribute?.name?.substring(0, 3).toUpperCase() || "VAL";

    const newValueObjects = newValueStrings
      .map((valueName) => {
        const existingNames = attribute?.values?.map((v) => v.name) || [];
        if (existingNames.includes(valueName)) return null; // Skip duplicates

        return {
          id: `${id}-${valueName.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
          name: valueName,
          sku: `${attributePrefix}-${valueName.substring(0, 3).toUpperCase()}`,
          price: "",
          discountPrice: "",
          stock: "",
          status: true,
          image: null,
        };
      })
      .filter(Boolean);

    setAttributes(
      attributes.map((attr) =>
        attr.id === id
          ? {
              ...attr,
              values: [...attr.values, ...newValueObjects],
            }
          : attr,
      ),
    );

    // Clear error when user adds values
    if (variantError) {
      form.clearErrors("variants");
    }
  };

  // Remove single value object
  const removeValue = (attributeId, valueId) => {
    setAttributes(
      attributes.map((attr) =>
        attr.id === attributeId
          ? {
              ...attr,
              values: attr.values.filter((value) => value.id !== valueId),
            }
          : attr,
      ),
    );
  };

  // Update variant data within attributes
  const updateVariant = (attributeId, valueId, field, value) => {
    setAttributes(
      attributes.map((attr) =>
        attr.id === attributeId
          ? {
              ...attr,
              values: attr.values.map((val) =>
                val.id === valueId ? { ...val, [field]: value } : val,
              ),
            }
          : attr,
      ),
    );
  };

  // Delete variant value from attribute
  const deleteVariant = (attributeId, valueId) => {
    setAttributes(
      attributes.map((attr) =>
        attr.id === attributeId
          ? {
              ...attr,
              values: attr.values.filter((val) => val.id !== valueId),
            }
          : attr,
      ),
    );
  };

  // Toggle required status
  const toggleRequired = (id) => {
    setAttributes(
      attributes.map((attr) =>
        attr.id === id ? { ...attr, required: !attr.required } : attr,
      ),
    );
  };

  // Handle variant image upload
  const handleVariantImageUpload = (attributeId, valueId, file) => {
    if (!file) return;

    // Create a preview URL for the image
    const imageUrl = URL.createObjectURL(file);

    // Update the variant with the image file and preview URL
    setAttributes(
      attributes.map((attr) =>
        attr.id === attributeId
          ? {
              ...attr,
              values: attr.values.map((val) =>
                val.id === valueId
                  ? {
                      ...val,
                      image: file,
                      imageUrl: imageUrl,
                    }
                  : val,
              ),
            }
          : attr,
      ),
    );
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="bg-card rounded-lg border p-5"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <SectionHeader
          title="Product Variants"
          description="Create different options like size, color, or material"
        />

        {/* Section collapse toggle button */}
        <div className="flex shrink-0 items-center justify-end gap-2">
          <span className="text-muted-foreground text-xs">
            {isOpen ? "Enabled" : "Enable variants"}
          </span>

          <CollapsibleTrigger asChild>
            <Switch
              checked={isOpen}
              className={`${isOpen ? "bg-primary" : "bg-input"}`}
            />
          </CollapsibleTrigger>
        </div>
      </div>

      {/* Main variant adding content */}
      <CollapsibleContent className="mt-5">
        {/* Add variant heading */}
        <div className="flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h3 className="text-foreground text-xs font-semibold">
            Variant Attributes
          </h3>
          <Button type="button" size="sm" onClick={addAttribute}>
            <Plus />
            Add Attribute
          </Button>
        </div>

        {/* Error Message Display */}
        {variantError && (
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
            <p className="text-xs text-red-600">{variantError.message}</p>
          </div>
        )}

        {/* Render all attributes */}
        <div className="mt-4 space-y-4">
          {attributes.map((attribute) => (
            <AttributeCard
              key={attribute.id}
              attribute={attribute}
              onDelete={() => deleteAttribute(attribute.id)}
              onUpdateName={(name) => updateAttributeName(attribute.id, name)}
              onAddValues={(values) => addValues(attribute.id, values)}
              onRemoveValue={(value) => removeValue(attribute.id, value)}
              onToggleRequired={() => toggleRequired(attribute.id)}
            />
          ))}
        </div>

        {attributes.length === 0 && !variantError && (
          <div className="mt-4 py-8 text-center">
            <p className="text-muted-foreground text-xs">
              No variant attributes added yet.
            </p>
          </div>
        )}

        {/* Generated Variants Table */}
        {getAllVariants().length > 0 && (
          <AllVariantsTable
            getAllVariants={getAllVariants}
            updateVariant={updateVariant}
            deleteVariant={deleteVariant}
            onImageUpload={handleVariantImageUpload}
            form={form}
            useDefaultPricing={useDefaultPricing}
            setUseDefaultPricing={setUseDefaultPricing}
          />
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}
