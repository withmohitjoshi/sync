import { createDateTime } from "@/helpers/functions";
import { jwtVerify, SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.JWT_SECRET_KEY;

export const jwtKey = new TextEncoder().encode(secret);

export const encrypt = async (time: Date, payload: any) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(time)
    .sign(jwtKey);
};

export const decrypt = async (input: string): Promise<any> => {
  const { payload } = await jwtVerify(input, jwtKey, {
    algorithms: ["HS256"],
  });
  return payload;
};

export const encodeUserId = (userId: string) => {
  const encodedUserId = new TextEncoder().encode(userId);
  return Array.from(encodedUserId);
};

export const decodeUserId = (id: string[]) => {
  const bytes = new Uint8Array(id.map((d: string) => parseInt(d, 10)));
  return new TextDecoder().decode(bytes);
};

export const updateJWTSession = async (req: NextRequest, res: NextResponse) => {
  const token = req.cookies.get("token")?.value;

  if (!token) return;
  const payload = await decrypt(token);
  const threshold = Date.now() + 30 * 1000;
  const isNearExpiration = payload.exp * 1000 < threshold;
  if (isNearExpiration) {
    payload.expiesIn = createDateTime({ minutes: 10 });
    const newToken = await encrypt(payload.expiesIn, payload);
    res.cookies.set("token", newToken, {
      httpOnly: true,
      expires: payload.expiesIn,
    });
  }
};
