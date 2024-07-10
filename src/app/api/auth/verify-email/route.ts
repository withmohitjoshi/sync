import { verifyEmailSchema } from '@/app/verify-email/constants';
import { dbConnect } from '@/dbConfig/dbConnnect';
import { STATUSCODES } from '@/helpers/enums';
import { parseBody, sendResponse, throwNewError } from '@/helpers/functions';
import { apiAsyncHandler } from '@/lib/apiAsyncHandler';
import { decodeUserId, decrypt } from '@/lib/jwt';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

dbConnect();
export const POST = apiAsyncHandler(async (req: NextRequest) => {
  let token = req.headers.get('Authorization');

  token = token?.split(' ')?.[1] ?? null;

  if (!token) {
    throwNewError({
      status: STATUSCODES.UNAUTHORIZED,
      error: 'Invalid or broken link',
    });
    return;
  }

  const body = await parseBody(req);

  const { success, data } = verifyEmailSchema.safeParse(body);

  if (!success) {
    throwNewError({
      status: STATUSCODES.BAD_REQUEST,
      error: 'Bad Request',
    });
  }

  const { code } = data!;

  try {
    const { id } = await decrypt(token);
    const user_id = decodeUserId(id);

    const user = await User.findById(user_id);

    if (!user) {
      return sendResponse({
        status: STATUSCODES.NOT_FOUND,
        message: 'User not found',
      });
    }

    if (user?.isVerified) {
      return sendResponse({
        status: 410,
        message: 'link is expired',
      });
    }

    if (code === user?.verifyCode) {
      await User.findByIdAndUpdate(user_id, {
        $set: {
          isVerified: true,
          verifyCode: null,
          verifyCodeExpiry: null,
        },
      });
      return sendResponse({
        status: 200,
        message: `${user.email} is verified`,
      });
    } else {
      return sendResponse({
        status: STATUSCODES.UNAUTHORIZED,
        message: 'wrong code',
      });
    }
  } catch (error: any) {
    throwNewError({
      status: STATUSCODES.UNAUTHORIZED,
      error: 'Invalid or broken link',
    });
  }
});
