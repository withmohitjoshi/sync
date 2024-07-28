import { z } from "zod";

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
    return required(fieldName).trim().toLowerCase().email(message);
  } else {
    return nonRequired().trim().toLowerCase().email(message);
  }
}
export function password(
  fieldName: string,
  message = "Must contains at least one special character, one uppercase letter,one lowercase letter,and numerical,min length must be 8,max length must be 20",
  regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$!]).{8,20}$/,
  isRequired = true
) {
  if (isRequired) {
    return required(fieldName).regex(regex, { message });
  } else {
    return nonRequired().regex(regex, { message });
  }
}
export function username(
  fieldName: string,
  message = "Must contains lowercase letters, numbers, . _, with length 3 to 20",
  regex = /^[a-z0-9_.]{3,20}$/,
  isRequired = true
) {
  if (isRequired) {
    return required(fieldName).regex(regex, { message });
  } else {
    return nonRequired().regex(regex, { message });
  }
}
