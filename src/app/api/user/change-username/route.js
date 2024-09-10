import apiAsyncHandler from "../../../../lib/apiAsyncHandler";
import jwtVerifyHandler from "../../../../lib/jwtVerifyHanlder";
import dbConnect from "../../../../lib/dbConnect";
import User from "../../../../models/User";
import {
  parseBody,
  sendResponse,
  throwNewError,
} from "../../../../lib/server-utils";
import { changeUsernameSchema } from "../../../(private)/myaccount/constants";
import { STATUSCODES } from "../../../../helpers/constants";

export const PUT = apiAsyncHandler(
  jwtVerifyHandler(async (req, userId) => {
    dbConnect();
    const body = await parseBody(req);

    const { success, data } = changeUsernameSchema.safeParse(body);

    if (!success) {
      throwNewError({
        status: STATUSCODES.BAD_REQUEST,
        error: "Invalid Payload",
      });
      return;
    }

    const { username } = data;

    const isUsernameInUse = await User.findOne({
      username,
    });

    if (isUsernameInUse) {
      throwNewError({
        status: 409,
        error: `Username not available`,
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      throwNewError({
        status: STATUSCODES.NOT_FOUND,
        error: `User not found`,
      });
    }

    await User.findByIdAndUpdate(user.id, {
      $set: {
        username,
      },
    });
    return sendResponse({
      status: 200,
      message: `Username changed successfully`,
    });
  })
);
