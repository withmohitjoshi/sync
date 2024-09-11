import apiAsyncHandler from "../../../../lib/apiAsyncHandler";
import dbConnect from "../../../../lib/dbConnect";
import jwtVerifyHanlder from "../../../../lib/jwtVerifyHanlder";
import { sendResponse } from "../../../../lib/server-utils";
import User from "@/models/User";
import mongoose from "mongoose";
export const GET = apiAsyncHandler(
  jwtVerifyHanlder(async (req, userId) => {
    dbConnect();
    const query = req.nextUrl.searchParams.get("query");

    if (!query || !userId) {
      return sendResponse({
        status: 200,
        data: [],
      });
    }

    const userObjectId = new mongoose.Types.ObjectId(userId);

    const pipeline = [
      {
        $match: {
          username: { $regex: new RegExp(query ?? "", "i") },
          _id: {
            $ne: userObjectId,
          },
        },
      },
      {
        $lookup: {
          from: "connections",
          localField: "_id",
          foreignField: "userId",
          as: "connections",
        },
      },
      {
        $unwind: "$connections",
      },
      {
        $match: {
          $and: [
            {
              "connections.received.userId": {
                $ne: userObjectId,
              },
            },
            {
              "connections.connected.userId": {
                $ne: userObjectId,
              },
            },
            {
              "connections.send.userId": {
                $ne: userObjectId,
              },
            },
          ],
        },
      },
      {
        $project: {
          username: 1,
          id: 1,
        },
      },
    ];

    const searchedResults = await User.aggregate(pipeline);

    return sendResponse({
      status: 200,
      data: searchedResults,
    });
  })
);
