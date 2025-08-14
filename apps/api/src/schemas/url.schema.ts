import { z } from 'zod';

export const createUrlSchema = z.object({
  originalUrl: z.string().url().min(1),
  guestId: z.string().min(1),
});

export type TCreateUrlInput = z.infer<typeof createUrlSchema>;
