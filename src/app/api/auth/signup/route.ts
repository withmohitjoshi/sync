import bcrypt from "bcrypt";
import { signupSchema } from "@/app/signup/constants";
import { dbConnect } from "@/dbConfig/dbConnnect";
import { STATUSCODES } from "@/helpers/enums";
import { parseBody, sendResponse, throwNewError } from "@/helpers/functions";
import { apiAsyncHandler } from "@/lib/apiAsyncHandler";
import User from "@/models/User";
import { NextRequest } from "next/server";

dbConnect();

export const POST = apiAsyncHandler(async (req: NextRequest) => {
  const body = await parseBody(req);

  const { success, data } = signupSchema.safeParse(body);

  if (!success) {
    throwNewError({
      status: STATUSCODES.BAD_REQUEST,
      error: "Invalid Payload",
    });
  }

  const { email, username, password } = data!;

  const isUserExists = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserExists) {
    throwNewError({
      status: STATUSCODES.CONFLICT,
      error: "User already exists with these credentials",
    });
  }

  const newUser = new User({
    email,
    username,
    password: await bcrypt.hash(password, 10),
  });

  newUser.save();

  return sendResponse({
    status: 200,
    message: "Registration Successfully",
  });
});
