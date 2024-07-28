import { z, ZodType } from "zod";
import { ResetPasswordFormInitialValuesT } from "./types";
import { password } from "@/helpers/zodValidations";

export const initialValues: ResetPasswordFormInitialValuesT = {
  newPassword: "",
};

export const resetPasswordSchema: ZodType<ResetPasswordFormInitialValuesT> =
  z.object({
    newPassword: password("New Password"),
  });
