import { Schema, model } from "mongoose";

const cartSchema = new Schema({
  cart: { type: Array, default: [] },
  atCreated: { type: Date, default: Date() },
});

export const cartModel = model("carts", cartSchema);
