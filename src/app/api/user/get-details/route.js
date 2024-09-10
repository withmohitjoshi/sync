import { STATUSCODES } from "../../../../helpers/constants";
import apiAsyncHandler from "../../../../lib/apiAsyncHandler";
import dbConnect from "../../../../lib/dbConnect";
import jwtVerifyHandler from "../../../../lib/jwtVerifyHanlder";
import { sendResponse, throwNewError } from "../../../../lib/server-utils";
import User from "../../../../models/User";

export const GET = apiAsyncHandler(
  jwtVerifyHandler(async (_, userId) => {
    dbConnect();
    const user = await User.findById(userId);

    if (!user) {
      throwNewError({
        status: STATUSCODES.NOT_FOUND,
        error: `User not found`,
      });
      return;
    }

    const { username, email } = user;

    return sendResponse({
      status: 200,
      data: {
        username,
        email,
      },
    });
  })
);
