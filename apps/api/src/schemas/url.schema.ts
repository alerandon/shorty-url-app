import { z } from 'zod';

export const createUrlSchema = z.object({
  originalUrl: z.string().url().min(1),
  guestId: z.string().min(1),
});

export const updateUrlSchema = createUrlSchema.partial().pick({
  originalUrl: true,
});

export type TCreateUrlInput = z.infer<typeof createUrlSchema>;
export type TUpdateUrlInput = z.infer<typeof updateUrlSchema>;
