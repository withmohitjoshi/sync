import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/login", "/signup", "/verify-email"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const response = NextResponse.next();
  const token = cookies().get("token")?.value;

  if (!token) {
    if (publicRoutes.includes(pathname)) {
      return response;
    } else {
      return NextResponse.redirect(new URL(publicRoutes[0], request.url));
    }
  } else {
    if (publicRoutes.includes(pathname)) {
      return NextResponse.redirect(
        new URL(`${process.env.NEXT_PUBLIC_SITE_BASEURL}`, request.url)
      );
    } else {
      return response;
    }
  }
}

export const config = {
  matcher: ["/login", "/signup", "/verify-email", "/"],
};
