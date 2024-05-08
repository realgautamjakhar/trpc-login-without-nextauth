import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().min(2, "Email is required"),
  password: z.string().min(2, "Password is required"),
});
export const registerFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().min(2, "Email is required"),
  password: z.string().min(2, "Password is required"),
});
export const verificationFormSchema = z.object({
  otp: z.string().min(8, "otp is required"),
});

export const login = loginFormSchema;
export const register = registerFormSchema;
export const verify = verificationFormSchema.extend({
  email: z.string().min(2, "Email is required"),
});
