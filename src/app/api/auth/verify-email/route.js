import { parseBody, sendResponse, throwNewError } from "../../../../lib/server-utils";
import apiAsyncHandler from "../../../../lib/apiAsyncHandler";
import User from "../../../../models/User";
import dbConnect from "../../../../lib/dbConnect";
import { STATUSCODES } from "../../../../helpers/constants";
import { schema } from "../../../(public)/verify-email/constants";
import { decrypt,decodeUserId } from "../../../../lib/jwt";

export const POST = apiAsyncHandler(async (req) => {
  dbConnect();
  let token = req.headers.get("Authorization");

  token = token?.split(" ")?.[1] ?? null;

  if (!token) {
    throwNewError({
      status: STATUSCODES.NOT_FOUND,
      error: "Invalid or broken link",
    });
    return;
  }

  const body = await parseBody(req);

  const { success, data } = schema.safeParse(body);

  if (!success) {
    throwNewError({
      status: STATUSCODES.BAD_REQUEST,
      error: "Invalid Payload",
    });
  }

  const { code } = data;

  const { id } = await decrypt(token).catch(() =>
    throwNewError({
      status: STATUSCODES.EXPIRED,
      error: "Link is expired",
    })
  );

  const user_id = decodeUserId(id);

  const user = await User.findById(user_id);

  if (!user) {
    throwNewError({
      status: STATUSCODES.NOT_FOUND,
      error: "User not found",
    });
  }

  if (user?.isVerified) {
    throwNewError({
      status: STATUSCODES.EXPIRED,
      error: "Link is expired",
    });
  }

  if (code === user?.verifyCode) {
    await User.findByIdAndUpdate(user_id, {
      $set: {
        isVerified: true,
        verifyCode: null,
        verifyCodeExpiry: null,
      },
    });
    return sendResponse({
      status: 200,
      message: `${user.email} is verified`,
    });
  } else {
    return throwNewError({
      status: STATUSCODES.NOT_FOUND,
      error: "Entered code is wrong",
    });
  }
});
