import { Schema, model } from "mongoose";

const messageSchema = new Schema({
  user: String,
  message: String,
  atCreated: {
    type: Date,
    default: Date(),
  },
});

export const messageModel = model("messages", messageSchema);
