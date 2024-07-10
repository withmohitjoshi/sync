import { NextRequest, NextResponse } from 'next/server';
import { CreateDateTimeT, SendEmailT, SendResponseT } from './types';
import { resend } from '@/lib/resend';
import VerifyEmailOTPTemplate from '@/emails/VerifyEmailOTPTemplate';

export const sendResponse = ({ title, data, status, message }: SendResponseT) => {
  return NextResponse.json(
    {
      status,
      ...(title ? { title } : {}),
      ...(data ? { data } : {}),
      ...(message ? { message } : {}),
    },
    {
      status,
    }
  );
};

export const jsonParse = (str: string) => {
  if (!str) return null;
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
};

export const throwNewError = (d: object) => {
  throw new Error(JSON.stringify(d));
};

export const parseBody = async (req: NextRequest) => {
  try {
    const body = await req.json();
    return body;
  } catch {
    return {};
  }
};

export const getObjectLength = (object: object) => {
  try {
    return Object.keys(object).length;
  } catch {
    return 0;
  }
};

export const generateOTP = (length = 6) => {
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  const otp = Math.floor(min + Math.random() * (max - min + 1));
  return otp.toString();
};

export const sendEmail = async ({ to, subject, template }: SendEmailT) => {
  return resend.emails.send({
    from: process.env.RESEND_DOMAIN!,
    to,
    subject,
    react: template,
  });
};

export const createDateTime = ({ seconds = 0, minutes = 0, hours = 0, days = 0 }: CreateDateTimeT) => {
  const now = new Date();
  now.setSeconds(now.getSeconds() + seconds);
  now.setMinutes(now.getMinutes() + minutes);
  now.setHours(now.getHours() + hours);
  now.setDate(now.getDate() + days);
  return now;
};
