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

    if (userId === id) {
      throwNewError({
        status: STATUSCODES.CONFLICT,
        error: "You cannot send requests to yourself",
      });
    }

    const existingConnection = await Connections.findOne({
      $or: [
        { userId, connections: { $elemMatch: { userId: id } } },
        { userId, send: { $elemMatch: { userId: id } } },
        { userId, received: { $elemMatch: { userId: id } } },
      ],
    });

    if (existingConnection) {
      const { connections, send, received } = existingConnection;

      const errorMessages = {
        connections: "This user is already connected with you",
        send: "You already sent a connection request to user",
        received: "You have already received a connection request",
      };
      if (connections.length) {
        throwNewError({
          status: STATUSCODES.CONFLICT,
          error: errorMessages.connections,
        });
      } else if (send.length) {
        throwNewError({
          status: STATUSCODES.CONFLICT,
          error: errorMessages.send,
        });
      } else if (received.length) {
        throwNewError({
          status: STATUSCODES.CONFLICT,
          error: errorMessages.received,
        });
      }
    }

    await Promise.all([
      Connections.findOneAndUpdate(
        { userId },
        { $push: { send: { userId: id } } },
        { new: true }
      ),
      Connections.findOneAndUpdate(
        { userId: id },
        { $push: { received: { userId } } },
        { new: true }
      ),
    ]);

    return sendResponse({
      status: 200,
      message: "Connections request send",
    });
  })
);
