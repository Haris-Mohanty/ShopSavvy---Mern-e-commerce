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
    },
    paymentMethod: {
      type: String,
      enum: ["Online", "Cash On Delivery"],
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "Created",
    },
    paymentReceipt: {
      type: String,
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
