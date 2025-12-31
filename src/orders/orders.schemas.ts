import { z } from "zod";

export const listOrdersQuerySchema = z.object({
  customerId: z.string().trim().min(1).optional(),
  take: z.coerce.number().int().min(1).max(200).optional(),
  skip: z.coerce.number().int().min(0).optional(),
});

export const orderQuerySchema = z.object({
  id: z.string().trim().min(1),
});

export const orderItemSchema = z.object({
  sku: z.string().trim().min(1),
  qty: z.number().int().positive(),
});

export const createOrderBodySchema = z.object({
  customerId: z.string().trim().min(1),
  items: z.array(orderItemSchema).min(1),
});
