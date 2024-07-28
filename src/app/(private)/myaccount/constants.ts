import { z, ZodType } from "zod";
import { ChangeUsernameInitialValuesT } from "./types";
import { username } from "@/helpers/zodValidations";

export const initialState = {
  username: "",
  findByEmail: true,
  email: "",
};

export const initialValues: ChangeUsernameInitialValuesT = {
  username: "",
};

export const changeUsernameSchema: ZodType<ChangeUsernameInitialValuesT> =
  z.object({
    username: username("Username"),
  });

export const findByEmailSchema = z.object({
  active: z.boolean(),
});
