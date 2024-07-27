import { z, ZodType } from "zod";
import { ChangeUsernameInitialValuesT } from "./types";

export const initialValues: ChangeUsernameInitialValuesT = {
  username: "",
};
export const changeUsernameSchema: ZodType<ChangeUsernameInitialValuesT> =
  z.object({
    username: z.string().min(2).max(20),
  });
