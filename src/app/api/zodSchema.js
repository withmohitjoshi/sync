import { z } from "zod";

export const connectionApiSchema = z.object({
  id: z.string(),
});
export const connectionApiSchemaWithEmail = z.object({
  email: z.string(),
});
