import { z, ZodType } from "zod";
import { SignupFormInitialValuesT } from "./types";

export const initialValues: SignupFormInitialValuesT = {
  username: "",
  email: "",
  password: "",
};

export const signupSchema: ZodType<SignupFormInitialValuesT> = z.object({
  username: z.string().min(2).max(20),
  email: z.string().email(),
  password: z.string().min(8),
});
