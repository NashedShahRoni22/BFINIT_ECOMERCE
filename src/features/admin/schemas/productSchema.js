import * as z from "zod";

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
