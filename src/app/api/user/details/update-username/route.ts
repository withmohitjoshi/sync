import { changeUsernameSchema } from "@/app/(private)/myaccount/constants";
import { dbConnect } from "@/dbConfig/dbConnnect";
import { STATUSCODES } from "@/helpers/enums";
import { parseBody, sendResponse, throwNewError } from "@/helpers/server-utils";
import { apiAsyncHandler } from "@/lib/apiAsyncHandler";
import { jwtVerifyHandler } from "@/lib/jwtVerifyHanlder";
import User from "@/models/User";
import { NextRequest } from "next/server";

dbConnect();
export const PUT = apiAsyncHandler(
  jwtVerifyHandler(async (req: NextRequest, userId: any) => {
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

    await User.findByIdAndUpdate(user!.id, {
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
