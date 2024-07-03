import { ErrorResponse } from "resend";
import { STATUSCODES } from "./enums";

export type SendResponseT = {
  title?: string;
  status: STATUSCODES;
  data?: unknown;
  message?: string;
};

export type SendEmailT = {
  to?: string | string[];
  subject: string;
  template: JSX.Element;
  onError: (error: ErrorResponse | null) => void;
  onSuccess: (data: any) => void;
};
