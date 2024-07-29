import { dbConnect } from "@/dbConfig/dbConnnect";
import { STATUSCODES } from "@/helpers/enums";
import { parseBody, sendResponse, throwNewError } from "@/helpers/functions";
import { apiAsyncHandler } from "@/lib/apiAsyncHandler";
import { jwtVerifyHandler } from "@/lib/jwtVerifyHanlder";
import User from "@/models/User";
import { NextRequest } from "next/server";
import { findByEmailSchema } from "@/app/(private)/myaccount/constants";

dbConnect();
export const PUT = apiAsyncHandler(
  jwtVerifyHandler(async (req: NextRequest, userId: any) => {
    const body = await parseBody(req);

    const { success, data } = findByEmailSchema.safeParse(body);

    if (!success) {
      throwNewError({
        status: STATUSCODES.BAD_REQUEST,
        error: "Invalid Payload",
      });
    }

    const { active } = data!;

    const user = await User.findById(userId);

    if (!user) {
      throwNewError({
        status: STATUSCODES.NOT_FOUND,
        error: `User not found`,
      });
    }

    await User.findByIdAndUpdate(user!.id, {
      $set: {
        findByEmail: active,
      },
    });
    return sendResponse({
      status: 200,
      message: `Changes are saved`,
    });
  })
);
