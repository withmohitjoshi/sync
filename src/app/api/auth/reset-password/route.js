import bcrypt from "bcrypt";
import {
  parseBody,
  sendResponse,
  throwNewError,
} from "../../../../lib/server-utils";
import { decrypt, decodeUserId } from "../../../../lib/jwt";
import apiAsyncHandler from "../../../../lib/apiAsyncHandler";
import User from "../../../../models/User";
import dbConnect from "../../../../lib/dbConnect";
import { schema } from "../../../(public)/reset-password/constants";
import { STATUSCODES } from "../../../../helpers/constants";

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

  const { newPassword } = data;

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
      error: `User not found`,
    });
  } else if (
    !user?.forgotPasswordToken ||
    token !== user?.forgotPasswordToken
  ) {
    throwNewError({
      status: STATUSCODES.NOT_FOUND,
      error: `Invalid or broken link`,
    });
  }

  await User.findByIdAndUpdate(user_id, {
    $set: {
      forgotPasswordToken: null,
      forgotPasswordTokenExpiry: null,
      password: await bcrypt.hash(newPassword, 10),
    },
  });
  return sendResponse({
    status: 200,
    message: `New Password set successfully`,
  });
});
