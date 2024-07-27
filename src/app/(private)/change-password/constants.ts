import { z, ZodType } from "zod";
import { ChangePasswordInitialValuesT } from "./types";

export const initialValues: ChangePasswordInitialValuesT = {
  oldPassword: "",
  newPassword: "",
};
export const changePasswordSchema: ZodType<ChangePasswordInitialValuesT> =
  z.object({
    oldPassword: z.string().min(8),
    newPassword: z.string().min(8),
  });
