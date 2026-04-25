import { z } from "zod";

export const UserResponseSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  email: z.string().email(),
  role: z.enum(["USER", "ADMIN"]),
});

export type UserResponseDto = z.infer<typeof UserResponseSchema>;
