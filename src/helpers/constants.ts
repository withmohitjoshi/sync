export const USERNAME_MAX_LENGTH = 20;
export const EMAIL_MAX_LENGTH = 50;
export const PASSWORD_MAX_LENGTH = 20;
export const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$!]).{8,20}$/;
export const USERNAME_REGEX = /^[a-z0-9_.]{3,20}$/;
export const EMAIL_REGEX = /.+\@.+\..+/;
