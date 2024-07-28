import { z, ZodType } from "zod";
import { ChangeUsernameInitialValuesT } from "./types";

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
    username: z.string().min(2).max(20),
  });
export const findByEmailSchema = z.object({
  active: z.boolean(),
});
