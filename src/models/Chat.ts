import mongoose, { Schema, Document, Types } from "mongoose";

interface ChatI extends Document {
  from: Types.ObjectId;
  to: Types.ObjectId;
  messages: {
    sender: Types.ObjectId;
    content: string;
    createdAt?: Date;
  }[];
}

const ChatSchema: Schema<ChatI> = new Schema(
  {
    from: { type: Schema.Types.ObjectId, ref: "User" },
    to: { type: Schema.Types.ObjectId, ref: "User" },
    messages: [
      {
        sender: { type: Schema.Types.ObjectId, ref: "User" },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Chat =
  (mongoose.models.chats as mongoose.Model<ChatI>) ||
  mongoose.model<ChatI>("chats", ChatSchema);

export default Chat;
