import { NextRequest, NextResponse } from "next/server";
import { SendResponseT } from "./types";

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
    return 0
  }
};
