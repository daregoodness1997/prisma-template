import { z } from "zod";

export const CreateUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
