import apiAsyncHandler from "../../../../lib/apiAsyncHandler";
import dbConnect from "../../../../lib/dbConnect";
import jwtVerifyHanlder from "../../../../lib/jwtVerifyHanlder";
import Connections from "../../../../models/Connections";
import { sendResponse } from "../../../../lib/server-utils";

export const GET = apiAsyncHandler(
  jwtVerifyHanlder(async (req, userId) => {
    dbConnect();

    const connections = await Connections.findOne({ userId })
      .select("send")
      .populate("send.userId", "username");

    const sendRequests = connections.send.map(({ userId, createdAt }) => ({
      username: userId.username,
      id: userId._id,
      createdAt,
    }));

    return sendResponse({
      status: 200,
      data: sendRequests,
    });
  })
);
