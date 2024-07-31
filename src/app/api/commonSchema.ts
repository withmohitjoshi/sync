import { z } from "zod";

export const contactsApiSchema = z
  .object({
    id: z.string().min(1),
  })
  .strict();
