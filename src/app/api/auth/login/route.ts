import bcrypt from "bcrypt";
import { loginSchema } from "@/app/login/constants";
import { dbConnect } from "@/dbConfig/dbConnnect";
import VerifyEmailOTPTemplate from "@/emails/VerifyEmailOTPTemplate";
import { STATUSCODES } from "@/helpers/enums";
import {
  generateOTP,
  parseBody,
  sendEmail,
  sendResponse,
  throwNewError,
} from "@/helpers/functions";
import { apiAsyncHandler } from "@/lib/apiAsyncHandler";
import { encrypt } from "@/lib/jwt";
import User from "@/models/User";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export const POST = apiAsyncHandler(async (req: NextRequest) => {
  const body = await parseBody(req);

  const { success, data } = loginSchema.safeParse(body);

  if (!success) {
    throwNewError({
      status: STATUSCODES.BAD_REQUEST,
      error: "Invalid Payload",
    });
  }

  const { email, password } = data!;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return sendResponse({
      status: STATUSCODES.NOT_FOUND,
      message: "User not found",
    });
  }

  const _ = await bcrypt.compare(password, user.password);
  if (!_) {
    throwNewError({
      status: STATUSCODES.NOT_FOUND,
      error: `Email or password is wrong`,
    });
  }

  if (!user?.isVerified) {
    const otp = generateOTP();
    const verifyCodeExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await User.findByIdAndUpdate(user.id, {
      $set: {
        verifyCode: otp,
        verifyCodeExpiry,
      },
    });
    const encodedUserId = new TextEncoder().encode(user.id);
    const verifyEmailToken = await encrypt(verifyCodeExpiry, {
      id: Array.from(encodedUserId),
      expiresIn: verifyCodeExpiry,
    });

    const { error } = await sendEmail({
      to: email,
      subject: "Email Verification",
      template: VerifyEmailOTPTemplate({ username: user.username, otp }),
    });

    if (!error) {
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
  } else {
    const expiresIn = new Date(Date.now() + 30 * 60 * 1000); // 30 mintues
    const encodedUserId = new TextEncoder().encode(user.id);

    const token = await encrypt(expiresIn, {
      id: Array.from(encodedUserId),
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
