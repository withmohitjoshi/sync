import { z, ZodType } from "zod";
import { SignupFormInitialValuesT } from "./types";
import { email, password, username } from "@/helpers/zodValidations";

export const initialValues: SignupFormInitialValuesT = {
  username: "",
  email: "",
  password: "",
};

export const signupSchema: ZodType<SignupFormInitialValuesT> = z.object({
  username: username("Username"),
  email: email("Email"),
  password: password("Password"),
});
