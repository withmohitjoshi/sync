import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = (req: NextRequest) => {
  const token = cookies().get("token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  } else {
    cookies().set("user", "User hu bhai", {
      httpOnly: true,
      expires: Infinity,
    });
    return NextResponse.json({ message: "Welcome" }, { status: 200 });
  }
};
