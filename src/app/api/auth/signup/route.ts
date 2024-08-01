import bcrypt from "bcrypt";
import { signupSchema } from "@/app/(public)/signup/constants";
import { dbConnect } from "@/dbConfig/dbConnnect";
import { STATUSCODES } from "@/helpers/enums";
import {
  createDateTime,
  generateOTP,
  parseBody,
  sendEmail,
  sendResponse,
  throwNewError,
} from "@/helpers/server-utils";
import { apiAsyncHandler } from "@/lib/apiAsyncHandler";
import User from "@/models/User";
import { NextRequest } from "next/server";
import { encodeUserId, encrypt } from "@/lib/jwt";
import VerifyEmailOTPTemplate from "@/emails/VerifyEmailOTPTemplate";

export const POST = apiAsyncHandler(async (req: NextRequest) => {
  dbConnect();
  const body = await parseBody(req);

  const { success, data } = signupSchema.safeParse(body);

  if (!success) {
    throwNewError({
      status: STATUSCODES.BAD_REQUEST,
      error: "Invalid Payload",
    });
  }

  const { email, username, password } = data!;

  const [isEmailInUse, isUsernameInUse] = await Promise.all([
    User.findOne({
      email,
    }),
    User.findOne({
      username,
    }),
  ]);

  if (isEmailInUse || isUsernameInUse) {
    const error = isEmailInUse ? "Email already used" : "Username already used";
    throwNewError({
      status: STATUSCODES.CONFLICT,
      error,
    });
  }

  const otp = generateOTP();
  const verifyCodeExpiry = createDateTime({ minutes: 10 });

  const newUser = new User({
    email,
    username,
    password: await bcrypt.hash(password, 10),
    verifyCode: otp,
    verifyCodeExpiry,
  });

  const { error } = await sendEmail({
    to: email,
    subject: "Email Verification",
    template: VerifyEmailOTPTemplate({ username: username, otp }),
  });

  if (error) {
    throwNewError({
      status: STATUSCODES.SERVER_ERROR,
      error: `Account not created yet, Something went wrong while sending verification mail`,
    });
  }
  const user = await newUser.save();

  const verifyEmailToken = await encrypt(verifyCodeExpiry, {
    id: encodeUserId(user.id),
    expiresIn: verifyCodeExpiry,
  });

  return sendResponse({
    status: 200,
    message: `Registration Successfully, please check ${email} to verfiy`,
    data: { token: verifyEmailToken },
  });
});
