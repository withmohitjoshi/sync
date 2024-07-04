import { jwtVerify, SignJWT } from "jose";

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
