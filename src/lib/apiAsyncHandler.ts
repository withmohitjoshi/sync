import { jsonParse } from "@/helpers/functions";
import { NextRequest, NextResponse } from "next/server";
import { errorHandler } from "./errorHandler";

export const apiAsyncHandler = (cb: any) => {
  return async (req: NextRequest) => {
    try {
      return await cb(req);
    } catch (_: any) {
      const parsedError = jsonParse(_?.message?.split("Error: ").at(-1));
      if (parsedError) {
        const { error, status, data } = parsedError || {};
        return errorHandler({
          status,
          error,
          data,
        });
      } else {
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
