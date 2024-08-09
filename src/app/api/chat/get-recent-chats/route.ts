import { dbConnect } from "@/dbConfig/dbConnnect";
import { STATUSCODES } from "@/helpers/enums";
import { sendResponse, throwNewError } from "@/helpers/server-utils";
import { apiAsyncHandler } from "@/lib/apiAsyncHandler";
import { jwtVerifyHandler } from "@/lib/jwtVerifyHanlder";
import { NextRequest } from "next/server";
import Chat from "@/models/Chat";
import User from "@/models/User";

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

    const recentChats = await Chat.find({
      from: userId,
    }).select(["from", "to"]);

    return sendResponse({
      status: 200,
      data: recentChats,
    });
  })
);
