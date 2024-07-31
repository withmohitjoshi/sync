import { dbConnect } from "@/dbConfig/dbConnnect";
import { STATUSCODES } from "@/helpers/enums";
import { sendResponse, throwNewError } from "@/helpers/server-utils";
import { apiAsyncHandler } from "@/lib/apiAsyncHandler";
import { jwtVerifyHandler } from "@/lib/jwtVerifyHanlder";
import User from "@/models/User";
import { NextRequest } from "next/server";

dbConnect();
export const GET = apiAsyncHandler(
  jwtVerifyHandler(async (_: NextRequest, userId: any) => {
    const user = await User.findById(userId);

    if (!user) {
      throwNewError({
        status: STATUSCODES.NOT_FOUND,
        error: `User not found`,
      });
      return;
    }

    const data = await user.populate({
      path: "contacts.userId",
      select: ["id", "username"],
    });

    return sendResponse({
      status: 200,
      data: data.contacts.map(({ userId, createdAt }: any) => ({
        _id: userId._id.toString(),
        username: userId.username,
        createdAt,
      })),
    });
  })
);
