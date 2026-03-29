import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Lutfen e-posta adresinizi girin.')
    .email('Lutfen gecerli bir e-posta formati girin.'),
  password: z
    .string()
    .trim()
    .min(1, 'Lutfen sifrenizi girin.')
    .min(6, 'Sifreniz en az 6 karakter olmalidir.'),
  rememberMe: z.boolean().optional(),
})
