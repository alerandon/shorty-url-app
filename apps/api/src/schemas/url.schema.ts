import { z } from 'zod';

export const createUserSchema = z.object({
  username: z.string().min(1),
  email: z.string().email().min(1),
  password: z.string().min(6).max(128),
});

export const updateUserSchema = createUserSchema.partial();

export type TCreateUserInput = z.infer<typeof createUserSchema>;
export type TUpdateUserInput = z.infer<typeof updateUserSchema>;
