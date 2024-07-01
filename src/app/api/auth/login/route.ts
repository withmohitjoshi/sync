import { loginSchema } from '@/app/login/constants';
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const body = await req.json();

  const { success, data, error } = loginSchema.safeParse(body, {});

  if (!success) {
    return NextResponse.json({
      status: 400,
      error: error.flatten(),
    });
  }

  return NextResponse.json({
    msg: 'Validation passed',
    data,
  });
};
