import { ErrorResponse } from 'resend';
import { STATUSCODES } from './enums';

export type SendResponseT = {
  title?: string;
  status: STATUSCODES;
  data?: unknown;
  message?: string;
};

export type SendEmailT = {
  to: string | string[];
  subject: string;
  template: JSX.Element;
};

export type AppRouterPagePropsT = {
  params?: any;
  searchParams?: any;
};
