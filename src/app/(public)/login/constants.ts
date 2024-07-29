import { z, ZodType } from "zod";
import { LoginFormInitialValuesT } from "./types";
import { email, required } from "@/helpers/zodValidations";
import { PASSWORD_MAX_LENGTH } from "@/helpers/constants";

export const initialValues: LoginFormInitialValuesT = {
  email: "",
  password: "",
};
export const loginSchema: ZodType<LoginFormInitialValuesT> = z.object({
  email: email("Email"),
  password: required("Password").max(
    PASSWORD_MAX_LENGTH,
    `Max length can be ${PASSWORD_MAX_LENGTH}`
  ),
});
