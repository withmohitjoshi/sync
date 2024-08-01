import { dbConnect } from "@/dbConfig/dbConnnect";
import { EMAIL_REGEX } from "@/helpers/constants";
import { STATUSCODES } from "@/helpers/enums";
import { sendResponse, throwNewError } from "@/helpers/server-utils";
import { apiAsyncHandler } from "@/lib/apiAsyncHandler";
import { jwtVerifyHandler } from "@/lib/jwtVerifyHanlder";
import User from "@/models/User";
import { NextRequest } from "next/server";

export const GET = apiAsyncHandler(
  jwtVerifyHandler(async (req: NextRequest, userId: any) => {
    dbConnect();
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

    const { contacts, requestReceived, requestSent } = user;

    const contactsIds = contacts.map(({ userId }) => userId.toString());
    const requestReceivedIds = requestReceived.map(({ userId }) =>
      userId.toString()
    );
    const requestSentIds = requestSent.map(({ userId }) => userId.toString());

    const isSearchQueryEmail = EMAIL_REGEX.test(searchQuery);
    const users = await User.find({
      $or: [
        { username: { $regex: new RegExp(searchQuery ?? "", "i") } },
        { email: { $regex: new RegExp(searchQuery ?? "", "i") } },
      ],
      _id: { $ne: userId },
      ...(isSearchQueryEmail ? { findByEmail: true } : {}),
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
