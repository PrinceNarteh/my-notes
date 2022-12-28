import { z } from "zod";

export const createUserDto = z.object({
  firstName: z
    .string({
      required_error: "First name is required",
    })
    .min(1, "First name cannot be empty"),
  lastName: z
    .string({
      required_error: "Last name is required",
    })
    .min(1, "Last name cannot be empty"),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(5, "Password should be 5 or more characters"),
});

export const loginDto = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(5, "Password should be 5 or more characters"),
});
