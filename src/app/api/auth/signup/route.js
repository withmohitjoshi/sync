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
import { schema } from "../../../(public)/signup/constants";
import { STATUSCODES } from "../../../../helpers/constants";
import Connections from "../../../../models/Connections";

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

  const { email, username, password } = data;

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
  const verifyCodeExpiry = createDateTime({ minutes: 50 });

  const newUser = new User({
    email,
    username,
    password: await bcrypt.hash(password, 10),
    verifyCode: otp,
    verifyCodeExpiry,
  });
  const connections = new Connections({
    userId: newUser.id,
  });

  if (process.env.NODE_ENV === "production") {
    const { error } = await sendEmail({
      to: email,
      subject: "Email Verification",
      template: VerifyEmailOTPTemplate({ username, otp }),
    });

    if (error) {
      throwNewError({
        status: STATUSCODES.SERVER_ERROR,
        error: `Account not created yet, Something went wrong while sending verification mail`,
      });
    }
  }

  const user = await newUser.save();
  await connections.save();

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
