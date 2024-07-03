import bcrypt from "bcrypt";
import { signupSchema } from "@/app/signup/constants";
import { dbConnect } from "@/dbConfig/dbConnnect";
import { STATUSCODES } from "@/helpers/enums";
import {
  generateOTP,
  parseBody,
  sendEmail,
  sendResponse,
  throwNewError,
} from "@/helpers/functions";
import { apiAsyncHandler } from "@/lib/apiAsyncHandler";
import User from "@/models/User";
import { NextRequest } from "next/server";
import VerifyEmailOTPTemplate from "@/emails/VerifyEmailOTPTemplate";

dbConnect();

export const POST = apiAsyncHandler(async (req: NextRequest) => {
  const body = await parseBody(req);

  const { success, data } = signupSchema.safeParse(body);

  const otp = generateOTP();

  return sendEmail({
    to: data?.email,
    subject: "Email Verification",
    template: VerifyEmailOTPTemplate({ username: body?.username, otp }),
    onError(error) {
      throwNewError({
        status: STATUSCODES.BAD_REQUEST,
        error: error?.message,
      });
    },
    onSuccess(data) {
      return sendResponse({
        status: 200,
        message: "Email send Successfully",
        data,
      });
    },
  });

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

  const newUser = new User({
    email,
    username,
    password: await bcrypt.hash(password, 10),
  });

  newUser.save();

  return sendResponse({
    status: 200,
    message: "Registration Successfully",
  });
});
