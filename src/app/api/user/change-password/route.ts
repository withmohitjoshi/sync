import { changePasswordSchema } from "@/app/(private)/change-password/constants";
import { dbConnect } from "@/dbConfig/dbConnnect";
import { STATUSCODES } from "@/helpers/enums";
import { parseBody, sendResponse, throwNewError } from "@/helpers/functions";
import { apiAsyncHandler } from "@/lib/apiAsyncHandler";
import { jwtVerifyHandler } from "@/lib/jwtVerifyHanlder";
import User from "@/models/User";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";

dbConnect();
export const POST = apiAsyncHandler(
  jwtVerifyHandler(async (req: NextRequest, userId: any) => {
    const body = await parseBody(req);

    const { success, data } = changePasswordSchema.safeParse(body);

    if (!success) {
      throwNewError({
        status: STATUSCODES.BAD_REQUEST,
        error: "Invalid Payload",
      });
    }

    const { oldPassword, newPassword } = data!;

    const user = await User.findById(userId);

    if (!user) {
      throwNewError({
        status: STATUSCODES.NOT_FOUND,
        error: `User not found`,
      });
    }

    if (user && !(await bcrypt.compare(oldPassword, user.password))) {
      throwNewError({
        status: STATUSCODES.NOT_FOUND,
        error: `Old password is wrong`,
      });
    }
    await User.findByIdAndUpdate(user!.id, {
      $set: {
        password: await bcrypt.hash(newPassword, 10),
      },
    });
    return sendResponse({
      status: 200,
      message: `Password Changed`,
    });
  })
);
