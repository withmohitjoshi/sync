import { z, ZodType } from "zod";
import { LoginFormInitialValuesT } from "./types";
import { email, required } from "@/helpers/zodValidations";

export const initialValues: LoginFormInitialValuesT = {
  email: "",
  password: "",
};
export const loginSchema: ZodType<LoginFormInitialValuesT> = z.object({
  email: email("Email"),
  password: required('Password')
});
