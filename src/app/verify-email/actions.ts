'use server';

import VerifyEmailOTPTemplate from '@/emails/VerifyEmailOTPTemplate';
import { STATUSCODES } from '@/helpers/enums';
import { generateOTP, sendEmail, sendResponse } from '@/helpers/functions';
import { decrypt, encrypt } from '@/lib/jwt';
import User from '@/models/User';

export const resendEmail = async (token: string) => {
  if (!token) {
    return {
      status: STATUSCODES.UNAUTHORIZED,
      error: 'Invalid or broken link',
    };
  }
  try {
    const { id } = await decrypt(token);
    const bytes = new Uint8Array(id.map((d: string) => parseInt(d, 10)));
    const user_id = new TextDecoder().decode(bytes);

    const user = await User.findById(user_id);

    if (!user) {
      return {
        status: STATUSCODES.NOT_FOUND,
        message: 'User not found',
      };
    }

    if (user?.isVerified) {
      return {
        status: 410,
        message: 'Invalid or broken link',
      };
    }

    const { email, username } = user!;

    const otp = generateOTP();
    const verifyCodeExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const { error } = await sendEmail({
      to: email,
      subject: 'Email Verification',
      template: VerifyEmailOTPTemplate({ username, otp }),
    });

    if (!error) {
      await User.findByIdAndUpdate(user_id, {
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

      return {
        status: 200,
        message: `OTP resent to ${email}`,
        data: { token: verifyEmailToken },
      };
    } else {
      return {
        status: STATUSCODES.SERVER_ERROR,
        message: `Something went wrong while sending verification mail try again later`,
      };
    }
  } catch (error) {
    return {
      status: STATUSCODES.UNAUTHORIZED,
      message: 'Invalid or broken link',
    };
  }
};
