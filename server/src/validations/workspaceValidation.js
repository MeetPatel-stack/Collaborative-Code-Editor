import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z
    .string()

    .trim()

    .min(3)

    .max(50),

  password: z
    .string()

    .min(4)

    .max(30),

  type: z.enum(["COLLABORATION", "CLASSROOM"]),
});
