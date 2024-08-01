import { forgotPasswordSchema } from "@/app/(public)/forgot-password/constants";
import { dbConnect } from "@/dbConfig/dbConnnect";
import ForgotPasswordTemplate from "@/emails/ForgotPasswordTemplate";
import { STATUSCODES } from "@/helpers/enums";
import {
  createDateTime,
  parseBody,
  sendEmail,
  sendResponse,
  throwNewError,
} from "@/helpers/server-utils";
import { apiAsyncHandler } from "@/lib/apiAsyncHandler";
import { encodeUserId, encrypt } from "@/lib/jwt";
import User from "@/models/User";
import { NextRequest } from "next/server";

export const POST = apiAsyncHandler(async (req: NextRequest) => {
  dbConnect();
  const body = await parseBody(req);

  const { success, data } = forgotPasswordSchema.safeParse(body);

  if (!success) {
    throwNewError({
      status: STATUSCODES.BAD_REQUEST,
      error: "Invalid Payload",
    });
  }

  const { email } = data!;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    throwNewError({
      status: STATUSCODES.NOT_FOUND,
      error: `User not found`,
    });
  } else if (!user.isVerified) {
    throwNewError({
      status: STATUSCODES.NOT_FOUND,
      error: `User is not verified`,
    });
  } else {
    const forgotPasswordTokenExpiry = createDateTime({ minutes: 10 });
    const forgotPasswordToken = await encrypt(forgotPasswordTokenExpiry, {
      id: encodeUserId(user.id),
      expiresIn: forgotPasswordTokenExpiry,
    });

    const { error } = await sendEmail({
      to: email,
      subject: "Forgot Password",
      template: ForgotPasswordTemplate({
        resetLink: `${process.env.NEXT_PUBLIC_SITE_BASEURL}/reset-password?token=${forgotPasswordToken}`,
      }),
    });

    if (error) {
      throwNewError({
        status: STATUSCODES.SERVER_ERROR,
        error: `Something went wrong while sending the link`,
      });
    } else {
      await User.findByIdAndUpdate(user.id, {
        $set: {
          forgotPasswordToken: forgotPasswordToken,
          forgotPasswordTokenExpiry: forgotPasswordTokenExpiry,
        },
      });
      return sendResponse({
        status: 200,
        message: `please check ${email} to reset password`,
      });
    }
  }
});
