export const USERNAME_MAX_LENGTH = 20;
export const EMAIL_MAX_LENGTH = 50;
export const PASSWORD_MAX_LENGTH = 20;
export const PASSWORD_REGEX =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$!]).{8,20}$/;
export const USERNAME_REGEX = /^[a-z0-9_.]{3,20}$/;
export const EMAIL_REGEX = /.+\@.+\..+/;

export const STATUSCODES = {
  BAD_REQUEST: 400,
  CONFLICT: 409,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  EXPIRED: 410,
  SERVER_ERROR: 500,
  CREATED: 200,
  UPDATED: 201,
};

// custom events
export const CUSTOMEVENTS = {
  REFETCH_QUERY: "REFETCH_QUERY",
};
