import { z } from 'zod';

const carZodSchema = z.object({
  model: z.string().min(3),
  year: z.number().min(1900).max(2021),
  color: z.string().min(3),
  status: z.boolean().optional(),
  buyValue: z.number().int(),
  doorsQty: z.number().int().min(2).max(4),
  seatsQty: z.number().int().min(2).max(7),
});

type ICar = z.infer<typeof carZodSchema>;

export { ICar, carZodSchema };
