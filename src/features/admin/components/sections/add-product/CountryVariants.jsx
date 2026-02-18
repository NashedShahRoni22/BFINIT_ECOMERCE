import { useState, useCallback, useEffect } from "react";
import { Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import CountryAttributeCard from "./CountryAttributeCard";
import CountryVariantsTable from "./CountryVariantsTable";
import { useFormState } from "react-hook-form";

export default function CountryVariants({
  country,
  data,
  onUpdate,
  form,
  resetKey,
}) {
  const { errors } = useFormState({ control: form.control });

  // Local state for UI only - sync happens immediately through onUpdate
  const [variantsEnabled, setVariantsEnabled] = useState(
    data.variants?.enabled || false,
  );
  const [attributes, setAttributes] = useState(data.variants?.attributes || []);
  const [useDefaultPricing, setUseDefaultPricing] = useState(
    data.variants?.useDefaultPricing ?? true,
  );

  useEffect(() => {
    if (data.variants?.enabled && data.variants?.attributes?.length > 0) {
      setVariantsEnabled(data.variants.enabled);
      setAttributes(data.variants.attributes);
      setUseDefaultPricing(data.variants.useDefaultPricing ?? true);
    }
  }, [data.variants?.enabled, data.variants?.attributes?.length]);

  // reset all local state of variant related thing when form get submitted successfully
  useEffect(() => {
    if (resetKey === 0) return;
    setVariantsEnabled(false);
    setAttributes([]);
    setUseDefaultPricing(true);

    onUpdate(country._id, "variants", {
      enabled: false,
      useDefaultPricing: true,
      attributes: [],
    });
  }, [resetKey]);

  // Sync variants to parent immediately
  const syncVariants = useCallback(
    (enabled, pricing, attrs) => {
      const newVariants = {
        enabled,
        useDefaultPricing: enabled ? pricing : true,
        attributes: enabled ? attrs : [],
      };
      onUpdate(country._id, "variants", newVariants);
    },
    [country._id, onUpdate],
  );

  const handleToggleVariants = (enabled) => {
    setVariantsEnabled(enabled);
    if (enabled && attributes.length === 0) {
      const newAttr = [
        {
          id: Date.now(),
          name: "",
          required: true,
          values: [],
        },
      ];
      setAttributes(newAttr);
      syncVariants(true, useDefaultPricing, newAttr);
    } else if (!enabled) {
      setAttributes([]);
      syncVariants(false, true, []);
    } else {
      syncVariants(enabled, useDefaultPricing, attributes);
    }
  };

  const addAttribute = useCallback(() => {
    form.clearErrors("variants");

    const newAttribute = {
      id: Date.now(),
      name: "",
      required: true,
      values: [],
    };

    if (attributes.length === 0) {
      const newAttrs = [newAttribute];
      setAttributes(newAttrs);
      syncVariants(variantsEnabled, useDefaultPricing, newAttrs);
      return;
    }

    const allNamesValid = attributes.every((attr) => attr.name?.trim());
    if (!allNamesValid) {
      return toast.error(
        "Please fill all attribute names before adding new one",
      );
    }

    const allHaveValues = attributes.every((attr) => attr.values.length > 0);
    if (!allHaveValues) {
      return toast.error(
        "Please add values to all attributes before adding new one",
      );
    }

    const newAttrs = [...attributes, newAttribute];
    setAttributes(newAttrs);
    syncVariants(variantsEnabled, useDefaultPricing, newAttrs);
  }, [attributes, variantsEnabled, useDefaultPricing, syncVariants, form]);

  const deleteAttribute = (id) => {
    const newAttrs = attributes.filter((attr) => attr.id !== id);
    setAttributes(newAttrs);
    syncVariants(variantsEnabled, useDefaultPricing, newAttrs);
  };

  const updateAttributeName = (id, name) => {
    form.clearErrors("variants");
    const newAttrs = attributes.map((attr) =>
      attr.id === id ? { ...attr, name } : attr,
    );
    setAttributes(newAttrs);
    syncVariants(variantsEnabled, useDefaultPricing, newAttrs);
  };

  const toggleRequired = (id) => {
    const newAttrs = attributes.map((attr) =>
      attr.id === id ? { ...attr, required: !attr.required } : attr,
    );
    setAttributes(newAttrs);
    syncVariants(variantsEnabled, useDefaultPricing, newAttrs);
  };

  const addValues = (id, inputValue) => {
    form.clearErrors("variants");

    if (!inputValue.trim()) return;

    const newValueStrings = inputValue
      .split(",")
      .map((value) => value.trim())
      .filter((value) => value.length > 0);

    const attribute = attributes.find((attr) => attr.id === id);
    const attributePrefix =
      attribute?.name?.substring(0, 3).toUpperCase() || "VAL";

    const newValueObjects = newValueStrings
      .map((valueName) => {
        const existingNames = attribute?.values?.map((v) => v.name) || [];
        if (existingNames.includes(valueName)) return null;

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

    const newAttrs = attributes.map((attr) =>
      attr.id === id
        ? {
            ...attr,
            values: [...attr.values, ...newValueObjects],
          }
        : attr,
    );
    setAttributes(newAttrs);
    syncVariants(variantsEnabled, useDefaultPricing, newAttrs);
  };

  const removeValue = (attributeId, valueId) => {
    const newAttrs = attributes.map((attr) =>
      attr.id === attributeId
        ? {
            ...attr,
            values: attr.values.filter((value) => value.id !== valueId),
          }
        : attr,
    );
    setAttributes(newAttrs);
    syncVariants(variantsEnabled, useDefaultPricing, newAttrs);
  };

  const updateVariant = (attributeId, valueId, field, value) => {
    const newAttrs = attributes.map((attr) =>
      attr.id === attributeId
        ? {
            ...attr,
            values: attr.values.map((val) =>
              val.id === valueId ? { ...val, [field]: value } : val,
            ),
          }
        : attr,
    );
    setAttributes(newAttrs);
    syncVariants(variantsEnabled, useDefaultPricing, newAttrs);
  };

  const handleSetAttributes = (newAttrs) => {
    setAttributes(newAttrs);
    syncVariants(variantsEnabled, useDefaultPricing, newAttrs);
  };

  const handleSetUseDefaultPricing = (value) => {
    setUseDefaultPricing(value);
    syncVariants(variantsEnabled, value, attributes);
  };

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

  const handleVariantImageUpload = (attributeId, valueId, file) => {
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    const newAttrs = attributes.map((attr) =>
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
    );
    setAttributes(newAttrs);
    syncVariants(variantsEnabled, useDefaultPricing, newAttrs);
  };

  if (!variantsEnabled) {
    return (
      <div className="space-y-4">
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">Product Variants</h3>
            <p className="text-muted-foreground text-xs">
              Create different options like size, color for{" "}
              {country.country_name}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground text-xs">
              Enable variants
            </span>
            <Switch
              checked={false}
              onCheckedChange={() => handleToggleVariants(true)}
              className="bg-input"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Separator />

      {/* Header with Toggle */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Product Variants</h3>
          <p className="text-muted-foreground text-xs">
            Create different options like size, color for {country.country_name}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-xs">Enabled</span>
          <Switch
            checked={true}
            onCheckedChange={() => handleToggleVariants(false)}
            className="bg-primary"
          />
        </div>
      </div>

      {/* Add Attribute Button */}
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-semibold">Variant Attributes</h4>
        <Button
          type="button"
          size="sm"
          onClick={addAttribute}
          className="text-xs"
        >
          <Plus className="h-3.5 w-3.5" />
          Add Attribute
        </Button>
      </div>

      {/* Attributes List */}
      <div className="space-y-4">
        {attributes.map((attribute) => (
          <CountryAttributeCard
            key={attribute.id}
            attribute={attribute}
            country={country}
            onDelete={() => deleteAttribute(attribute.id)}
            onUpdateName={(name) => updateAttributeName(attribute.id, name)}
            onAddValues={(values) => addValues(attribute.id, values)}
            onRemoveValue={(valueId) => removeValue(attribute.id, valueId)}
            onToggleRequired={() => toggleRequired(attribute.id)}
          />
        ))}
      </div>

      {attributes.length === 0 && (
        <div className="py-8 text-center">
          <p className="text-muted-foreground text-xs">
            No variant attributes added yet.
          </p>
        </div>
      )}

      {errors.variants && (
        <p className="text-destructive text-xs">{errors.variants.message}</p>
      )}

      {/* Variants Table */}
      {getAllVariants().length > 0 && (
        <CountryVariantsTable
          country={country}
          attributes={attributes}
          setAttributes={handleSetAttributes}
          getAllVariants={getAllVariants}
          updateVariant={updateVariant}
          onImageUpload={handleVariantImageUpload}
          useDefaultPricing={useDefaultPricing}
          setUseDefaultPricing={handleSetUseDefaultPricing}
          basePrice={data.productPrice}
          baseDiscountPrice={data.discountPrice}
        />
      )}
    </div>
  );
}
