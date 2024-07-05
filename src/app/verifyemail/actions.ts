'use server';

import VerifyEmailOTPTemplate from '@/emails/VerifyEmailOTPTemplate';
import { STATUSCODES } from '@/helpers/enums';
import { sendEmail, sendResponse } from '@/helpers/functions';
import { decrypt } from '@/lib/jwt';
import User from '@/models/User';

export const resendEmail = async (token: string) => {
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
        status: STATUSCODES.FORBIDDEN,
        message: 'Invalid or broken link',
      };
    }

    const { email, username, verifyCode } = user!;

    const { error } = await sendEmail({
      to: email,
      subject: 'Email Verification',
      template: VerifyEmailOTPTemplate({ username: username, otp: verifyCode }),
    });
    if (!error) {
      return {
        status: 200,
        message: `OTP resent to ${email}`,
      };
    }
  } catch (error) {
    return {
      status: STATUSCODES.SERVER_ERROR,
      message: `Account not created yet, Something went wrong while sending verification mail`,
    };
  }
};
