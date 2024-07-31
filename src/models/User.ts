import { EMAIL_REGEX } from "@/helpers/constants";
import mongoose, { Schema, Document, Types } from "mongoose";

export interface UserI extends Document {
  name: string;
  email: string;
  password: string;
  username: string;
  isVerified: boolean;
  findByEmail: boolean;
  verifyCode: string;
  verifyCodeExpiry: Date;
  forgotPasswordToken: string;
  forgotPasswordTokenExpiry: Date;
  contacts: {
    userId: Types.ObjectId;
    createdAt?: Date;
  }[];
  requestReceived: {
    userId: Types.ObjectId;
    createdAt?: Date;
  }[];
  requestSent: {
    userId: Types.ObjectId;
    createdAt?: Date;
  }[];
}

const UserSchema: Schema<UserI> = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match: [EMAIL_REGEX, "Please provide a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: 2,
      maxlength: 20,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    findByEmail: {
      type: Boolean,
      default: true,
    },
    verifyCode: {
      type: String,
    },
    verifyCodeExpiry: {
      type: Date,
    },
    forgotPasswordToken: {
      type: String,
      default: null,
    },
    forgotPasswordTokenExpiry: {
      type: Date,
      default: null,
    },
    contacts: [
      {
        userId: {
          type: Types.ObjectId,
          ref: "users",
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
          required: false,
        },
      },
    ],
    requestReceived: [
      {
        userId: {
          type: Types.ObjectId,
          ref: "users",
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
          required: false,
        },
      },
    ],
    requestSent: [
      {
        userId: {
          type: Types.ObjectId,
          ref: "users",
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now(),
          required: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User =
  (mongoose.models.users as mongoose.Model<UserI>) ||
  mongoose.model<UserI>("users", UserSchema);

export default User;
