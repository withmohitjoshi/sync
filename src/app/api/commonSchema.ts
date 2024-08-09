import { z } from "zod";

export const userIdApiSchema = z
  .object({
    id: z.string().min(1),
  })
  .strict();
