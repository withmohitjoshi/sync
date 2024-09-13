import apiAsyncHandler from "@/lib/apiAsyncHandler";
import jwtVerifyHandler from "@/lib/jwtVerifyHanlder";
import { sendResponse } from "@/lib/server-utils";
import Chat from "@/models/Chat";
import mongoose from "mongoose";

export const GET = apiAsyncHandler(
  jwtVerifyHandler(async (_, userId) => {
    
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const pipeline = [
      {
        $match: {
          $or: [
            { createdBy: userObjectId },
            { recipientId: userObjectId, lastMessage: { $ne: null } },
          ],
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "createdBy",
          foreignField: "_id",
          as: "createdBy",
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "recipient",
          foreignField: "_id",
          as: "recipient",
        },
      },
      {
        $unwind: "$createdBy",
      },
      {
        $unwind: "$recipient",
      },
      {
        $project: {
          createdBy: {
            _id: 1,
            username: 1,
          },
          recipient: {
            _id: 1,
            username: 1,
          },
        },
      },
    ];

    const inboxChatsList = await Chat.aggregate(pipeline);

    return sendResponse({
      status: 200,
      data: inboxChatsList,
    });
  })
);
