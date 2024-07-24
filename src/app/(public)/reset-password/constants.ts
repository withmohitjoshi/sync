import { z, ZodType } from "zod";
import { ResetPasswordFormInitialValuesT } from "./types";

export const initialValues: ResetPasswordFormInitialValuesT = {
  newPassword: "",
};

export const resetPasswordSchema: ZodType<ResetPasswordFormInitialValuesT> =
  z.object({
    newPassword: z.string().min(8),
  });
