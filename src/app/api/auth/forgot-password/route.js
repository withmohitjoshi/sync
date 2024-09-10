import {
  createDateTime,
  parseBody,
  sendEmail,
  sendResponse,
  throwNewError,
} from "../../../../lib/server-utils";
import { encrypt, encodeUserId } from "../../../../lib/jwt";
import apiAsyncHandler from "../../../../lib/apiAsyncHandler";
import User from "../../../../models/User";
import dbConnect from "../../../../lib/dbConnect";
import { schema } from "../../../(public)/forgot-password/constants";
import { STATUSCODES } from "../../../../helpers/constants";
import ForgotPasswordTemplate from "../../../../emails/ForgotPasswordTemplate";

export const POST = apiAsyncHandler(async (req) => {
  dbConnect();
  const body = await parseBody(req);

  const { success, data } = schema.safeParse(body);

  if (!success) {
    throwNewError({
      status: STATUSCODES.BAD_REQUEST,
      error: "Invalid Payload",
    });
  }

  const { email } = data;

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

    return sendResponse({
      status: 200,
      message: `please check ${email} to reset password`,
    });
  }
});
