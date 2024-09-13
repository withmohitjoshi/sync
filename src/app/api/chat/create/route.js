import apiAsyncHandler from "@/lib/apiAsyncHandler";
import jwtVerifyHandler from "@/lib/jwtVerifyHanlder";
import dbConnect from "../../../../../server/dbConfig/dbConnect";
import { parseBody, sendResponse, throwNewError } from "@/lib/server-utils";
import { connectionApiSchema } from "../../zodSchema";
import Chat from "@/models/Chat";
import { STATUSCODES } from "@/helpers/constants";
import Connections from "@/models/Connections";

export const POST = apiAsyncHandler(
  jwtVerifyHandler(async (req, userId) => {
    dbConnect();
    const body = await parseBody(req);

    const { success, data } = connectionApiSchema.safeParse(body);

    if (!success) {
      throwNewError({
        status: STATUSCODES.BAD_REQUEST,
        error: "Invalid Payload",
      });
      return;
    }

    const { id } = data;

    if (userId === id) {
      throwNewError({
        status: STATUSCODES.CONFLICT,
        error: "You cannot chat with yourself",
      });
    }

    const isConnection = await Connections.findOne({
      $and: [{ userId }, { connections: { $elemMatch: { userId: id } } }],
    });

    if (!isConnection) {
      throwNewError({
        status: STATUSCODES.NOT_FOUND,
        error: "Please connect first to chat",
      });
    }

    const isChatExists = await Chat.findOne({
      $or: [
        { createdBy: userId, recipient: id },
        { createdBy: id, recipient: userId },
      ],
    });

    if (!isChatExists) {
      const newChat = new Chat({
        createdBy: userId,
        recipient: id,
      });

      await newChat.save();

      return sendResponse({
        status: 201,
        message: "Chat created successfully",
        data: { chatId: newChat.id },
      });
    }

    return sendResponse({
      status: 200,
      data: { chatId: isChatExists.id },
    });
  })
);
