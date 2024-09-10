import { connectionApiSchema } from "../../zodSchema";
import apiAsyncHandler from "../../../../lib/apiAsyncHandler";
import dbConnect from "../../../../lib/dbConnect";
import jwtVerifyHanlder from "../../../../lib/jwtVerifyHanlder";
import Connections from "../../../../models/Connections";
import {
  parseBody,
  sendResponse,
  throwNewError,
} from "../../../../lib/server-utils";
import { STATUSCODES } from "../../../../helpers/constants";

export const POST = apiAsyncHandler(
  jwtVerifyHanlder(async (req, userId) => {
    dbConnect();
    const body = await parseBody(req);

    const { success, data } = connectionApiSchema.safeParse(body);

    if (!success) {
      throwNewError({
        status: STATUSCODES.BAD_REQUEST,
        error: "Invalid Payload",
      });
      return;
    }

    const { id } = data;

    const existingConnection = await Connections.findOne({
      userId,
      received: { $elemMatch: { userId: id } },
    });

    if (existingConnection && existingConnection.received.length > 0) {
      await Promise.all([
        Connections.findOneAndUpdate(
          { userId },
          { $pull: { received: { userId: id } } }
        ),
        Connections.findOneAndUpdate(
          { userId: id },
          { $pull: { send: { userId } } }
        ),
      ]);

      return sendResponse({
        status: 200,
        message: "Connection request rejected",
      });
    } else {
      throwNewError({
        status: STATUSCODES.NOT_FOUND,
        error: "No connection request to reject",
      });
    }
  })
);
