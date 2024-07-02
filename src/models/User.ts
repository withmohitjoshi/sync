import mongoose, { Schema, Document, Mongoose } from "mongoose";

export interface UserI extends Document {
  name: string;
  email: string;
  password: string;
  username: string;
  isVerified: boolean;
}

const UserSchema: Schema<UserI> = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please provide a valid email address"],
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
  },
  {
    timestamps: true,
  }
);

const User =
  (mongoose.models.users as mongoose.Model<UserI>) ||
  mongoose.model<UserI>("users", UserSchema);

export default User;
