import { z } from "zod";
import { username } from "../../../helpers/zodValidations";

export const changeUsernameInitialValues = {
  username: "",
};

export const changeUsernameSchema = z.object({
  username: username("Username"),
});
