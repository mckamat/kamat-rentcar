import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Lütfen e-posta adresinizi girin.')
    .email('Lütfen geçerli bir e-posta formatı girin.'),
  password: z
    .string()
    .trim()
    .min(1, 'Lütfen şifrenizi girin.')
    .min(6, 'Şifreniz en az 6 karakter olmalıdır.'),
  rememberMe: z.boolean().optional(),
})
