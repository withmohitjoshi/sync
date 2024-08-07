export enum STATUSCODES {
  BAD_REQUEST = 400,
  CONFLICT = 409,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  EXPIRED = 410,
  SERVER_ERROR = 500,
  CREATED = 200,
  UPDATED = 201,
}

export enum CUSTOMEVENTS {
  ADD_ALERT = "ADD_ALERT",
  REFETCH_QUERY = "REFETCH_QUERY",
}
