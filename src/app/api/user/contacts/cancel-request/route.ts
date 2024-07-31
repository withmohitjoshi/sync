import { contactsApiSchema } from "@/app/api/commonSchema";
import { dbConnect } from "@/dbConfig/dbConnnect";
import { STATUSCODES } from "@/helpers/enums";
import { parseBody, sendResponse, throwNewError } from "@/helpers/server-utils";
import { apiAsyncHandler } from "@/lib/apiAsyncHandler";
import { jwtVerifyHandler } from "@/lib/jwtVerifyHanlder";
import User from "@/models/User";
import { Types } from "mongoose";
import { NextRequest } from "next/server";

dbConnect();
export const POST = apiAsyncHandler(
  jwtVerifyHandler(async (req: NextRequest, userId: any) => {
    const body = await parseBody(req);

    const { success, data } = contactsApiSchema.safeParse(body);

    if (!success) {
      throwNewError({
        status: STATUSCODES.BAD_REQUEST,
        error: "Invalid Payload",
      });
      return;
    }

    const id = data.id as unknown as Types.ObjectId;

    const user = await User.findById(userId);
    const otherUser = await User.findById(id);

    if (!user || !otherUser) {
      throwNewError({
        status: STATUSCODES.NOT_FOUND,
        error: `User not found`,
      });
      return;
    }

    const { contacts } = user;
    const contactsIds = contacts.map(({ userId }) => userId.toString());

    if (contactsIds.includes(id.toString())) {
      throwNewError({
        status: STATUSCODES.NOT_FOUND,
        error: `Already connected with you`,
      });
    }

    const userIndex = user.requestSent.findIndex(
      ({ userId }) => userId.toString() === id.toString()
    );
    const otherUserIndex = otherUser.requestReceived.findIndex(
      ({ userId }) => userId.toString() === user.id
    );

    if (userIndex > -1) {
      user.requestSent.splice(userIndex, 1);
      otherUser.requestReceived.splice(otherUserIndex, 1);
      await Promise.all([user.save(), otherUser.save()]);
      return sendResponse({
        status: 200,
        message: "Request cancelled successfully",
      });
    } else {
      throwNewError({
        status: STATUSCODES.NOT_FOUND,
        error: `There is no such request was sent`,
      });
    }
  })
);
