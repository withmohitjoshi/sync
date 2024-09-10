import { decodeUserId, decrypt } from "./jwt";
import { STATUSCODES } from "../helpers/constants";
import { throwNewError } from "./server-utils";

const jwtVerifyHandler = (cb) => {
  return async (req) => {
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

export default jwtVerifyHandler;
