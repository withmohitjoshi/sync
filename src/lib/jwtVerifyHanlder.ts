import { NextRequest } from "next/server";
import { STATUSCODES } from "@/helpers/enums";
import { decodeUserId, decrypt } from "./jwt";
import { throwNewError } from "@/helpers/server-utils";

export const jwtVerifyHandler = (cb: any) => {
  return async (req: NextRequest) => {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      throwNewError({
        status: STATUSCODES.UNAUTHORIZED,
        error: "Missing token",
      });
      return;
    }
    const { id } = await decrypt(token).catch(() =>
      throwNewError({
        status: STATUSCODES.UNAUTHORIZED,
        error: "Token Expired",
      })
    );
    const userId = decodeUserId(id);
    return cb(req, userId);
  };
};
