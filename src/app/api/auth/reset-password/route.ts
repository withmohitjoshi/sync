import { resetPasswordSchema } from "@/app/(public)/reset-password/constants";
import { dbConnect } from "@/dbConfig/dbConnnect";
import { STATUSCODES } from "@/helpers/enums";
import { parseBody, sendResponse, throwNewError } from "@/helpers/functions";
import { apiAsyncHandler } from "@/lib/apiAsyncHandler";
import { decodeUserId, decrypt } from "@/lib/jwt";
import User from "@/models/User";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

dbConnect();
export const POST = apiAsyncHandler(async (req: NextRequest) => {
  let token = req.headers.get("Authorization");

  token = token?.split(" ")?.[1] ?? null;

  if (!token) {
    throwNewError({
      status: STATUSCODES.UNAUTHORIZED,
      error: "Invalid or broken link",
    });
    return;
  }

  const body = await parseBody(req);

  const { success, data } = resetPasswordSchema.safeParse(body);

  if (!success) {
    throwNewError({
      status: STATUSCODES.BAD_REQUEST,
      error: "Invalid Payload",
    });
  }

  const { newPassword } = data!;

  try {
    const { id } = await decrypt(token);
    const user_id = decodeUserId(id);

    const user = await User.findById(user_id);

    if (!user) {
      return sendResponse({
        status: STATUSCODES.NOT_FOUND,
        message: "User not found",
      });
    } else if (!user?.forgotPasswordToken) {
      sendResponse({
        status: STATUSCODES.UNAUTHORIZED,
        message: "Invalid or broken link",
      });
    }

    if (token === user?.forgotPasswordToken) {
      await User.findByIdAndUpdate(user_id, {
        $set: {
          forgotPasswordToken: null,
          forgotPasswordTokenExpiry: null,
          password: await bcrypt.hash(newPassword, 10),
        },
      });
      return sendResponse({
        status: 200,
        message: `New Password set successfully`,
      });
    } else {
      return sendResponse({
        status: STATUSCODES.UNAUTHORIZED,
        message: "Invalid or broken link",
      });
    }
  } catch (error: any) {
    throwNewError({
      status: STATUSCODES.UNAUTHORIZED,
      error: "Invalid or broken link",
    });
  }
});
