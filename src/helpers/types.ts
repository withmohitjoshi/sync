import { ErrorResponse } from 'resend';
import { STATUSCODES } from './enums';

export type SendResponseT = {
  title?: string;
  status: STATUSCODES | number;
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

export type CreateDateTimeT = {
  seconds?: number;
  minutes?: number;
  hours?: number;
  days?: number;
};
