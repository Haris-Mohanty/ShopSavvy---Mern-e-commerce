import mongoose from "mongoose";

// Create Schema
const cartItemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
    },
  },
  { timestamps: true }
);

// Default
export default mongoose.model("CartItem", cartItemSchema);
