import { dbConnect } from "@/dbConfig/dbConnnect";
import { STATUSCODES } from "@/helpers/enums";
import { parseBody, sendResponse, throwNewError } from "@/helpers/server-utils";
import { apiAsyncHandler } from "@/lib/apiAsyncHandler";
import { jwtVerifyHandler } from "@/lib/jwtVerifyHanlder";
import { NextRequest } from "next/server";
import { userIdApiSchema } from "../../commonSchema";
import { Types } from "mongoose";
import Chat from "@/models/Chat";
import User from "@/models/User";

export const POST = apiAsyncHandler(
  jwtVerifyHandler(async (req: NextRequest, userId: any) => {
    dbConnect();
    const body = await parseBody(req);

    const { success, data } = userIdApiSchema.safeParse(body);

    if (!success) {
      throwNewError({
        status: STATUSCODES.BAD_REQUEST,
        error: "Invalid Payload",
      });
      return;
    }

    const user = await User.findById(userId);

    if (!user) {
      throwNewError({
        status: STATUSCODES.NOT_FOUND,
        error: `User not found`,
      });
      return;
    }
    const id = data.id as unknown as Types.ObjectId;

    const isAlreadyCreated = await Chat.find({
      $and: [{ from: userId }, { to: id }],
    });

    if (!isAlreadyCreated || isAlreadyCreated.length === 0) {
      const newChat = new Chat({
        messages: [],
        from: userId,
        to: id,
      });
      await newChat.save();
    }

    return sendResponse({
      status: 200,
    });
  })
);
