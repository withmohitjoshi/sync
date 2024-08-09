import { userIdApiSchema } from "@/app/api/commonSchema";
import { dbConnect } from "@/dbConfig/dbConnnect";
import { STATUSCODES } from "@/helpers/enums";
import { parseBody, sendResponse, throwNewError } from "@/helpers/server-utils";
import { apiAsyncHandler } from "@/lib/apiAsyncHandler";
import { jwtVerifyHandler } from "@/lib/jwtVerifyHanlder";
import User from "@/models/User";
import { Types } from "mongoose";
import { NextRequest } from "next/server";

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

    const userIndex = user.requestReceived.findIndex(
      ({ userId }) => userId.toString() === id.toString()
    );
    const otherUserIndex = user.requestSent.findIndex(
      ({ userId }) => userId.toString() === user.id
    );

    if (userIndex > -1) {
      user.requestReceived.splice(userIndex, 1);
      otherUser.requestSent.splice(otherUserIndex, 1);
      user.contacts.push({
        userId: id,
      });
      otherUser.contacts.push({
        userId: user.id,
      });
      await Promise.all([user.save(), otherUser.save()]);
      return sendResponse({
        status: 200,
        message: `You become friend with ${otherUser.username}`,
      });
    } else {
      throwNewError({
        status: STATUSCODES.NOT_FOUND,
        error: `There is no such request was recevied`,
      });
    }
  })
);
