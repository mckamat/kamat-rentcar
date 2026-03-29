import { z } from 'zod'

const phoneRegex = /^5\d{9}$/

export const registerSchema = z
  .object({
    firstName: z.string().trim().min(2, 'Ad alanı en az 2 karakter olmalıdır.'),
    lastName: z.string().trim().min(2, 'Soyad alanı en az 2 karakter olmalıdır.'),
    userName: z
      .string()
      .trim()
      .min(3, 'Kullanıcı adı en az 3 karakter olmalıdır.')
      .max(20, 'Kullanıcı adı en fazla 20 karakter olabilir.'),
    email: z
      .string()
      .trim()
      .min(1, 'Lütfen e-posta adresinizi girin.')
      .email('Lütfen geçerli bir e-posta formatı girin.'),
    phone1: z
      .string()
      .trim()
      .regex(phoneRegex, 'Telefon numarası 1, 5XXXXXXXXX formatında olmalıdır.'),
    phone2: z
      .string()
      .trim()
      .regex(phoneRegex, 'Telefon numarası 2, 5XXXXXXXXX formatında olmalıdır.'),
    password: z
      .string()
      .trim()
      .min(8, 'Şifreniz en az 8 karakter olmalıdır.')
      .regex(/[A-Z]/, 'Şifre en az bir büyük harf içermelidir.')
      .regex(/[0-9]/, 'Şifre en az bir rakam içermelidir.'),
    confirmPassword: z.string().trim().min(1, 'Lütfen şifre tekrarını girin.'),
    agreeTerms: z.literal(true, {
      errorMap: () => ({
        message: 'Devam etmek için kullanım şartlarını kabul etmelisiniz.',
      }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Şifre ve şifre tekrarı aynı olmalıdır.',
    path: ['confirmPassword'],
  })
