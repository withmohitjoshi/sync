import apiAsyncHandler from "../../../../lib/apiAsyncHandler";
import dbConnect from "../../../../lib/dbConnect";
import jwtVerifyHanlder from "../../../../lib/jwtVerifyHanlder";
import Connections from "../../../../models/Connections";
import { sendResponse } from "../../../../lib/server-utils";

export const GET = apiAsyncHandler(
  jwtVerifyHanlder(async (req, userId) => {
    dbConnect();

    const myConnections = await Connections.findOne({ userId })
      .select("connections")
      .populate("connections.userId", "username");

    const allConnections = myConnections.connections.map(
      ({ userId, createdAt }) => ({
        username: userId.username,
        id: userId._id,
        createdAt,
      })
    );

    return sendResponse({
      status: 200,
      data: allConnections,
    });
  })
);
