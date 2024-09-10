import { z } from "zod";
import { password } from "../../../helpers/zodValidations";

export const initialValues = {
  newPassword: "",
};

export const schema = z.object({
  newPassword: password("New Password"),
});
