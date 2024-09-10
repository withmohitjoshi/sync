import mongoose, { Schema } from "mongoose";

const ConnectionsSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    connections: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "users",
        },
        createdAt: {
          type: Date,
          default: () => Date.now(),
        },
      },
    ],
    send: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "users",
        },
        createdAt: {
          type: Date,
          default: () => Date.now(),
        },
      },
    ],
    received: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "users",
        },
        createdAt: {
          type: Date,
          default: () => Date.now(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Connections =
  mongoose.models.connections ||
  mongoose.model("connections", ConnectionsSchema);

export default Connections;
