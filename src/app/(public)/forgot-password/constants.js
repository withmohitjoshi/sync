import { z } from "zod";
import { email } from "../../../helpers/zodValidations";

export const initialValues = {
  email: "",
};

export const schema = z.object({
  email: email("Email"),
});
