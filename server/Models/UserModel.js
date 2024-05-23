import mongoose from "mongoose";
import validator from "validator";

// Create Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [40, "Name cannot be longer than 40 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email address!"],
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      minlength: [6, "Password must be at least 6 characters long!"],
    },
    profilePhoto: {
      type: String,
      required: [true, "Profile photo is required"],
      validate: [
        validator.isURL,
        "Please enter a valid URL for the profile photo",
      ],
    },
  },
  { timestamps: true }
);

// Export
export default mongoose.model("User", userSchema);
