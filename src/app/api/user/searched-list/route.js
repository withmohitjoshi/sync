import apiAsyncHandler from "../../../../lib/apiAsyncHandler";
import dbConnect from "../../../../lib/dbConnect";
import jwtVerifyHanlder from "../../../../lib/jwtVerifyHanlder";
import { sendResponse } from "../../../../lib/server-utils";
import User from "@/models/User";

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

    const searchedResults = await User.find({
      username: { $regex: new RegExp(query ?? "", "i") },
      _id: { $ne: userId },
    }).select("username id");

    return sendResponse({
      status: 200,
      data: searchedResults,
    });
  })
);
