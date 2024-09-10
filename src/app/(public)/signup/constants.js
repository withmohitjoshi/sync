import { z } from "zod";
import { email, password, username } from "../../../helpers/zodValidations";

export const initialValues = {
  username: "",
  email: "",
  password: "",
};

export const schema = z.object({
  username: username("Username"),
  email: email("Email"),
  password: password("Password"),
});
