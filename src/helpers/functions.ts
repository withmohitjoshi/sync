import { NextRequest, NextResponse } from "next/server";
import { SendEmailT, SendResponseT } from "./types";
import { resend } from "@/lib/resend";
import VerifyEmailOTPTemplate from "@/emails/VerifyEmailOTPTemplate";

export const sendResponse = ({
  title,
  data,
  status,
  message,
}: SendResponseT) => {
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

export const sendEmail = async ({
  to = "andromj4@gmail.com",
  subject,
  template,
  onError,
  onSuccess,
}: SendEmailT) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_DOMAIN!,
      to,
      subject,
      react: template,
    });

    if (error) {
      return onError(error);
    }

    return onSuccess(data);
  } catch (error) {
    console.log({ error });

    return sendResponse({
      status: 500,
      message: "Got some error while sending mail",
      data: error,
    });
  }
};
