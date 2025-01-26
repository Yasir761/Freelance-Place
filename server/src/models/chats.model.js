import mongoose, { Schema } from "mongoose";

const chatSchema = new Schema(
  {
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    readBySeller: {
      type: Boolean,
      default: false,
    },
    readByBuyer: {
      type: Boolean,
      default: false,
    },
    lastMessage: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Chat = mongoose.model("Chat", chatSchema);
