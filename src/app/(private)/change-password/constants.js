import { z } from "zod";
import { password, required } from "../../../helpers/zodValidations";

export const initialValues = {
  oldPassword: "",
  newPassword: "",
};

export const schema = z.object({
  oldPassword: required("Old Password"),
  newPassword: password("New Password"),
});
