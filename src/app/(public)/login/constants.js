import { z } from "zod";
import { email, required } from "../../../helpers/zodValidations";
import { PASSWORD_MAX_LENGTH } from "../../../helpers/constants";

export const initialValues = {
  email: "",
  password: "",
};

export const schema = z.object({
    email: email("Email"),
    password: required("Password").max(
      PASSWORD_MAX_LENGTH,
      `Max length can be ${PASSWORD_MAX_LENGTH}`
    ),
  });
  