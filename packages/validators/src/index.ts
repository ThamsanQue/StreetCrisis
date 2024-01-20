import { z } from "zod";

export const BillboardSchema = z.object({
  id: z.string(),
  label: z.string(),
  imageUrl: z.string(),
});

export const SizeSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string(),
});

export const ColorSchema = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string(),
});

export const ImageSchema = z.object({
  id: z.string(),
  url: z.string(),
});

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  billboard: BillboardSchema,
});

export const ProductSchema = z.object({
  id: z.string(),
  categoryId: z.string(),
  name: z.string(),
  price: z.number(),
  isFeatured: z.boolean(),
  sizeId: z.string(),
  colorId: z.string(),
  image: z.array(ImageSchema),
  isArchived: z.boolean(),
});
