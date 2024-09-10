import bcrypt from "bcrypt";
import { schema } from "../../../(private)/change-password/constants";
import { STATUSCODES } from "../../../../helpers/constants";
import dbConnect from "../../../../lib/dbConnect";
import apiAsyncHandler from "../../../../lib/apiAsyncHandler";
import jwtVerifyHandler from "../../../../lib/jwtVerifyHanlder";
import { parseBody, sendResponse, throwNewError } from "../../../../lib/server-utils";
import User from "../../../../models/User";

export const PUT = apiAsyncHandler(
  jwtVerifyHandler(async (req, userId) => {
    dbConnect();
    const body = await parseBody(req);

    const { success, data } = schema.safeParse(body);

    if (!success) {
      throwNewError({
        status: STATUSCODES.BAD_REQUEST,
        error: "Invalid Payload",
      });
    }

    const { oldPassword, newPassword } = data;

    const user = await User.findById(userId);

    if (!user) {
      throwNewError({
        status: STATUSCODES.NOT_FOUND,
        error: `User not found`,
      });
    }

    if (user && !(await bcrypt.compare(oldPassword, user.password))) {
      throwNewError({
        status: STATUSCODES.NOT_FOUND,
        error: `Old password is wrong`,
      });
    }
    await User.findByIdAndUpdate(user?.id, {
      $set: {
        password: await bcrypt.hash(newPassword, 10),
      },
    });
    return sendResponse({
      status: 200,
      message: `Password Changed`,
    });
  })
);
