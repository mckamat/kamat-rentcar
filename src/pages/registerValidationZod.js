import { z } from 'zod'

const phoneRegex = /^5\d{9}$/

export const registerSchema = z
  .object({
    firstName: z.string().trim().min(2, 'Ad alani en az 2 karakter olmalidir.'),
    lastName: z.string().trim().min(2, 'Soyad alani en az 2 karakter olmalidir.'),
    userName: z
      .string()
      .trim()
      .min(3, 'Kullanici adi en az 3 karakter olmalidir.')
      .max(20, 'Kullanici adi en fazla 20 karakter olabilir.'),
    email: z
      .string()
      .trim()
      .min(1, 'Lutfen e-posta adresinizi girin.')
      .email('Lutfen gecerli bir e-posta formati girin.'),
    phone1: z
      .string()
      .trim()
      .regex(phoneRegex, 'Telefon Numarasi 1, 5XXXXXXXXX formatinda olmalidir.'),
    phone2: z
      .string()
      .trim()
      .regex(phoneRegex, 'Telefon Numarasi 2, 5XXXXXXXXX formatinda olmalidir.'),
    password: z
      .string()
      .trim()
      .min(8, 'Sifreniz en az 8 karakter olmalidir.')
      .regex(/[A-Z]/, 'Sifre en az bir buyuk harf icermelidir.')
      .regex(/[0-9]/, 'Sifre en az bir rakam icermelidir.'),
    confirmPassword: z.string().trim().min(1, 'Lutfen sifre tekrarini girin.'),
    agreeTerms: z.literal(true, {
      errorMap: () => ({ message: 'Devam etmek icin kullanim sartlarini kabul etmelisiniz.' }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Sifre ve sifre tekrari ayni olmalidir.',
    path: ['confirmPassword'],
  })
