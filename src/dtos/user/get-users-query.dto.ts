import { z } from "zod";

export const GetUsersQuerySchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  role: z.enum(["USER", "ADMIN"]).optional(),
  skip: z.coerce
    .number()
    .int()
    .min(0, "Skip must be a non-negative integer")
    .optional(),
  page: z.coerce
    .number()
    .int()
    .min(1, "Page must be an integer greater than 0")
    .optional(),
  orderBy: z.enum(["asc", "desc"]).optional(),
});

export type GetUsersQueryDto = z.infer<typeof GetUsersQuerySchema>;
