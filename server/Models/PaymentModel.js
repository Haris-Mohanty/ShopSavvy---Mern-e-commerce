import mongoose from "mongoose";

// Create Schema
const paymentSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    paymentId: {
      type: String,
      required: true,
      unique: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Credit Card", "Debit Card", "Net Banking", "UPI", "Wallet"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Created", "Authorized", "Captured", "Refunded", "Failed"],
      default: "Created",
      required: true,
    },
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
  },
  { timestamps: true }
);

// Export
export default mongoose.model("Payment", paymentSchema);
