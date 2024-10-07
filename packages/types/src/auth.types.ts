import { z } from "zod";

export const credentialsSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone number must be 10 digits")
    .max(10, "Phone number must be 10 digits"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type Credentials = z.infer<typeof credentialsSchema>;
