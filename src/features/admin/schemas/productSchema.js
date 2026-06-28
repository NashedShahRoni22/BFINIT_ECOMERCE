import * as z from "zod";

const optionValueSchema = z.object({
  id: z.string(),
  name: z.string().trim().min(1, "Value name is required!"),
});

const optionSchema = z
  .object({
    id: z.string(),
    name: z.string().trim(),
    values: z.array(optionValueSchema),
  })
  .superRefine((data, ctx) => {
    const hasName = data.name.trim().length > 0;
    const hasValues = data.values.length > 0;

    if (hasValues && !hasName) {
      ctx.addIssue({
        code: "custom",
        message: "Enter an option name.",
        path: ["name"],
      });
    }

    if (hasName && !hasValues) {
      ctx.addIssue({
        code: "custom",
        message: "Add at least one option value.",
        path: ["values"],
      });
    }
  });

const pricingSchema = z
  .object({
    price: z.number({ error: "Price is required!" }),
    discount_value: z.number().optional(),
    discount_type: z.enum(["", "percentage", "fixed"]).optional(),
    stock: z.number({ error: "Stock is required!" }),
    variants_enabled: z.boolean(),
    options: z.array(optionSchema).optional(),
  })
  .superRefine((data, ctx) => {
    const hasType = !!data.discount_type;
    const hasValue = data.discount_value != null;

    if (hasValue && !hasType) {
      ctx.addIssue({
        code: "custom",
        message: "Select a discount type!",
        path: ["discount_type"],
      });
      return;
    }

    if (data.discount_type === "fixed" && data.discount_value > data.price) {
      ctx.addIssue({
        code: "custom",
        message: "Discount amount can't be higher than price!",
        path: ["discount_value"],
      });
    }

    if (data.discount_type === "percentage" && data.discount_value > 100) {
      ctx.addIssue({
        code: "custom",
        message: "Percentage discount can't exceed 100%!",
        path: ["discount_value"],
      });
    }
  });

export const productSchema = z
  .object({
    name: z.string().trim().min(1, "Product Name is required!"),
    category_id: z.number({ error: "Category is required!" }),
    sub_category_id: z.number().optional(),
    brand_id: z.number().optional(),
    tags: z.array(z.string()).optional(),
    short_description: z.string().optional(),
    description: z.string().optional(),
    is_hot_deal: z.boolean(),
    is_new_arrival: z.boolean(),
    is_featured: z.boolean(),
    is_best_selling: z.boolean(),
    is_flash_deal: z.boolean(),
    flash_deal_start_date: z.string().nullable(),
    flash_deal_end_date: z.string().nullable(),
    image: z.instanceof(File, { error: "Thumbnail image is required!" }),
    images: z.array(z.instanceof(File)).optional(),
    pricing: z.array(pricingSchema),
  })
  .superRefine((data, ctx) => {
    if (data.is_flash_deal && !data.flash_deal_end_date) {
      ctx.addIssue({
        code: "custom",
        message: "End date is required for flash deals!",
        path: ["flash_deal_end_date"],
      });
    }

    if (
      data.flash_deal_start_date &&
      data.flash_deal_end_date &&
      new Date(data.flash_deal_start_date) >= new Date(data.flash_deal_end_date)
    ) {
      ctx.addIssue({
        code: "custom",
        message: "End date must be after start date!",
        path: ["flash_deal_end_date"],
      });
    }
  });
