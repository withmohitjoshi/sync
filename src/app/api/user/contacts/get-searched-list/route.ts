import { dbConnect } from "@/dbConfig/dbConnnect";
import { STATUSCODES } from "@/helpers/enums";
import { sendResponse, throwNewError } from "@/helpers/server-utils";
import { apiAsyncHandler } from "@/lib/apiAsyncHandler";
import { jwtVerifyHandler } from "@/lib/jwtVerifyHanlder";
import User from "@/models/User";
import { NextRequest } from "next/server";

dbConnect();
export const GET = apiAsyncHandler(
  jwtVerifyHandler(async (req: NextRequest, userId: any) => {
    const searchQuery = req.nextUrl.searchParams.get("search");
    if (!searchQuery) {
      return sendResponse({
        status: 200,
        data: [],
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      throwNewError({
        status: STATUSCODES.NOT_FOUND,
        error: `User not found`,
      });
      return;
    }

    const contactsIds = user.contacts.map((contact) => contact.toString());
    const requestReceivedIds = user.requestReceived.map((request) =>
      request.toString()
    );
    const requestSentIds = user.requestSent.map((request) =>
      request.toString()
    );

    const users = await User.find({
      username: {
        $regex: new RegExp(searchQuery ?? "", "i"),
      },
      _id: { $ne: userId },
    }).select(["id", "username"]);

    const enhancedUsers = users.map((user) => ({
      ...user.toObject(),
      isContact: contactsIds.includes(user.id),
      isRequestReceived: requestReceivedIds.includes(user.id),
      isRequestSent: requestSentIds.includes(user.id),
    }));

    return sendResponse({
      status: 200,
      data: enhancedUsers,
    });
  })
);
