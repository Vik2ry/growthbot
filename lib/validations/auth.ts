import * as z from 'zod';

export const authSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .max(100, {
      message: 'Password must be at most 100 characters long',
    }),
});

export const signupSchema = z
  .object({
    firstName: z.string().min(1, {
      message: 'First name is required',
    }),
    lastName: z.string().min(1, {
      message: 'Last name is required',
    }),
    email: z.string().email({
      message: 'Please enter a valid email address',
    }),
    password: z
      .string()
      .min(8, {
        message: 'Password must be at least 8 characters long',
      })
      .max(100, {
        message: 'Password must be at most 100 characters long',
      }),
    confirmPassword: z
      .string()
      .min(8, {
        message: 'Password must be at least 8 characters long',
      })
      .max(100, {
        message: 'Password must be at most 100 characters long',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export const verifyEmailSchema = z.object({
  code: z
    .string()
    .min(6, {
      message: 'Verification code must be 6 characters long',
    })
    .max(6),
});

export const checkEmailSchema = z.object({
  email: authSchema.shape.email,
});

export const resetPasswordSchema = z
  .object({
    password: authSchema.shape.password,
    confirmPassword: authSchema.shape.password,
    code: verifyEmailSchema.shape.code,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });
