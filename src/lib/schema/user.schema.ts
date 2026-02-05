import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),

  email: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.email("Invalid email")
  ),

  phoneNumber: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().optional()
  ),

  gender: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().optional()
  ),

  address: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().optional()
  ),

  password: z.string().optional(),

  role: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().optional()
  ),
});
