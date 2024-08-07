import { dbConnect } from "@/dbConfig/dbConnnect";
import { STATUSCODES } from "@/helpers/enums";
import { sendResponse, throwNewError } from "@/helpers/server-utils";
import { apiAsyncHandler } from "@/lib/apiAsyncHandler";
import { jwtVerifyHandler } from "@/lib/jwtVerifyHanlder";
import User from "@/models/User";
import { NextRequest } from "next/server";

export const GET = apiAsyncHandler(
  jwtVerifyHandler(async (_: NextRequest, userId: any) => {
    dbConnect();
    const user = await User.findById(userId);

    if (!user) {
      throwNewError({
        status: STATUSCODES.NOT_FOUND,
        error: `User not found`,
      });
      return;
    }

    const { username, email, findByEmail } = user;

    return sendResponse({
      status: 200,
      data: {
        username,
        email,
        findByEmail,
      },
    });
  })
);
