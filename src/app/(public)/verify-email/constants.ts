import { z, ZodType } from "zod";
import { VerifyEmailFormInitialValuesT } from "./types";

export const initialValues: VerifyEmailFormInitialValuesT = {
  code: "",
};

export const verifyEmailSchema: ZodType<VerifyEmailFormInitialValuesT> =
  z.object({
    code: z
      .string()
      .max(6, { message: "Code must be 6 of digits" })
      .min(6, { message: "Code must be 6 of digits" }),
  });
