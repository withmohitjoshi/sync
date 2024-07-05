import bcrypt from 'bcrypt';
import { signupSchema } from '@/app/signup/constants';
import { dbConnect } from '@/dbConfig/dbConnnect';
import { STATUSCODES } from '@/helpers/enums';
import { generateOTP, parseBody, sendEmail, sendResponse, throwNewError } from '@/helpers/functions';
import { apiAsyncHandler } from '@/lib/apiAsyncHandler';
import User from '@/models/User';
import { NextRequest } from 'next/server';
import { encrypt } from '@/lib/jwt';
import VerifyEmailOTPTemplate from '@/emails/VerifyEmailOTPTemplate';

dbConnect();
export const POST = apiAsyncHandler(async (req: NextRequest) => {
  const body = await parseBody(req);

  const { success, data } = signupSchema.safeParse(body);

  if (!success) {
    throwNewError({
      status: STATUSCODES.BAD_REQUEST,
      error: 'Invalid Payload',
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
    const error = isEmailInUse ? 'Email already used' : 'Username already used';
    throwNewError({
      status: STATUSCODES.CONFLICT,
      error,
    });
  }

  const otp = generateOTP();
  const verifyCodeExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  const newUser = new User({
    email,
    username,
    password: await bcrypt.hash(password, 10),
    verifyCode: otp,
    verifyCodeExpiry,
  });

  try {
    const user = await newUser.save();
    await sendEmail({
      to: email,
      subject: 'Email Verification',
      template: VerifyEmailOTPTemplate({ username: username, otp }),
    });

    const encodedUserId = new TextEncoder().encode(user.id);

    const verifyEmailToken = await encrypt(verifyCodeExpiry, {
      id: Array.from(encodedUserId),
      expiresIn: verifyCodeExpiry,
    });

    return sendResponse({
      status: 200,
      message: `Registration Successfully, please check ${email} to verfiy`,
      data: { token: verifyEmailToken },
    });
  } catch (error) {
    console.error('Error while sending mail or saving new user:', { error });
    const isUserGetCreatedInDB = await User.findOne({ email });
    if (isUserGetCreatedInDB) {
      User.deleteOne({ email });
    } else {
      throwNewError({
        status: STATUSCODES.SERVER_ERROR,
        error: `Account not created yet, Something went wrong while sending verification mail`,
      });
    }
  }
});
