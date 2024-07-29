import { z } from "zod";
import {
  EMAIL_MAX_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_REGEX,
  USERNAME_MAX_LENGTH,
  USERNAME_REGEX,
} from "./constants";

export function required(fieldName: string) {
  return z.string().min(1, `${fieldName} is required`);
}
function nonRequired() {
  return z.string();
}

export function email(
  fieldName: string,
  message = "Enter a valid email",
  isRequired = true
) {
  if (isRequired) {
    return required(fieldName)
      .trim()
      .toLowerCase()
      .max(EMAIL_MAX_LENGTH, `Max length can be ${EMAIL_MAX_LENGTH}`)
      .email(message);
  } else {
    return nonRequired()
      .trim()
      .toLowerCase()
      .max(EMAIL_MAX_LENGTH, `Max length can be ${EMAIL_MAX_LENGTH}`)
      .email(message);
  }
}
export function password(
  fieldName: string,
  message = "Must contains at least one special character, one uppercase letter,one lowercase letter,and numerical,min length must be 8,max length must be 20",
  regex = PASSWORD_REGEX,
  isRequired = true
) {
  if (isRequired) {
    return required(fieldName)
      .regex(regex, { message })
      .max(PASSWORD_MAX_LENGTH, `Max length must be ${PASSWORD_MAX_LENGTH}`);
  } else {
    return nonRequired()
      .regex(regex, { message })
      .max(PASSWORD_MAX_LENGTH, `Max length must be ${PASSWORD_MAX_LENGTH}`);
  }
}
export function username(
  fieldName: string,
  message = "Must contains lowercase letters, numbers, . _, with length 3 to 20",
  regex = USERNAME_REGEX,
  isRequired = true
) {
  if (isRequired) {
    return required(fieldName)
      .regex(regex, { message })
      .max(USERNAME_MAX_LENGTH, `Max length must be ${USERNAME_MAX_LENGTH}`);
  } else {
    return nonRequired()
      .regex(regex, { message })
      .max(USERNAME_MAX_LENGTH, `Max length must be ${USERNAME_MAX_LENGTH}`);
  }
}
