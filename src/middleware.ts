import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { updateJWTSession } from "./lib/jwt";

const publicRoutes = [
  "/login",
  "/signup",
  "/verify-email",
  "/forgot-password",
  "/reset-passwod",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let response = NextResponse.next();
  const token = cookies().get("token")?.value;
  const isPublicRoutes = publicRoutes.some((route) => route === pathname);
  if (!token) {
    if (isPublicRoutes) {
      return response;
    } else {
      return NextResponse.redirect(new URL(publicRoutes[0], request.url));
    }
  } else {
    if (isPublicRoutes) {
      return NextResponse.redirect(
        new URL(`${process.env.NEXT_PUBLIC_SITE_BASEURL}`, request.url)
      );
    } else {
      try {
        await updateJWTSession(request, response);
        return response;
      } catch (error) {
        console.log("Error in update session:", error);
        return NextResponse.redirect(
          new URL(`${process.env.NEXT_PUBLIC_SITE_BASEURL}`, request.url)
        );
      }
    }
  }
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/verify-email",
    "/forgot-password",
    "/reset-passwod",
    "/myaccount",
    "/change-password",
    "/view-requests",
    "/",
  ],
};
