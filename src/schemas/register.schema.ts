import z from "zod";

export const registerSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
