import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(128),
});

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(128),
    confirmPassword: z.string().min(6).max(128),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmPassword'],
  });

export type TLoginInput = z.infer<typeof loginSchema>;
export type TRegisterInput = z.infer<typeof registerSchema>;
