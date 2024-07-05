import { verifyEmailSchema } from '@/app/verifyemail/constants';
import { dbConnect } from '@/dbConfig/dbConnnect';
import { STATUSCODES } from '@/helpers/enums';
import { parseBody, sendResponse, throwNewError } from '@/helpers/functions';
import { apiAsyncHandler } from '@/lib/apiAsyncHandler';
import { decrypt } from '@/lib/jwt';
import User from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';

dbConnect();
export const POST = apiAsyncHandler(async (req: NextRequest) => {
  let token = req.headers.get('Authorization');

  token = token?.split(' ')?.[1] ?? null;

  const body = await parseBody(req);

  const { success, data } = verifyEmailSchema.safeParse(body);

  if (!success) {
    throwNewError({
      status: STATUSCODES.BAD_REQUEST,
      error: 'Bad Request',
    });
  }

  const { code } = data!;

  if (!token) {
    brokenLink(STATUSCODES.UNAUTHORIZED);
    return;
  }

  try {
    const { id } = await decrypt(token);
    const bytes = new Uint8Array(id.map((d: string) => parseInt(d, 10)));
    const user_id = new TextDecoder().decode(bytes);

    const user = await User.findById(user_id);

    if (!user) {
      return sendResponse({
        status: STATUSCODES.NOT_FOUND,
        message: 'User not found',
      });
    }

    if (user?.isVerified) {
      return sendResponse({
        status: STATUSCODES.FORBIDDEN,
        message: 'Invalid or broken link',
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
      });
    }
  } catch (error: any) {
    if (error.name === 'JWTExpired') {
      brokenLink(STATUSCODES.UNAUTHORIZED);
    }
  }
});

const brokenLink = (status: STATUSCODES) => {
  throwNewError({
    status,
    error: 'Invalid or broken link',
  });
};
