import { jwtVerify, SignJWT } from 'jose';

const secret = process.env.JWT_SECRET_KEY;

export const jwtKey = new TextEncoder().encode(secret);

export const encrypt = async (time: Date, payload: any) => {
  return await new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime(time).sign(jwtKey);
};

export const decrypt = async (input: string): Promise<any> => {
  const { payload } = await jwtVerify(input, jwtKey, {
    algorithms: ['HS256'],
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
