"use server";
import {
  createDateTime,
  generateOTP,
  sendEmail,
} from "../../../lib/server-utils";
import VerifyEmailOTPTemplate from "../../../emails/VerifyEmailOTPTemplate";
import { STATUSCODES } from "../../../helpers/constants";
import { decodeUserId, decrypt, encodeUserId, encrypt } from "../../../lib/jwt";
import User from "../../../models/User";

export const resendVerifyEmail = async (token) => {
  try {
    const { id } = await decrypt(token);
    const user_id = decodeUserId(id);

    const user = await User.findById(user_id);

    if (!user) {
      return {
        status: STATUSCODES.NOT_FOUND,
        message: "User not found",
      };
    }

    if (user?.isVerified) {
      return {
        status: STATUSCODES.EXPIRED,
        message: "Link is expired",
      };
    }

    const { email, username } = user;

    const otp = generateOTP();
    const verifyCodeExpiry = createDateTime({ minutes: 10 });

    const { error } = await sendEmail({
      to: email,
      subject: "Email Verification",
      template: VerifyEmailOTPTemplate({ username, otp }),
    });

    if (!error) {
      await User.findByIdAndUpdate(user_id, {
        $set: {
          verifyCode: otp,
          verifyCodeExpiry,
        },
      });

      const verifyEmailToken = await encrypt(verifyCodeExpiry, {
        id: encodeUserId(user.id),
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
        message: `Something went wrong while sending verification mail`,
      };
    }
  } catch (error) {
    if (error?.name?.includes("JWTExpired")) {
      return {
        status: STATUSCODES.EXPIRED,
        message: "Link is expired",
      };
    }

    return {
      status: STATUSCODES.SERVER_ERROR,
      message: "Something went wrong (default)",
    };
  }
};
