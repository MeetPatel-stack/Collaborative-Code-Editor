import { z } from "zod";

export const joinWorkspaceSchema = z.object({
  joinCode: z
    .string()
    .trim()
    .min(5)
    .max(20),

  password: z
    .string()
    .min(4)
    .max(30),
});