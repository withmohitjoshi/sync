import bcrypt from 'bcrypt';
import { loginSchema } from '@/app/(public)/login/constants';
import { dbConnect } from '@/dbConfig/dbConnnect';
import VerifyEmailOTPTemplate from '@/emails/VerifyEmailOTPTemplate';
import { STATUSCODES } from '@/helpers/enums';
import { createDateTime, generateOTP, parseBody, sendEmail, sendResponse, throwNewError } from '@/helpers/functions';
import { apiAsyncHandler } from '@/lib/apiAsyncHandler';
import { encodeUserId, encrypt } from '@/lib/jwt';
import User from '@/models/User';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

dbConnect();
export const POST = apiAsyncHandler(async (req: NextRequest) => {
  const body = await parseBody(req);

  const { success, data } = loginSchema.safeParse(body);

  if (!success) {
    throwNewError({
      status: STATUSCODES.BAD_REQUEST,
      error: 'Invalid Payload',
    });
  }

  const { email, password } = data!;

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return sendResponse({
      status: STATUSCODES.NOT_FOUND,
      message: 'User not found',
    });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    throwNewError({
      status: STATUSCODES.NOT_FOUND,
      error: `Email or password is wrong`,
    });
  }

  if (!user?.isVerified) {
    const otp = generateOTP();
    const verifyCodeExpiry = createDateTime({ minutes: 10 });

    const verifyEmailToken = await encrypt(verifyCodeExpiry, {
      id: encodeUserId(user.id),
      expiresIn: verifyCodeExpiry,
    });

    const { error } = await sendEmail({
      to: email,
      subject: 'Email Verification',
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
  } else {
    const expiresIn = createDateTime({ minutes: 30 });

    const token = await encrypt(expiresIn, {
      id: encodeUserId(user.id),
      expiresIn,
    });

    cookies().set('token', token, {
      httpOnly: true,
      expires: expiresIn,
    });

    return sendResponse({
      status: 200,
    });
  }
});
