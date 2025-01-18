import { z } from "zod"

export const AuthFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(8, "Password must meet all requirements")
  .regex(/[A-Z]/, "Password must meet all requirements")
  .regex(/[0-9]/, "Password must meet all requirements")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must meet all requirements"),
  username: z.string().optional(),
  Newpassword: z.string().optional(),
  confirmPassword: z.string().optional(),
  terms: z.boolean().optional(),
  rememberMe: z.boolean().optional(),
}).superRefine((data, ctx) => {
  if (data.password && (ctx.path[0] === 'login' || ctx.path[0] === 'register')) {
    if (data.password.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must be at least 8 characters",
        path: ["password"],
      });
    }
  }

  if (ctx.path[0] === 'reset-password') {
    if (!data.Newpassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "New password is required",
        path: ["Newpassword"],
      });
      return;
    }

    if (!data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Confirm password is required",
        path: ["confirmPassword"],
      });
      return;
    }

    if (data.Newpassword.length < 8) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password must be at least 8 characters",
        path: ["Newpassword"],
      });
    }

    if (data.Newpassword !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  }

  return true;
});

export const OTPFormSchema = z.object({
  pin: z.string().min(4, "Please enter a valid 4-digit OTP").max(4)
});