import { sendResponse } from "@/helpers/functions";
import { apiAsyncHandler } from "@/lib/apiAsyncHandler";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const GET = apiAsyncHandler(async (_: NextRequest) => {
  cookies().delete("token");
  return sendResponse({
    status: 200,
  });
});
