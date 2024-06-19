import mongoose from "mongoose";
import validator from "validator";

// Create Address Schema
const addressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    houseNo: {
      type: String,
      required: [true, "House No is required!"],
      trim: true,
    },
    area: {
      type: String,
      required: [true, "Area is required!"],
      trim: true,
    },
    postalCode: {
      type: String,
      required: [true, "Postal code is required!"],
      validate: {
        validator: (value) => {
          return validator.isPostalCode(value, "IN");
        },
        message: "Invalid postal code",
      },
    },
    district: {
      type: String,
      required: [true, "District is required!"],
      trim: true,
    },
    state: {
      type: String,
      required: [true, "State is required!"],
      trim: true,
    },
    country: {
      type: String,
      required: [true, "Country is required!"],
      trim: true,
      default: "India",
    },
    landMark: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required!"],
      trim: true,
      validate: {
        validator: (value) => {
          return validator.isMobilePhone(value, "en-IN");
        },
        message: "Invalid phone number",
      },
    },
  },
  { timestamps: true }
);

// Export
export default mongoose.model("Address", addressSchema);
