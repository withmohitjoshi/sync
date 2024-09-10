import bcrypt from "bcrypt";
import {
  createDateTime,
  generateOTP,
  parseBody,
  sendEmail,
  sendResponse,
  throwNewError,
} from "../../../../lib/server-utils";
import { encrypt, encodeUserId } from "../../../../lib/jwt";
import apiAsyncHandler from "../../../../lib/apiAsyncHandler";
import VerifyEmailOTPTemplate from "../../../../emails/VerifyEmailOTPTemplate";
import User from "../../../../models/User";
import dbConnect from "../../../../lib/dbConnect";
import { schema } from "../../../(public)/login/constants";
import { STATUSCODES } from "../../../../helpers/constants";
import { cookies } from "next/headers";

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

  const { email, password } = data;

  const user = await User.findOne({
    email,
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throwNewError({
      status: STATUSCODES.NOT_FOUND,
      error: `Email or password is wrong`,
    });
  }

  if (user && !user?.isVerified) {
    const otp = generateOTP();
    const verifyCodeExpiry = createDateTime({ minutes: 10 });

    const verifyEmailToken = await encrypt(verifyCodeExpiry, {
      id: encodeUserId(user.id),
      expiresIn: verifyCodeExpiry,
    });

    const { error } = await sendEmail({
      to: email,
      subject: "Email Verification",
      template: VerifyEmailOTPTemplate({ username: user.username, otp }),
    });

    if (!error) {
      await User.findByIdAndUpdate(user.id, {
        $set: {
          verifyCode: otp,
          verifyCodeExpiry,
        },
      });
      return sendResponse({
        status: 200,
        message: `To login, please check ${email} to verfiy`,
        data: { token: verifyEmailToken },
      });
    } else {
      throwNewError({
        status: STATUSCODES.SERVER_ERROR,
        error: `Something went wrong while sending verification mail`,
      });
    }
  } else if (user) {
    const expiresIn = createDateTime({ minutes: 100 });

    const token = await encrypt(expiresIn, {
      id: encodeUserId(user.id),
      expiresIn,
    });

    cookies().set("token", token, {
      httpOnly: true,
      expires: expiresIn,
    });

    return sendResponse({
      status: 200,
    });
  }
});
