import {
  connectionApiSchema,
  connectionApiSchemaWithEmail,
} from "../../zodSchema";
import apiAsyncHandler from "../../../../lib/apiAsyncHandler";
import dbConnect from "../../../../lib/dbConnect";
import jwtVerifyHanlder from "../../../../lib/jwtVerifyHanlder";
import Connections from "../../../../models/Connections";
import User from "../../../../models/User";
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

    const { success, data } = connectionApiSchemaWithEmail.safeParse(body);

    if (!success) {
      throwNewError({
        status: STATUSCODES.BAD_REQUEST,
        error: "Invalid Payload",
      });
      return;
    }

    const { email } = data;

    const otherUser = await User.findOne({ email: email });

    await Promise.all([
      Connections.findOneAndUpdate(
        { userId },
        { $push: { send: { userId: otherUser.id } } },
      ),
      Connections.findOneAndUpdate(
        { userId : otherUser.id },
        { $push: { received: { userId } } },
      ),
    ]);

    return sendResponse({
      status: 200,
      message: "Connections request send",
    });
  })
);
