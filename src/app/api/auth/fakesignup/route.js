import bcrypt from "bcrypt";
import {
  parseBody,
  sendResponse,
  throwNewError,
} from "../../../../lib/server-utils";
import apiAsyncHandler from "../../../../lib/apiAsyncHandler";
import User from "../../../../models/User";
import dbConnect from "../../../../lib/dbConnect";
import { schema } from "../../../(public)/signup/constants";
import { STATUSCODES } from "../../../../helpers/constants";
import Connections from "../../../../models/Connections";

export const POST = apiAsyncHandler(async (req) => {
  dbConnect();
  const body = await parseBody(req);

  const { success, data } = schema.safeParse(body);

  if (!success) {
    throwNewError({
      status: STATUSCODES.BAD_REQUEST,
      error: "Invalid Payload",
    });
  }

  const { email, username, password } = data;

  const [isEmailInUse, isUsernameInUse] = await Promise.all([
    User.findOne({
      email,
    }),
    User.findOne({
      username,
    }),
  ]);

  if (isEmailInUse || isUsernameInUse) {
    const error = isEmailInUse ? "Email already used" : "Username already used";
    throwNewError({
      status: STATUSCODES.CONFLICT,
      error,
    });
  }

  const newUser = new User({
    email,
    username,
    password: await bcrypt.hash(password, 10),
    verifyCode: null,
    verifyCodeExpiry: null,
    isVerified: true,
    verifyCode: null,
    verifyCodeExpiry: null,
  });
  const connections = new Connections({
    userId: newUser.id,
  });

  await newUser.save();
  await connections.save();

  return sendResponse({
    status: 200,
  });
});
