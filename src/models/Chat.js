import mongoose, { Schema } from "mongoose";

const ChatSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    lastMessage: {
      type: Schema.Types.String,
      default: null,
    },
    lastMessageSendBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
      default: null,
    },
    lastMessageTime: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.models.chats || mongoose.model("chats", ChatSchema);

export default Chat;
