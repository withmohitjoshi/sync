import { verifyEmailSchema } from "@/app/(public)/verify-email/constants";
import { dbConnect } from "@/dbConfig/dbConnnect";
import { STATUSCODES } from "@/helpers/enums";
import { parseBody, sendResponse, throwNewError } from "@/helpers/functions";
import { apiAsyncHandler } from "@/lib/apiAsyncHandler";
import { decodeUserId, decrypt } from "@/lib/jwt";
import User from "@/models/User";
import { NextRequest } from "next/server";

dbConnect();
export const POST = apiAsyncHandler(async (req: NextRequest) => {
  let token = req.headers.get("Authorization");

  token = token?.split(" ")?.[1] ?? null;

  if (!token) {
    throwNewError({
      status: STATUSCODES.NOT_FOUND,
      error: "Invalid or broken link",
    });
    return;
  }

  const body = await parseBody(req);

  const { success, data } = verifyEmailSchema.safeParse(body);

  if (!success) {
    throwNewError({
      status: STATUSCODES.BAD_REQUEST,
      error: "Invalid Payload",
    });
  }

  const { code } = data!;

  const { id } = await decrypt(token);
  const user_id = decodeUserId(id);

  const user = await User.findById(user_id);

  if (!user) {
    throwNewError({
      status: STATUSCODES.NOT_FOUND,
      error: "User not found",
    });
  }

  if (user?.isVerified) {
    throwNewError({
      status: STATUSCODES.EXPIRED,
      error: "Link is expired",
    });
  }

  if (code === user?.verifyCode) {
    await User.findByIdAndUpdate(user_id, {
      $set: {
        isVerified: true,
        verifyCode: null,
        verifyCodeExpiry: null,
      },
    });
    return sendResponse({
      status: 200,
      message: `${user.email} is verified`,
    });
  } else {
    return throwNewError({
      status: STATUSCODES.NOT_FOUND,
      error: "Entered code is wrong",
    });
  }
});
