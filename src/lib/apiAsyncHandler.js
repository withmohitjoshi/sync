import { jsonParse } from "./server-utils";
import { NextResponse } from "next/server";
import { errorHandler } from "./errorHandler";

const apiAsyncHandler = (cb) => {
  return async (req) => {
    try {
      return await cb(req);
    } catch (_) {
      const parsedError = jsonParse(_?.message?.split("Error: ").at(-1));
      if (parsedError) {
        const { error, status, data } = parsedError || {};
        return errorHandler({
          status,
          error,
          data,
        });
      } else {
        console.log(_);
        return NextResponse.json(
          {
            status: 500,
            message: "Something went wrong (default)",
          },
          {
            status: 500,
          }
        );
      }
    }
  };
};
export default apiAsyncHandler