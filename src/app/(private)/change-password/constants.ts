import { z, ZodType } from "zod";
import { ChangePasswordInitialValuesT } from "./types";
import { password, required } from "@/helpers/zodValidations";

export const initialValues: ChangePasswordInitialValuesT = {
  oldPassword: "",
  newPassword: "",
};
export const changePasswordSchema: ZodType<ChangePasswordInitialValuesT> =
  z.object({
    oldPassword: required("Old Password"),
    newPassword: password("New Password"),
  });
