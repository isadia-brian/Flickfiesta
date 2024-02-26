import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid Email" }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(6, { message: "Username should have six or more characters" }),
  email: z.string().email({ message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password should have six or more characters" }),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required" }),
});
export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password should have six or more characters" }),
});
