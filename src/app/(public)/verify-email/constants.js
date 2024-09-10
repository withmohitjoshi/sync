import { z } from "zod";

export const initialValues = {
  code: "",
};

export const schema = z.object({
  code: z
    .string()
    .max(6, { message: "Code must be 6 of digits" })
    .min(6, { message: "Code must be 6 of digits" }),
});
