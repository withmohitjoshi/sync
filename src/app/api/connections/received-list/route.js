import apiAsyncHandler from "../../../../lib/apiAsyncHandler";
import dbConnect from "../../../../lib/dbConnect";
import jwtVerifyHanlder from "../../../../lib/jwtVerifyHanlder";
import Connections from "../../../../models/Connections";
import { sendResponse } from "../../../../lib/server-utils";

export const GET = apiAsyncHandler(
  jwtVerifyHanlder(async (req, userId) => {
    dbConnect();

    const connections = await Connections.findOne({ userId })
      .select("received")
      .populate("received.userId", "username");

    const receivedRequests = connections.received.map(
      ({ userId, createdAt }) => ({
        username: userId.username,
        id: userId._id,
        createdAt,
      })
    );

    return sendResponse({
      status: 200,
      data: receivedRequests,
    });
  })
);
