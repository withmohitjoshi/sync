import { STATUSCODES } from "./enums";

export type SendResponseT = {
  title: string;
  status: STATUSCODES;
  data?: unknown;
  message?: string;
};
