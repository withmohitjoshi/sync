import { cookies } from "next/headers";
import { sendResponse } from "../../../../lib/server-utils";
import apiAsyncHandler from "../../../../lib/apiAsyncHandler";
export const GET = apiAsyncHandler(async (_) => {
  cookies().delete("token");
  return sendResponse({
    status: 200,
  });
});
